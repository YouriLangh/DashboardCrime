import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import { useState, useEffect } from 'react';
import SubMenu from './SubMenu'; // Import SubMenu component

function FilterDropdown({ items, filterType, onFilterChange }) {
    // Initialize state with an object {value: 'All'}
    const [localItems, setLocalItems] = useState([{ value: 'All' }]);
    const [hoveredItemIndex, setHoveredItemIndex] = useState(null);

    useEffect(() => {
        // Append new items to the existing localItems array
        if (Array.isArray(items) && items.length > 0) {
            setLocalItems((prevItems) => [...prevItems, ...items]);
        }
    }, [items]);

    // Event handler to set the index of the hovered item
    const handleMouseEnter = (index) => {
        setHoveredItemIndex(index);
    };

    // Event handler to clear the hovered item index when leaving the item
    const handleMouseLeave = () => {
        setHoveredItemIndex(null);
    };

    // Handle change event
    const handleChange = (event, value) => {
        // Find the selected item in the localItems array
        const selectedItem = localItems.find(item => item.value === value);
        const activatedFilters = [];
        if (selectedItem.value === 'All') {
            localItems.forEach((item) => {
                if (item.submenu) {
                    item.submenu.forEach((subCat) => { activatedFilters.push(subCat.hierarchy); });
                } else {
                    if(item.value !== 'All')
                    activatedFilters.push(item.hierarchy);
                }
            });
        } else {
            // Check if the selected item has a submenu
            if (selectedItem && selectedItem.submenu) {
                // Pass the selected value and submenu to the callback function
                selectedItem.submenu.forEach((subCat) => { activatedFilters.push(subCat.hierarchy); });
            } else {
                // Pass only the selected value to the callback function
                activatedFilters.push(selectedItem.hierarchy);
            }
        }

        console.log("activated filters: ", activatedFilters);
        // Call the onFilterChange callback with the filter type and activated filters
        onFilterChange(filterType, activatedFilters);
    };

    return (
        <Select className='dropdown-filters' defaultValue="All" onChange={handleChange}>
            {/* Loop over localItems and create options */}
            {localItems.map((item, index) => {
                // Check if the item has a submenu
                const hasSubmenu = Array.isArray(item.submenu) && item.submenu.length > 0;

                // Define the option text with an arrow if the item has a submenu
                const optionText = hasSubmenu ? <span>{item.value} &raquo;</span> : item.value;

                return (
                    <div
                        key={index}
                        style={{ position: 'relative' }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Render the option */}
                        <Option className='dropdown-option' value={item.value}>
                            {optionText}
                        </Option>
                        {/* Render the SubMenu component if the item has a submenu and is currently hovered */}
                        {hasSubmenu && hoveredItemIndex === index && (
                            <SubMenu submenu={item.submenu} />
                        )}
                    </div>
                );
            })}
        </Select>
    );
}

export default FilterDropdown;
