/* eslint-disable react/prop-types */
import { Box } from '@mui/material'

function GeneralStatBox(props) {
  return (
    <Box bgcolor="red">
        <p>{props.title} {props.title}</p>
        <p>{props.value}</p>
    </Box>
  )
}

export default GeneralStatBox