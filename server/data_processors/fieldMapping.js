import dotenv from 'dotenv';
dotenv.config();

// Define the field mapping for the CSV data with dotenv environments
const fieldMapping = {
    crimeTypeFilter: process.env.CRM_CD_DESC_FIELD,
    genderFilter: process.env.VICT_SEX_FIELD,
    areaFilter: process.env.AREA_NAME_FIELD,
    weaponTypeFilter: process.env.WEAPON_DESC_FIELD,
    descentFilter: process.env.VICT_DESCENT_FIELD,
    statusFilter: process.env.STATUS_FIELD,
    ageFilter: process.env.VICT_AGE_FIELD,
    longitude: process.env.LON_FIELD,
    latitude: process.env.LAT_FIELD,
    date: process.env.DATETIME_OCC_FIELD
};

export default fieldMapping;