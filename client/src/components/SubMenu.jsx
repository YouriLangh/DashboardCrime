/* eslint-disable react/prop-types */
import { Box } from '@mui/material';

function SubMenu({ submenu, handleClick }) {

    function onClick(event){
        const value = event.target.value; // Get the value of the clicked button
        const selectedItem = submenu.find(item => item.value === value); // Find the corresponding submenu item

        // Call handleClick with the selected item as a parameter
        handleClick(event, selectedItem, true);
    }
    return (
        <Box
            sx={{
                position: 'absolute', // Position the submenu absolutely
                top: 0, // Place the submenu below the parent element
                left: '100%',
                backgroundColor: '#FFF', // Dark background color
                padding: '8px',
                zIndex: 1,
                borderRadius: '4px', // Rounded corners
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Shadow for depth
            }}
        >
            {/* Render the submenu items */}
            {submenu.map((subItem, index) => (
                <button key={index} onClick={onClick} value={subItem.value} style={{ color: 'black' }}> {/* Set text color to white */}
                    {subItem.value}
                </button>
            ))}
        </Box>
    );
}

export default SubMenu;
