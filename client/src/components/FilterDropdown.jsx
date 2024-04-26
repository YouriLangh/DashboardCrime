/* eslint-disable react/prop-types */
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from "react";

function FilterDropdown({ items, filterType, onFilterChange }) {
  const [localItems, setLocalItems] = useState([{value: 'All'}]);
  const [selectedValue, setSelectedValue] = useState("All");

  useEffect(() => {
    if (Array.isArray(items) && items.length > 0) {
      const baseFilter = {value: 'All'}
      const combinedArray = [baseFilter, ...items];
      setLocalItems(combinedArray);
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
    <Select 
      className="dropdown-filters"
      value={selectedValue} // Control the Select component
      onChange={handleFilters}>
      {localItems.map((item, index) => (
        <MenuItem key={index} className="dropdown-option" value={item.value}>
          {item.value}
        </MenuItem>
      ))}
    </Select>
  );
}

export default FilterDropdown;
