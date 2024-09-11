import { useEffect, useMemo, useState } from 'react'
import { renderTree } from './components/tree-item'
import { Avatar, Box, Breadcrumbs, Button, CardMedia, Grid, TextField, Typography } from '@mui/material'
import { Header } from './components/header'
import { getAssetsByCompanyId, getLocationsByCompanyId } from './services/companies'
import { useRecoilState, useRecoilValue } from 'recoil'
import { EmpresaSelecionada } from './recoil/atoms/selected-companie'
import { useQuery } from 'react-query'
import { Asset, Location, TreeNode } from './types'
import { SimpleTreeView } from '@mui/x-tree-view'
import { Filtros } from './recoil/atoms/filters'
import _ from 'lodash'
import image from './assets/image.png'
import { AssetSelecionado } from './recoil/atoms/selected-asset'

function App() {

  const [filtro, setFiltro] = useState('')
  const [tree, setTree] = useState<TreeNode[]>([])

  const { id, name } = useRecoilValue(EmpresaSelecionada)

  const [ativoSelecionado, setAtivoSelecionado] = useRecoilState(AssetSelecionado)
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

    const validaStringContem = (string: string, filtro: string) => {
      return string.toLowerCase().includes(filtro.toLowerCase());
    }

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

    dataAssets?.data?.forEach((asset: Asset) => {
      if (filtros.apenasSensorEnergia && asset.sensorType != 'energy') return;
      if (filtros.apenasCritico && asset.status !== 'alert') return;
      if (!validaStringContem(asset.name, filtros.filtroInput)) return;
      if (asset.locationId) {
        const location = locationMap.get(asset.locationId);
        if (location) {
          location?.children?.push({ ...asset, children: [] });
        }
      } else {
        tree.push({ ...asset, children: [] });
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
            <Typography >{name} Unit</Typography>
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
                  {renderTree(tree, (node: TreeNode) => setAtivoSelecionado(node as typeof ativoSelecionado), filtros)}
                </SimpleTreeView>

              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, borderRadius: 4, border: '1px solid var(--Shapes-Border-card, #D8DFE6)' }}>
              {
                ativoSelecionado.id &&
                <>
                  <Typography variant='h6' fontWeight='bold'>{ativoSelecionado?.name}</Typography>
                  <Box sx={{ display: 'flex', gap: 1, marginTop: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <CardMedia
                        component="img"
                        image={image}
                        alt=" Imagem do ativo"
                        height={226}
                        width={336} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant='body1' fontWeight='bold'>Tipo de equipamento</Typography>
                      <Typography variant='body1' >{ativoSelecionado?.sensorType?.toUpperCase()}</Typography>

                      <Typography variant='body1' marginTop={4} fontWeight='bold'>Responsável</Typography>
                      <Typography variant='body1' >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 24, height: 24, background: "#2188FF" }} >G</Avatar> Gabriel
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, marginTop: 4, justifyContent: 'start' }}>
                    <Box width={'40%'}>
                      <Typography variant='body1' fontWeight='bold'>Sensor</Typography>
                      <Typography variant='body1'>{ativoSelecionado.sensorId}</Typography>
                    </Box>
                    <Box>
                      <Typography variant='body1' fontWeight='bold'>Receptor</Typography>
                      <Typography variant='body1'>{ativoSelecionado.gatewayId}</Typography>
                    </Box>
                  </Box>
                </>
              }
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Box>
  )
}

export default App
