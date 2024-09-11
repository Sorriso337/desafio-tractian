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
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }}>
                <path d="M12.9999 5.27216H9.06594L12.6034 0.802516C12.6767 0.707874 12.6106 0.570374 12.4909 0.570374H5.64273C5.59273 0.570374 5.54451 0.597159 5.51951 0.641802L0.892729 8.63287C0.837371 8.72752 0.905228 8.84716 1.01594 8.84716H4.13023L2.5338 15.2329C2.49987 15.3722 2.66773 15.4704 2.7713 15.3704L13.0981 5.5168C13.1909 5.4293 13.1284 5.27216 12.9999 5.27216ZM4.61059 11.9364L5.68737 7.63287H2.87666L6.26237 1.78645H10.2731L6.55344 6.48823H10.3213L4.61059 11.9364Z"
                  fill={filtros.apenasSensorEnergia ? 'white' : '#1976d2'} />
              </svg>
              Sensor de energia
            </Button>
            <Button onClick={handleFilterCritico} variant={filtros.apenasCritico ? 'contained' : 'outlined'} size='small' style={{ marginRight: 16 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }}>
                <path d="M7 0C3.13437 0 0 3.13437 0 7C0 10.8656 3.13437 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13437 10.8656 0 7 0ZM7 12.8125C3.79063 12.8125 1.1875 10.2094 1.1875 7C1.1875 3.79063 3.79063 1.1875 7 1.1875C10.2094 1.1875 12.8125 3.79063 12.8125 7C12.8125 10.2094 10.2094 12.8125 7 12.8125Z"
                  fill={filtros.apenasCritico ? 'white' : '#1976d2'} />
                <path d="M6.24976 9.75C6.24976 9.94891 6.32877 10.1397 6.46943 10.2803C6.61008 10.421 6.80084 10.5 6.99976 10.5C7.19867 10.5 7.38943 10.421 7.53009 10.2803C7.67074 10.1397 7.74976 9.94891 7.74976 9.75C7.74976 9.55109 7.67074 9.36032 7.53009 9.21967C7.38943 9.07902 7.19867 9 6.99976 9C6.80084 9 6.61008 9.07902 6.46943 9.21967C6.32877 9.36032 6.24976 9.55109 6.24976 9.75ZM6.62476 8H7.37476C7.44351 8 7.49976 7.94375 7.49976 7.875V3.625C7.49976 3.55625 7.44351 3.5 7.37476 3.5H6.62476C6.55601 3.5 6.49976 3.55625 6.49976 3.625V7.875C6.49976 7.94375 6.55601 8 6.62476 8Z"
                  fill={filtros.apenasCritico ? 'white' : '#1976d2'} />
              </svg>

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
                  <Typography variant='h6' fontWeight='bold'>
                    {
                      ativoSelecionado.status &&
                      <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }}>
                        <path d="M2.40167 7.72576H0.593342C0.360008 7.72576 0.187439 7.62125 0.0756332 7.41222C-0.0361724 7.20319 -0.0240196 7.00145 0.112092 6.80701L4.47251 0.536175C4.56973 0.400064 4.69612 0.305273 4.85168 0.2518C5.00723 0.198328 5.16765 0.200759 5.33293 0.259092C5.4982 0.317425 5.61973 0.419509 5.69751 0.565342C5.77529 0.711175 5.80445 0.866731 5.78501 1.03201L5.31834 4.80909H7.57876C7.83154 4.80909 8.00897 4.9209 8.11105 5.14451C8.21313 5.36812 8.18154 5.57715 8.01626 5.77159L3.21834 11.5174C3.1114 11.6438 2.98015 11.7265 2.82459 11.7653C2.66904 11.8042 2.51834 11.7896 2.37251 11.7216C2.22668 11.6535 2.11244 11.549 2.0298 11.4081C1.94716 11.2671 1.91556 11.114 1.93501 10.9487L2.40167 7.72576Z"
                          fill={ativoSelecionado.status == "alert" ? "#ED3833" : "#52C41A"} />
                      </svg>
                    }

                    {ativoSelecionado?.name}
                  </Typography>
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
                      <Typography variant='body1' fontWeight='bold'>
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }}>
                          <path d="M9.00002 10.7778C8.54169 10.7778 8.14933 10.6146 7.82294 10.2882C7.49655 9.96186 7.33335 9.5695 7.33335 9.11117C7.33335 8.65283 7.49655 8.26047 7.82294 7.93408C8.14933 7.60769 8.54169 7.4445 9.00002 7.4445C9.45835 7.4445 9.85072 7.60769 10.1771 7.93408C10.5035 8.26047 10.6667 8.65283 10.6667 9.11117C10.6667 9.5695 10.5035 9.96186 10.1771 10.2882C9.85072 10.6146 9.45835 10.7778 9.00002 10.7778ZM5.04169 12.1737C4.72224 11.7431 4.46877 11.2709 4.28127 10.757C4.09377 10.2431 4.00002 9.6945 4.00002 9.11117C4.00002 7.72228 4.48613 6.54172 5.45835 5.5695C6.43058 4.59728 7.61113 4.11117 9.00002 4.11117C10.3889 4.11117 11.5695 4.59728 12.5417 5.5695C13.5139 6.54172 14 7.72228 14 9.11117C14 9.6945 13.9063 10.2501 13.7188 10.7778C13.5313 11.3056 13.2778 11.7778 12.9584 12.1945C12.8195 12.3751 12.6354 12.4653 12.4063 12.4653C12.1771 12.4653 11.9722 12.3751 11.7917 12.1945C11.6389 12.0417 11.559 11.8542 11.5521 11.632C11.5452 11.4098 11.6111 11.1945 11.75 10.9862C11.9445 10.7084 12.0903 10.4132 12.1875 10.1007C12.2847 9.78825 12.3334 9.45839 12.3334 9.11117C12.3334 8.1945 12.007 7.40978 11.3542 6.757C10.7014 6.10422 9.91669 5.77783 9.00002 5.77783C8.08335 5.77783 7.29863 6.10422 6.64585 6.757C5.99308 7.40978 5.66669 8.1945 5.66669 9.11117C5.66669 9.47228 5.71877 9.80561 5.82294 10.1112C5.9271 10.4167 6.06947 10.7084 6.25002 10.9862C6.38891 11.1945 6.45141 11.4132 6.43752 11.6424C6.42363 11.8716 6.3403 12.0626 6.18752 12.2153C6.02085 12.382 5.82294 12.4619 5.59377 12.4549C5.3646 12.448 5.18058 12.3542 5.04169 12.1737ZM2.68752 14.5487C2.06252 13.8126 1.56946 12.9827 1.20835 12.0591C0.847243 11.1355 0.666687 10.1528 0.666687 9.11117C0.666687 7.95839 0.885437 6.87505 1.32294 5.86117C1.76044 4.84728 2.35419 3.96533 3.10419 3.21533C3.85419 2.46533 4.73613 1.87158 5.75002 1.43408C6.76391 0.996582 7.84724 0.777832 9.00002 0.777832C10.1528 0.777832 11.2361 0.996582 12.25 1.43408C13.2639 1.87158 14.1459 2.46533 14.8959 3.21533C15.6459 3.96533 16.2396 4.84728 16.6771 5.86117C17.1146 6.87505 17.3334 7.95839 17.3334 9.11117C17.3334 10.1528 17.1528 11.1389 16.7917 12.0695C16.4306 13.0001 15.9375 13.8334 15.3125 14.5695C15.1597 14.7362 14.9722 14.8195 14.75 14.8195C14.5278 14.8195 14.3334 14.7362 14.1667 14.5695C14.0139 14.4167 13.934 14.2257 13.9271 13.9966C13.9202 13.7674 13.9931 13.5626 14.1459 13.382C14.6181 12.7987 14.9896 12.1459 15.2604 11.4237C15.5313 10.7014 15.6667 9.93061 15.6667 9.11117C15.6667 7.25005 15.0209 5.67367 13.7292 4.382C12.4375 3.09033 10.8611 2.4445 9.00002 2.4445C7.13891 2.4445 5.56252 3.09033 4.27085 4.382C2.97919 5.67367 2.33335 7.25005 2.33335 9.11117C2.33335 9.93061 2.46877 10.698 2.7396 11.4132C3.01044 12.1285 3.38891 12.7778 3.87502 13.3612C4.0278 13.5417 4.10072 13.7466 4.09377 13.9757C4.08683 14.2049 4.00002 14.4028 3.83335 14.5695C3.66669 14.7362 3.47224 14.816 3.25002 14.8091C3.0278 14.8021 2.8403 14.7153 2.68752 14.5487Z"
                            fill="#2188FF" />
                        </svg>

                        Sensor
                      </Typography>
                      <Typography variant='body1'>{ativoSelecionado.sensorId}</Typography>
                    </Box>
                    <Box>
                      <Typography variant='body1' fontWeight='bold'>
                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }}>
                          <path d="M10.8333 1.5C12.0833 1.5 13.3333 2 14.3333 2.91667L15 2.25C13.8333 1.08333 12.3333 0.5 10.8333 0.5C9.33333 0.5 7.83333 1.08333 6.66667 2.25L7.33333 2.91667C8.33333 2 9.58333 1.5 10.8333 1.5ZM8.08333 3.58333L8.75 4.25C9.33333 3.66667 10.0833 3.41667 10.8333 3.41667C11.5833 3.41667 12.3333 3.66667 12.9167 4.25L13.5833 3.58333C12.8333 2.83333 11.8333 2.41667 10.8333 2.41667C9.83333 2.41667 8.83333 2.83333 8.08333 3.58333ZM13.3333 8.83333H11.6667V5.5H10V8.83333H1.66667C0.75 8.83333 0 9.58333 0 10.5V13.8333C0 14.75 0.75 15.5 1.66667 15.5H13.3333C14.25 15.5 15 14.75 15 13.8333V10.5C15 9.58333 14.25 8.83333 13.3333 8.83333ZM13.3333 13.8333H1.66667V10.5H13.3333V13.8333ZM2.5 11.3333H4.16667V13H2.5V11.3333ZM5.41667 11.3333H7.08333V13H5.41667V11.3333ZM8.33333 11.3333H10V13H8.33333V11.3333Z"
                            fill="#2188FF" />
                        </svg>

                        Receptor
                      </Typography>
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
