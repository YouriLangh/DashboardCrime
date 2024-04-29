/* eslint-disable react/prop-types */
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { sortItems } from '@/helpers/helpers'

function FilterDropdown({ text, items, filterType, onFilterChange }) {
  const [localItems, setLocalItems] = useState([{ value: "All" }]);
  const [selectedValue, setSelectedValue] = useState("All");

  useEffect(() => {
    if (Array.isArray(items) && items.length > 0) {
      const baseFilter = { value: "All" };
      const combinedArray = [baseFilter, ...items];
      setLocalItems(sortItems(combinedArray));
    }
  }, [items]);

  const handleFilters = (event) => {
    const value = event.target.value;
    setSelectedValue(value); // Update the selected value state

    const activatedFilters = [];
    const selectedItem = localItems.find((item) => item.value === value);

    if (selectedItem && selectedItem.submenu) {
      selectedItem.submenu.forEach((item) => {
        activatedFilters.push(item);
      });
    } else {
      activatedFilters.push(selectedItem);
    }

    onFilterChange(filterType, activatedFilters);
  };

  return (
    <Box className='dropdown-container'>
      <Typography variant="h5">{text}</Typography>
      <Select
        className="dropdown-filters"
        sx={{color: "black", fontWeight:'600'}}
        value={selectedValue} // Control the Select component
        onChange={handleFilters}
      >
        {localItems.map((item, index) => (
          <MenuItem sx={{color: "black", fontSize:'15px' ,fontWeight:'600'}}
           key={index} className="dropdown-option" value={item.value}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default FilterDropdown;
