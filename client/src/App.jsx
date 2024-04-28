import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useMemo, useEffect, useState } from "react"
import { themeSettings } from "./theme"
import { Box, CssBaseline } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import GeneralStatisticsBar from "@/components/GeneralStatisticsBar"

import Dashboard from "@/pages/dashboard/Dashboard"
import { fetchFilterValues } from './services/filterService'
import FiltersBar from '@/components/FiltersBar'
function App() {

  const theme = useMemo(() => createTheme(themeSettings), [])
  const [allFilters, setAllFilters] = useState([])
  const baseFilter = { value: 'All'}

  const [activeFilters, setActiveFilters] = useState({
    yearFilter: 2023,
    areaFilter: [baseFilter],
    crimeTypeFilter: [baseFilter],
    weaponTypeFilter: [baseFilter],
    genderFilter: [baseFilter],
    descentFilter: [baseFilter],
    ageFilter:{ bottomAge: 0, topAge: Infinity },
    weekdayFilter:[baseFilter],
    locationFilter:[baseFilter],
    hourOfDayFilter:[baseFilter],
})

  useEffect(() => {
      // Fetch filter values when the component mounts
      fetchFilterValues().then((res) => {
        setAllFilters(res)
      });

  }, []);

  useEffect(() => {
    console.log(activeFilters)
  },[activeFilters])

  function updateActiveFilters(filterType, value){
    setActiveFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      [filterType]: value,
    }));
  }

  return (
    <div className='app'>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="app-container">
          <GeneralStatisticsBar activeFilters={activeFilters}/>
          <FiltersBar filters={allFilters} filterCallback={updateActiveFilters} />
          <Routes>
            <Route path="/" element={<Dashboard filterCallback={updateActiveFilters} allFilters={allFilters} activeFilters={activeFilters}/>}/>
          </Routes>
        </Box>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
