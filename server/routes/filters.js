import express from 'express';
import { filterDictionary } from "../server.js";
import { filterDictionaryGenerator } from '../data_processors/filterDictionaryGenerator.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const reply = filterDictionary
        
        // Send the reply as a JSON response
        res.status(200).json(reply);
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error:', error);
        res.status(404).json({ message: error.message });
    }
});

export default router;
