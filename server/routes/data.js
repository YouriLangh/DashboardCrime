import express from "express";
import { data, yearIndex } from "../server.js";
import { filterData } from "../data_processors/filter.js";
import { createYearlyDictionary } from "../data_processors/yearlyDictionaryGenerator.js";
import { generateGeneralStatDictionary } from "../data_processors/generalDataDictionaryGenerator.js";

const router = express.Router();

router.post("/general-stats", async (req, res) => {
  try {
    const filters = req.body;
    const filteredData = filterData(data, filters);
    // Record the start time
    const startTime = Date.now();
    const reply = generateGeneralStatDictionary(filteredData);
    // Record the start time
    const endTime = Date.now();
    console.log("Data processing finished in: ", endTime - startTime);

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/area-chart", async (req, res) => {
  try {
    const filters = req.body;
    const filteredData = filterData(data, filters);
    const startTime = Date.now();
    const reply = createYearlyDictionary(filteredData);
    // Record the start time
    const endTime = Date.now();
    console.log("Data processing finished in: ", endTime - startTime);

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
