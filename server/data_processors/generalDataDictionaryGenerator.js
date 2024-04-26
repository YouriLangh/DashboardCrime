import dotenv from "dotenv";
dotenv.config();

export function generateGeneralStatDictionary(filteredData) {
    // Initialize statistics dictionary
    let statDictionary = {
        incidents: 0,
        hotspot: "None",
        average_age: 0,
        crime: "None",
        active_arrests: 0, // Renamed to better reflect the calculation
        weapon_presence: 0,
        weapon: "None"
    };

    // Dictionaries to count occurrences of crimes, areas, and weapons
    const crimeCount = new Map();
    const areaCount = new Map();
    const weaponCount = new Map();

    // Variables for incremental average age
    let ageSum = 0;
    let ageCount = 0;

    // Tracking variables for the most common occurrences
    let maxCrimeCount = 0;
    let maxAreaCount = 0;
    let maxWeaponCount = 0;
    let mostCommonCrime = '';
    let mostCommonArea = '';
    let mostCommonWeapon = '';

    // Pre-calculate required field names
    const victAgeField = process.env.VICT_AGE_FIELD;
    const statusField = process.env.STATUS_FIELD;
    const weaponDescField = process.env.WEAPON_DESC_FIELD;
    const crmCdDescField = process.env.CRM_CD_DESC_FIELD;
    const areaNameField = process.env.AREA_NAME_FIELD;

    // Process each row of data
    filteredData.forEach((row) => {
        // Increment the incident count
        statDictionary.incidents += 1;

        // Calculate the average age incrementally
        const age = parseInt(row[victAgeField], 10);
        ageSum += age;
        ageCount += 1;
        statDictionary.average_age = ageSum / ageCount;

        // Check for active arrests
        if (row[statusField] === "Active Arrest") {
            statDictionary.active_arrests += 1;
        }

        // Check for weapon presence
        if (row[weaponDescField] !== "None") {
            statDictionary.weapon_presence += 1;
        }

        // Process crime type
        let crimeType = row[crmCdDescField];
        if (crimeType.includes('::')) {
            crimeType = crimeType.split('::')[1];
        }
        crimeCount.set(crimeType, (crimeCount.get(crimeType) || 0) + 1);
        // Update the most common crime type
        if (crimeCount.get(crimeType) > maxCrimeCount) {
            maxCrimeCount = crimeCount.get(crimeType);
            mostCommonCrime = crimeType;
        }

        // Process area name
        const areaName = row[areaNameField];
        areaCount.set(areaName, (areaCount.get(areaName) || 0) + 1);
        // Update the most common area
        if (areaCount.get(areaName) > maxAreaCount) {
            maxAreaCount = areaCount.get(areaName);
            mostCommonArea = areaName;
        }

        // Process weapon description
        let weapon = row[weaponDescField];
        if (weapon.includes('::')) {
            weapon = weapon.split('::')[1];
        }
        weaponCount.set(weapon, (weaponCount.get(weapon) || 0) + 1);
        // Update the most common weapon
        if (weaponCount.get(weapon) > maxWeaponCount) {
            maxWeaponCount = weaponCount.get(weapon);
            mostCommonWeapon = weapon;
        }
    });

    // Calculate the percentage of active arrests and weapon presence
    statDictionary.active_arrests = parseFloat((statDictionary.active_arrests / statDictionary.incidents) * 100).toFixed(1);
    statDictionary.weapon_presence = parseFloat((statDictionary.weapon_presence / statDictionary.incidents) * 100).toFixed(1);

    // Calculate the average age
    statDictionary.average_age = parseFloat(statDictionary.average_age.toFixed(1));

    // Set the most common values
    statDictionary.crime = mostCommonCrime;
    statDictionary.hotspot = mostCommonArea;
    statDictionary.weapon = mostCommonWeapon;

    return statDictionary;
}
