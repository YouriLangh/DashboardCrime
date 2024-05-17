import dotenv from 'dotenv';
dotenv.config();

// Generate a dictionary for the genders and their counts
export function createGenderDictionary(data) {
    // Create an empty dictionary for genders
    let genderDictionary = {};

    // Process each row in the input data
    data.forEach((row) => {
        // Extract the gender field from the row
        const gender = row[process.env.VICT_SEX_FIELD];
        if (gender) {
            // Increment the count for that gender
            genderDictionary[gender] = (genderDictionary[gender] || 0) + 1;
        }
    });

    // Convert the dictionary to an array of objects for the pie chart
    const pieData = Object.entries(genderDictionary).map(([gender, count]) => ({
        name: gender,
        value: count,
    }));

    return pieData;
}
