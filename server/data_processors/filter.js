import fieldMapping from "./fieldMapping.js";
import { yearIndex } from "../server.js";

const manualFilters = [
  "yearFilter",
  "ageFilter",
  "locationFilter",
  "weekdayFilter",
  "hourOfDayFilter",
];
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
  // Filter based on age
  if(filters.ageFilter !== undefined && filters.ageFilter.bottomAge && filters.ageFilter.bottomAge && !(filters.ageFilter.bottomAge === 0 && filters.ageFilter.topAge === Infinity)){
    const mappedField = fieldMapping['ageFilter']
    const filterObject = filters.ageFilter
    const bottomAge = filterObject.bottomAge
    const topAge = filterObject.topAge
    filteredData = filteredData.filter((record) =>  record[mappedField] >= bottomAge  && record[mappedField] <= topAge)
  }
  // Filter based on day of the week
  if(filters.weekdayFilter !== undefined && filters.weekdayFilter[0].value !== 'All'){
    const mappedField = fieldMapping['date']
    const weekdayObject = filters.weekdayFilter[0]
    filteredData = filteredData.filter((record)=> record[mappedField].getDay() === weekdayObject.value)
  }
  // Filter based on hour of the day
  if(filters.hourOfDayFilter !== undefined && filters.hourOfDayFilter[0].value !== 'All'){
    const mappedField = fieldMapping['date']
    const hourOfDayObject = filters.hourOfDayFilter[0]
    filteredData = filteredData.filter((record)=> record[mappedField].getHours() === hourOfDayObject.value)
  }
  // Filter based on location
  if(filters.mapBounds !== undefined){
    const mappedLon = fieldMapping['longitude']
    const mappedLat = fieldMapping['latitude']
    filteredData = filterData.filter((record) => filters.mapBounds.contains([record[mappedLat], record[mappedLon]]))
  }

  // Loop over all fields in filters except for the previous ones
  for (const filter in filters) {
    if (manualFilters.includes(filter)) continue; // Skip manual filters

    // Map the user-friendly field-names of the filters to those matching the field names of the records in the dotenv environment
    const mappedField = fieldMapping[filter];
    const activatedFilters = filters[filter];

    let query;
    if (Array.isArray(activatedFilters) && activatedFilters.length > 1) {
      const mainCategory = activatedFilters[0].hierarchy;
      const category = mainCategory.split("::")[0];
      query = category;
      filteredData = filteredData.filter((record) =>
      // Crimes such as Battery - Simple assault would otherwise we classified as assault
        record[mappedField].split('::')[0] && record[mappedField].split('::')[0].includes(query)
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
