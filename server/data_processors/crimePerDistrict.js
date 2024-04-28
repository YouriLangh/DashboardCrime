import dotenv from "dotenv";
import { areaDictionary } from "../server.js";
dotenv.config();

export function getCountsPerDistrict(filteredData) {
    // Ensure the data is an array of objects and each object contains at least 'APREC' and 'Year' properties
    if (!Array.isArray(filteredData)) {
        throw new Error('Input data must be an array of objects.');
    }

    // Clone the areaDictionary object to avoid modifying the original one
    const areaCounts = { ...areaDictionary };
    // Iterate over the filtered data and count the crimes per district
    filteredData.forEach(item => {
        const districtName = item[process.env.AREA_NAME_FIELD].toLowerCase();
        // Check if the district exists in areaDictionary
        if (areaCounts.hasOwnProperty(districtName)) {
            // Increment the crime count for the district
            areaCounts[districtName]++;
        }
    });

    // Convert the areaCounts dictionary to an array of objects
    const countsPerDistrict = Object.entries(areaCounts).map(([district, count]) => {
        return {
            APREC: district,
            'Crime Count': count
        };
    });

    // Return the list of district names and their corresponding crime counts
    return countsPerDistrict;
}
