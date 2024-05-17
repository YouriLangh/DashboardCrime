/* eslint-disable react/prop-types */

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

// YearDropdown component that displays a dropdown menu for filtering data based on the year
// The reason we make a separate component for the year is that it has a different structure than the other filters, namely we can just store the first and last year and create a loop
// to iterate over all the years in between
function YearDropdown({
  text,
  smallestYear,
  largestYear,
  filterType,
  onFilterChange,
}) {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear() - 1
  );
  const [allYears, setAllYears] = useState();

  useEffect(() => {
    if (smallestYear && largestYear) {
      const years = generateYearArray(smallestYear, largestYear);

      setAllYears(years);
    }
  }, [largestYear, smallestYear]);

  // Function to handle the change of the filter, calls the parent component's onFilterChange function with the filter type and the selected value
  function handleFilterChange(filterType, value) {
      onFilterChange(filterType, value);
    setSelectedYear(value);
  }

  // Function to generate an array of years between the smallest and largest year
  function generateYearArray(smallestYear, largestYear) {
    const arr = [];
    for (let i = smallestYear; i <= largestYear; i++) {
      arr.push(i);
    }
    return arr;
  }

  return (
    <Box className='dropdown-container'>
      <Typography variant="h5">{text}</Typography>
      <Select
        className="dropdown-filters"
        sx={{color: "black", fontWeight:'600'}}
        value={selectedYear} // Controlled value
        onChange={(e) => handleFilterChange(filterType, e.target.value)}
      >
        {allYears ? (
          allYears.map((item, index) => (
            <MenuItem sx={{color: "black", fontSize:'15px' ,fontWeight:'600'}} key={index} className="dropdown-option" value={item}>
              {item}
            </MenuItem>
          ))
        ) : (
          <MenuItem sx={{color: "black", fontSize:'15px' ,fontWeight:'600'}} className="dropdown-option" value={selectedYear}>
            {selectedYear}
          </MenuItem>
        )}
      </Select>
    </Box>
  );
}

export default YearDropdown;
