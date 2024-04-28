export function preprocessEthnicityData(data) {
    // Calculate the total value
    const total = data.reduce((sum, entry) => sum + entry.value, 0);

    // Initialize the new data array, the 'Others' value and details
    let newData = [];
    let othersValue = 0;
    let othersDetails = [];
    let othersCount = 0; // Count the number of entries in 'Others'

    // Iterate over the data and categorize the values
    data.forEach(entry => {
        const percentage = (entry.value / total) * 100;

        // If the percentage is less than 6%, add the value to 'Others'
        if (percentage < 6) {
            othersValue += entry.value;
            // Store the details for the 'Others' slice
            othersDetails.push(`${entry.name}: ${entry.value}`);
            othersCount++; // Increment the count of 'Others' entries
        } else {
            newData.push(entry);
        }
    });

    // If there is a non-zero 'Others' value and there is more than one entry, add it as a new entry
    if (othersValue > 0) {
        if (othersCount > 1) {
            // More than one entry in 'Others', add a combined 'Others' slice
            newData.push({ name: 'Others', value: othersValue, details: othersDetails });
        } else {
            // Only one entry in 'Others', add the original entry
            const singleEntry = data.find(entry => (entry.value / total) * 100 < 6);
            newData.push(singleEntry);
        }
    }

    return newData;
}

export const toTitleCase = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export function myFilterSelected(filters, label){
    const activeFilters = filters[label]
    return Array.isArray(activeFilters) && ((activeFilters.length === 1) && activeFilters[0].value !== 'All')
}


export function updateGeoJson(geoJsonData, updatedData) {
    if (geoJsonData && updatedData) {
        // Create a Map object for fast lookup of the new crime counts
        const crimeCountLookup = new Map();
        updatedData.forEach(item => {
            const districtName = item.APREC.toLowerCase().trim();
            crimeCountLookup.set(districtName, item['Crime Count']);
        });

        // Iterate over the GeoJSON features and update the 'Crime Count' property based on the lookup
        geoJsonData.features.forEach(feature => {
            const districtName = feature.properties.APREC.toLowerCase().trim();

            // Use the Map object to look up the new crime count
            if (crimeCountLookup.has(districtName)) {
                feature.properties['Crime Count'] = crimeCountLookup.get(districtName);
            }
        });

        // Return the updated GeoJSON data
        return geoJsonData;
    }
}

// export function calculateMaxCrimeCount(geoJsonData) {
//     let maxCrimeCount = 0;

//     if (geoJsonData && geoJsonData.features) {
//         geoJsonData.features.forEach(feature => {
//             const crimeCount = feature.properties['Crime Count'];
//             if (crimeCount > maxCrimeCount) {
//                 maxCrimeCount = crimeCount;
//             }
//         });
//     }

//     return maxCrimeCount;
// }

// export function generateDynamicThresholds(maxCrimeCount) {
//     const intervals = 5; // You can adjust the number of intervals as needed
//     const thresholdStep = maxCrimeCount / intervals;

//     const thresholds = [];
//     for (let i = 1; i <= intervals; i++) {
//         thresholds.push(i * thresholdStep);
//     }

//     return thresholds;
// }

