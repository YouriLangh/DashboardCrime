import dotenv from 'dotenv';
dotenv.config();

const fieldMapping = {
    crimeType: process.env.CRM_CD_DESC_FIELD,
    gender: process.env.VICT_SEX_FIELD,
    areaName: process.env.AREA_NAME_FIELD,
    weaponDesc: process.env.WEAPON_DESC_FIELD,
    descent: process.env.VICT_DESCENT_FIELD,
    status: process.env.STATUS_FIELD,
    //Add LON/LAT for map-bound filtering & add age bound filtering for age graph & add weekday filtering
};

export default fieldMapping;