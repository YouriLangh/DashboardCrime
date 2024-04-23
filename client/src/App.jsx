import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useMemo, useEffect, useState } from "react"
import { themeSettings } from "./theme"
import { Box, CssBaseline } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import StatisticsBar from "@/components/statisticsbar"

import Dashboard from "@/pages/dashboard/dashboard"
import { fetchFilterValues } from './services/filterService'
import FiltersBar from '@/components/FiltersBar'
function App() {

  const theme = useMemo(() => createTheme(themeSettings), [])
  const [allFilters, setAllFilters] = useState([])
  const [activeFilters, setActiveFilters] = useState({
    yearFilter: 2023,
    areaFilter: [{ value: 'All'}],
    crimeTypeFilter: [{ value: 'All'}],
    weaponTypeFilter: [{ value: 'All'}],
    genderFilter: [{ value: 'All'}],
    descentFilter: [{ value: 'All'}],
})

  useEffect(()=> {
    console.log("changed", activeFilters)
  },[activeFilters])

  useEffect(() => {
      // Fetch filter values when the component mounts
      fetchFilterValues().then((res) => {
        setAllFilters(res)
      });
  }, []);

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
        <Box width="100%" height="100%" padding="1rem">
          <StatisticsBar />
          <FiltersBar filters={allFilters} filterCallback={updateActiveFilters} selectedFilters={activeFilters}/>
          <Routes>
            <Route path="/" element={<Dashboard />}/>
          </Routes>
        </Box>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
