/* eslint-disable react/prop-types */
import { Box } from '@mui/material';

function SubMenu({ submenu }) {
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
                <p key={index} style={{ color: 'black' }}> {/* Set text color to white */}
                    {subItem.value}
                </p>
            ))}
        </Box>
    );
}

export default SubMenu;
