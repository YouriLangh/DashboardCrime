/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material'

function GeneralStatBox({value, text, isLightColor, measure}) {

  const lightColor = '#6A8BFF';
  const darkColor = '#254FE3';

  // Determine the background color based on the prop value
  const backgroundColor = isLightColor ? lightColor : darkColor;

  return (
    <Box className="stat-box" style = {{ 
      backgroundColor: backgroundColor}}>
        <div>
        <Typography variant= "h4" fontSize='26px'>{value} {measure} </Typography>
        <Typography variant= "h2" fontSize='16px' style={{ marginTop: '8px' }}>{text}</Typography>
        </div>
        
    </Box>
  )
}

export default GeneralStatBox