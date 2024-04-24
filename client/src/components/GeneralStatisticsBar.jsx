/* eslint-disable react/prop-types */
import { Box, useTheme } from "@mui/material"; //Typography
// import { useState } from 'react'

import GeneralStatBox from "@/components/GeneralStatisticsBox"
import { useEffect } from "react";
import { fetchGeneralStatData } from "@/services/dataService.js"

function GeneralStatisticsBar({ activeFilters }) {
  const { palette } = useTheme()

  useEffect(() => {
    console.log("active filters: ",activeFilters)
    fetchGeneralStatData(activeFilters).then((res) => {
      console.log(res)
    })
  },[activeFilters])

  return (
   <Box display="flex" justifyContent="space-between" alignItems="center" color={palette.grey[300]} width="100%" height="80px" border="1px solid white">
    {/* <Typography variant= "h4" fontSize='16px'>Crime Dashboard</Typography> */}
    <GeneralStatBox value={"Title"} text={"123"} isLightColor={true}/>
    <GeneralStatBox value={"Title"} text={"123"} isLightColor={false}/>
    <GeneralStatBox value={"Title"} text={"123"} isLightColor={true}/>
    <GeneralStatBox value={"Title"} text={"123"} isLightColor={false}/>
    <GeneralStatBox value={"Title"} text={"123"} isLightColor={true}/>
    <GeneralStatBox value={"Title"} text={"123"} isLightColor={false}/>
    <GeneralStatBox value={"Title"} text={"123"} isLightColor={true}/>
   </Box>
  )
}

export default GeneralStatisticsBar