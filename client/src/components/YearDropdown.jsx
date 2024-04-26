/* eslint-disable react/prop-types */

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

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

  function handleFilterChange(filterType, value) {
    onFilterChange(filterType, value);
    setSelectedYear(value);
  }

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
