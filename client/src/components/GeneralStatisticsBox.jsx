/* eslint-disable react/prop-types */
import { Box } from '@mui/material'

function GeneralStatBox(props) {

  const lightColor = '#5B7FFF';
  const darkColor = '#3356D3';

  // Determine the background color based on the prop value
  const backgroundColor = props.isLightColor ? lightColor : darkColor;


  return (
    <Box style = {{ 
      backgroundColor: backgroundColor,
      minWidth: '178px'}}>
        <p>{props.value} {props.value}</p>
        <p>{props.text}</p>
    </Box>
  )
}

export default GeneralStatBox