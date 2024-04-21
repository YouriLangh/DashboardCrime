import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useMemo, useEffect } from "react"
import { themeSettings } from "./theme"
import { Box, CssBaseline } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import StatisticsBar from "@/components/statisticsbar"
import Filters from "@/components/filters"
import Dashboard from "@/pages/dashboard/dashboard"
import { fetchFilterValues } from './services/filterService'
function App() {

  const theme = useMemo(() => createTheme(themeSettings), [])



  useEffect(() => {
      // Fetch filter values when the component mounts
      fetchFilterValues().then((res) => {
        console.log("data: ", res)
      });
  }, []);

  return (
    <div className='app'>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box width="100%" height="100%" padding="1rem">
          <StatisticsBar />
          <Filters />
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
