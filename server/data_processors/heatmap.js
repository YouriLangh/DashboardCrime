import dotenv from 'dotenv';
dotenv.config();

export function createHeatMapData(data) {
    // Create a Map to hold the nested dictionary for all ethnicities and crimes
    const descentCrimeMap = new Map();
    const crimeSet = new Set();

    // Process each row in the input data
    data.forEach((row) => {
        // Extract the descent (ethnicity) and crime fields from the row
        let descent = row[process.env.VICT_DESCENT_FIELD];
        let crime = row[process.env.CRM_CD_DESC_FIELD];

        // Check if descent and crime are valid
        if (descent && crime) {
            // Simplify descent and crime by removing prefixes
            descent = descent.split('::')[0];
            crime = crime.split('::')[0];

            // Get or create a Map for the current descent
            if (!descentCrimeMap.has(descent)) {
                descentCrimeMap.set(descent, new Map());
            }
            const crimeMap = descentCrimeMap.get(descent);

            // Increment the count for the crime under the specific ethnicity
            crimeMap.set(crime, (crimeMap.get(crime) || 0) + 1);

            // Add the crime to the set of unique crimes
            crimeSet.add(crime);
        }
    });

    // Convert the set of unique crimes to an array
    const crimesArray = Array.from(crimeSet);
    // Convert the keys of descentCrimeMap to an array of ethnicities
    const ethnicities = Array.from(descentCrimeMap.keys());

    // Create a 2D array (matrix) to hold the frequencies of crimes for each ethnicity
    const matrix = ethnicities.map((ethnicity) => {
        // Create an array for this ethnicity
        const row = Array(crimesArray.length).fill(0);

        // Fill the row with crime frequencies
        const crimeMap = descentCrimeMap.get(ethnicity);
        crimesArray.forEach((crime, index) => {
            row[index] = crimeMap.get(crime) || 0;
        });

        return row;
    });

    // Return the data in the required format for the frontend
    return {
        crimes: crimesArray, // x-axis labels
        ethnicities, // y-axis labels
        matrix // the 2D array (matrix) of data
    };
}
