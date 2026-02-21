import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import CancelIcon from '@mui/icons-material/Cancel'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PushPinIcon from '@mui/icons-material/PushPin'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import SearchIcon from '@mui/icons-material/Search'
import ViewColumnIcon from '@mui/icons-material/ViewColumn'
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined'
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'

import {
  useHorizontalScroll,
	StyledTableContainer,
	StyledTd,
	StyledTh,
  StyledTrh,
	StyledTrTwoToneB,
} from '../../../components/saga-eb/layout'
import { ColumnModal, FilterModal } from '../../../components/saga-eb/modal'

const filterColumnMap = new Map([
  ['ArtsCategory', {
    label: 'カテゴリ',
    values: ['武器技', '我流技', '固有技', 'ソウル技', 'ブラッド技', '継承技', 'モンスター技', 'メカ技', '術', '敵専用技', '支援専用技'],
    default: ['武器技', '我流技', '固有技', 'ソウル技', 'ブラッド技', '継承技', 'モンスター技', 'メカ技', '術'],
  }],
  ['Weapon', {
    label: '武器タイプ：メイン',
    values: ['片手剣', '両手剣', '片手銃', '両手銃', '体術', '継承', 'モンスター', '近接メカ', '射撃メカ', '術', '敵専用'],
    default: ['片手剣', '両手剣', '片手銃', '両手銃', '体術', '継承', 'モンスター', '近接メカ', '射撃メカ', '術', '敵専用'],
  }],
  ['WeaponSub', {
    label: '武器タイプ：サブ',
    values: ['汎用片手剣', '長剣', '細剣', '短剣', '斧', '二刀', '汎用両手剣', '大剣', '刀', '薙刀', '片手銃', '二丁拳銃', '剣×銃', '汎用両手銃', '機関銃', '火炎放射器', '電撃銃', '爆撃銃', '化学銃', 'パンチ', 'キック', '体当たり', '–'],
    default: ['汎用片手剣', '長剣', '細剣', '短剣', '斧', '二刀', '汎用両手剣', '大剣', '刀', '薙刀', '片手銃', '二丁拳銃', '剣×銃', '汎用両手銃', '機関銃', '火炎放射器', '電撃銃', '爆撃銃', '化学銃', 'パンチ', 'キック', '体当たり', '–'],
  }],
])

