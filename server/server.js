import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import statRoutes from "./routes/general-stats.js"
import filterRoutes from "./routes/filters.js"
import loadCSVData from './data_loaders/csv_loader.js'
import { filterData } from './data_processors/filter.js';
import { filterDictionaryGenerator } from "./data_processors/filterDictionaryGenerator.js"

/* Configurations */
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors())


let data = []; // Variable to store data in memory
let yearIndex = {}; // Index by year
let filterDictionary

const initializeData = async () => {
    try {
      // Access the data file path from the environment variable
      const dataFilepath = process.env.DATA_FILE_PATH;
  
      // Record the start time
      const startTime = Date.now();

      // Load the data using the loadCSVData function
      const { data: loadedData, yearIndex: loadedYearIndex } = await loadCSVData(dataFilepath);
      data = loadedData;
      yearIndex = loadedYearIndex;
      filterDictionary = filterDictionaryGenerator(loadedData, loadedYearIndex)
      // Record the end time
      const endTime = Date.now();
  
      // Calculate the duration it took to load data
      const duration = endTime - startTime;

      // Log the duration
      console.log(`Data loaded into memory in ${duration} ms`);

    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

// Initialize data
initializeData();


/* ROUTES */
app.use("/api/stats", statRoutes)
app.use("/api/filters", filterRoutes)


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Function to clear the in-memory data
function clearInMemoryData() {
    console.log('Clearing in-memory data...');
    data = null; 
}

// Event handler for server shutdown (e.g., Ctrl+C or termination signals)
process.on('SIGINT', () => {
    console.log('Received SIGINT. Shutting down server...');
    clearInMemoryData();
    app.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

export { data, yearIndex, filterDictionary };