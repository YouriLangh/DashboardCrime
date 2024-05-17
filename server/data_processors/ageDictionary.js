import dotenv from 'dotenv';
dotenv.config();

// Define age ranges with their corresponding names
const ageRanges = [
    { name: '0-9', start: 0, end: 9 },
    { name: '10-19', start: 10, end: 19 },
    { name: '20-29', start: 20, end: 29 },
    { name: '30-39', start: 30, end: 39 },
    { name: '40-49', start: 40, end: 49 },
    { name: '50-59', start: 50, end: 59 },
    { name: '60-69', start: 60, end: 69 },
    { name: '70-79', start: 70, end: 79 },
    { name: '80-89', start: 80, end: 89 },
    { name: '90+', start: 90, end: Infinity }
];

// Function to categorize ages into age ranges
function categorizeAge(age) {
    for (const range of ageRanges) {
        if (age >= range.start && age <= range.end) {
            return range.name;
        }
    }
    return null; // Return null if age is not within any defined range
}

// Function to create a dictionary of age ranges with their corresponding counts
export function createAgeDictionary(data) {
    // Create a dictionary to hold counts for each age range
    const ageRangeDictionary = {};

    // Initialize counts for each age range
    ageRanges.forEach(range => {
        ageRangeDictionary[range.name] = 0;
    });

    // Process each row in the input data
    data.forEach((row) => {
        // Extract the age field from the row
        const age = row[process.env.VICT_AGE_FIELD];
        if (age !== undefined && age !== null) {
            // Categorize the age and increment the count for the corresponding age range
            const ageRange = categorizeAge(age);
            if (ageRange) {
                ageRangeDictionary[ageRange]++;
            }
        }
    });

    // Convert the dictionary to an array of objects for the bar chart
    const ageData = Object.entries(ageRangeDictionary).map(([name, value]) => ({
        name,
        value,
    }));

    return ageData;
}
