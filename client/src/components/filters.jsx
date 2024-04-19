import { Box, useTheme } from "@mui/material"

function Filters() {
    const { palette } = useTheme()
  return (
    <Box width="100%" height="70px" bgcolor={palette.grey[800]}>

    </Box>
  )
}

export default Filters