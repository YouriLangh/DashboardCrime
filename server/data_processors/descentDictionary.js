import dotenv from 'dotenv';
dotenv.config();

export function createDescentDictionary(data) {
    // Create an empty map for all descents
    const descentMap = new Map();

    // Process each row in the input data
    data.forEach((row) => {
        // Extract the descent field from the row
        let descent = row[process.env.VICT_DESCENT_FIELD];

        if (descent) {
            // If there's a delimiter, split and take the first part
            if (descent.includes('::')) {
                descent = descent.split('::')[0];
            }

            // Increment the count for that descent in the map
            descentMap.set(descent, (descentMap.get(descent) || 0) + 1);
        }
    });

    // Convert the map to an array of objects for the pie chart
    const polarData = Array.from(descentMap).map(([descent, count]) => ({
        name: descent,
        value: count,
    }));

    return polarData;
}
