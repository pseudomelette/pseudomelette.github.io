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
	StyledTableContainer,
	StyledTd,
	StyledTh,
  StyledTr,
  StyledTrh,
	StyledTrTwoToneB,
} from '../../../components/saga-eb/layout'
import { FilterModal } from '../../../components/saga-eb/modal'
import Unite0Icon from '../../../images/unite-0-icon.svg'
import Unite0ReserveIcon from '../../../images/unite-0-reserve-icon.svg'
import Unite0SelfIcon from '../../../images/unite-0-self-icon.svg'
import Unite1Icon from '../../../images/unite-1-icon.svg'
import Unite1SelfIcon from '../../../images/unite-1-self-icon.svg'
import Unite1ReserveIcon from '../../../images/unite-1-reserve-icon.svg'
import UniteNaSelfIcon from '../../../images/unite-na-self-icon.svg'

import '../../../components/saga-eb/layout.css'

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

  const defaultIdx = 11

  const area = []
  for (let i = 0; i < defaultIdx * 2 + 1; i++) {
    if (i < defaultIdx - speed - left || i > defaultIdx - speed + right) {
      area.push(<Unite0Icon key={'area-' + i} style={i === defaultIdx ? styleIdx0 : style}/>)
    } else if (i < defaultIdx - speed || i > defaultIdx - speed) {
      area.push(<Unite1Icon key={'area-' + i} style={i === defaultIdx ? styleIdx0 : style}/>)
    } else {
      if (unite === '0') {
        area.push(<UniteNaSelfIcon key={'area-' + i} style={i === defaultIdx ? styleIdx0 : style}/>)
      } else {
        if (reserve === '―') {
          if (self === '1') {
            area.push(<Unite1SelfIcon key={'area-' + i} style={i === defaultIdx ? styleIdx0 : style}/>)
          } else {
            area.push(<Unite0SelfIcon key={'area-' + i} style={i === defaultIdx ? styleIdx0 : style}/>)
          }
        } else {
          if (self === '1') {
            area.push(<Unite1ReserveIcon key={'area-' + i} style={i === defaultIdx ? styleIdx0 : style}/>)
          } else {
            area.push(<Unite0ReserveIcon key={'area-' + i} style={i === defaultIdx ? styleIdx0 : style}/>)
          }
        }
      }
    }
  }

  return <Box>{area}</Box>
}

