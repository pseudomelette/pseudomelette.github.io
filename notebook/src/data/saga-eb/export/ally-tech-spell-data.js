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
import List from '@mui/material/List'
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
  StyledTr,
  StyledTrh,
	StyledTrTwoToneB,
} from '../../../components/saga-eb/layout'
import Unite0Icon from '../../../images/unite-0-icon.svg'
import Unite0ReserveIcon from '../../../images/unite-0-reserve-icon.svg'
import Unite0SelfIcon from '../../../images/unite-0-self-icon.svg'
import Unite1Icon from '../../../images/unite-1-icon.svg'
import Unite1SelfIcon from '../../../images/unite-1-self-icon.svg'
import Unite1ReserveIcon from '../../../images/unite-1-reserve-icon.svg'
import UniteNaSelfIcon from '../../../images/unite-na-self-icon.svg'

import 'overlayscrollbars/overlayscrollbars.css'

import '../../../components/saga-eb/layout.css'

OverlayScrollbars.plugin(ClickScrollPlugin)

const RankRowStack = ({color, max, node}) => {
  const rows = []
  for (let i = 2; i <= max; i++) {
    rows.push(
      <StyledTrTwoToneB className={color} key={i}>
        <StyledTd align='center'>{i}</StyledTd>
        <StyledTd align='center'>{node['Count' + i]}</StyledTd>
        <StyledTd align='center'>{node['Attack' + i]}</StyledTd>
        <StyledTd align='center'>{node['BP' + i]}</StyledTd>
        <StyledTd align='center'>{node['Turn' + i]}</StyledTd>
      </StyledTrTwoToneB>
    )
  }
  return rows
}

const UniteIcons = ({left, reserve, right, self, speed, unite}) => {
  const style = {
    marginTop: '-1px',
    marginBottom: '-4px',
  }

  const styleIdx0 = {
    marginTop: '-1px',
    marginBottom: '-4px',
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
        area.push(<Unite0Icon key={'na-left-' + i} style={styleIdx0}/>)
      } else {
        area.push(<Unite0Icon key={'na-left-' + i} style={style}/>)
      }
    }
  }

  for (let i = 0; i < left; i++) {
    if (area.length === defaultIdx) {
      area.push(<Unite1Icon key={'1-left-' + i} style={styleIdx0}/>)
    } else {
      area.push(<Unite1Icon key={'1-left-' + i} style={style}/>)
    }
  }

  const selfIdx = area.length
  if (unite === '0') {
    if (area.length === defaultIdx) {
      area.push(<UniteNaSelfIcon key={'self'} style={styleIdx0}/>)
    } else {
      area.push(<UniteNaSelfIcon key={'self'} style={style}/>)
    }
  } else {
    if (reserve === '―') {
      if (self === '1') {
        if (area.length === defaultIdx) {
          area.push(<Unite1SelfIcon key={'self'} style={styleIdx0}/>)
        } else {
          area.push(<Unite1SelfIcon key={'self'} style={style}/>)
        }
      } else {
        if (area.length === defaultIdx) {
          area.push(<Unite0SelfIcon key={'self'} style={styleIdx0}/>)
        } else {
          area.push(<Unite0SelfIcon key={'self'} style={style}/>)
        }
      }
    } else {
      if (self === '1') {
        if (area.length === defaultIdx) {
          area.push(<Unite1ReserveIcon key={'self'} style={styleIdx0}/>)
        } else {
          area.push(<Unite1ReserveIcon key={'self'} style={style}/>)
        }
      } else {
        if (area.length === defaultIdx) {
          area.push(<Unite0ReserveIcon key={'self'} style={styleIdx0}/>)
        } else {
          area.push(<Unite0ReserveIcon key={'self'} style={style}/>)
        }
      }
    }
  }

  for (let i = 0; i < right; i++) {
    if (area.length === defaultIdx) {
      area.push(<Unite1Icon key={'1-right-' + i} style={styleIdx0}/>)
    } else {
      area.push(<Unite1Icon key={'1-right-' + i} style={style}/>)
    }
  }

  if (speed - right > 0) {
    for (let i = 0; i < speed - right; i++) {
      if (area.length === defaultIdx) {
        area.push(<Unite0Icon key={'na-right-' + i} style={styleIdx0}/>)
      } else {
        area.push(<Unite0Icon key={'na-right-' + i} style={style}/>)
      }
    }
  }

  return <Box sx={{ paddingLeft: `calc(32px * (((${area.length} - 1) / 2 - ${selfIdx}) - ${speed}))`, paddingRight: `calc(32px * (${speed} - ((${area.length} - 1) / 2 - ${selfIdx})))` }}>{area}</Box>
}

