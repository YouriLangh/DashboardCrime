import dotenv from 'dotenv';
dotenv.config();

export function createHeatMapData(data) {
    // Create an empty nested dictionary for all ethnicities and crimes
    let descentCrimeDictionary = {};

    // Process each row in the input data
    data.forEach((row) => {
        // Extract the descent (ethnicity) and crime fields from the row
        let descent = row[process.env.VICT_DESCENT_FIELD];
        let crime = row[process.env.CRM_CD_DESC_FIELD];

        // Check if descent and crime are valid
        if (descent && crime) {
            if(descent.includes('::')){
                descent = descent.split('::')[0]
            }
            // Initialize the inner dictionary if necessary
            if (!descentCrimeDictionary[descent]) {
                descentCrimeDictionary[descent] = {};
            }
            // Simplify crime name by removing prefix (if present)
            if (crime.includes("::")) {
                crime = crime.split("::")[0];
            }
            // Increment the count for the crime under the specific ethnicity
            descentCrimeDictionary[descent][crime] =
                (descentCrimeDictionary[descent][crime] || 0) + 1;
        }
    });

    // Extract unique crimes and ethnicities from the dictionary
    const crimes = new Set();
    const ethnicities = Object.keys(descentCrimeDictionary);

    // Populate the set of unique crimes
    for (const ethnicity of ethnicities) {
        for (const crime in descentCrimeDictionary[ethnicity]) {
            crimes.add(crime);
        }
    }

    // Convert the set of crimes to an array
    const crimesArray = Array.from(crimes);

    // Create a 2D array (matrix) to hold the frequencies of crimes for each ethnicity
    const matrix = ethnicities.map(ethnicity => {
        // Create an array for this ethnicity
        const row = Array(crimesArray.length).fill(0);

        // Fill the row with crime frequencies
        for (const crime in descentCrimeDictionary[ethnicity]) {
            // Find the index of the crime in the crimesArray
            const crimeIndex = crimesArray.indexOf(crime);
            
            // Set the count in the row at the appropriate index
            row[crimeIndex] = descentCrimeDictionary[ethnicity][crime];
        }

        return row;
    });

    // Return the data in the required format for the frontend
    return {
        crimes: crimesArray, // x-axis labels
        ethnicities, // y-axis labels
        matrix // the 2D array (matrix) of data
    };
}
