import { Box, useTheme } from "@mui/material"; //Typography
// import { useState } from 'react'
// import axios from 'axios'
import GeneralStatBox from "@/components/generalstatsbox"

function StatisticsBar() {
  const { palette } = useTheme()

  // const fetchData = async () => {
  //   await axios.get("http://localhost:5000/stats/occurences").then((res) => {
  //    console.log("data: ", res.data)
  //    setReply(res.data)
  //   }
  //   )
  //  }

  return (
   <Box display="flex" justifyContent="space-between" alignItems="center" color={palette.grey[300]} width="100%" height="80px" border="1px solid white">
    {/* <Typography variant= "h4" fontSize='16px'>Crime Dashboard</Typography> */}
    <GeneralStatBox title={"Title"} value={"123"}/>
    <GeneralStatBox title={"123"} value={"123"}/>
    <GeneralStatBox title={"123"} value={"123"}/>
    <GeneralStatBox title={"123"} value={"123"}/>
   </Box>
  )
}

export default StatisticsBar