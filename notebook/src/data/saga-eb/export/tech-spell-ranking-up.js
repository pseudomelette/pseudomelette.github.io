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

export const TechSpellRankData = () => {
  const data = useStaticQuery(graphql`
    query {
      allSagaebTechSpellRankDataCsv {
        nodes {
          label
          MaxRank
          Count1
          Count2
          Count3
          Count4
          Count5
          BP1
          BP2
          BP3
          BP4
          BP5
          Attack1
          Attack2
          Attack3
          Attack4
          Attack5
          Turn1
          Turn2
          Turn3
          Turn4
          Turn5
        }
      }
      allSagaebTechSpellBaseStatsDataCsv(filter: {ArtsCategory: {nin: ["特殊行動", "敵専用技", "支援専用技", "未使用技"]}}) {
        nodes {
          label
          ArtsName
          ArtsCategory
          Weapon
          WeaponSub
          TargetParty
          ReserveType
        }
      }
    }
  `)

  const preprocess = (rankNodes, artsNodes) => {
    const outputNodes = []
    artsNodes.forEach(artsNode => {
      const rankNode = rankNodes.find(node => node.label === artsNode.label)
      if (rankNode !== undefined) {
        const outputNode = {...rankNode}
        outputNode.ArtsName = artsNode.ArtsName
        outputNode.ArtsCategory = artsNode.ArtsCategory
        outputNode.Weapon = artsNode.Weapon
        outputNode.WeaponSub = artsNode.WeaponSub
        outputNode.MaxRank = rankNode.MaxRank
        outputNode.Rank = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ']
        outputNode.Count = [rankNode.Count1, rankNode.Count2, rankNode.Count3, rankNode.Count4, rankNode.Count5]
        outputNode.BP = [rankNode.BP1, rankNode.BP2, rankNode.BP3, rankNode.BP4, rankNode.BP5]
        outputNode.Attack = artsNode.TargetParty === '敵' || artsNode.ReserveType === 'プロテクト' ? [rankNode.Attack1, rankNode.Attack2, rankNode.Attack3, rankNode.Attack4, rankNode.Attack5] : ['–', '–', '–', '–', '–']
        outputNode.Turn = rankNode.Turn1 !== '0' ? [rankNode.Turn1, rankNode.Turn2, rankNode.Turn3, rankNode.Turn4, rankNode.Turn5] : ['–', '–', '–', '–', '–']
        outputNodes.push(outputNode)
      }
    })

    return outputNodes
  }

  const nodes = React.useMemo(() => (
    preprocess(data.allSagaebTechSpellRankDataCsv.nodes, data.allSagaebTechSpellBaseStatsDataCsv.nodes)
  ), [data.allSagaebTechSpellRankDataCsv.nodes, data.allSagaebTechSpellBaseStatsDataCsv.nodes])

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
        <Box sx={{ width: '100%', maxWidth: `calc(172px + 64px * 4 + 52px)` }}>
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
            <Table ref={ref} stickyHeader sx={{ width: `calc(172px + 64px * 4 + 52px)` }}>
              <TableHead sx={{ position: 'sticky', top: 0, zIndex: 3 }}>
                <TableRow>
                  <StyledTh align='center' sx={hasHeaderRow ? { position: 'sticky', left: 0, zIndex: 3, width: '172px' } : { width: '172px' }}>名称</StyledTh>
                  <StyledTh align='center' sx={{ width: '52px' }}>ランク</StyledTh>
                  <StyledTh align='center' sx={{ width: '64px' }}>ランク<br/>アップ<br/>必要回数</StyledTh>
                  <StyledTh align='center' sx={{ width: '64px' }}>威力</StyledTh>
                  <StyledTh align='center' sx={{ width: '64px' }}>BP<br/>コスト</StyledTh>
                  <StyledTh align='center' sx={{ width: '64px' }}>詠唱<br/>ターン数</StyledTh>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredNodes.map((node, index) => (
                  Array.from({ length: node.MaxRank }, (_, i) => i).map(rank => (
                    <StyledTrTwoToneB className={index % 2 === 0 ? (rank === 0 && hasHeaderRow ? 'darker-row-w-header' : 'darker-row') : (rank === 0 && hasHeaderRow ? 'lighter-row-w-header' : 'lighter-row')} key={index + '-' + rank}>
                      {rank === 0 && (hasHeaderRow ? <StyledTrh align='left' rowSpan={node.MaxRank} scope='row'>{node.ArtsName}</StyledTrh> : <StyledTd align='left' rowSpan={node.MaxRank}>{node.ArtsName}</StyledTd>)}
                      <StyledTd align='center'>{node.Rank[rank]}</StyledTd>
                      <StyledTd align='center'>{node.Count[rank]}</StyledTd>
                      <StyledTd align='center'>{node.Attack[rank]}</StyledTd>
                      <StyledTd align='center'>{node.BP[rank]}</StyledTd>
                      <StyledTd align='center'>{node.Turn[rank]}</StyledTd>
                    </StyledTrTwoToneB>
                  ))
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Box>
      </Box>
    </>
  )
}
