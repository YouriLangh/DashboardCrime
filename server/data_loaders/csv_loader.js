import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


const DATETIME_OCC_FIELD = process.env.DATETIME_OCC_FIELD;

async function loadCSVData(filePath) {
    return new Promise((resolve, reject) => {
        const data = [];
        const yearIndex = {}; // Create an index by year
    
        fs.createReadStream(filePath)
            .pipe(parse({columns: true}))
            .on('data', (row) => {

                const datetimeOcc = row[DATETIME_OCC_FIELD];

                // Parse the datetime string into a Date object
                const dateUtc = new Date(datetimeOcc);

                // getTime uses local time so no offset is needed
                const dateUtcPlus1 = new Date(dateUtc.getTime());

                // Replace the string representation with the Date object in UTC+1
                row[DATETIME_OCC_FIELD] = dateUtcPlus1;


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
