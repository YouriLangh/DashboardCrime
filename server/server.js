import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dataRoutes from "./routes/data.js";
import filterRoutes from "./routes/filters.js";
import loadCSVData from "./data_loaders/csv_loader.js";
import { filterDictionaryGenerator } from "./data_processors/filterDictionaryGenerator.js";
import { filterData } from "./data_processors/filter.js";
import cache from "./cache/cache.js";
/* Configurations */
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

let data = []; // Variable to store data in memory
let yearIndex = {}; // Index by year
let filterDictionary;
const baseFilters = { yearFilter: 2023 };

const initializeData = async () => {
  try {
    // Access the data file path from the environment variable
    const dataFilepath = process.env.DATA_FILE_PATH;

    // Record the start time
    const startTime = Date.now();

    // Load the data using the loadCSVData function
    const { data: loadedData, yearIndex: loadedYearIndex } = await loadCSVData(
      dataFilepath
    );
    data = loadedData;
    yearIndex = loadedYearIndex;
    filterDictionary = filterDictionaryGenerator(loadedData, loadedYearIndex);
    // Record the end time
    const endTime = Date.now();

    // Calculate the duration it took to load data
    const duration = endTime - startTime;

    // Log the duration
    console.log(`Data loaded into memory in ${duration} ms`);
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

function generateCacheKey(filters) {
  return JSON.stringify(filters);
}

// Function to set base filters in cache after data initialization
async function setBaseFiltersInCache() {
  // Ensure data is initialized
  if (data && data.length > 0) {
    const cacheKey = generateCacheKey(baseFilters);
    const filteredData = filterData(data, baseFilters);
    cache.set(cacheKey, filteredData);
    console.log(`Base filters set in cache with key: ${cacheKey}`);
  } else {
    console.log(
      "Data is not yet initialized. Waiting for data initialization."
    );
  }
}

// Initialize data
initializeData()
  .then(() => {
    // Call the function to set base filters in cache after data is initialized
    setBaseFiltersInCache();
  })
  .catch((error) => {
    console.error("Error during data initialization:", error);
  });

/* ROUTES */
app.use("/api/data", dataRoutes);
app.use("/api/filters", filterRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Function to clear the in-memory data
function clearInMemoryData() {
  console.log("Clearing in-memory data...");
  data = null;
}

// Event handler for server shutdown (e.g., Ctrl+C or termination signals)
process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down server...");
  clearInMemoryData();
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

export { data, yearIndex, filterDictionary };
