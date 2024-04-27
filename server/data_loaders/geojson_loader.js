import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";
dotenv.config();


// Define the path to the GeoJSON file
const geoJsonFilePath = path.join(process.env.GEOJSON_PATH);

// Function to fetch GeoJSON data
export function loadGeoJson() {
    try {
        // Read the file from the filesystem
        const data = fs.readFileSync(geoJsonFilePath, 'utf8');

        // Parse the data as JSON
        const geoJsonData = JSON.parse(data);

        // Return the parsed GeoJSON data
        return geoJsonData;
    } catch (error) {
        console.error('Error loading GeoJSON data:', error);
        return null;
    }
}
