import dotenv from 'dotenv';
dotenv.config();

const fieldMapping = {
    crimeTypeFilter: process.env.CRM_CD_DESC_FIELD,
    genderFilter: process.env.VICT_SEX_FIELD,
    areaFilter: process.env.AREA_NAME_FIELD,
    weaponTypeFilter: process.env.WEAPON_DESC_FIELD,
    descentFilter: process.env.VICT_DESCENT_FIELD,
    statusFilter: process.env.STATUS_FIELD,
    //Add LON/LAT for map-bound filtering & add age bound filtering for age graph & add weekday filtering
};

export default fieldMapping;