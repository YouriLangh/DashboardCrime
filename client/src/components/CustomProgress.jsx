import { CircularProgress } from '@mui/material'

// Custom progress component that shows when the page is loading for the first time
function CustomProgress() {
  return (
    <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}><CircularProgress/></div>
  )
}

export default CustomProgress