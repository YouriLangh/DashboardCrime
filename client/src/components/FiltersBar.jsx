/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import FilterDropDown from "./FilterDropdown";
import { Box, Select } from "@mui/material";

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

    function changeActiveFilters(){
        filterCallback()
    }

    // Check if localFilterSets is not an empty object
    const hasLocalFilterSets = Object.keys(localFilterSets).length > 0;

    return (
        <>
            {hasLocalFilterSets ? (
                <>
                    <FilterDropDown
                        items={localFilterSets.areaSet}
                        filterType="areaFilter"
                        onFilterChange={handleFilterChange}
                    />
                    <FilterDropDown
                        items={localFilterSets.crimeTypeSet}
                        filterType="crimeTypeFilter"
                        onFilterChange={handleFilterChange}
                    />
                    <FilterDropDown
                        items={localFilterSets.weaponTypeSet}
                        filterType="weaponTypeFilter"
                        onFilterChange={handleFilterChange}
                    />
                    <FilterDropDown
                        items={localFilterSets.genderSet}
                        filterType="genderFilter"
                        onFilterChange={handleFilterChange}
                    />
                    <FilterDropDown
                        items={localFilterSets.descentSet}
                        filterType="descentFilter"
                        onFilterChange={handleFilterChange}
                    />
                </>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Box className='dropdown-filters' defaultValue="All"> All </Box>
                <Box className='dropdown-filters' defaultValue="All"> All</Box>
                <Box className='dropdown-filters' defaultValue="All"> All</Box>
                <Box className='dropdown-filters' defaultValue="All"> All</Box>
                <Box className='dropdown-filters' defaultValue="All"> All</Box>
                <Box className='dropdown-filters' defaultValue="All"> All</Box>
                </div>
            )}
        </>
    );
}

export default FiltersBar;
