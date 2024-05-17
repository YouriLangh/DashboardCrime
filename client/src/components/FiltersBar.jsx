/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import FilterDropDown from "./FilterDropdown";
import YearDropdown from "./YearDropdown";
import { Box, Typography } from "@mui/material";

// FiltersBar component that displays all the filter dropdowns
function FiltersBar({ filters, filterCallback }) {
  // Initializing state
  const [localFilterSets, setLocalFilterSets] = useState({});
  

  useEffect(() => {
    setLocalFilterSets(filters);
  }, [filters]);


  // Check if localFilterSets is not an empty object
  const hasLocalFilterSets = Object.keys(localFilterSets).length > 0;

  return (
    <Box className='filters-bar'>
      <Typography variant="h1">Filter By:</Typography>
      <YearDropdown 
       smallestYear={hasLocalFilterSets ?  localFilterSets.yearSet.smallestYear : null}
       largestYear={hasLocalFilterSets ? localFilterSets.yearSet.largestYear : null}
       text={"Year"}
       filterType="yearFilter"
       onFilterChange={filterCallback}
      />
      

      {/* Render FilterDropDowns with or without local filter sets */}
      <FilterDropDown
        items={hasLocalFilterSets ? localFilterSets.areaSet : []}
        text={"Area"}
        filterType="areaFilter"
        onFilterChange={filterCallback}
      />
      <FilterDropDown
        items={hasLocalFilterSets ? localFilterSets.crimeTypeSet : []}
        text={"Crime Type"}
        filterType="crimeTypeFilter"
        onFilterChange={filterCallback}
      />
      <FilterDropDown
        items={hasLocalFilterSets ? localFilterSets.weaponTypeSet : []}
        text={"Weapon Type"}
        filterType="weaponTypeFilter"
        onFilterChange={filterCallback}
      />
      <FilterDropDown
        items={hasLocalFilterSets ? localFilterSets.genderSet : []}
        text={"Victim Gender"}
        filterType="genderFilter"
        onFilterChange={filterCallback}
      />
      <FilterDropDown
        items={hasLocalFilterSets ? localFilterSets.descentSet : []}
        text={"Victim Descent"}
        filterType="descentFilter"
        onFilterChange={filterCallback}
      />
    </Box>
  );
}

export default FiltersBar;
