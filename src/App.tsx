import { Box } from '@mui/material'
import { Header } from './components/header'

function App() {
  return (
    <Box height='80%'>
      <Header />
      <Box sx={{ margin: 1, minHeight: '90vh', padding: 2, borderRadius: 4, border: '1px solid var(--Shapes-Border-card, #D8DFE6)' }}>
      </Box>
    </Box>
  )
}

export default App
