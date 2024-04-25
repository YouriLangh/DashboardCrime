/* eslint-disable react/prop-types */
import { Box, useTheme } from "@mui/material"; //Typography
// import { useState } from 'react'

import GeneralStatBox from "@/components/GeneralStatisticsBox"
import { useEffect, useState } from "react";
import { fetchData } from "@/services/dataService.js"

function GeneralStatisticsBar({ activeFilters }) {
  const { palette } = useTheme()
  const [statistics, setStatistics] = useState({})

  useEffect(() => {
    fetchData(activeFilters, '/api/data/general-stats').then((res) => {
      setStatistics(res.data)
    })
  },[activeFilters])

  const isDataFetched = Object.keys(statistics).length > 0;

  return (
   <Box display="flex" justifyContent="space-between" alignItems="center" color={palette.grey[300]} width="100%" height="80px" border="1px solid white">
    {/* <Typography variant= "h4" fontSize='16px'>Crime Dashboard</Typography> */}
    <GeneralStatBox value={isDataFetched ? statistics.incidents : "Nothing Fetched"} text={"Incidents"} isLightColor={true}/>
    <GeneralStatBox value={isDataFetched ? statistics.hotspot : "Nothing Fetched"} text={"#1 Crime Hotspot"} isLightColor={false}/>
    <GeneralStatBox value={isDataFetched ? statistics.average_age : "Nothing Fetched"} text={"Average Victim Age"} isLightColor={true}/>
    <GeneralStatBox value={isDataFetched ? statistics.crime : "Nothing Fetched"} text={"Most Common Crime"} isLightColor={false}/>
    <GeneralStatBox value={isDataFetched ? statistics.cases_closed : "Nothing Fetched"} text={"Cases Closed"} isLightColor={true}/>
    <GeneralStatBox value={isDataFetched ? statistics.weapon_presence : "Nothing Fetched"} text={"Presence of weapon"} isLightColor={false}/>
    <GeneralStatBox value={isDataFetched ? statistics.weapon : "Nothing Fetched"} text={"Most used weapon"} isLightColor={true}/>
   </Box>
  )
}

export default GeneralStatisticsBar