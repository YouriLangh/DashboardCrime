import express from "express";
import { data, yearIndex } from "../server.js";
import { filterData } from "../data_processors/filter.js";
import { createYearlyDictionary } from "../data_processors/yearlyDictionaryGenerator.js";
import { generateGeneralStatDictionary } from "../data_processors/generalDataDictionaryGenerator.js";
import { createHourlyDictionary } from "../data_processors/hourDictionary.js";
import { createWeeklyDictionary } from "../data_processors/weeklyDictionary.js";
import { createGenderDictionary } from "../data_processors/genderDictionary.js";
import { createDescentDictionary } from "../data_processors/descentDictionary.js";
import { createAgeDictionary } from "../data_processors/ageDictionary.js";
import { createCrimeDistDictionary } from "../data_processors/crimeDistributionDictionary.js";
import { createHeatMapData } from "../data_processors/heatmap.js";
import cache from "../cache/cache.js";

const router = express.Router();

function generateCacheKey(filters) {
  return JSON.stringify(filters);
}

router.post("/general-stats", async (req, res) => {
  try {
    const filters = req.body;
    const cacheKey = generateCacheKey(filters);
    if (!cache.has(cacheKey)) {
      const freshlyFilteredData = filterData(data, filters);
      cache.set(cacheKey, freshlyFilteredData);
    }

    // Record the start time
    const startTime = Date.now();
    const reply = generateGeneralStatDictionary(cache.get(cacheKey));
    // Record the start time
    const endTime = Date.now();
    console.log("Data processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/area-chart/month", async (req, res) => {
  try {
    const filters = req.body;
    const cacheKey = generateCacheKey(filters);
    if (!cache.has(cacheKey)) {
      const freshlyFilteredData = filterData(data, filters);
      cache.set(cacheKey, freshlyFilteredData);
    }
    const startTime = Date.now();
    const reply = createYearlyDictionary(cache.get(cacheKey));
    // Record the start time
    const endTime = Date.now();
    console.log("Data processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/area-chart/hour", async (req, res) => {
  try {
    const filters = req.body;
    const cacheKey = generateCacheKey(filters);
    if (!cache.has(cacheKey)) {
      const freshlyFilteredData = filterData(data, filters);
      cache.set(cacheKey, freshlyFilteredData);
    }
    const startTime = Date.now();
    const reply = createHourlyDictionary(cache.get(cacheKey));
    // Record the start time
    const endTime = Date.now();
    console.log("Data processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/bar-chart/week", async (req, res) => {
  try {
    const filters = req.body;
    const cacheKey = generateCacheKey(filters);
    if (!cache.has(cacheKey)) {
      const freshlyFilteredData = filterData(data, filters);
      cache.set(cacheKey, freshlyFilteredData);
    }
    const startTime = Date.now();
    const reply = createWeeklyDictionary(cache.get(cacheKey));
    // Record the start time
    const endTime = Date.now();
    console.log("Data processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/pie-chart/gender", async (req, res) => {
  try {
    const filters = req.body;
    const cacheKey = generateCacheKey(filters);
    if (!cache.has(cacheKey)) {
      const freshlyFilteredData = filterData(data, filters);
      cache.set(cacheKey, freshlyFilteredData);
    }
    const startTime = Date.now();
    const reply = createGenderDictionary(cache.get(cacheKey));
    // Record the start time
    const endTime = Date.now();
    console.log("Data processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/polar-chart/descent", async (req, res) => {
  try {
    const filters = req.body;
    const cacheKey = generateCacheKey(filters);
    if (!cache.has(cacheKey)) {
      const freshlyFilteredData = filterData(data, filters);
      cache.set(cacheKey, freshlyFilteredData);
    }
    const startTime = Date.now();
    const reply = createDescentDictionary(cache.get(cacheKey));
    // Record the start time
    const endTime = Date.now();
    console.log("Data processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/bar-chart/age", async (req, res) => {
  try {
    const filters = req.body;
    const cacheKey = generateCacheKey(filters);
    if (!cache.has(cacheKey)) {
      const freshlyFilteredData = filterData(data, filters);
      cache.set(cacheKey, freshlyFilteredData);
    }
    const startTime = Date.now();
    const reply = createAgeDictionary(cache.get(cacheKey));
    // Record the start time
    const endTime = Date.now();
    console.log("Data processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/bar-chart/crime", async (req, res) => {
  try {
    const filters = req.body;
    const cacheKey = generateCacheKey(filters);
    if (!cache.has(cacheKey)) {
      const freshlyFilteredData = filterData(data, filters);
      cache.set(cacheKey, freshlyFilteredData);
    }
    const startTime = Date.now();
    const reply = createCrimeDistDictionary(cache.get(cacheKey));
    // Record the start time
    const endTime = Date.now();
    console.log("Data processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/heatmap", async (req, res) => {
  try {
    const filters = req.body;
    const cacheKey = generateCacheKey(filters);
    if (!cache.has(cacheKey)) {
      const freshlyFilteredData = filterData(data, filters);
      cache.set(cacheKey, freshlyFilteredData);
    }
    const startTime = Date.now();
    const reply = createHeatMapData(cache.get(cacheKey));
    // Record the start time
    const endTime = Date.now();
    console.log("Data processing finished in: ", endTime - startTime, "ms");

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
