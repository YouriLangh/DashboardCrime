/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';

function GeneralStatBox({ value, text, isLightColor, measure }) {
    // Define light and dark colors
    const lightColor = '#6A8BFF';
    const darkColor = '#254FE3';

    // Determine the background color based on the prop value
    const backgroundColor = isLightColor ? lightColor : darkColor;

    return (
      <Box className="stat-box" style = {{ 
        backgroundColor: backgroundColor}}>
          <div>
                <Typography variant="h4" sx={{ fontSize: '24px' }}>
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
