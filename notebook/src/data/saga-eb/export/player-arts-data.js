import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { ClickScrollPlugin, OverlayScrollbars } from 'overlayscrollbars'

import {
	StyledTableContainer,
	StyledTd,
	StyledTh,
	StyledTrh,
	StyledTrTwoToneB,
} from '../../../components/saga-eb/layout'
import Unite0ReserveIcon from '../../../images/unite-0-reserve-icon.svg'
import Unite0SelfIcon from '../../../images/unite-0-self-icon.svg'
import Unite1Icon from '../../../images/unite-1-icon.svg'
import Unite1SelfIcon from '../../../images/unite-1-self-icon.svg'
import Unite1ReserveIcon from '../../../images/unite-1-reserve-icon.svg'
import UniteNaIcon from '../../../images/unite-na-icon.svg'
import UniteNaSelfIcon from '../../../images/unite-na-self-icon.svg'

import 'overlayscrollbars/overlayscrollbars.css'

import '../../../components/saga-eb/layout.css'

OverlayScrollbars.plugin(ClickScrollPlugin)

const RankRowStack = ({color, max, node}) => {
  const rows = []
  for (let i = 2; i <= max; i++) {
    rows.push(
      <StyledTrTwoToneB className={color}>
        <StyledTd align='center'>{node['Count' + i]}</StyledTd>
        <StyledTd align='center'>{node['Attack' + i]}</StyledTd>
        <StyledTd align='center'>{node['BP' + i]}</StyledTd>
        <StyledTd align='center'>{node['Turn' + i] === '0' ? '―' : node['Turn' + i]}</StyledTd>
      </StyledTrTwoToneB>
    )
  }
  return rows
}

const UniteIcons = ({left, reserve, right, self, speed, unite}) => {
  const style = {
    marginTop: '0px',
    marginBottom: '-5px',
  }

  const styleIdx0 = {
    marginTop: '0px',
    marginBottom: '-5px',
    background: 'linear-gradient(to top, #ab84c2 0%, #ab84c200 100%)',
  }

  let defaultIdx = speed + left
  if (speed + left < 0) {
    defaultIdx = 0
  }

  const area = []
  if (speed + left < 0) {
    for (let i = 0; i < -(speed + left); i++) {
      if (area.length === defaultIdx) {
        area.push(<UniteNaIcon style={styleIdx0}/>)
      } else {
        area.push(<UniteNaIcon style={style}/>)
      }
    }
  }

  for (let i = 0; i < left; i++) {
    if (area.length === defaultIdx) {
      area.push(<Unite1Icon style={styleIdx0}/>)
    } else {
      area.push(<Unite1Icon style={style}/>)
    }
  }

  const selfIdx = area.length
  if (unite === '0') {
    if (area.length === defaultIdx) {
      area.push(<UniteNaSelfIcon style={styleIdx0}/>)
    } else {
      area.push(<UniteNaSelfIcon style={style}/>)
    }
  } else {
    if (reserve === '―') {
      if (self === '1') {
        if (area.length === defaultIdx) {
          area.push(<Unite1SelfIcon style={styleIdx0}/>)
        } else {
          area.push(<Unite1SelfIcon style={style}/>)
        }
      } else {
        if (area.length === defaultIdx) {
          area.push(<Unite0SelfIcon style={styleIdx0}/>)
        } else {
          area.push(<Unite0SelfIcon style={style}/>)
        }
      }
    } else {
      if (self === '1') {
        if (area.length === defaultIdx) {
          area.push(<Unite1ReserveIcon style={styleIdx0}/>)
        } else {
          area.push(<Unite1ReserveIcon style={style}/>)
        }
      } else {
        if (area.length === defaultIdx) {
          area.push(<Unite0ReserveIcon style={styleIdx0}/>)
        } else {
          area.push(<Unite0ReserveIcon style={style}/>)
        }
      }
    }
  }

  for (let i = 0; i < right; i++) {
    if (area.length === defaultIdx) {
      area.push(<Unite1Icon style={styleIdx0}/>)
    } else {
      area.push(<Unite1Icon style={style}/>)
    }
  }

  if (speed - right > 0) {
    for (let i = 0; i < speed - right; i++) {
      if (area.length === defaultIdx) {
        area.push(<UniteNaIcon style={styleIdx0}/>)
      } else {
        area.push(<UniteNaIcon style={style}/>)
      }
    }
  }

  return <Box sx={{ paddingLeft: `calc(32px * (((${area.length} - 1) / 2 - ${selfIdx}) - ${speed}))`, paddingRight: `calc(32px * (${speed} - ((${area.length} - 1) / 2 - ${selfIdx})))` }}>{area}</Box>
}

