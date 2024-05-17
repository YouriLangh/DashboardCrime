/* eslint-disable react/prop-types */

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

// YearDropdownMonth component that displays a dropdown menu for filtering data based on the year, this menu is used in the MonthlyTrend component as the 2nd dropdown option
function YearDropdownMonth({
  text,
  smallestYear,
  largestYear,
  onFilterChange,
  color,
}) {

  const [selectedYear, setSelectedYear] = useState(2022);
  const [allYears, setAllYears] = useState();

  useEffect(() => {
    // Generate an array of years between the smallest and largest year
    if (smallestYear && largestYear) {
      const years = generateYearArray(smallestYear, largestYear);
      setAllYears(years);
    }
  }, [largestYear, smallestYear]);

  // Function to handle the change of the filter, calls the parent component's onFilterChange function with the selected value
  function handleFilterChange(value) {
    setSelectedYear(value);
    onFilterChange(value);
  }


  function generateYearArray(smallestYear, largestYear) {
    const arr = [];
    for (let i = smallestYear; i <= largestYear; i++) {
      arr.push(i);
    }
    return arr;
  }

  // Using MUI to create a dropdown menu
  return (
    <Box className='dropdown-container-month'>
      <Typography variant="h5">{text}</Typography>
      <Select
      sx={{
        color: color, fontWeight:'600',
      }}
      inputProps={{

        MenuProps: {
            MenuListProps: {
                sx: {
                    backgroundColor: 'rgba(50, 51, 60, 1)',
                }
            }
        },
    }}
        className="dropdown-filters-month"
        value={selectedYear} // Controlled value
        onChange={(e) => handleFilterChange(e.target.value)}
      >
        {allYears ? (
          allYears.map((item, index) => (
            <MenuItem sx={{color: color, backgroundColor:"rgba(50, 51, 60, 0.5)", fontSize:'15px' ,fontWeight:'600',
            '&:hover': {
                backgroundColor: '#5C5F72',
             },
            
            }} key={index} className="dropdown-option-month" value={item}>
              {item}
            </MenuItem>
          ))
        ) : (
          <MenuItem sx={{color: color, backgroundColor:"rgba(50, 51, 60, 0.5)", fontSize:'15px' ,fontWeight:'600',
          '&:hover': {
            backgroundColor: '#5C5F72',
         },
          
          }} className="dropdown-option-month" value={selectedYear}>
            {selectedYear}
          </MenuItem>
        )}
      </Select>
    </Box>
  );
}

export default YearDropdownMonth;
