import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PushPinIcon from '@mui/icons-material/PushPin'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import {
  useHorizontalScroll,
	StyledTableContainer,
	StyledTd,
	StyledTh,
  StyledTrh,
	StyledTrTwoToneB,
} from '../../../components/saga-eb/layout'
import { FilterModal } from '../../../components/saga-eb/modal'

const columns = [
  {
    key: 'ArtsCategory',
    label: 'カテゴリ',
    rowSpan: 2,
    width: '124px',
    children: [],
  },
  {
    label: '武器タイプ',
    colSpan: 2,
    children: [
      { key: 'Weapon', label: 'メイン', width: '112px' },
      { key: 'WeaponSub', label: 'サブ', width: '112px' },
    ],
  },
]

export const TechSpellRatioData = () => {
  const data = useStaticQuery(graphql`
    query {
      allSagaebTechSpellRatioDataCsv {
        nodes {
          label
          Ratio1
          Ratio2
          Ratio3
          Ratio4
          Ratio5
          Ratio6
          Ratio7
          Ratio8
          Ratio9
        }
      }
      allSagaebTechSpellBaseStatsDataCsv(filter: {ArtsCategory: {nin: ["特殊行動", "未使用技"]}}) {
        nodes {
          Sequence
          ArtsName
          ArtsCategory
          Weapon
          WeaponSub
          TargetParty
          Attack
        }
      }
    }
  `)

  const preprocess = (ratioNodes, artsNodes) => {
    const outputNodes = []
    artsNodes.forEach(artsNode => {
      const ratioNode = ratioNodes.find(node => node.label === artsNode.Sequence)
      if (ratioNode !== undefined && artsNode.TargetParty === '敵' && artsNode.Attack !== '0') {
        const outputNode = {...ratioNode}
        outputNode.ArtsName = artsNode.ArtsName
        outputNode.ArtsCategory = artsNode.ArtsCategory
        outputNode.Weapon = artsNode.Weapon
        outputNode.WeaponSub = artsNode.WeaponSub
        const ratio = []
        for (let i = 1; i <= 9; i++) {
          ratio.push(ratioNode['Ratio' + i] !== '0' ? Number(ratioNode['Ratio' + i]) * 1000 / 10 : '–')
        }
        outputNode.Ratio = ratio
        outputNodes.push(outputNode)
      }
    })

    return outputNodes
  }

  const nodes = React.useMemo(() => (
    preprocess(data.allSagaebTechSpellRatioDataCsv.nodes, data.allSagaebTechSpellBaseStatsDataCsv.nodes)
  ), [data.allSagaebTechSpellRatioDataCsv.nodes, data.allSagaebTechSpellBaseStatsDataCsv.nodes])

  const filterValues = React.useMemo(() => {
    const leafColumns = columns.flatMap(parent => parent.children.length === 0 ? [parent] : parent.children)

    const map = {}
    leafColumns.forEach(column => map[column.key] = Array.from(new Set(nodes.map(node => node[column.key]))))

    return map
  }, [nodes])

  const theme = useTheme()
  const [pinned, setPinned] = React.useState(useMediaQuery(theme.breakpoints.up('sm')))
  const [filterState, setFilterState] = React.useState(filterValues)
  const [modalOpen, setModalOpen] = React.useState(false)

  const filteredNodes = React.useMemo(() => (
    nodes.filter(node => Object.entries(filterState).every(([column, selectedValues]) => selectedValues.includes(node[column])))
  ), [nodes, filterState])

  const ref = React.useRef(null)
  const hasScroll = useHorizontalScroll(ref)
  const hasHeaderRow = pinned || !hasScroll

  return (
    <>
      {modalOpen &&
        <FilterModal
          columns={columns}
          filterValues={filterValues}
          filterState={filterState}
          onApply={setFilterState}
          onClose={() => setModalOpen(false)}
          open={modalOpen}
        />
      }
      <Box sx={{ display: 'flex', justifyContent: 'center', width:'100%' }}>
        <Box sx={{ width: '100%', maxWidth: `calc(172px + 44px * 9)` }}>
          <IconButton
            onClick={() => setModalOpen(true)}
            sx={{
              zIndex: 4,
              mt: 1,
              padding: '4px',
              transform: 'rotate(45deg)',
              border: '1px solid',
              borderColor: '#f8d36f',
              borderRadius: 0,
              boxShadow: 4,
              background: 'linear-gradient(135deg, #805f92cf 30%, #ab84c2cf 70%)',
              '&:hover': {
                filter: 'brightness(1.1)',
              },
              '& .MuiSvgIcon-root': {
                transform: 'rotate(-45deg)',
              },
            }}
          >
            {Object.keys(filterState).every(column => filterState[column].length === filterValues[column].length) ? <FilterListIcon sx={{ color: '#ffffff'}}/> : <FilterAltIcon sx={{ color: '#ffffff'}}/>}
          </IconButton>
          <IconButton
            onClick={() => setPinned(!pinned)}
            sx={{
              display: hasScroll ? 'inline-flex' : 'none',
              left: '16px',
              zIndex: 4,
              mt: 1,
              padding: '4px',
              transform: 'rotate(45deg)',
              border: '1px solid',
              borderColor: '#f8d36f',
              borderRadius: 0,
              boxShadow: 4,
              background: pinned ? 'linear-gradient(135deg, #805f92cf 30%, #ab84c2cf 70%)' : 'linear-gradient(135deg, #805f922f 30%, #ab84c22f 70%)',
              '&:hover': {
                filter: pinned ? 'brightness(1.1)' : 'brightness(1.2)',
              },
              '& .MuiSvgIcon-root': {
                transform: 'rotate(-45deg)',
              },
            }}
          >
            {pinned ? <PushPinIcon sx={{ color: '#ffffff'}}/> : <PushPinOutlinedIcon sx={{ color: '#ffffff'}}/>}
          </IconButton>
          <StyledTableContainer align='center' sx={{ mt: 0 }}>
            <Table ref={ref} stickyHeader sx={{ width: `calc(172px + 44px * 9)` }}>
              <TableHead sx={{ position: 'sticky', top: 0, zIndex: 3 }}>
                <TableRow>
                  <StyledTh align='center' rowSpan={2} sx={hasHeaderRow ? { position: 'sticky', left: 0, zIndex: 3, width: '172px' } : { width: '172px' }}>名称</StyledTh>
                  <StyledTh align='center' colSpan={9}>表示ダメージ分割比率</StyledTh>
                </TableRow>
                <TableRow>
                  <StyledTh align='center' sx={{ width: '44px' }}>1</StyledTh>
                  <StyledTh align='center' sx={{ width: '44px' }}>2</StyledTh>
                  <StyledTh align='center' sx={{ width: '44px' }}>3</StyledTh>
                  <StyledTh align='center' sx={{ width: '44px' }}>4</StyledTh>
                  <StyledTh align='center' sx={{ width: '44px' }}>5</StyledTh>
                  <StyledTh align='center' sx={{ width: '44px' }}>6</StyledTh>
                  <StyledTh align='center' sx={{ width: '44px' }}>7</StyledTh>
                  <StyledTh align='center' sx={{ width: '44px' }}>8</StyledTh>
                  <StyledTh align='center' sx={{ width: '44px' }}>9</StyledTh>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredNodes.map((node, index) => (
                  <StyledTrTwoToneB className={index % 2 === 0 ? (hasHeaderRow ? 'darker-row-w-header' : 'darker-row') : (hasHeaderRow ? 'lighter-row-w-header' : 'lighter-row')} key={index}>
                    {hasHeaderRow ? <StyledTrh align='left' rowSpan={node.MaxRank} scope='row'>{node.ArtsName}</StyledTrh> : <StyledTd align='left' rowSpan={node.MaxRank}>{node.ArtsName}</StyledTd>}
                    <StyledTd align='center'>{node.Ratio[0]}</StyledTd>
                    <StyledTd align='center'>{node.Ratio[1]}</StyledTd>
                    <StyledTd align='center'>{node.Ratio[2]}</StyledTd>
                    <StyledTd align='center'>{node.Ratio[3]}</StyledTd>
                    <StyledTd align='center'>{node.Ratio[4]}</StyledTd>
                    <StyledTd align='center'>{node.Ratio[5]}</StyledTd>
                    <StyledTd align='center'>{node.Ratio[6]}</StyledTd>
                    <StyledTd align='center'>{node.Ratio[7]}</StyledTd>
                    <StyledTd align='center'>{node.Ratio[8]}</StyledTd>
                  </StyledTrTwoToneB>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Box>
      </Box>
    </>
  )
}
