import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import statRoutes from "./routes/general-stats.js"
import loadCSVData from './data_loaders/csv_loader.js'

/* Configurations */
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors())


// Variable to store data in memory
let data = [];


const initializeData = async () => {
    try {
      // Access the data file path from the environment variable
      const dataFilepath = process.env.DATA_FILE_PATH;
  
      // Record the start time
      const startTime = Date.now();

      // Load the data using the loadCSVData function
      data = await loadCSVData(dataFilepath);

      // Record the end time
      const endTime = Date.now();
  
      // Calculate the duration it took to load data
      const duration = endTime - startTime;
      
      // Log the duration
      console.log(`Data loaded into memory in ${duration} ms`);

      console.log('First data instance:', data[0]);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

// Initialize data
initializeData();




/* ROUTES */
app.use("/stats", statRoutes)






// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
