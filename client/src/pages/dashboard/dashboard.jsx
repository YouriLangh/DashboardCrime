import '@/pages/dashboard/dashboard.css'
import { Box, useMediaQuery } from "@mui/material"

function Dashboard() {

    const gridTemplateLargeScreens = ` 
        "map horbar pie polar"
        "map horbar pie polar"
        "map horbar age age"
        "map horbar age age"
        "map hour age age"
        "trend hour ethn ethn"
        "trend week ethn ethn"
        "trend week ethn ethn"
    `;
    const gridTemplateSmallScreens = ` 
    "map"
    "map"
    "map"
    "map"
    "map"
    "trend"
    "trend"
    "trend"
    "horbar"
    "horbar"
    "horbar"
    "horbar"
    "pie"
    "pie"
    "polar"
    "polar"
    "age"
    "age"
    "age"
    "hour"
    "hour"
    "week"
    "week"
    "ethn"
    "ethn"
    "ethn"
    `;
    
    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)")
  return (
    <Box className="dashboard-layout" sx={
        isAboveMediumScreens ? {
        gridTemplateAreas: gridTemplateLargeScreens,
        gridTemplateColumns: "768px 510px 385px 385px", /* Column widths */
        gridTemplateRows: "repeat(8, minmax(100px, 1fr))"

    } : {
        gridTemplateAreas: gridTemplateSmallScreens,
        gridAutoColumns: "1fr", /* Column widths */
        gridAutoRows: "100px"
    }
}>
      <Box gridArea="map" className="map"></Box>
      <Box gridArea="trend" className="trend"></Box>
      <Box gridArea="horbar" className="horbar"></Box>
      <Box gridArea="hour" className="hour"></Box>
      <Box gridArea="week" className="week"></Box>
      <Box gridArea="pie" className="pie"></Box>
      <Box gridArea="polar" className="polar"></Box>
      <Box gridArea="age" className="age"></Box>
      <Box gridArea="ethn" className="ethn"></Box>
    </Box>
  )
}

export default Dashboard