export const AllyTechSpellData = () => {
	const data = useStaticQuery(graphql`
		query {
			allSagaebAllyTechSpellDataCsv {
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
  const nodes = data.allSagaebAllyTechSpellDataCsv.nodes.filter(node => !['未使用技', '敵専用技'].includes(node['ArtsCategory']))

  const preprocess = (nodes) => {
    const preprocessEffect = (node, effect, param, self) => {
      let updatedEffect = effect
      switch(updatedEffect) {
        case '―':
        case 'リザーブ不可':
        case '支援':
          updatedEffect = ''
          break
        case 'ヘイト消去':
        case 'ガード不可':
        case 'メカ以外無効':
        case 'メカ修理':
        case 'ステルス':
        case '金剛プログラム':
        case '詠唱短縮':
        case 'ダメージ無効':
        case '状態回復':
        case '特殊効果解除':
          break
        case '範囲バンプ':
          updatedEffect += '（' + Number(node.Bump) + '）'
          break
        case '即死':
          updatedEffect = self ? '自爆' : updatedEffect + '（' + Number(param) + '）'
          break
        case 'LP':
          updatedEffect += '（-' + Number(param) + '）'
          break
        default:
          updatedEffect += '（' + Number(param) + '）'
      }

      return updatedEffect
    }

    const outputNodes = []

    nodes.forEach(node => {
      const outputNode = {}
      outputNode.ArtsName = node.ArtsName
      outputNode.ArtsCategory = node.ArtsCategory
      outputNode.Weapon = node.Weapon
      outputNode.WeaponSub = node.WeaponSub
      outputNode.MaxRank = node.MaxRank
      for (let i = 1; i <= node.MaxRank; i++) {
        outputNode['Count' + i] = node['Count' + i]
        outputNode['Attack' + i] = node.TargetParty === '敵' || ['パリイ', 'プロテクト'].includes(node.ReserveType) ? node['Attack' + i] : '―'
        outputNode['BP' + i] = Number(node['BP' + i])
        outputNode['Turn' + i] = node['Turn' + i] === '0.0' ? '―' : Number(node['Turn' + i])
      }
      const targetParty = node.TargetType === '自身' ? '' : node.TargetParty 
      const targetType = node.TargetType === '乱撃' ? node.TargetType + '（' + node.AttackCount + '）' : node.TargetType
      const targetArea = node.TargetParty === '味方' || (node.HitArea === '―' && node.SureHit === '0') ? '' : (node.SureHit === '0' ? node.HitArea : node.HitArea === '対地' ? '地上必中' : '必中')
      outputNode.Targets = [targetParty + targetType, targetArea].filter(target => target !== '')
      outputNode.Attribute = [node.Attribute1, node.Attribute2].filter(attr => attr !== '―').length > 0 ? [node.Attribute1, node.Attribute2].filter(attr => attr !== '―').join('') : '―'
      outputNode.BaseElement = node.BaseElement
      outputNode.Hit = node.Weapon === '術' || node.TargetParty === '味方' || node.Attack1 === '0' || node.SureHit === '1' ? '―' : node.Hit
      outputNode.Random = node.Attack1 === '0' || ['パリイ', 'プロテクト'].includes(node.ReserveType) ? '―' : node.Random === '0' ? '5' : node.Random
      outputNode.Hate = node.TargetParty === '味方' || [node.AddEffect1, node.AddEffect2].includes('即死') ? '―' : node.Hate
      outputNode.BaseParameter1 = node.ArtsCategory === 'メカ技' && node.Attack1 === '0' ? '―' : node.BaseParameter1
      outputNode.BaseParameter2 = node.BaseParameter2
      outputNode.AfterCasterSpeed = [node.AddEffect1, node.AddEffect2].includes('即死') ? '―' : node.AfterCasterSpeed
      outputNode.AfterTargetSpeed = node.Attack1 === '0' || ['パリイ', 'プロテクト'].includes(node.ReserveType) ? '―' : node.AfterTargetSpeed
      const addEffect1 = preprocessEffect(node, node.AddEffect1, node.AddEffectParam1, true)
      const addEffect2 = preprocessEffect(node, node.AddEffect2, node.AddEffectParam2, true)
      outputNode.SelfEffects = [addEffect1, addEffect2].filter(effect => effect !== '').length > 0 ? [addEffect1, addEffect2].filter(effect => effect !== '') : ['―']
      const effectType1 = preprocessEffect(node, node.EffectType1, node.EffectParam1, false)
      const effectType2 = preprocessEffect(node, node.EffectType2, node.EffectParam2, false)
      const effectType3 = preprocessEffect(node, node.EffectType3, node.EffectParam3, false)
      const effectType4 = preprocessEffect(node, node.EffectType4, node.EffectParam4, false)
      const effectBump = node.Bump === '0' ? '' : [node.EffectType1, node.EffectType2, node.EffectType3, node.EffectType4].includes('範囲バンプ') ? '' : 'バンプ（' + node.Bump + '）'
      const effectReserveCancel = node.ReserveCancel === '0' ? '' : 'リザーブ解除'
      const effectPenetration = node.Penetration === '0' ? '' : '防御力無効'
      const effects = [effectType1, effectType2, effectType3, effectType4, effectBump, effectReserveCancel, effectPenetration]
      outputNode.TargetEffects = effects.filter(effect => effect !== '').length > 0 ? effects.filter(effect => effect !== '') : ['―']
      const effectInvalidReserve = [node.EffectType1, node.EffectType2, node.EffectType3, node.EffectType4].includes('リザーブ不可') ? 'リザーブ不可' : ''
      let i = 1
      while ('EffectType' + i in node) {
        if (node['EffectType' + i] === '支援') {
          break
        }
        i += 1
      }
      const effectOverAttackBuff = 'EffectType' + i in node ? '支援（' + Number(node['EffectParam' + i]) + '）' : ''
      const effectDisableSelect = node.TargetParty === '味方' || node.DisableSelect === '0' ? '' : '抽選対象外'
      outputNode.MiscEffects = [effectInvalidReserve, effectOverAttackBuff, effectDisableSelect].filter(effect => effect !== '').length > 0 ? [effectInvalidReserve, effectOverAttackBuff, effectDisableSelect].filter(effect => effect !== '') : ['―']
      outputNode.Guard = node.BeforeGuard === '1' ? '行動前' : node.AfterGuard === '1' ? '行動後' : '―'
      outputNode.RaceSlayer = node.RaceSlayer
      outputNode.ReserveType = node.ReserveType
      outputNode.Reserve = ['0', '100'].includes(node.ReserveProb) ? node.ReserveType : node.ReserveType + '（' + node.ReserveProb + '％）'
      const singleStageFirstUnable = effectDisableSelect !== '' && node.ReserveType !== '―' && ((!outputNode.Attribute.includes('斬') && !outputNode.Attribute.includes('打') && !outputNode.Attribute.includes('突')) || effectInvalidReserve !== '') ? true : false
      const singleStageLastUnable = effectDisableSelect !== '' && !['武器技', '我流技'].includes(node.ArtsCategory) ? true : false
      outputNode.OverAttackFirst = node.TargetParty === '味方' || (node.OverAttack === '0' && singleStageFirstUnable) ? '―' : node.OverAttackFirst
      outputNode.OverAttackLast = node.TargetParty === '味方' || (node.OverAttack === '0' && singleStageLastUnable) ? '―' : node.OverAttackLast
      outputNode.Speed = node.Speed
      outputNode.OverAttack = node.OverAttack
      outputNode.OverAttackLeft = node.OverAttackLeft
      outputNode.OverAttackSelf = node.OverAttackSelf
      outputNode.OverAttackRight = node.OverAttackRight
      outputNode.AddOverAttackDamage = node.TargetParty === '味方' || node.OverAttack === '0' ? '―' : node.AddOverAttackDamage
      outputNode.AddSingleStageDamage = node.TargetParty === '味方' || singleStageFirstUnable ? '―' : node.AddSingleStageDamage
      outputNodes.push(outputNode)
    })

    return outputNodes
  }

  const [preprocessedNodes] = React.useState(preprocess(nodes))

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

  const filteredNodes = React.useRef(preprocessedNodes)
  const categoryFilter = React.useRef(new Map(preprocessedNodes.map(node => [node['ArtsCategory'], true])))
  const weaponFilter = React.useRef(new Map(preprocessedNodes.map(node => [node['Weapon'], true])))
  const weaponsubFilter = React.useRef(new Map(preprocessedNodes.map(node => [node['WeaponSub'], true])))

  const [updated, setUpdated] = React.useState(true)
  React.useEffect(() => {
    setUpdated(true)
  }, [preprocessedNodes, updated])

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
      filteredNodes.current = preprocessedNodes.filter(node => categoryFilter.current.get(node['ArtsCategory']) && weaponFilter.current.get(node['Weapon']) && weaponsubFilter.current.get(node['WeaponSub']))
      setUpdated(false)
      setFiletered(checkedAll)
      setOpen(false)
    }
    const handleApplyClose = () => {
      filter.keys().forEach(key => filter.set(key, checked.get(key)))
      filteredNodes.current = preprocessedNodes.filter(node => categoryFilter.current.get(node['ArtsCategory']) && weaponFilter.current.get(node['Weapon']) && weaponsubFilter.current.get(node['WeaponSub']))
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
      <Table stickyHeader sx={{ width: `calc(404px + 164px + 132px * 3 + 124px + 112px + 100px * 2 + 88px + 80px * 2 + 68px * 5 + 56px * 7 + 44px * 6)` }}>
        <TableHead sx={{ position: 'sticky', top: 0, zIndex: 3 }}>
          <TableRow>
            <StyledTh align='center' rowSpan={2} sx={{ position: 'sticky', left: 0, zIndex: 3, width: '164px' }}>名前</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '112px' }}>カテゴリ<FilterModal filter={categoryFilter.current} parent={'カテゴリ'}/></StyledTh>
            <StyledTh align='center' colSpan={2}>武器タイプ</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '56px' }}>ランク</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '68px' }}>ランク<br/>アップ<br/>必要回数</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '68px' }}>威力</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '68px' }}>BP<br/>コスト</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '68px' }}>詠唱<br/>ターン数</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '44px' }}>五行</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '124px' }}>リザーブタイプ</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '88px' }}>対象</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '56px' }}>基礎<br/>命中率</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '44px' }}>属性</StyledTh>
            <StyledTh align='center' colSpan={2}>影響能力</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '68px' }}>ダメージ<br/>乱数幅</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '56px' }}>ヘイト<br/>上昇量</StyledTh>
            <StyledTh align='center' colSpan={2}>速度低下量</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '56px' }}>行動<br/>防御</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '56px' }}>種族<br/>特攻</StyledTh>
            <StyledTh align='center' colSpan={3}>効果</StyledTh>
            <StyledTh align='center' colSpan={2}>連携名</StyledTh>
            <StyledTh align='center' colSpan={2}>連携率上昇量</StyledTh>
            <StyledTh align='center' rowSpan={2} sx={{ width: '404px' }}>連携範囲</StyledTh>
          </TableRow>
          <TableRow>
            <StyledTh align='center' sx={{ width: '100px' }}>メイン<FilterModal filter={weaponFilter.current} parent={'武器タイプ（メイン）'}/></StyledTh>
            <StyledTh align='center' sx={{ width: '100px' }}>サブ<FilterModal filter={weaponsubFilter.current} parent={'武器タイプ（サブ）'}/></StyledTh>
            <StyledTh align='center' sx={{ width: '44px' }}>自身</StyledTh>
            <StyledTh align='center' sx={{ width: '44px' }}>対象</StyledTh>
            <StyledTh align='center' sx={{ width: '44px' }}>自身</StyledTh>
            <StyledTh align='center' sx={{ width: '44px' }}>対象</StyledTh>
            <StyledTh align='center' sx={{ width: '132px' }}>自身</StyledTh>
            <StyledTh align='center' sx={{ width: '132px' }}>対象</StyledTh>
            <StyledTh align='center' sx={{ width: '132px' }}>その他</StyledTh>
            <StyledTh align='center' sx={{ width: '80px' }}>前</StyledTh>
            <StyledTh align='center' sx={{ width: '80px' }}>後</StyledTh>
            <StyledTh align='center' sx={{ width: '56px' }}>連携</StyledTh>
            <StyledTh align='center' sx={{ width: '56px' }}>独壇場</StyledTh>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredNodes.current.map((node, index) => {
            return (
              <React.Fragment key={index}>
                <StyledTrTwoToneB className={index % 2 === 0 ? 'darker-row-w-header' : 'lighter-row-w-header'}>
                  <StyledTrh align='left' rowSpan={node.MaxRank} scope='row'>{node.ArtsName}</StyledTrh>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.ArtsCategory}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.Weapon}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.WeaponSub}</StyledTd>
                  <StyledTd align='center'>1</StyledTd>
                  <StyledTd align='center'>{node.Count1}</StyledTd>
                  <StyledTd align='center'>{node.Attack1}</StyledTd>
                  <StyledTd align='center'>{node.BP1}</StyledTd>
                  <StyledTd align='center'>{node.Turn1}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.BaseElement}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.Reserve}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.Targets.map((target, subindex) => <React.Fragment key={subindex}>{target}<br/></React.Fragment>)}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.Hit}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.Attribute}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.BaseParameter1}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.BaseParameter2}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.Random}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.Hate}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.AfterCasterSpeed}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.AfterTargetSpeed}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.Guard}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.RaceSlayer}</StyledTd>
                  <StyledTd align='left' rowSpan={node.MaxRank}>{node.SelfEffects.map((effect, subindex) => <React.Fragment key={subindex}>{effect}<br/></React.Fragment>)}</StyledTd>
                  <StyledTd align='left' rowSpan={node.MaxRank}>{node.TargetEffects.map((effect, subindex) => <React.Fragment key={subindex}>{effect}<br/></React.Fragment>)}</StyledTd>
                  <StyledTd align='left' rowSpan={node.MaxRank}>{node.MiscEffects.map((effect, subindex) => <React.Fragment key={subindex}>{effect}<br/></React.Fragment>)}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.OverAttackFirst}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.OverAttackLast}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.AddOverAttackDamage}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}>{node.AddSingleStageDamage}</StyledTd>
                  <StyledTd align='center' rowSpan={node.MaxRank}><UniteIcons left={parseInt(node.OverAttackLeft)} reserve={node.ReserveType} right={parseInt(node.OverAttackRight)} self={node.OverAttackSelf} speed={parseInt(node.Speed)} unite={node.OverAttack}/></StyledTd>
                </StyledTrTwoToneB>
                <RankRowStack color={index % 2 === 0 ? 'darker-row' : 'lighter-row'} max={node.MaxRank} node={node}/>
              </React.Fragment>
            )
          })}
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}

export const UniteIconLegend = () => {
  return (
    <StyledTableContainer align='center'>
      <Table stickyHeader sx={{ minWidth: `calc(68px + 228px)`, maxWidth: '500px', tableLayout: 'fixed' }}>
        <TableHead sx={{ position: 'sticky', top: 0 }}>
          <TableRow>
            <StyledTh align='center' sx={{ width: '68px' }}>アイコン</StyledTh>
            <StyledTh align='center'>説明</StyledTh>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><svg width='16' height='20' viewBox='0 0 16 20' xmlns='http://www.w3.org/2000/svg' style={{ background: 'linear-gradient(to top, #ab84c2 0%, #ab84c200 100%)' }}/></StyledTd>
            <StyledTd align='left'>
              <List disablePadding sx={{ ml: 2, listStyleType: 'disc' }}>
                <li style={{ marginBottom: 0 }}>初期キャラクター位置</li>
              </List>
            </StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Unite0Icon/></StyledTd>
            <StyledTd align='left'></StyledTd>
              <List disablePadding sx={{ ml: 2, listStyleType: 'disc' }}>
                <li style={{ marginBottom: 0 }}>連携範囲外</li>
              </List>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Unite1Icon/></StyledTd>
            <StyledTd align='left'>連携範囲</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Unite1SelfIcon/></StyledTd>
            <StyledTd align='left'>行動順補正後のキャラクター位置<br/>連携範囲</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Unite0SelfIcon/></StyledTd>
            <StyledTd align='left'>行動順補正後のキャラクター位置<br/>連携範囲すり抜け</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><UniteNaSelfIcon/></StyledTd>
            <StyledTd align='left'>行動順補正後のキャラクター位置<br/>連携不可</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Unite1ReserveIcon/></StyledTd>
            <StyledTd align='left'>行動順補正後のキャラクター位置<br/>連携不可、発動時は連携範囲</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Unite0ReserveIcon/></StyledTd>
            <StyledTd align='left'>行動順補正後のキャラクター位置<br/>連携不可、発動時は連携範囲すり抜け</StyledTd>
          </StyledTr>
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}