const customColumnMap = new Map([
  ['名称', {
    group: ['ArtsName'],
    width: 172,
    mandatory: true,
    default: true,
    searchable: true,
  }],
  ['カテゴリ', {
    group: ['ArtsCategory'],
    width: 88,
    mandatory: false,
    default: true,
    searchable: true,
  }],
  ['武器タイプ', {
    group: ['Weapon', 'WeaponSub'],
    width: 152,
    mandatory: false,
    default: true,
    searchable: true,
  }],
  ['表示ダメージ分割比率', {
    group: ['Ratio1', 'Ratio2', 'Ratio3', 'Ratio4', 'Ratio5', 'Ratio6', 'Ratio7', 'Ratio8', 'Ratio9'],
    width: 396,
    mandatory: true,
    default: true,
    searchable: true,
  }],
])

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
        for (let i = 1; i <= 9; i++) {
          outputNode['Ratio' + i] = ratioNode['Ratio' + i] !== '0' ? (Number(ratioNode['Ratio' + i]) * 1000 / 10).toString() : '–'
        }
        outputNodes.push(outputNode)
      }
    })

    return outputNodes
  }

  const nodes = React.useMemo(() => (
    preprocess(data.allSagaebTechSpellRatioDataCsv.nodes, data.allSagaebTechSpellBaseStatsDataCsv.nodes)
  ), [data.allSagaebTechSpellRatioDataCsv.nodes, data.allSagaebTechSpellBaseStatsDataCsv.nodes])

  const theme = useTheme()
  const [filterStateMap, setFilterStateMap] = React.useState(new Map([...filterColumnMap.keys()].map(key => [key, filterColumnMap.get(key).default])))
  const [filterModalOpen, setFilterModalOpen] = React.useState(false)
  const [columnState, setColumnState] = React.useState([...customColumnMap.keys()].filter(key => customColumnMap.get(key).default))
  const [columnModalOpen, setColumnModalOpen] = React.useState(false)
  const [pinned, setPinned] = React.useState(useMediaQuery(theme.breakpoints.up('sm')))
  const [mounted, setMounted] = React.useState(false)
  const [keyword, setKeyword] = React.useState('')

  const filteredNodes = React.useMemo(() => {
    const filteredRows = nodes.filter(node => [...filterStateMap.entries()].every(([column, values]) => values.includes(node[column])))

    if (keyword) {
      const word = keyword.toLowerCase()
      const columns = [...customColumnMap.keys()].filter(key => customColumnMap.get(key).searchable && columnState.includes(key)).flatMap(key => customColumnMap.get(key).group)

      return filteredRows.filter(node => columns.some(key => node[key].toLowerCase().includes(word)))
    } else {
      return filteredRows
    }
  }, [nodes, keyword, filterStateMap, columnState])

  const tableWidth = React.useMemo(() => (
    [...customColumnMap.keys()].filter(key => columnState.includes(key)).reduce((sum, key) => sum + customColumnMap.get(key).width, 0)
  ), [columnState])

  React.useEffect(() => (
    setMounted(true)
  ), [])

  const ref = React.useRef(null)
  const hasScroll = useHorizontalScroll(ref)
  const hasHeaderColumn = mounted && (pinned || !hasScroll)

  return (
    <>
      {filterModalOpen &&
        <FilterModal
          columnMap={filterColumnMap}
          stateMap={filterStateMap}
          onApply={setFilterStateMap}
          onClose={() => setFilterModalOpen(false)}
          open={filterModalOpen}
        />
      }
      {columnModalOpen &&
        <ColumnModal
          columnMap={customColumnMap}
          state={columnState}
          onApply={setColumnState}
          onClose={() => setColumnModalOpen(false)}
          open={columnModalOpen}
        />
      }
      <Box sx={{ display: 'flex', justifyContent: 'center', width:'100%' }}>
        <Box sx={{ width: '100%', minWidth: '308px', maxWidth: `${tableWidth}px` }}>
          <IconButton
            onClick={() => setFilterModalOpen(true)}
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
            {[...filterStateMap.keys()].every(column => filterStateMap.get(column).length === filterColumnMap.get(column).values.length) ? <FilterListIcon sx={{ color: '#ffffff' }}/> : <FilterAltIcon sx={{ color: '#ffffff' }}/>}
          </IconButton>
          <IconButton
            onClick={() => setColumnModalOpen(true)}
            sx={{
              zIndex: 4,
              mt: 1,
              ml: 2,
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
            {columnState.length === customColumnMap.size ? <ViewColumnOutlinedIcon sx={{ color: '#ffffff' }}/> : <ViewColumnIcon sx={{ color: '#ffffff' }}/>}
          </IconButton>
          <IconButton
            disabled={!hasScroll}
            onClick={() => setPinned(!pinned)}
            sx={{
              zIndex: 4,
              mt: 1,
              ml: 2,
              padding: '4px',
              transform: 'rotate(45deg)',
              border: '1px solid',
              borderColor: hasScroll ? '#f8d36f' : '#f8d36f7f',
              borderRadius: 0,
              boxShadow: 4,
              background: hasScroll ? 'linear-gradient(135deg, #805f92cf 30%, #ab84c2cf 70%)' : '#00000000',
              '&:hover': {
                filter: 'brightness(1.1)',
              },
              '& .MuiSvgIcon-root': {
                transform: 'rotate(-45deg)',
              },
            }}
          >
            {hasHeaderColumn ? <PushPinIcon sx={{ color: hasScroll ? '#ffffff' : '#ffffff7f' }}/> : <PushPinOutlinedIcon sx={{ color: '#ffffff' }}/>}
          </IconButton>
          <TextField
            autoComplete='off'
            onChange={(e) => setKeyword(e.target.value)}
            size='small'
            slotProps={{
              input: {
                endAdornment: keyword && (
                  <InputAdornment
                    position='end'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      marginLeft: '2px',
                    }}
                  >
                    <IconButton onClick={() => setKeyword('')} size='small'>
                      <CancelIcon fontSize='small' sx={{ color: '#ffffff' }}/>
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment:
                  <InputAdornment
                    position='start'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      marginRight: '6px',
                      paddingLeft: '4px',
                    }}
                  >
                    <SearchIcon sx={{ color: '#ffffff' }}/>
                  </InputAdornment>,
                sx: {
                  height: '28px',
                  marginTop: '8px',
                  marginLeft: '16px',
                  p: 0,
                },
              }
            }}
            value={keyword}
            variant='outlined'
            sx={{
              width: `calc(100% - 32px * 3 - 16px * 2 + 4px)`,
              maxWidth: '272px',
              '& .MuiOutlinedInput-input': {
                paddinfTop: '6px',
                color: '#ffffff',
              },
              '@supports (-moz-appearance: none)': {
                '& .MuiOutlinedInput-input': {
                  paddingTop: '12px',
                },
              },
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#1f3b53',
                '&:hover': {
                  filter: 'brightness(1.1)',
                },
                '& fieldset': {
                  borderColor: '#f8d36f',
                },
                '&:hover fieldset': {
                  filter: 'brightness(1.1)',
                  borderColor: '#f8d36f',
                },
                '&.Mui-focused fieldset': {
                  borderWidth: 1,
                  borderColor: '#f8d36f',
                },
              },
              '& .MuiOutlinedInput-root.Mui-focused': {
                filter: 'brightness(1.1)',
                backgroundColor: '#163148',
              },
            }}
          />
          <StyledTableContainer align='center' sx={{ mt: 0, overscrollBehaviorY: 'contain' }}>
            <Table ref={ref} stickyHeader sx={{ width: `${tableWidth}px`, tableLayout: 'fixed' }}>
              <TableHead sx={{ position: 'sticky', top: 0, zIndex: 3 }}>
                <TableRow>
                  {columnState.includes('名称') && <StyledTh align='center' rowSpan={2} sx={hasHeaderColumn ? { position: 'sticky', left: 0, zIndex: 3, width: `${customColumnMap.get('名称').width}px` } : { width: `${customColumnMap.get('名称').width}px` }}>名称</StyledTh>}
                  {columnState.includes('カテゴリ') && <StyledTh align='center' rowSpan={2} sx={{ width: `${customColumnMap.get('カテゴリ').width}px` }}>カテゴリ</StyledTh>}
                  {columnState.includes('武器タイプ') && <StyledTh align='center' colSpan={2} sx={{ width: `${customColumnMap.get('武器タイプ').width}px` }}>武器タイプ</StyledTh>}
                  {columnState.includes('表示ダメージ分割比率') && <StyledTh align='center' colSpan={9} sx={{ width: `${customColumnMap.get('表示ダメージ分割比率').width}px` }}>表示ダメージ分割比率</StyledTh>}
                </TableRow>
                <TableRow>
                  {columnState.includes('武器タイプ') && <StyledTh align='center'>メイン</StyledTh>}
                  {columnState.includes('武器タイプ') && <StyledTh align='center'>サブ</StyledTh>}
                  {columnState.includes('表示ダメージ分割比率') && <StyledTh align='center'>1</StyledTh>}
                  {columnState.includes('表示ダメージ分割比率') && <StyledTh align='center'>2</StyledTh>}
                  {columnState.includes('表示ダメージ分割比率') && <StyledTh align='center'>3</StyledTh>}
                  {columnState.includes('表示ダメージ分割比率') && <StyledTh align='center'>4</StyledTh>}
                  {columnState.includes('表示ダメージ分割比率') && <StyledTh align='center'>5</StyledTh>}
                  {columnState.includes('表示ダメージ分割比率') && <StyledTh align='center'>6</StyledTh>}
                  {columnState.includes('表示ダメージ分割比率') && <StyledTh align='center'>7</StyledTh>}
                  {columnState.includes('表示ダメージ分割比率') && <StyledTh align='center'>8</StyledTh>}
                  {columnState.includes('表示ダメージ分割比率') && <StyledTh align='center'>9</StyledTh>}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredNodes.map((node, index) => (
                  <StyledTrTwoToneB className={index % 2 === 0 ? (hasHeaderColumn ? 'darker-row-w-header' : 'darker-row') : (hasHeaderColumn ? 'lighter-row-w-header' : 'lighter-row')} key={index}>
                    {columnState.includes('名称') && <StyledTrh align='left' className={hasHeaderColumn ? 'sticky' : undefined} scope='row'>{node.ArtsName}</StyledTrh>}
                    {columnState.includes('カテゴリ') && <StyledTd align='center'>{node.ArtsCategory}</StyledTd>}
                    {columnState.includes('武器タイプ') && <StyledTd align='center'>{node.Weapon}</StyledTd>}
                    {columnState.includes('武器タイプ') && <StyledTd align='center'>{node.WeaponSub}</StyledTd>}
                    {columnState.includes('表示ダメージ分割比率') && <StyledTd align='center'>{node.Ratio1}</StyledTd>}
                    {columnState.includes('表示ダメージ分割比率') && <StyledTd align='center'>{node.Ratio2}</StyledTd>}
                    {columnState.includes('表示ダメージ分割比率') && <StyledTd align='center'>{node.Ratio3}</StyledTd>}
                    {columnState.includes('表示ダメージ分割比率') && <StyledTd align='center'>{node.Ratio4}</StyledTd>}
                    {columnState.includes('表示ダメージ分割比率') && <StyledTd align='center'>{node.Ratio5}</StyledTd>}
                    {columnState.includes('表示ダメージ分割比率') && <StyledTd align='center'>{node.Ratio6}</StyledTd>}
                    {columnState.includes('表示ダメージ分割比率') && <StyledTd align='center'>{node.Ratio7}</StyledTd>}
                    {columnState.includes('表示ダメージ分割比率') && <StyledTd align='center'>{node.Ratio8}</StyledTd>}
                    {columnState.includes('表示ダメージ分割比率') && <StyledTd align='center'>{node.Ratio9}</StyledTd>}
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
