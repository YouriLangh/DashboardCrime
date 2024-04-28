import dotenv from 'dotenv';
dotenv.config();

export function createAreaDictionary(data) {
    // Create an object to hold counts for each area
    const areas = {};

    // Process each row in the input data
    data.forEach((row) => {
        // Extract the area field from the row using the area name field from the environment variable
        const areaField = process.env.AREA_NAME_FIELD;
        const areaName = row[areaField];

        // Check if the area name is valid (not null or undefined)
        if (areaName) {
            // Convert area name to lowercase for case-insensitive comparison
            const area = areaName.toLowerCase();

            // Check if the area is already a key in the object
            if (!(area in areas)) {
                // Initialize the count for the area to 0 if not already present
                areas[area] = 0;
            }
        }
    });

    // Return the object with area counts
    return areas;
}
