
import fieldMapping from './fieldMapping.js';

// Access the macros from the environment variables

// Function to filter data based on filters
export function filterData(data, filters, yearIndex) {
    let filteredData;

    // Use the year filter to slice the data if it is provided
    if (filters.year !== undefined) {
        // TODO: change the .year to a macro
        const startIndex = yearIndex[filters.year];

        // If the year is not found in the index, return an empty array as there should always be a year selected
        if (startIndex === undefined) {
            return [];
        }

        // Find the ending index (either next year's start index or the end of the data)
         // TODO: change the .year to a macro
        const nextYear = parseInt(filters.year) + 1;
        const endIndex = yearIndex[nextYear] || data.length;

        // Slice the data based on the year filter
        filteredData = data.slice(startIndex, endIndex);
    } else {
        // If no year filter is provided, use the entire data array
        filteredData = data;
    }

    // Loop over all fields in filters except for 'year'
    for (const field in filters) {
        // TODO: Change year to a macro 
        if (field === 'year') continue; // Skip the 'year' field

        // Map the user-friendly field-names of the filters to those matching the field names of the records in the dotenv environment
        const mappedField = fieldMapping[field]

        // Apply the filter to the data
        filteredData = filteredData.filter(record => record[mappedField] === filters[field]);
    }

    // TODO: Manually implement the age and lat/lon filters as these require boundaries

    // Return the filtered data
    return filteredData;
}
