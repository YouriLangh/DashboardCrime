/* eslint-disable react/prop-types */

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

function YearDropdownMonth({
  text,
  smallestYear,
  largestYear,
  onFilterChange,
}) {
  const [selectedYear, setSelectedYear] = useState(
    2022
  );
  const [allYears, setAllYears] = useState();

  useEffect(() => {
    if (smallestYear && largestYear) {
      const years = generateYearArray(smallestYear, largestYear);
      setAllYears(years);
    }
  }, [largestYear, smallestYear]);

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

  return (
    <Box className='dropdown-container-month'>
      <Typography variant="h5">{text}</Typography>
      <Select
      sx={{
        color: "white", fontWeight:'600',
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
            <MenuItem sx={{color: "white", backgroundColor:"rgba(50, 51, 60, 0.5)", fontSize:'15px' ,fontWeight:'600',
            '&:hover': {
                backgroundColor: '#5C5F72',
             },
            
            }} key={index} className="dropdown-option-month" value={item}>
              {item}
            </MenuItem>
          ))
        ) : (
          <MenuItem sx={{color: "white", backgroundColor:"rgba(50, 51, 60, 0.5)", fontSize:'15px' ,fontWeight:'600',
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
