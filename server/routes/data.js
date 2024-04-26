import express from "express";
import { data, yearlyStats } from "../server.js";

import { createYearlyDictionary } from "../data_processors/yearlyDictionaryGenerator.js";
import { generateGeneralStatDictionary } from "../data_processors/generalDataDictionaryGenerator.js";
import { createHourlyDictionary } from "../data_processors/hourDictionary.js";
import { createWeeklyDictionary } from "../data_processors/weeklyDictionary.js";
import { createGenderDictionary } from "../data_processors/genderDictionary.js";
import { createDescentDictionary } from "../data_processors/descentDictionary.js";
import { createAgeDictionary } from "../data_processors/ageDictionary.js";
import { createCrimeDistDictionary } from "../data_processors/crimeDistributionDictionary.js";
import { createHeatMapData } from "../data_processors/heatmap.js";
import { isBaseFilter, updateCacheGetFilteredData } from "../helpers/helperFunctions.js";
const router = express.Router();

router.post("/general-stats", async (req, res) => {
  try {
    const filters = req.body;
    if(isBaseFilter(filters)){
      const year = filters.yearFilter
      return res.status(200).json(yearlyStats[year])
    }
    const filteredData = updateCacheGetFilteredData(data, filters)
    // Record the start time
    const startTime = Date.now();
    const reply = generateGeneralStatDictionary(filteredData);
    // Record the start time
    const endTime = Date.now();
    console.log("General Stat query processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/area-chart/month", async (req, res) => {
  try {
    const filters = req.body;
    const filteredData = updateCacheGetFilteredData(data, filters)
    const startTime = Date.now();
    const reply = createYearlyDictionary(filteredData);
    // Record the start time
    const endTime = Date.now();
    console.log("Monthly Trend query processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/area-chart/hour", async (req, res) => {
  try {
    const filters = req.body;
    const filteredData = updateCacheGetFilteredData(data, filters)
    const startTime = Date.now();
    const reply = createHourlyDictionary(filteredData);
    // Record the start time
    const endTime = Date.now();
    console.log("Hourly Trend query processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/bar-chart/week", async (req, res) => {
  try {
    const filters = req.body;
    const filteredData = updateCacheGetFilteredData(data, filters)
    const startTime = Date.now();
    const reply = createWeeklyDictionary(filteredData);
    // Record the start time
    const endTime = Date.now();
    console.log("Weekly Trend query processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/pie-chart/gender", async (req, res) => {
  try {
    const filters = req.body;
    const filteredData = updateCacheGetFilteredData(data, filters)
    const startTime = Date.now();
    const reply = createGenderDictionary(filteredData);
    // Record the start time
    const endTime = Date.now();
    console.log("Gender distribution query processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/polar-chart/descent", async (req, res) => {
  try {
    const filters = req.body;
    const filteredData = updateCacheGetFilteredData(data, filters)
    const startTime = Date.now();
    const reply = createDescentDictionary(filteredData);
    // Record the start time
    const endTime = Date.now();
    console.log("Ethnicity distribution query processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/bar-chart/age", async (req, res) => {
  try {
    const filters = req.body;
    const filteredData = updateCacheGetFilteredData(data, filters)
    const startTime = Date.now();
    const reply = createAgeDictionary(filteredData);
    // Record the start time
    const endTime = Date.now();
    console.log("Age distribution query processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/bar-chart/crime", async (req, res) => {
  try {
    const filters = req.body;
    const filteredData = updateCacheGetFilteredData(data, filters)
    const startTime = Date.now();
    const reply = createCrimeDistDictionary(filteredData);
    // Record the start time
    const endTime = Date.now();
    console.log("Crime distribution query processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/heatmap", async (req, res) => {
  try {
    const filters = req.body;
    const filteredData = updateCacheGetFilteredData(data, filters)
    const startTime = Date.now();
    const reply = createHeatMapData(filteredData);
    // Record the start time
    const endTime = Date.now();
    console.log("Heatmap query processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
