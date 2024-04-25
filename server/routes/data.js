import express from "express";
import { data, yearIndex, yearlyStats } from "../server.js";
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

// TODO: CLEAN CODE AND MOVE GENERATE CACHEKEY TO SOMEWHERE ELSE

function isBaseFilter(filters) {
  // Iterate through each [key, value] pair in filters (excluding 'yearFilter')
  return Object.entries(filters)
      .filter(([key]) => key !== 'yearFilter') // Exclude the 'yearFilter' key
      .every(([key, value]) => {
          // Check if the value is an array of length one and contains an object with value 'All'
          return Array.isArray(value) && value.length === 1 && value[0].value === 'All';
      });
}


router.post("/general-stats", async (req, res) => {
  try {
    const filters = req.body;
    if(isBaseFilter(filters)){
      console.log("base filter check")
      const year = filters.yearFilter
      return res.status(200).json(yearlyStats[year])
    }
    const cacheKey = cache.generateCacheKey(filters);
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
    const cacheKey = cache.generateCacheKey(filters);
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
    const cacheKey = cache.generateCacheKey(filters);
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
    const cacheKey = cache.generateCacheKey(filters);
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
    const cacheKey = cache.generateCacheKey(filters);
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
    const cacheKey = cache.generateCacheKey(filters);
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
    const cacheKey = cache.generateCacheKey(filters);
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
    const cacheKey = cache.generateCacheKey(filters);
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
    const cacheKey = cache.generateCacheKey(filters);
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
