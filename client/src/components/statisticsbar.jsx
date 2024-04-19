import { Box, Typography, useTheme } from "@mui/material";

function StatisticsBar() {
  const { palette } = useTheme()
  return (
   <Box display="flex" justifyContent="space-between" alignItems="center" color={palette.grey[300]}>
    Hello
    <Typography variant= "h4" fontSize='16px'>Crime Dashboard</Typography>
   </Box>
  )
}

export default StatisticsBar