const labels = new Map([
  ['ArtsCategory', 'カテゴリ'],
  ['Weapon', '武器タイプ（メイン）'],
  ['WeaponSub', '武器タイプ（サブ）'],
])

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

  const theme = useTheme()
  const [fixed, setFixed] = React.useState(useMediaQuery(theme.breakpoints.up('sm')))
  const [filterState, setFilterState] = React.useState({})
  const [modalColumn, setModalColumn] = React.useState(null)

  const FilterButton = ({column}) => {
    const selectedValues = filterState[column] ?? columnValueGroups[column]
    const isFiltered = selectedValues.length !== columnValueGroups[column].length
    return (
      <IconButton
        onClick={() => setModalColumn(column)}
        sx = {{ position: 'absolute', bottom: 0, right: 0 }}
      >
        {isFiltered ? <FilterAltIcon/> : <FilterListIcon/> }
      </IconButton>
    )
  }

  const handleFix = () => {
    setFixed(!fixed)
  }

  const handleFilterChange = (column, selectedValues) => {
    setFilterState(prev => ({...prev, [column]: selectedValues}))
    setModalColumn(null)
  }

  const preprocess = (nodes) => {
    const preprocessEffect = (node, effect, param, self) => {
      let updatedEffect = effect
      switch(updatedEffect) {
        case '―':
        case 'リザーブ対象外':
        case '支援':
          updatedEffect = ''
          break
        case 'ダメージ無効':
        case 'ガード不可':
        case '詠唱短縮':
        case 'ステルス':
        case 'ヘイト消去':
        case '状態回復':
        case 'メカ修理':
        case '特殊効果解除':
        case '金剛プログラム':
        case 'メカ限定':
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
      outputNode.MaxRank = node.MaxRank === '―' ? 1 : node.MaxRank
      outputNode.Rank1 = node.MaxRank === '―' ? node.MaxRank : 1
      for (let i = 1; i <= outputNode.MaxRank; i++) {
        outputNode['Count' + i] = node['Count' + i]
        outputNode['Attack' + i] = node.TargetParty === '敵' || node.ReserveType === 'プロテクト' ? node['Attack' + i] : '―'
        outputNode['BP' + i] = Number(node['BP' + i])
        outputNode['Turn' + i] = node['Turn' + i] === '0' ? '―' : Number(node['Turn' + i])
      }
      outputNode.BaseElement = node.BaseElement
      outputNode.ReserveType = node.ReserveType
      outputNode.Reserve = ['0', '100'].includes(node.ReserveProb) ? [node.ReserveType] : [node.ReserveType, '（' + node.ReserveProb + '％）']
      const targetParty = node.TargetType === '自身' ? '' : node.TargetParty 
      const targetType = node.TargetType === '他者' && node.ReserveType === 'フォロー' ? '単体' : node.TargetType
      const targetArea = node.TargetParty === '味方' || (node.HitArea === '―' && node.SureHit === '0') ? '' : (node.SureHit === '0' ? node.HitArea : node.HitArea === '対地' ? '地上必中' : '必中')
      outputNode.Targets = node.MaxRank === '―' ? ['―'] : [targetParty, targetType, targetArea].filter(target => target !== '')
      outputNode.AttackCount = node.Attack1 === '0' || node.TargetParty === '味方' ? '―' : node.AttackCount
      outputNode.Hit = node.Weapon === '術' || node.TargetParty === '味方' || node.Attack1 === '0' || node.SureHit === '1' ? '―' : node.Hit
      outputNode.Attribute = [node.Attribute1, node.Attribute2].filter(attr => attr !== '―').length > 0 ? [node.Attribute1, node.Attribute2].filter(attr => attr !== '―').join('') : '―'
      outputNode.BaseParameter1 = node.ArtsCategory === 'メカ技' && node.Attack1 === '0' ? '―' : node.BaseParameter1
      outputNode.BaseParameter2 = node.BaseParameter2
      outputNode.Random = node.Attack1 === '0' || ['パリイ', 'プロテクト'].includes(node.ReserveType) ? '―' : node.Random === '0' ? '5' : node.Random
      outputNode.Hate = node.TargetParty === '味方' || [node.AddEffect1, node.AddEffect2].includes('即死') ? '―' : node.Hate
      outputNode.AfterCasterSpeed = [node.AddEffect1, node.AddEffect2].includes('即死') ? '―' : node.AfterCasterSpeed
      outputNode.AfterTargetSpeed = node.Attack1 === '0' || ['パリイ', 'プロテクト'].includes(node.ReserveType) ? '―' : node.AfterTargetSpeed
      outputNode.Guard = node.BeforeGuard === '1' ? '行動前' : node.AfterGuard === '1' ? '行動後' : '―'
      outputNode.RaceSlayer = node.RaceSlayer
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
      const effects = [effectType1, effectType2, effectType3, effectType4, effectReserveCancel, effectPenetration].filter(effect => effect !== '')
      let i = 0
      if (effectBump !== '') {
        while (effects.length > i) {
          if (['ガード不可', '挑発', 'ヘイト消去', 'BP', '特殊効果解除', 'リザーブ解除', '防御力無効'].includes(effects[i])) {
            break
          }
          i += 1
        }
        effects.splice(i, 0, effectBump)
      }
      outputNode.TargetEffects = effects.length > 0 ? effects.filter(effect => effect !== '') : ['―']
      const effectInvalidReserve = [node.EffectType1, node.EffectType2, node.EffectType3, node.EffectType4].includes('リザーブ対象外') ? 'リザーブ対象外' : ''
      i = 1
      while ('EffectType' + i in node) {
        if (node['EffectType' + i] === '支援') {
          break
        }
        i += 1
      }
      const effectOverAttackBuff = 'EffectType' + i in node ? '支援（' + Number(node['EffectParam' + i]) + '）' : ''
      const effectDisableSelect = node.TargetParty === '味方' || node.DisableSelect === '0' ? '' : '追加発動候補外'
      outputNode.MiscEffects = [effectInvalidReserve, effectOverAttackBuff, effectDisableSelect].filter(effect => effect !== '').length > 0 ? [effectInvalidReserve, effectOverAttackBuff, effectDisableSelect].filter(effect => effect !== '') : ['―']
      const singleStageFirstUnable = effectDisableSelect !== '' && node.ReserveType !== '―' && ((!outputNode.Attribute.includes('斬') && !outputNode.Attribute.includes('打') && !outputNode.Attribute.includes('突')) || effectInvalidReserve !== '') ? true : false
      const singleStageLastUnable = effectDisableSelect !== '' && !['武器技', '我流技'].includes(node.ArtsCategory) ? true : false
      outputNode.Speed = node.Speed
      outputNode.OverAttack = node.OverAttack
      outputNode.OverAttackLeft = node.OverAttack === '0' ? '―' : node.OverAttackLeft
      outputNode.OverAttackLeftNum = node.OverAttackLeft
      outputNode.OverAttackSelf = node.OverAttack === '0' ? '―' : node.OverAttackSelf
      outputNode.OverAttackSelfNum = node.OverAttackSelf
      outputNode.OverAttackRight = node.OverAttack === '0' ? '―' : node.OverAttackRight
      outputNode.OverAttackRightNum = node.OverAttackRight
      outputNode.AddOverAttackDamage = node.TargetParty === '味方' || node.OverAttack === '0' ? '―' : node.AddOverAttackDamage
      outputNode.AddSingleStageDamage = node.TargetParty === '味方' || singleStageFirstUnable ? '―' : node.AddSingleStageDamage
      outputNode.OverAttackFirst = node.TargetParty === '味方' || (node.OverAttack === '0' && singleStageFirstUnable) ? '―' : node.OverAttackFirst
      outputNode.OverAttackLast = node.TargetParty === '味方' || (node.OverAttack === '0' && singleStageLastUnable) ? '―' : node.OverAttackLast
      outputNodes.push(outputNode)
    })

    return outputNodes
  }

  const nodes = React.useMemo(() => {
    return preprocess(data.allSagaebAllyTechSpellDataCsv.nodes.filter(node => !['未使用技', '敵専用技'].includes(node['ArtsCategory'])))
  }, [data.allSagaebAllyTechSpellDataCsv.nodes])

  const filteredNodes = React.useMemo(() => {
    return nodes.filter(node => Object.entries(filterState).every(([column, selectedValues]) => selectedValues.includes(node[column])))
  }, [nodes, filterState])

  const columnValueGroups = React.useMemo(() => {
    const map = {}
    labels.forEach((_, key) => {
      map[key] = Array.from(new Set(nodes.map(node => node[key])))
    })
    return map
  }, [nodes])

  return(
    <>
      {modalColumn &&
        <FilterModal
          column={modalColumn}
          label={labels.get(modalColumn)}
          onApply={handleFilterChange}
          onClose={() => setModalColumn(null)}
          selectedValues={filterState[modalColumn] ?? columnValueGroups[modalColumn]}
          valueGroups={columnValueGroups}
        />
      }
      <StyledTableContainer align='center'>
        <Box sx={{ position: 'sticky', top: 0, left: 0, zIndex: 4 }}>
          <IconButton 
            onClick={handleFix}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              background: fixed ? '' : '#1631483f',
              '&:hover': {
                background: fixed ? '' : '#1631487f',
              },
            }}
          >
            {fixed ? <PushPinIcon sx={{ color: '#163148' }}/> : <PushPinOutlinedIcon sx={{ color: '#cccccc' }}/>}
          </IconButton>
        </Box>
        <Table stickyHeader sx={{ width: `calc(342px + 164px + 132px * 3 + 120px + 108px * 2 + 104px + 80px * 2 + 68px * 6 + 56px * 8 + 52px * 2 + 44px * 8)` }}>
          <TableHead sx={{ position: 'sticky', top: 0, zIndex: 3 }}>
            <TableRow>
              <StyledTh align='center' rowSpan={2} sx={fixed ? { position: 'sticky', left: 0, zIndex:  3, width: '164px' } : { width: '164px' }}>名前</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '120px' }}>カテゴリ<FilterButton column='ArtsCategory'/></StyledTh>
              <StyledTh align='center' colSpan={2}>武器タイプ</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '56px' }}>ランク</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '68px' }}>ランク<br/>アップ<br/>必要回数</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '68px' }}>威力</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '68px' }}>BP<br/>コスト</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '68px' }}>詠唱<br/>ターン数</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '44px' }}>五行</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '104px' }}>リザーブタイプ</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '68px' }}>対象</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '44px' }}>攻撃<br/>回数</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '56px' }}>基礎<br/>命中率</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '44px' }}>属性</StyledTh>
              <StyledTh align='center' colSpan={2}>影響能力</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '68px' }}>ダメージ<br/>乱数幅</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '56px' }}>ヘイト<br/>上昇量</StyledTh>
              <StyledTh align='center' colSpan={2}>すばやさ低下量</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '56px' }}>行動<br/>防御</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '56px' }}>種族<br/>特攻</StyledTh>
              <StyledTh align='center' colSpan={3}>効果</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '56px' }}>行動順<br/>補正</StyledTh>
              <StyledTh align='center' colSpan={3}>連携範囲</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '342px' }}>タイムラインイメージ</StyledTh>
              <StyledTh align='center' colSpan={2}>連携名</StyledTh>
              <StyledTh align='center' colSpan={2}>連携率上昇量</StyledTh>
            </TableRow>
            <TableRow>
              <StyledTh align='center' sx={{ width: '108px' }}>メイン<FilterButton column='Weapon'/></StyledTh>
              <StyledTh align='center' sx={{ width: '108px' }}>サブ<FilterButton column='WeaponSub'/></StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>自身</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>対象</StyledTh>
              <StyledTh align='center' sx={{ width: '52px' }}>自身</StyledTh>
              <StyledTh align='center' sx={{ width: '52px' }}>対象</StyledTh>
              <StyledTh align='center' sx={{ width: '132px' }}>自身</StyledTh>
              <StyledTh align='center' sx={{ width: '132px' }}>対象</StyledTh>
              <StyledTh align='center' sx={{ width: '132px' }}>その他</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>前方</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>自身</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>後方</StyledTh>
              <StyledTh align='center' sx={{ width: '80px' }}>最後以外</StyledTh>
              <StyledTh align='center' sx={{ width: '80px' }}>最後</StyledTh>
              <StyledTh align='center' sx={{ width: '56px' }}>連携</StyledTh>
              <StyledTh align='center' sx={{ width: '56px' }}>独壇場</StyledTh>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNodes.map((node, index) => {
              return (
                <React.Fragment key={index}>
                  <StyledTrTwoToneB className={index % 2 === 0 ? (fixed ? 'darker-row-w-header' : 'darker-row') : (fixed ? 'lighter-row-w-header' : 'lighter-row')}>
                    {fixed ? <StyledTrh align='left' rowSpan={node.MaxRank} scope='row'>{node.ArtsName}</StyledTrh> : <StyledTd align='left' rowSpan={node.MaxRank}>{node.ArtsName}</StyledTd>}
                    <StyledTd align='center' rowSpan={node.MaxRank}>{node.ArtsCategory}</StyledTd>
                    <StyledTd align='center' rowSpan={node.MaxRank}>{node.Weapon}</StyledTd>
                    <StyledTd align='center' rowSpan={node.MaxRank}>{node.WeaponSub}</StyledTd>
                    <StyledTd align='center'>{node.Rank1}</StyledTd>
                    <StyledTd align='center'>{node.Count1}</StyledTd>
                    <StyledTd align='center'>{node.Attack1}</StyledTd>
                    <StyledTd align='center'>{node.BP1}</StyledTd>
                    <StyledTd align='center'>{node.Turn1}</StyledTd>
                    <StyledTd align='center' rowSpan={node.MaxRank}>{node.BaseElement}</StyledTd>
                    <StyledTd align='center' rowSpan={node.MaxRank}>{node.Reserve.map((reserveType, subindex) => <React.Fragment key={subindex}>{reserveType}<br/></React.Fragment>)}</StyledTd>
                    <StyledTd align='center' rowSpan={node.MaxRank}>{node.Targets.map((target, subindex) => <React.Fragment key={subindex}>{target}<br/></React.Fragment>)}</StyledTd>
                    <StyledTd align='center' rowSpan={node.MaxRank}>{node.AttackCount}</StyledTd>
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
                    <StyledTd align='center' rowSpan={node.MaxRank}>{node.Speed}</StyledTd>
                    <StyledTd align='center' rowSpan={node.MaxRank}>{node.OverAttackLeft}</StyledTd>
                    <StyledTd align='center' rowSpan={node.MaxRank}>{node.OverAttackSelf}</StyledTd>
                    <StyledTd align='center' rowSpan={node.MaxRank}>{node.OverAttackRight}</StyledTd>
                    <StyledTd align='center' rowSpan={node.MaxRank}><UniteIcons left={parseInt(node.OverAttackLeftNum)} reserve={node.ReserveType} right={parseInt(node.OverAttackRightNum)} self={node.OverAttackSelfNum} speed={parseInt(node.Speed)} unite={node.OverAttack}/></StyledTd>
                    <StyledTd align='center' rowSpan={node.MaxRank}>{node.OverAttackFirst}</StyledTd>
                    <StyledTd align='center' rowSpan={node.MaxRank}>{node.OverAttackLast}</StyledTd>
                    <StyledTd align='center' rowSpan={node.MaxRank}>{node.AddOverAttackDamage}</StyledTd>
                    <StyledTd align='center' rowSpan={node.MaxRank}>{node.AddSingleStageDamage}</StyledTd>
                  </StyledTrTwoToneB>
                  <RankRowStack color={index % 2 === 0 ? 'darker-row' : 'lighter-row'} max={node.MaxRank} node={node}/>
                </React.Fragment>
              )
            })}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  )
}

