import express from 'express';
import { data, yearIndex } from '../server.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Define an array of objects representing sets and field names
        const filterSets = [
            { name: 'areaSet', set: new Set(), fieldName: process.env.AREA_NAME_FIELD },
            { name: 'crimeTypeSet', set: new Set(), fieldName: process.env.CRM_CD_DESC_FIELD },
            { name: 'weaponTypeSet', set: new Set(), fieldName: process.env.WEAPON_DESC_FIELD },
            { name: 'genderSet', set: new Set(), fieldName: process.env.VICT_SEX_FIELD },
            { name: 'descentSet', set: new Set(), fieldName: process.env.VICT_DESCENT_FIELD }
        ];

        // Loop over each row in data
        data.forEach((row) => {
            // Loop over each set in the array
            filterSets.forEach(({ set, fieldName }) => {
                // Get the value of the current field from the row
                const fieldValue = row[fieldName];
                
                // Add the value to the set
                set.add(fieldValue);
            });
        });

        // Create the reply object using the names of the sets
        const reply = filterSets.reduce((result, { name, set }) => {
            // Add each set to the result object with its corresponding name
            result[name] = Array.from(set);
            return result;
        }, {});

        // Log the reply for verification
        console.log(reply);

        // Send the reply as a JSON response
        res.status(200).json(reply);
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error:', error);
        res.status(404).json({ message: error.message });
    }
});

export default router;
