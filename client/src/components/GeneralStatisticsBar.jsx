/* eslint-disable react/prop-types */
import { Box } from "@mui/material"; 
// import { useState } from 'react'

import GeneralStatBox from "@/components/GeneralStatisticsBox"
import { useEffect, useState } from "react";
import { fetchData } from "@/services/dataService.js"

function GeneralStatisticsBar({ activeFilters }) {
  const [statistics, setStatistics] = useState({})

  useEffect(() => {
    fetchData(activeFilters, '/api/data/general-stats').then((res) => {
      setStatistics(res.data)
    })
  },[activeFilters])

  const isDataFetched = Object.keys(statistics).length > 0;

  function formatIncidents(number){
    const numberStr = number.toString();

    // Use a regular expression to add periods as thousands separators
    const formattedNumber = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return formattedNumber;
  }
  return (
   <Box className='general-stats-bar'>
    <GeneralStatBox value={isDataFetched ? formatIncidents(statistics.incidents) : "Nothing Fetched"} text={"Incidents"} isLightColor={true}/>
    <GeneralStatBox value={isDataFetched ? statistics.hotspot : "Nothing Fetched"} text={"#1 Crime Hotspot"} isLightColor={false}/>
    <GeneralStatBox value={isDataFetched ? statistics.average_age : "Nothing Fetched"} text={"Average Victim Age"} isLightColor={true}/>
    <GeneralStatBox value={isDataFetched ? statistics.crime : "Nothing Fetched"} text={"Most Common Crime"} isLightColor={false}/>
    <GeneralStatBox value={isDataFetched ? statistics.active_arrests : "Nothing Fetched"} text={"Perpetrators Arrested"} isLightColor={true} measure={"%"}/>
    <GeneralStatBox value={isDataFetched ? statistics.weapon_presence : "Nothing Fetched"} text={"Presence of weapon"} isLightColor={false} measure={"%"}/>
    <GeneralStatBox value={isDataFetched ? statistics.weapon : "Nothing Fetched"} text={"Most used weapon"} isLightColor={true}/>
   </Box>
  )
}

export default GeneralStatisticsBar