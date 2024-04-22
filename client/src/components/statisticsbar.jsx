import { Box, useTheme } from "@mui/material"; //Typography
// import { useState } from 'react'
// import axios from 'axios'
import GeneralStatBox from "@/components/generalstatsbox"


function StatisticsBar() {
  const { palette } = useTheme()

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

export default StatisticsBar