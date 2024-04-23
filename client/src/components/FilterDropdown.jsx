/* eslint-disable react/prop-types */
import { Select } from "@mui/base/Select";
import { Option } from "@mui/base/Option";
import { useState, useEffect } from "react";

function FilterDropdown({ items, filterType, onFilterChange }) {
  // Initialize state with an object {value: 'All'}
  const [localItems, setLocalItems] = useState([
    { value: "All" },
  ]);

  useEffect(() => {
    // Append new items to the existing localItems array
    if (Array.isArray(items) && items.length > 0) {
      setLocalItems((prevItems) => [...prevItems, ...items]);
    }
  }, [items]);


  // Handle change event
  const handleFilters = (event, value) => {
    let activatedFilters = [];
      // Find the selected item in the localItems array
      const selectedItem = localItems.find((item) => item.value === value);

      // Check if the selected item has a submenu
      if (selectedItem && selectedItem.submenu) {
        // Pass the selected value and submenu to the callback function
        selectedItem.submenu.forEach((item) => {
          activatedFilters.push(item);
        });
      } else {
        // Pass only the selected value to the callback function
        activatedFilters.push(selectedItem);
      }
      console.log(activatedFilters)
    // Call the onFilterChange callback with the filter type and activated filters
    onFilterChange(filterType, activatedFilters);
  };

  return (
    <Select
      className="dropdown-filters"
      defaultValue="All"
      onChange={(event, value) => handleFilters(event, value)}
    >
      {/* Loop over localItems and create options */}
      {localItems.map((item, index) => {
        return (
          <div key={index} style={{ position: "relative" }}>
            <Option className="dropdown-option" value={item.value}>
              {item.value}
            </Option>
          </div>
        );
      })}
    </Select>
  );
}

export default FilterDropdown;
