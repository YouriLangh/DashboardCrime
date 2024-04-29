export function preprocessEthnicityData(data) {
  // Calculate the total value
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  // Initialize the new data array, the 'Others' value and details
  let newData = [];
  let othersValue = 0;
  let othersDetails = [];
  let othersCount = 0; // Count the number of entries in 'Others'

  // Iterate over the data and categorize the values
  data.forEach((entry) => {
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
      newData.push({
        name: "Others",
        value: othersValue,
        details: othersDetails,
      });
    } else {
      // Only one entry in 'Others', add the original entry
      const singleEntry = data.find((entry) => (entry.value / total) * 100 < 6);
      newData.push(singleEntry);
    }
  }

  return newData;
}

export const toTitleCase = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export function myFilterSelected(filters, label) {
  const activeFilters = filters[label];
  return (
    Array.isArray(activeFilters) &&
    activeFilters.length === 1 &&
    activeFilters[0].value !== "All"
  );
}

export function updateGeoJson(geoJsonData, updatedData) {
  if (geoJsonData && updatedData) {
    // Create a Map object for fast lookup of the new crime counts
    const crimeCountLookup = new Map();
    updatedData.forEach((item) => {
      const districtName = item.APREC.toLowerCase().trim();
      crimeCountLookup.set(districtName, item["Crime Count"]);
    });

    // Iterate over the GeoJSON features and update the 'Crime Count' property based on the lookup
    geoJsonData.features.forEach((feature) => {
      const districtName = feature.properties.APREC.toLowerCase().trim();

      // Use the Map object to look up the new crime count
      if (crimeCountLookup.has(districtName)) {
        feature.properties["Crime Count"] = crimeCountLookup.get(districtName);
      }
    });

    // Return the updated GeoJSON data
    return geoJsonData;
  }
}

// Function to calculate the maximum crime count from the GeoJSON data
export function calculateMaxCrimeCount(data) {
  let maxCount = 0;
  data.features.forEach((feature) => {
    const crimeCount = feature.properties["Crime Count"];
    if (crimeCount > maxCount) {
      maxCount = crimeCount;
    }
  });
  // Return the calculated maximum crime count
  return maxCount;
}

// Function to dynamically adjust the color thresholds based on the maximum crime count
export function getColor(value, maxCrimeCount, colors) {
  // Define color thresholds dynamically
  const step = maxCrimeCount / 7;
  const thresholds = Array.from({ length: 8 }, (_, i) => step * i);

  // Determine the color based on the value and thresholds
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (value > thresholds[i]) {
      return colors[i];
    }
  }
  return colors[0];
}

// Create dynamic legend colors based on calculated maxCrimeCount
export const createDynamicColors = (maxCrimeCount, colors) => {
  const step = maxCrimeCount / 7;
  const colorsArray = Array.from({ length: 8 }, (_, i) => ({
    color: colors[i],
    label: `>${Math.floor(step * i)}`,
  }));
  colorsArray[0].label = `<${Math.floor(step)}`;
  return colorsArray;
};

// Define a hashing function to hash the crime description and generate a color and shape
export const hashToColorAndShape = (str) => {
  // Simple hash function (sdbm hash algorithm)
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
  }
  // Convert hash to a hue value (0-360 degrees) and create a color using HSL
  const hue = Math.abs(hash % 360);
  const color = `hsl(${hue}, 70%, 50%)`; // Use HSL color format

  // Map the hash value to a shape based on modulus
  const shapes = ["circle", "square", "triangle"];
  const shapeIndex = Math.abs(hash % shapes.length);
  const shape = shapes[shapeIndex];

  return { color, shape };
};

function processCrimes(crimes) {
  let result = [];
  crimes.forEach((crm) => {
    // Check if the crime description contains '::'
    if (crm.hierarchy) {
      result.push(crm.hierarchy);
    } else if (crm.submenu) {
      crm.submenu.forEach((c) => {
        if (c.hierarchy && c.hierarchy.includes("::")) {
          // Extract the part after '::'
          const subCat = c.hierarchy.split("::")[1];
          result.push(subCat);
        }
      });
    }
  });
  return result;
}

// Define the function to generate the legend dictionary
export function generateLegendDictionary(unprocessedCrimes) {
    const crimes = processCrimes(unprocessedCrimes);
    // Initialize the dictionary
    const legendDictionary = {};

    // Iterate through each crime in unprocessedCrimes
    crimes.forEach((crime) => {
        // Get the color and shape for the crime using the hashing function
        const { color, shape } = hashToColorAndShape(crime);
        
        // Store the color and shape in the dictionary using the crime description as the key
        legendDictionary[crime] = {
            color,
            shape,
        };
    });

    // Return the dictionary
    return legendDictionary;
}

export // Function to generate clip-path for different shapes
const getShapeClipPath = (shape) => {
    switch (shape) {
        case 'circle':
            return 'circle(50%)';
        case 'square':
            return 'inset(0)';
        case 'triangle':
            return 'polygon(50% 0%, 0% 100%, 100% 100%)';
        default:
            return 'circle(50%)'; // Default to circle
    }
};

export function sortItems(items){
  return items.sort((a, b) => {
    if (a.value < b.value) {
      return -1; // a should come before b
    } else if (a.value > b.value) {
      return 1; // a should come after b
    } else {
      return 0; // a and b are equal
    }
  });
}