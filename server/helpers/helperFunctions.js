import cache from "../cache/cache.js";
import { filterData } from "../data_processors/filter.js";
import { generateGeneralStatDictionary } from "../data_processors/generalDataDictionaryGenerator.js";

// The filter we initialize the client on
const baseFilters = { yearFilter: 2023 };

// Function to check if the filters are the base filters
export function isBaseFilter(filters) {
  // Iterate through each [key, value] pair in filters (excluding 'yearFilter')
  return Object.entries(filters)
    .filter(([key]) => key !== "yearFilter") // Exclude the 'yearFilter' key
    .every(([key, value]) => {
      if (key === 'ageFilter') {
        // Check whether the bottomAge property is 0 and the topAge property is Infinity
        return value.bottomAge === 0 && value.topAge === Infinity;
      } else {
        // Check if the value is an array of length one and contains an object with value 'All'
        return Array.isArray(value) && value.length === 1 && value[0].value === "All";
      }
    });
}

// Fetch data from the cache if it exists, otherwise filter the data and store it in the cache
export function updateCacheGetFilteredData(data, filters) {
  const cacheKey = cache.generateCacheKey(filters);
  if (!cache.has(cacheKey)) {
    const freshlyFilteredData = filterData(data, filters);
    cache.set(cacheKey, freshlyFilteredData);
  }
  return cache.get(cacheKey)
}


// Function to set base filters in cache after data initialization
export async function setBaseFiltersInCache(data) {
    // Ensure data is initialized
    if (data && data.length > 0) {
      const cacheKey = cache.generateCacheKey(baseFilters);
      const filteredData = filterData(data, baseFilters);
      cache.set(cacheKey, filteredData);
    } else {
      console.log(
        "Data is not yet initialized. Waiting for data initialization."
      );
    }
  }

  // Function to calculate generic statistics for each year
export  function calculateGenericStatistics(data, yearIndex){
    const years = Object.keys(yearIndex)
    let result = {};
      // Get the first and last years from the sorted years
      const firstYear = years[0];
      const lastYear = years[years.length - 1];
      for (let i = firstYear; i <= lastYear; i++){
        const baseFilter = {yearFilter: i}
        result[i] = generateGeneralStatDictionary(filterData(data, baseFilter), baseFilter)
      }
      return result
  }