/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import FilterDropDown from "./FilterDropdown";
import { Box } from "@mui/material";

function FiltersBar({ filters, filterCallback }) {
    // Initializing state
    const [localFilterSets, setLocalFilterSets] = useState({});
    const [selectedFilters, setSelectedFilters] = useState({
        yearFilter: 2023,
        areaFilter: 'All',
        crimeTypeFilter: 'All',
        weaponTypeFilter: 'All',
        genderFilter: 'All',
        descentFilter: 'All',
    });

    useEffect(() => {
        setLocalFilterSets(filters);
    }, [filters]);

    // Callback function to update selectedFilters state
    function handleFilterChange(filterType, value){
      console.log("Filter changed", filterType, "to value", value, "from value", selectedFilters[filterType])
        setSelectedFilters((prevSelectedFilters) => ({
            ...prevSelectedFilters,
            [filterType]: value,
        }));
    }

    // Check if localFilterSets is not an empty object
    const hasLocalFilterSets = Object.keys(localFilterSets).length > 0;

    //TODO: Temporary fix that loads other boxes if the data hasnt loaded yet
    return (
        <>
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
        </>
    );
}

export default FiltersBar;