export const PlayerArtsData = () => {
	const data = useStaticQuery(graphql`
		query {
			allSagaebPlayerArtsDataCsv {
				nodes {
					ArtsName
					OverAttackFirst
					OverAttackLast
					ArtsCategory
					Weapon
					WeaponSub
					Attribute1
					Attribute2
					TargetParty
					TargetType
					MaxRank
					Count1
					Count2
					Count3
					Count4
					Count5
					Attack1
					Attack2
					Attack3
					Attack4
					Attack5
					AttackCount
					BP1
					BP2
					BP3
					BP4
					BP5
					Turn1
					Turn2
					Turn3
					Turn4
					Turn5
					Hit
					Speed
					AfterCasterSpeed
					AfterTargetSpeed
					Bump
					Hate
					BaseParameter1
					BaseParameter2
					BaseElement
					EffectType1
					EffectType2
					EffectType3
					EffectType4
					EffectParam1
					EffectParam2
					EffectParam3
					EffectParam4
					AddEffect1
					AddEffect2
					AddEffectParam1
					AddEffectParam2
					Random
					HitArea
					SureHit
					Penetration
					BeforeGuard
					AfterGuard
					RaceSlayer
					ReserveCancel
					ReserveType
					ReserveProb
					DisableSelect
					OverAttack
					OverAttackLeft
					OverAttackSelf
					OverAttackRight
					AddOverAttackDamage
					AddSingleStageDamage
				}
			}
		}
	`)
  const nodes = data.allSagaebPlayerArtsDataCsv.nodes.filter(node => !['未使用技', '敵専用技'].includes(node['ArtsCategory']))

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    minWidth: '212px',
    translate: '-50% -50%',
    overflow: 'hidden',
    overscrollBehavior: 'none',
    color: '#ffffff',
    background: '#526f92',
    boxShadow: 24,
  }

  const filteredNodes = React.useRef(nodes)
  const categoryFilter = React.useRef(new Map(nodes.map(node => [node['ArtsCategory'], true])))
  const weaponFilter = React.useRef(new Map(nodes.map(node => [node['Weapon'], true])))
  const weaponsubFilter = React.useRef(new Map(nodes.map(node => [node['WeaponSub'], true])))

  const [updated, setUpdated] = React.useState(true)
  React.useEffect(() => {
    setUpdated(true)
  }, [nodes, updated])

  const FilterModal = ({filter, parent}) => {
    const [open, setOpen] = React.useState(false)
    const [checked, setChecked] = React.useState(new Map(filter))
    const [checkedAll, setCheckedAll] = React.useState(!Array.from(filter.values()).includes(false))
    const [filtered, setFiletered] = React.useState(checkedAll)
    const [observer, setObserver] = React.useState(false)
    const [initialized, setInitialized] = React.useState(true)

    const handleOpen = () => {
      setOpen(true)
      setInitialized(false)
    }
    const handleCancelClose = () => {
      filteredNodes.current = nodes.filter(node => categoryFilter.current.get(node['ArtsCategory']) && weaponFilter.current.get(node['Weapon']) && weaponsubFilter.current.get(node['WeaponSub']))
      setUpdated(false)
      setFiletered(checkedAll)
      setOpen(false)
    }
    const handleApplyClose = () => {
      filter.keys().forEach(key => filter.set(key, checked.get(key)))
      filteredNodes.current = nodes.filter(node => categoryFilter.current.get(node['ArtsCategory']) && weaponFilter.current.get(node['Weapon']) && weaponsubFilter.current.get(node['WeaponSub']))
      setUpdated(false)
      setFiletered(checkedAll)
      setOpen(false)
    }

    const handleChange = (event) => {
      const buffer = new Map(checked)
      buffer.set(event.target.id, event.target.checked)
      setChecked(new Map(buffer))
      setCheckedAll(!Array.from(buffer.values()).includes(false))
    }
    const handleChangeAll = (event) => {
      const buffer = new Map(checked)
      buffer.keys().forEach(key => buffer.set(key, event.target.checked))
      setChecked(new Map(buffer))
      setCheckedAll(event.target.checked)
    }

    React.useEffect(() => {
      if (!initialized) {
        setObserver(!observer)
        if (document.querySelector('.modal-form') !== null) {
          OverlayScrollbars(document.querySelector('.modal-form'), {
            scrollbars: {
              theme: 'os-theme-dark os-theme-modal',
              clickScroll: true,
            },
          })
          setInitialized(true)
        }
      }
    }, [initialized, observer])

    return (
      <Box sx={{ position: 'absolute', top: `calc(50% - 18px)`, right: 0 }}>
        <IconButton onClick={handleOpen}>
          {filtered ? <FilterListIcon fontSize='small'/> : <FilterAltIcon fontSize='small'/>}
        </IconButton>
        <Modal open={open} onClose={handleCancelClose}>
          <Box sx={style}>
            <FormGroup sx={{ py: 1, pl: 2, borderWidth: '2px 2px 0px 2px', borderStyle: 'solid', borderColor: '#2b4a66', background: '#cccccc', color: '#163148' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedAll}
                    indeterminate={!checkedAll && Array.from(checked.values()).includes(true)}
                    onChange={handleChangeAll}
                    sx={{ color: '#163148', '&.Mui-checked': { color: '#163148' }, '&.MuiCheckbox-indeterminate': { color: '#163148'} }}
                  />
                }
                label={parent}
              />
            </FormGroup>
            <Box className='modal-form' sx={{ overflow: 'scroll', overscrollBehavior: 'none', border: '2px solid', borderColor: '#2b4a66' }}>
              <FormGroup sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', px: 2, py: 1, height: '50vh' }}>
                {Array.from(checked).map((item, index) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={item[1] ? true : false}
                        id={item[0]}
                        onChange={handleChange}
                        sx={{ py: 1, color: '#ffffff', '&.Mui-checked': { color: '#ffffff' } }}
                      />
                    }
                    key={index}
                    label={item[0]}
                    sx={{ pr: 2 }}
                  />
                ))}
              </FormGroup>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 1, background: '#1f3b53' }}>
              <Button
                onClick={handleCancelClose}
                sx={{
                  width: 90,
                  border: '1px solid',
                  borderColor: '#f8d36f',
                  boxShadow: 8,
                  color: '#ffffff',
                  background: 'linear-gradient(to bottom, #805f9200 0%, #ab84c200 100%)',
                  '&:hover': {
                    background: 'linear-gradient(to bottom, #805f924f 0%, #ab84c24f 100%)',
                  },
                }}
              >
                キャンセル
              </Button>
              <Button
                onClick={handleApplyClose}
                sx={{
                  width: 90,
                  border: '1px solid',
                  borderColor: '#f8d36f',
                  boxShadow: 8,
                  color: '#ffffff',
                  background: 'linear-gradient(to bottom, #805f92cf 0%, #ab84c2cf 100%)',
                  '&:hover': {
                    background: 'linear-gradient(to bottom, #805f92 0%, #ab84c2 100%)',
                  },
                }}
              >
                OK
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    )
  }

  return(
    <StyledTableContainer align='center'>
      <Table stickyHeader sx={{ width: `calc(100px * 39)` }}>
        <TableHead sx={{ position: 'sticky', top: 0 }}>
        <TableRow>
            <StyledTh align='center' rowSpan={2} sx={{ position: 'sticky', left: 0, zIndex: 3 }}>名前</StyledTh>
            <StyledTh align='center' rowSpan={2}>修得<br/>カテゴリ<FilterModal filter={categoryFilter.current} parent={'カテゴリ'}/></StyledTh>
            <StyledTh align='center' colSpan={2}>武器カテゴリ</StyledTh>
            <StyledTh align='center' colSpan={2}>連携名</StyledTh>
            <StyledTh align='center' rowSpan={2}>属性</StyledTh>
            <StyledTh align='center' colSpan={3} rowSpan={2}>対象</StyledTh>
            <StyledTh align='center' rowSpan={2}>ランク<br/>アップ<br/>必要回数</StyledTh>
            <StyledTh align='center' rowSpan={2}>威力</StyledTh>
            <StyledTh align='center' rowSpan={2}>BP<br/>コスト</StyledTh>
            <StyledTh align='center' rowSpan={2}>詠唱<br/>ターン数</StyledTh>
            <StyledTh align='center' rowSpan={2}>基本<br/>命中率</StyledTh>
            <StyledTh align='center' colSpan={2}>速度低下量</StyledTh>
            <StyledTh align='center' rowSpan={2}>バンプ量</StyledTh>
            <StyledTh align='center' rowSpan={2}>ヘイト<br/>上昇量</StyledTh>
            <StyledTh align='center' colSpan={2}>参照能力値</StyledTh>
            <StyledTh align='center' rowSpan={2}>五行</StyledTh>
            <StyledTh align='center' colSpan={6}>効果</StyledTh>
            <StyledTh align='center' rowSpan={2}>威力<br/>ランダム幅</StyledTh>
            <StyledTh align='center' rowSpan={2}>必中</StyledTh>
            <StyledTh align='center' rowSpan={2}>防御力無効</StyledTh>
            <StyledTh align='center' rowSpan={2}>行動防御</StyledTh>
            <StyledTh align='center' rowSpan={2}>種族特攻</StyledTh>
            <StyledTh align='center' rowSpan={2}>リザーブ解除</StyledTh>
            <StyledTh align='center' colSpan={2}>リザーブ</StyledTh>
            <StyledTh align='center' rowSpan={2}>独壇場<br/>抽選可否</StyledTh>
            <StyledTh align='center' rowSpan={2}>連携範囲</StyledTh>
            <StyledTh align='center' colSpan={2}>連携率上昇量</StyledTh>
          </TableRow>
          <TableRow>
            <StyledTh align='center'>メイン<FilterModal filter={weaponFilter.current} parent={'武器種'}/></StyledTh>
            <StyledTh align='center'>サブ<FilterModal filter={weaponsubFilter.current} parent={'武器種詳細'}/></StyledTh>
            <StyledTh align='center'>前</StyledTh>
            <StyledTh align='center'>後</StyledTh>
            <StyledTh align='center' >自身</StyledTh>
            <StyledTh align='center' >対象</StyledTh>
            <StyledTh align='center'>自身</StyledTh>
            <StyledTh align='center'>対象</StyledTh>
            <StyledTh align='center'>自身1</StyledTh>
            <StyledTh align='center'>自身2</StyledTh>
            <StyledTh align='center'>対象1</StyledTh>
            <StyledTh align='center'>対象2</StyledTh>
            <StyledTh align='center'>対象3</StyledTh>
            <StyledTh align='center'>対象4</StyledTh>
            <StyledTh align='center'>タイプ</StyledTh>
            <StyledTh align='center'>発動率</StyledTh>
            <StyledTh align='center'>連携</StyledTh>
            <StyledTh align='center'>独壇場</StyledTh>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredNodes.current.map((node, index) => {
            return (
              <>
              <StyledTrTwoToneB className={index % 2 === 0 ? 'darker-blue-row-w-header' : 'lighter-blue-row-w-header'} key={index}>
                <StyledTrh align='left' rowSpan={node.MaxRank} scope='row'>{node.ArtsName}</StyledTrh>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.ArtsCategory}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.Weapon}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.WeaponSub}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.OverAttackFirst}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.OverAttackLast}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.Attribute1}＋{node.Attribute2}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.TargetParty}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.TargetType}{node.TargetType === '乱撃' ? '×' + node.AttackCount : ''}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.SureHit === '0' ? node.HitArea : node.HitArea === '対地' ? '地上必中' : '必中'}</StyledTd>
                <StyledTd align='center'>{node.Count1}</StyledTd>
                <StyledTd align='center'>{node.Attack1}</StyledTd>
                <StyledTd align='center'>{node.BP1}</StyledTd>
                <StyledTd align='center'>{node.Turn1 === '0' ? '―' : node.Turn1}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.Hit}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.AfterCasterSpeed}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.AfterTargetSpeed}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.Bump}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.Hate}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.BaseParameter1}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.BaseParameter2}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.BaseElement}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.AddEffect1}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.AddEffect2}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.EffectType1}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.EffectType2}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.EffectType3}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.EffectType4}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.Random === '0' ? '5' : node.Random}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.SureHit}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.Penetration}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.BeforeGuard === '1' ? '行動前' : node.AfterGuard === '1' ? '行動後' : '―'}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.RaceSlayer}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.ReserveCancel}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.ReserveType}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.ReserveProb}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.DisableSelect}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}><UniteIcons left={parseInt(node.OverAttackLeft)} reserve={node.ReserveType} right={parseInt(node.OverAttackRight)} self={node.OverAttackSelf} speed={parseInt(node.Speed)} unite={node.OverAttack}/></StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.AddOverAttackDamage}</StyledTd>
                <StyledTd align='center' rowSpan={node.MaxRank}>{node.AddSingleStageDamage}</StyledTd>
              </StyledTrTwoToneB>
              <RankRowStack color={index % 2 === 0 ? 'darker-blue-row' : 'lighter-blue-row'} max={node.MaxRank} node={node}/>
            </>
          )
          })}
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}
