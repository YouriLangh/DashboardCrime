import dotenv from 'dotenv';
dotenv.config();

export function createDescentDictionary(data) {
    // Create an empty dictionary for all sexes
    let descentDictionary = {};

    // Process each row in the input data
    data.forEach((row) => {
        // Extract the sex field from the row
        const descent = row[process.env.VICT_DESCENT_FIELD];
        if (descent) {
            // Increment the count for that sex
            descentDictionary[descent] = (descentDictionary[descent] || 0) + 1;
        }
    });

    // Convert the dictionary to an array of objects for the pie chart
    const polarData = Object.entries(descentDictionary).map(([descent, count]) => ({
        name: descent,
        value: count,
    }));

    return polarData;
}
