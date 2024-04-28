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

// Function to calculate the maximum crime count from the GeoJSON data
export function calculateMaxCrimeCount(data) {
    let maxCount = 0;
    data.features.forEach(feature => {
        const crimeCount = feature.properties["Crime Count"];
        if (crimeCount > maxCount) {
            maxCount = crimeCount;
        }
    });
    // Return the calculated maximum crime count
    return maxCount;
}

// Function to dynamically adjust the color thresholds based on the maximum crime count
export function getColor(value, maxCrimeCount) {
    // Define color thresholds dynamically
    const step = maxCrimeCount / 7;
    const thresholds = Array.from({ length: 8 }, (_, i) => step * i);

    // Define colors based on dynamic thresholds
    const colors = ["#FFEDA0", "#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#BD0026", "#800026"];

    // Determine the color based on the value and thresholds
    for (let i = thresholds.length - 1; i >= 0; i--) {
        if (value > thresholds[i]) {
            return colors[i];
        }
    }
    return colors[0];
}


    // Create dynamic legend colors based on calculated maxCrimeCount
   export const createDynamicColors = (maxCrimeCount) => {
        const step = maxCrimeCount / 7;
        const colorsArray = Array.from({ length: 8 }, (_, i) => ({
            color: ["#FFEDA0", "#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#BD0026", "#800026"][i],
            label: `>${Math.floor(step * i)}`
        }));
        colorsArray[0].label = `<${Math.floor(step)}`;
        return colorsArray;
    };