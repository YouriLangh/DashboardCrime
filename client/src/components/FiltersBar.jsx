/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import FilterDropDown from "./FilterDropdown";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";

function FiltersBar({ filters, filterCallback }) {
  // Initializing state
  const [localFilterSets, setLocalFilterSets] = useState({});
  const [selectedYearFilter, setSelectedYearFilter] = useState(
    new Date().getFullYear() - 1
  );

  useEffect(() => {
    setLocalFilterSets(filters);
  }, [filters]);

  // Callback function to update selectedFilters state
  function handleFilterChange(filterType, value) {
    filterCallback(filterType, value);

    // Update the selected value state if the filterType is 'yearFilter'
    if (filterType === "yearFilter") {
      setSelectedYearFilter(value);
    }
  }

  function generateYearArray(smallestYear, largestYear) {
    const arr = [];
    for (let i = smallestYear; i <= largestYear; i++) {
      arr.push(i);
    }
    return arr;
  }

  // Check if localFilterSets is not an empty object
  const hasLocalFilterSets = Object.keys(localFilterSets).length > 0;

  return (
    <Box className='filters-bar'>
      <span>Filter By:</span>
      <Select
        className="dropdown-filters"
        value={selectedYearFilter} // Controlled value
        onChange={(e) => handleFilterChange("yearFilter", e.target.value)}
      >
        {hasLocalFilterSets ? (
          generateYearArray(
            localFilterSets.yearSet.smallestYear,
            localFilterSets.yearSet.largestYear
          ).map((item, index) => (
            <MenuItem key={index} className="dropdown-option" value={item}>
              {item}
            </MenuItem>
          ))
        ) : (
          <MenuItem className="dropdown-option" value={selectedYearFilter}>
            {selectedYearFilter}
          </MenuItem>
        )}
      </Select>

      {/* Render FilterDropDowns with or without local filter sets */}
      <FilterDropDown
        items={hasLocalFilterSets ? localFilterSets.areaSet : []}
        filterType="areaFilter"
        onFilterChange={handleFilterChange}
      />
      <FilterDropDown
        items={hasLocalFilterSets ? localFilterSets.crimeTypeSet : []}
        filterType="crimeTypeFilter"
        onFilterChange={handleFilterChange}
      />
      <FilterDropDown
        items={hasLocalFilterSets ? localFilterSets.weaponTypeSet : []}
        filterType="weaponTypeFilter"
        onFilterChange={handleFilterChange}
      />
      <FilterDropDown
        items={hasLocalFilterSets ? localFilterSets.genderSet : []}
        filterType="genderFilter"
        onFilterChange={handleFilterChange}
      />
      <FilterDropDown
        items={hasLocalFilterSets ? localFilterSets.descentSet : []}
        filterType="descentFilter"
        onFilterChange={handleFilterChange}
      />
    </Box>
  );
}

export default FiltersBar;
