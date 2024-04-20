import fs from 'fs'
import path  from 'path'
import { parse } from 'csv-parse'

function loadCSVData(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true }))
      .on('data', (row) => 
      results.push(row)
      )
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

// Export the function
export default loadCSVData;
