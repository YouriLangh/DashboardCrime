import dotenv from "dotenv";
dotenv.config();

export function createYearlyData(filteredData) {
    // Array of month names in three-letter representation
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Create an empty dictionary for the year
    let yearDictionary = {};

    // Initialize each month with a count of 0
    monthNames.forEach((month) => {
        yearDictionary[month] = 0;
    });

    // Process each row in the input data
    filteredData.forEach((row) => {
        // Extract the date field from the row
        const dateStr = row[process.env.DATETIME_OCC_FIELD];
        const date = new Date(dateStr);

        // Get the month index (0-11)
        const monthIndex = date.getMonth();

        // Get the month name using the month index
        const monthName = monthNames[monthIndex];

        // Increment the count for the corresponding month in the dictionary
        if (monthName in yearDictionary) {
            yearDictionary[monthName] += 1;
        }
    });

    // Convert the dictionary to an array of objects for the area chart
    const data = monthNames.map((month) => ({
        name: month, // Use the month name as the `name` key
        value: yearDictionary[month] // Use the count as the `value` key
    }));

    // Return the data for the area chart
    return data;
}
