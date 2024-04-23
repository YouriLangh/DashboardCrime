/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import FilterDropDown from "./FilterDropdown";

function FiltersBar({ filters, filterCallback }) {
    // Initializing state
    const [localFilterSets, setLocalFilterSets] = useState({});
    const [selectedFilters, setSelectedFilters] = useState({
        yearFilter: 2023,
        areaFilter: [{ value: 'All'}],
        crimeTypeFilter: [{ value: 'All'}],
        weaponTypeFilter: [{ value: 'All'}],
        genderFilter: [{ value: 'All'}],
        descentFilter: [{ value: 'All'}],
    });

    useEffect(() => {
        setLocalFilterSets(filters);
    }, [filters]);

    useEffect(() => {
         filterCallback(selectedFilters)
    }, [selectedFilters])

    // Callback function to update selectedFilters state
    function handleFilterChange(filterType, value){
        if(selectedFilters[filterType] !== value){
            setSelectedFilters((prevSelectedFilters) => ({
                ...prevSelectedFilters,
                [filterType]: value,
            }));
        }
    }

    // Check if localFilterSets is not an empty object
    const hasLocalFilterSets = Object.keys(localFilterSets).length > 0;

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
