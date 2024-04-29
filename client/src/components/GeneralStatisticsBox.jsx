/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';

function GeneralStatBox({ value, text, isLightColor, measure }) {
    // Define light and dark colors
    const lightColor = '#303649';
    const darkColor = '#37446D';

    // Determine the background color based on the prop value
    const backgroundColor = isLightColor ? lightColor : darkColor;

    // Determine the font size for the value text
    let fontSize = 24; // Default font size

    // Check if the length of value is too long
    if (value && value.length > 15) { // Customize the length threshold as needed
        fontSize = 21; // Lower font size by 3px if length is too long
    }

    return (
        <Box className="stat-box" style={{ backgroundColor: backgroundColor }}>
            <div>
                <Typography variant="h4" sx={{ fontSize: `${fontSize}px` }}>
                    {value ? `${value} ${measure}` : "No data"}
                </Typography>
                <Typography variant="h2" sx={{ fontSize: '16px', marginTop: '8px' }}>
                    {text}
                </Typography>
            </div>
        </Box>
    );
}

export default GeneralStatBox;
