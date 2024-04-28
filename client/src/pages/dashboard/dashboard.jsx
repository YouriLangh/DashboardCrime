/* eslint-disable react/prop-types */
import { Box, useMediaQuery } from "@mui/material"
import AgeDistribution from '@/components/charts/AgeDistribution';
import CrimeDistribution from '@/components/charts/CrimeDistribution';
import DescentDistribution from '@/components/charts/DescentDistribution';
import Heatmap from '@/components/charts/Heatmap';
import Map from "@/components/charts/Map";
import HourlyTrend from '@/components/charts/HourlyTrend';
import MonthlyTrend from '@/components/charts/MonthlyTrend';
import WeeklyTrend from '@/components/charts/WeeklyTrend';
import GenderDistribution from '@/components/charts/GenderDistribution';

function Dashboard({ allFilters, activeFilters }) {

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
        gridTemplateColumns: "36% 24.2% 19% 19%", /* Column widths, maybe change to 24.3% */
        gridTemplateRows: "repeat(8, minmax(80px, 1fr))"

    } : {
        gridTemplateAreas: gridTemplateSmallScreens,
        gridAutoColumns: "1fr", /* Column widths */
        gridAutoRows: "100px"
    }
}>
      <Box gridArea="map" className="map"><Map allFilters={allFilters} filters={activeFilters}/></Box>
      <Box gridArea="trend" className="trend"><MonthlyTrend allFilters={allFilters} filters={activeFilters} /></Box>
      <Box gridArea="horbar" className="horbar"><CrimeDistribution filters={activeFilters} /></Box>
      <Box gridArea="hour" className="hour"><HourlyTrend filters={activeFilters} /></Box>
      <Box gridArea="week" className="week"><WeeklyTrend filters={activeFilters} /></Box>
      <Box gridArea="pie" className="pie"><GenderDistribution filters={activeFilters} /></Box>
      <Box gridArea="polar" className="polar"><DescentDistribution filters={activeFilters} /></Box>
      <Box gridArea="age" className="age"><AgeDistribution filters={activeFilters} /></Box>
      <Box gridArea="ethn" className="ethn"><Heatmap filters={activeFilters} /></Box>
    </Box>
  )
}

export default Dashboard