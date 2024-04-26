import fieldMapping from "./fieldMapping.js";
import { yearIndex } from "../server.js";

// Function to filter data based on filters
export function filterData(data, filters) {
  let filteredData;

  // Use the year filter to slice the data if it is provided
  if (filters.yearFilter !== undefined) {
    const startIndex = yearIndex[filters.yearFilter];

    // If the year is not found in the index, return an empty array as there should always be a year selected
    if (startIndex === undefined) {
      return [];
    }

    // Find the ending index (either next year's start index or the end of the data)

    const nextYear = parseInt(filters.yearFilter) + 1;
    const endIndex = yearIndex[nextYear] || data.length;

    // Slice the data based on the year filter
    filteredData = data.slice(startIndex, endIndex);
  } else {
    // If no year filter is provided, use the entire data array
    filteredData = data;
  }

  // Loop over all fields in filters except for 'year'
  for (const filter in filters) {
    if (filter === "yearFilter") continue; // Skip the 'year' field

    // Map the user-friendly field-names of the filters to those matching the field names of the records in the dotenv environment
    const mappedField = fieldMapping[filter];
    const activatedFilters = filters[filter];

    let query;
    if (Array.isArray(activatedFilters) && activatedFilters.length > 1) {
      console.log(
        "activated filter with larger length than 1:",
        activatedFilters
      );
      console.log("length", activatedFilters.length);
      const mainCategory = activatedFilters[0].hierarchy;
      const category = mainCategory.split("::")[0];
      query = category;
      filteredData = filteredData.filter((record) =>
        record[mappedField].includes(query)
      );
    } else {
      if (
        Array.isArray(activatedFilters) &&
        activatedFilters[0].value !== "All"
      ) {
        query = activatedFilters[0].hierarchy;
        // Apply the filter to the data
        filteredData = filteredData.filter(
          (record) => record[mappedField] === query
        );
      }
    }
  }

  // TODO: Manually implement the age and lat/lon filters as these require boundaries AND week filter

  // Return the filtered data
  return filteredData;
}
