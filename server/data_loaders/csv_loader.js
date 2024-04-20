import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse'

// Define your desired time zone offset (UTC+1) in milliseconds
const UTC_PLUS_1_OFFSET = 1 * 60 * 60 * 1000; // 1 hour in milliseconds


async function loadCSVData(filePath) {
    return new Promise((resolve, reject) => {
        const data = [];
        const yearIndex = {}; // Create an index by year
    
        fs.createReadStream(filePath)
            .pipe(parse({columns: true}))
            .on('data', (row) => {

                const datetimeOcc = row['DATETIME OCC'];

                // Parse the datetime string into a Date object
                const dateUtc = new Date(datetimeOcc);

                // Convert the date to UTC+1 by adding the time zone offset to store the actual datetime
                // We add the offset because Javascript's Date function assumes these were made in UTC+1
                const dateUtcPlus1 = new Date(dateUtc.getTime() + UTC_PLUS_1_OFFSET);

                // Replace the string representation with the Date object in UTC+1
                row['DATETIME OCC'] = dateUtcPlus1;


                // Parse the row data
                data.push(row);
                
                // Extract the year from the parsed date
                const year = dateUtcPlus1.getFullYear();
                if (!yearIndex[year]) {
                    yearIndex[year] = data.length - 1;
                }
            })
            .on('end', () => {
                resolve({ data, yearIndex });
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

// Export the function
export default loadCSVData;
