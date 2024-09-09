import TreeViewVirtualized from './components/tree-item'
import { Box, Breadcrumbs, Button, Grid, TextField, Typography } from '@mui/material'
import { Header } from './components/header'
import { getAssetsByCompanyId, getLocationsByCompanyId } from './services/companies'
import { useRecoilValue } from 'recoil'
import { EmpresaSelecionada } from './recoil/atoms/selected-companie'
import { useQuery } from 'react-query'

function App() {

  const { id } = useRecoilValue(EmpresaSelecionada)

  const { data: dataAssets } = useQuery("assets", () => getAssetsByCompanyId(id))

  const assets = dataAssets?.data || []

  const { data: dataLocations } = useQuery("locations", () => getLocationsByCompanyId(id))

  const locations = dataLocations?.data || []

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
        <Grid container spacing={2} marginTop={1}>

          <Grid item xs={12} md={5}>
            <Box sx={{ padding: 2, borderRadius: 4, border: '1px solid var(--Shapes-Border-card, #D8DFE6)' }}>
              <TextField fullWidth size='small' label='Buscar ativo ou local' />
              <Box sx={{ border: '1px solid var(--Shapes-Border-card, #D8DFE6)' }}>

                <TreeViewVirtualized data={[...assets, ...locations]} />


              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2, borderRadius: 4, border: '1px solid var(--Shapes-Border-card, #D8DFE6)' }}>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Box>
  )
}

export default App
