import dotenv from "dotenv";
dotenv.config();

export function generateGeneralStatDictionary(filteredData) {
    // Initialize statistics dictionary
    let statDictionary = {
        incidents: 0,
        hotspot: "None",
        average_age: 0,
        crime: "None",
        cases_closed: 0,
        weapon_presence: 0,
        weapon: "None"
    };

    // Dictionaries to count occurrences of crimes, areas, and weapons
    let crimeCount = new Map();
    let areaCount = new Map();
    let weaponCount = new Map();

    // Variables for incremental average age
    let ageSum = 0;
    let ageCount = 0;

    // Process each row of data
    filteredData.forEach((row) => {
        // Increment the incident count
        statDictionary.incidents += 1;

        // Calculate the average age incrementally
        const age = parseInt(row[process.env.VICT_AGE_FIELD], 10);
        ageSum += age;
        ageCount += 1;
        statDictionary.average_age = ageSum / ageCount;

        // Check for cases closed
        if (row[process.env.STATUS_FIELD] === "Case Closed") {
            statDictionary.cases_closed += 1;
        }

        // Check for weapon presence
        if (row[process.env.WEAPON_DESC_FIELD] !== "None") {
            statDictionary.weapon_presence += 1;
        }

        // Count crimes
        let crimeType = row[process.env.CRM_CD_DESC_FIELD];
        if (crimeType.includes('::')){
            crimeType = crimeType.split('::')[1]
        }
        crimeCount.set(crimeType, (crimeCount.get(crimeType) || 0) + 1);

        // Count areas
        const areaName = row[process.env.AREA_NAME_FIELD];
        areaCount.set(areaName, (areaCount.get(areaName) || 0) + 1);

        // Count weapons
        let weapon = row[process.env.WEAPON_DESC_FIELD];
        if (weapon.includes('::')){
            weapon = weapon.split('::')[1]
        }
        weaponCount.set(weapon, (weaponCount.get(weapon) || 0) + 1);
    });

    // Calculate cases closed proportion
    statDictionary.cases_closed = parseFloat(statDictionary.cases_closed / statDictionary.incidents).toFixed(1);
    statDictionary.average_age = parseFloat(statDictionary.average_age.toFixed(1))
    statDictionary.weapon_presence = parseFloat(statDictionary.weapon_presence / statDictionary.incidents).toFixed(1);
    // Find the most common crime type, weapon, and area
    statDictionary.crime = [...crimeCount.entries()].reduce((max, entry) => entry[1] > max[1] ? entry : max)[0];
    statDictionary.hotspot = [...areaCount.entries()].reduce((max, entry) => entry[1] > max[1] ? entry : max)[0];
    statDictionary.weapon = [...weaponCount.entries()].reduce((max, entry) => entry[1] > max[1] ? entry : max)[0];

    return statDictionary;
}
