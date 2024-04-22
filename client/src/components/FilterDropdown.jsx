/* eslint-disable react/prop-types */
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import { useState, useEffect } from 'react';
import SubMenu from './SubMenu'; // Import SubMenu component

function FilterDropdown({ items, filterType, onFilterChange }) {
    const [localItems, setLocalItems] = useState([]);
    const [hoveredItemIndex, setHoveredItemIndex] = useState(null); // State to track the hovered item index

    useEffect(() => {
        setLocalItems(items);
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
        console.log(event.target)

        // Find the selected item in the localItems array
        const selectedItem = localItems.find(item => item.value === value);
        console.log("selected item", selectedItem)
        // Check if the selected item has a submenu
        if (selectedItem && selectedItem.submenu) {
            // Pass the selected value and submenu to the callback function
            onFilterChange(filterType, value, selectedItem.submenu);
        } else {
            // Pass only the selected value to the callback function
            onFilterChange(filterType, value);
    }
}

    return (
        <Select className='dropdown-filters' defaultValue="All" onChange={handleChange}>
            <Option className='dropdown-option' value="All">All</Option>
            {/* Loop over localItems and create options */}
            {localItems && localItems.map((item, index) => {
                // Check if the item has a submenu
                const hasSubmenu = Array.isArray(item.submenu) && item.submenu.length > 0;

                // Define the option text with an arrow if the item has a submenu
                const optionText = hasSubmenu ? <span>{item.value} &raquo;</span> : item.value;

                return (
                    <div
                        key={index}
                        style={{ position: 'relative' }}
                        onMouseEnter={() => handleMouseEnter(index)} // Set the hovered item index when mouse enters
                        onMouseLeave={handleMouseLeave} // Clear the hovered item index when mouse leaves
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