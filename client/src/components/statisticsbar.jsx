import { Box, Button, Typography, useTheme } from "@mui/material";
import { useState } from 'react'
import axios from 'axios'


function StatisticsBar() {
  const { palette } = useTheme()
  const [reply, setReply] = useState("")

  const fetchData = async () => {
    await axios.get("http://localhost:5000/stats/occurences").then((res) => {
     console.log("data: ", res.data)
     setReply(res.data)
    }
    )
   }

  return (
   <Box display="flex" justifyContent="space-between" alignItems="center" color={palette.grey[300]}>
    Reply: {reply} 
    <Typography variant= "h4" fontSize='16px'>Crime Dashboard</Typography>
    <Button onClick={fetchData}>Hello</Button>
   </Box>
  )
}

export default StatisticsBar