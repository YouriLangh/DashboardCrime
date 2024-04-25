import dotenv from 'dotenv';
dotenv.config();

export function createWeeklyDictionary(data) {
    // Create an array to hold crime counts for each day of the week (0-6)
    const crimeCounts = Array(7).fill(0);

    // Predefined array of day names for easy mapping
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Process each row of data
    data.forEach((row) => {
        // Get the datetime field from the row
        const datetime = row[process.env.DATETIME_OCC_FIELD];

        // Convert the datetime string to a Date object
        const date = new Date(datetime);

        // Get the day of the week (0-6)
        const dayOfWeek = date.getDay();

        // Increment the count for that day of the week
        crimeCounts[dayOfWeek]++;
    });

    // Map the counts to an array of objects for each day of the week
    const weekData = daysOfWeek.map((dayName, index) => ({
        name: dayName,
        crime: crimeCounts[index],
    }));

    // Return the array of objects
    return weekData;
}
