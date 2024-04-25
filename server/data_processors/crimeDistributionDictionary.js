import dotenv from 'dotenv';
dotenv.config();

export function createCrimeDistDictionary(data) {
    // Create an empty dictionary for all crimes
    let crimeDictionary = {};

    // Process each row in the input data
    data.forEach((row) => {
        // Extract the crime field from the row
        let crime = row[process.env.CRM_CD_DESC_FIELD];
        if (crime) {
            if (crime.includes('::')) {
                crime = crime.split('::')[1];
            }

            // Increment the count for that crime
            crimeDictionary[crime] = (crimeDictionary[crime] || 0) + 1;
        }
    });

    // Convert the dictionary to an array of objects for the bar chart
    const crimeData = Object.entries(crimeDictionary).map(([crime, count]) => ({
        name: crime,
        value: count,
    }));

    // Sort the data by value in descending order
    crimeData.sort((a, b) => b.value - a.value);

    // Return the sorted data
    return crimeData;
}
