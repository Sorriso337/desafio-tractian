import { Box, Breadcrumbs, Button, Typography } from '@mui/material'
import { Header } from './components/header'

function App() {
  return (
    <Box height='80%'>
      <Header />
      <Box sx={{ margin: 1, minHeight: '90vh', padding: 2, borderRadius: 4, border: '1px solid var(--Shapes-Border-card, #D8DFE6)' }}>
        <Box display='flex' justifyContent='space-between'>

          <Breadcrumbs aria-label="breadcrumb">
            <Typography fontWeight='bold' >Ativos</Typography>
            <Typography >Apex Unit</Typography>
          </Breadcrumbs>
          <Box display='flex' justifyContent='center'>
            <Button variant='outlined' size='small' style={{ marginRight: 16 }}>
              Sensor de energia
            </Button>
            <Button variant='outlined' size='small' style={{ marginRight: 16 }}>
              Crítico
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default App
