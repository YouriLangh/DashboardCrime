import fs from 'fs'
import path  from 'path'
import { parse } from 'csv-parse'
import { parse as dateparse } from 'date-fns';
async function loadCSVData(filePath) {
    return new Promise((resolve, reject) => {
        const data = [];
        const yearIndex = {}; // Create an index by year
    
        fs.createReadStream(filePath)
            .pipe(parse({columns: true}))
            .on('data', (row) => {
                // Parse the row data
                data.push(row);

                // Parse the "DATETIME OCC" column
                const datetimeOcc = row['DATETIME OCC'];

                // Parse the datetime string using dateparse from date-fns
                const parsedDate = dateparse(datetimeOcc, 'yyyy-MM-dd HH:mm:ss', new Date());

                // Extract the year from the parsed date
                const year = parsedDate.getFullYear();
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