export const UniteIconLegend = () => {
  return (
    <StyledTableContainer align='center'>
      <Table stickyHeader sx={{ minWidth: `calc(68px + 228px)`, maxWidth: '540px', tableLayout: 'fixed' }}>
        <TableHead sx={{ position: 'sticky', top: 0 }}>
          <TableRow>
            <StyledTh align='center' sx={{ width: '68px' }}>アイコン</StyledTh>
            <StyledTh align='center'>説明</StyledTh>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><svg width='16' height='20' viewBox='0 0 16 20' xmlns='http://www.w3.org/2000/svg' style={{ background: 'linear-gradient(to top, #ab84c2 0%, #ab84c200 100%)' }}/></StyledTd>
            <StyledTd align='left'>行動順補正前のキャラクター位置</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Unite0Icon/></StyledTd>
            <StyledTd align='left'>連携範囲外</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Unite1Icon/></StyledTd>
            <StyledTd align='left'>連携範囲</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Unite1SelfIcon/></StyledTd>
            <StyledTd align='left'>行動順補正後のキャラクター位置（連携範囲）</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Unite0SelfIcon/></StyledTd>
            <StyledTd align='left'>行動順補正後のキャラクター位置（連携範囲すり抜け）</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><UniteNaSelfIcon/></StyledTd>
            <StyledTd align='left'>行動順補正後のキャラクター位置（連携不可）</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Unite1ReserveIcon/></StyledTd>
            <StyledTd align='left'>行動順補正後のキャラクター位置（発動前は連携不可、発動時は連携範囲）</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Unite0ReserveIcon/></StyledTd>
            <StyledTd align='left'>行動順補正後のキャラクター位置（発動前は連携不可、発動時は連携範囲すり抜け）</StyledTd>
          </StyledTr>
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}