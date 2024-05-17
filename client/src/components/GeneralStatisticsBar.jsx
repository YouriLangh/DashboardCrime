/* eslint-disable react/prop-types */
import { Box } from "@mui/material"; 
import GeneralStatBox from "@/components/GeneralStatisticsBox"
import { useEffect, useState } from "react";
import { fetchData } from "@/services/dataService.js"

// GeneralStatisticsBar component that displays general statistics about the data
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
    {/* When the data is not yet fetched we use placeholders */}
    <GeneralStatBox measure={''} value={isDataFetched ? formatIncidents(statistics.incidents) : "Fetching data..."} text={"# of Incidents"} isLightColor={true}/>
    <GeneralStatBox measure={''} value={isDataFetched ? statistics.hotspot : "Fetching data..."} text={"#1 Crime Hotspot"} isLightColor={false}/>
    <GeneralStatBox measure={''} value={isDataFetched ? statistics.average_age : "Fetching data..."} text={"Average Victim Age"} isLightColor={true}/>
    <GeneralStatBox measure={''} value={isDataFetched ? statistics.crime : "Fetching data..."} text={"Most Common Crime"} isLightColor={false}/>
    <GeneralStatBox value={isDataFetched ? statistics.active_arrests : "Fetching data..."} text={"Perpetrators Arrested"} isLightColor={true} measure={"%"}/>
    <GeneralStatBox value={isDataFetched ? statistics.weapon_presence : "Fetching data..."} text={"Presence of weapon"} isLightColor={false} measure={"%"}/>
    <GeneralStatBox measure={''} value={isDataFetched ? statistics.weapon : "Fetching data..."} text={"Most used weapon"} isLightColor={true}/>
   </Box>
  )
}

export default GeneralStatisticsBar