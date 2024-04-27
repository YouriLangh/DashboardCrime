import dotenv from 'dotenv';
dotenv.config();

export function createCrimeDistDictionary(data) {
    // Create an empty map for all crimes
    const crimeMap = new Map();

    // Process each row in the input data
    data.forEach((row) => {
        // Extract the crime field from the row
        let crime = row[process.env.CRM_CD_DESC_FIELD];
        if (crime) {
            // Split the crime field if it contains '::' and take the second part
            if (crime.includes('::')) {
                crime = crime.split('::')[1];
            }

            // Increment the count for that crime in the map
            crimeMap.set(crime, (crimeMap.get(crime) || 0) + 1);
        }
    });

    // Convert the map to an array of objects for the bar chart
    const crimeData = Array.from(crimeMap.entries()).map(([crime, count]) => ({
        name: crime,
        value: count,
    }));

    // Sort the data by value in descending order using a stable sorting method
    crimeData.sort((a, b) => b.value - a.value);

    // Return the sorted data
    return crimeData;
}
