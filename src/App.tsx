import { useEffect, useMemo, useState } from 'react'
import { renderTree } from './components/tree-item'
import { Box, Breadcrumbs, Button, Grid, TextField, Typography } from '@mui/material'
import { Header } from './components/header'
import { getAssetsByCompanyId, getLocationsByCompanyId } from './services/companies'
import { useRecoilState, useRecoilValue } from 'recoil'
import { EmpresaSelecionada } from './recoil/atoms/selected-companie'
import { useQuery } from 'react-query'
import { Asset, Location, TreeNode } from './types'
import { SimpleTreeView } from '@mui/x-tree-view'
import { Filtros } from './recoil/atoms/filters'
import _ from 'lodash'

function App() {

  const [filtro, setFiltro] = useState('')
  const [tree, setTree] = useState<TreeNode[]>([])

  const { id } = useRecoilValue(EmpresaSelecionada)
  const [filtros, setFiltros] = useRecoilState(Filtros)

  const { data: dataAssets } = useQuery(["assets", id], () => getAssetsByCompanyId(id), {
    enabled: !!id,
    staleTime: 1000000,
    refetchOnWindowFocus: false
  })

  const { data: dataLocations } = useQuery(["locations", id], () => getLocationsByCompanyId(id), {
    enabled: !!id,
    staleTime: 1000000,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    const locationMap = new Map(dataLocations?.data?.map((loc: Location) => [loc.id, { ...loc, isLocation: true, children: [] }])) as Map<string, TreeNode>;

    const tree: TreeNode[] = [];

    dataAssets?.data?.forEach((asset: Asset) => {
      if (filtros.apenasSensorEnergia && asset.sensorType != 'energy') return;
      if (filtros.apenasCritico && asset.status !== 'alert') return;
      if (filtros.filtroInput && !asset.name.toLowerCase().includes(filtros.filtroInput.toLowerCase())) return;
      if (asset.locationId) {
        const location = locationMap.get(asset.locationId);
        if (location) {
          location?.children?.push({ ...asset, children: [] });
        }
      } else {
        tree.push({ ...asset, children: [] });
      }
    });

    locationMap.forEach((location) => {
      if (location.parentId) {
        const parentLocation = locationMap.get(location.parentId);
        if (parentLocation) {
          const treeNode = locationMap.get(location.id);
          if (treeNode)
            parentLocation?.children?.push(treeNode);
        }
      } else {
        const treeNode = locationMap.get(location.id);
        if (treeNode)
          tree.push(treeNode);
      }
    });

    setTree(tree);
  }, [dataAssets, dataLocations, filtros])

  const debouncedFilter = useMemo(() => _.debounce((value) => {
    handleFilter(value);
  }, 1000), [filtros.filtroInput]);

  useEffect(() => {
    debouncedFilter(filtro);

    return () => debouncedFilter.cancel();
  }, [filtro, debouncedFilter]);

  const handleFilter = (filter: string) => {
    setFiltros({ ...filtros, filtroInput: filter })
  }

  const handleFilterSensorEnergia = () => {
    setFiltros({ ...filtros, apenasSensorEnergia: !filtros.apenasSensorEnergia })
  }

  const handleFilterCritico = () => {
    setFiltros({
      ...filtros, apenasCritico: !filtros.apenasCritico
    })
  }

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
            <Button onClick={handleFilterSensorEnergia} variant={filtros.apenasSensorEnergia ? 'contained' : 'outlined'} size='small' style={{ marginRight: 16 }}>
              Sensor de energia
            </Button>
            <Button onClick={handleFilterCritico} variant={filtros.apenasCritico ? 'contained' : 'outlined'} size='small' style={{ marginRight: 16 }}>
              Crítico
            </Button>
          </Box>
        </Box>
        <Grid container spacing={2} marginTop={1}>

          <Grid item xs={12} md={5}>
            <Box sx={{ padding: 2, borderRadius: 4, border: '1px solid var(--Shapes-Border-card, #D8DFE6)' }}>
              <TextField fullWidth size='small' label='Buscar ativo ou local' onChange={e => setFiltro(e.target.value)} />
              <Box sx={{ border: '1px solid var(--Shapes-Border-card, #D8DFE6)' }}>

                <SimpleTreeView>
                  {renderTree(tree)}
                </SimpleTreeView>

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
