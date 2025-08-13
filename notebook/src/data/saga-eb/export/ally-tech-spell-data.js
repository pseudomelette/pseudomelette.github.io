import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
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

import '../../../components/saga-eb/layout.css'

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
      { key: 'Weapon', label: 'メイン', width: '124px' },
      { key: 'WeaponSub', label: 'サブ', width: '124px' },
    ],
  },
]

const UniteIcons = ({ left, reserve, right, self, speed, unite }) => {
  const rowRef = React.useRef(null)
  const [background, setBackgound] = React.useState('#00000000')

  const selfIdx = 11 - speed

  React.useEffect(() => {
    if (rowRef.current) {
      setBackgound(getComputedStyle(rowRef.current.closest('tr')).backgroundColor)
    }
  }, [])

  const area = []
  for (let i = selfIdx - left; i <= selfIdx + right; i++) {
    let iconId = 'unite-1'
    if (i === selfIdx) {
      if (unite === '0') {
        iconId = 'unite-na-self'
      } else if (self === '0') {
        iconId = reserve === '―' ? 'unite-0-self' : 'unite-0-reserve'
      } else {
        iconId = reserve === '―' ? 'unite-1-self' : 'unite-1-reserve'
      }
    }

    area.push(
      <g key={i} transform={`translate(${i * 12}, 0)`}>
        <rect width='12' height='20' fill={background}/>
        <use href={`#${iconId}`}/>
      </g>
    )
  }

  return (
    <svg ref={rowRef} width={276} height={30} style={{ marginTop: '-2px', marginBottom: '-4px' }}>
      <use href='#unite-0x23'/>
      {area}
    </svg>
  )
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

  const preprocess = (nodes) => {
    const preprocessEffect = (node, effect, param, self) => {
      const noParamEffects = [
        'ダメージ無効',
        'ガード不可',
        '詠唱短縮',
        'ステルス',
        'ヘイト消去',
        '状態回復',
        'メカ修理',
        '特殊効果解除',
        '金剛プログラム',
        'メカ限定',
      ]
      const blankEffects = [
        '―',
        'リザーブ対象外',
        '連携時攻撃力',
      ]

      let updatedEffect = `${effect}（${param}）`
      if (noParamEffects.includes(effect)) {
        updatedEffect = effect
      } else if (blankEffects.includes(effect)) {
        updatedEffect = ''
      } else if (effect === '範囲バンプ') {
        updatedEffect = `${effect}（${node.Bump}）`
      } else if (effect === '即死') {
        updatedEffect = self ? '自爆' : `${effect}（${param}）`
      } else if (effect === 'LP') {
        updatedEffect = `${effect}（-${param}）`
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
      for (let i = 1; i <= outputNode.MaxRank; i++) {
        outputNode['Count' + i] = node['Count' + i]
        outputNode['Attack' + i] = node.TargetParty === '敵' || node.ReserveType === 'プロテクト' ? node['Attack' + i] : '―'
        outputNode['BP' + i] = node['BP' + i]
        outputNode['Turn' + i] = node['Turn' + i] === '0' ? '―' : node['Turn' + i]
      }
      outputNode.BaseElement = node.BaseElement
      outputNode.ReserveType = node.ReserveType
      outputNode.Reserve = ['0', '100'].includes(node.ReserveProb) ? [node.ReserveType] : [node.ReserveType, `（${node.ReserveProb}％）`]
      const targetParty = node.TargetType === '自身' ? '' : node.TargetParty 
      const targetType = node.TargetType === '他者' && node.ReserveType === 'フォロー' ? '単体' : node.TargetType
      outputNode.Targets = [targetParty, targetType].filter(target => target !== '')
      const hitArea = node.Weapon === '術' || node.TargetParty === '味方' || node.Attack1 === '0' || node.HitArea === '―' || (node.SureHit === '1' && node.HitArea !== '対地') ? '' : node.HitArea
      const sureHit = node.Weapon === '術' || node.TargetParty === '味方' || node.Attack1 === '0' || node.SureHit === '0' ? '' : '必中'
      outputNode.HitProperties = [hitArea, sureHit].filter(effect => effect !== '').length > 0 ? [hitArea, sureHit].filter(effect => effect !== '') : ['―']
      outputNode.Hit = node.Weapon === '術' || node.TargetParty === '味方' || node.Attack1 === '0' || node.SureHit === '1' ? '―' : node.Hit
      outputNode.AttackCount = node.Attack1 === '0' || node.TargetParty === '味方' ? '―' : node.AttackCount
      outputNode.Attribute = [node.Attribute1, node.Attribute2].filter(attr => attr !== '―').length > 0 ? [node.Attribute1, node.Attribute2].filter(attr => attr !== '―').join('') : '―'
      outputNode.BaseParameter1 = node.ArtsCategory === 'メカ技' && node.Attack1 === '0' ? '―' : node.BaseParameter1
      outputNode.BaseParameter2 = node.BaseParameter2
      outputNode.Random = node.Attack1 === '0' || ['パリイ', 'プロテクト'].includes(node.ReserveType) ? '―' : node.Random === '0' ? '5' : node.Random
      outputNode.Hate = node.TargetParty === '味方' || [node.AddEffect1, node.AddEffect2].includes('即死') ? '―' : node.Hate
      outputNode.AfterCasterSpeed = [node.AddEffect1, node.AddEffect2].includes('即死') ? '―' : node.AfterCasterSpeed
      outputNode.AfterTargetSpeed = node.Attack1 === '0' || ['パリイ', 'プロテクト'].includes(node.ReserveType) ? '―' : node.AfterTargetSpeed
      const addEffect1 = preprocessEffect(node, node.AddEffect1, node.AddEffectParam1, true)
      const addEffect2 = preprocessEffect(node, node.AddEffect2, node.AddEffectParam2, true)
      outputNode.SelfEffects = [addEffect1, addEffect2].filter(effect => effect !== '').length > 0 ? [addEffect1, addEffect2].filter(effect => effect !== '') : ['―']
      const effectRaceSlayer = node.RaceSlayer === '―' ? '' : node.RaceSlayer + '特攻'
      const effectType1 = preprocessEffect(node, node.EffectType1, node.EffectParam1, false)
      const effectType2 = preprocessEffect(node, node.EffectType2, node.EffectParam2, false)
      const effectType3 = preprocessEffect(node, node.EffectType3, node.EffectParam3, false)
      const effectType4 = preprocessEffect(node, node.EffectType4, node.EffectParam4, false)
      const effectBump = node.Bump === '0' ? '' : [node.EffectType1, node.EffectType2, node.EffectType3, node.EffectType4].includes('範囲バンプ') ? '' : `バンプ（${node.Bump}）`
      const effectReserveCancel = node.ReserveCancel === '0' ? '' : 'リザーブ解除'
      const effectPenetration = node.Penetration === '0' ? '' : '防御力無効'
      const effects = [effectRaceSlayer, effectType1, effectType2, effectType3, effectType4, effectReserveCancel, effectPenetration].filter(effect => effect !== '')
      if (effectBump !== '') {
        const bumpIndex = effects.map(effect => effect.split('（')[0]).findIndex(effect => ['ガード不可', '挑発', 'ヘイト消去', 'BP', '特殊効果解除', 'リザーブ解除', '防御力無効'].includes(effect))
        effects.splice(bumpIndex < 0 ? effects.length : bumpIndex, 0, effectBump)
      }
      outputNode.TargetEffects = effects.length > 0 ? effects.filter(effect => effect !== '') : ['―']
      const effectGuard = node.BeforeGuard === '1' ? '行動前防御' : node.AfterGuard === '1' ? '行動後防御' : ''
      const index = [node.EffectType1, node.EffectType2, node.EffectType3, node.EffectType4].indexOf('連携時攻撃力')
      const effectOverAttackBuff = index < 0 ? '' : `連携時攻撃力（${node['EffectParam' + (index + 1)]}）`
      const effectInvalidReserve = [node.EffectType1, node.EffectType2, node.EffectType3, node.EffectType4].includes('リザーブ対象外') ? 'リザーブ対象外' : ''
      const effectDisableSelect = node.TargetParty === '味方' || node.DisableSelect === '0' ? '' : '追加発動候補外'
      outputNode.MiscEffects = [effectGuard, effectOverAttackBuff, effectInvalidReserve, effectDisableSelect].filter(effect => effect !== '').length > 0 ? [effectGuard, effectOverAttackBuff, effectInvalidReserve, effectDisableSelect].filter(effect => effect !== '') : ['―']
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

  const filterValues = React.useMemo(() => {
    const leafColumns = columns.flatMap(parent => parent.children.length === 0 ? [parent] : parent.children)

    const map = {}
    leafColumns.forEach(column => {
      map[column.key] = Array.from(new Set(nodes.map(node => node[column.key])))
    })
    return map
  }, [nodes])

  const [filterState, setFilterState] = React.useState(filterValues)
  const [modalOpen, setModalOpen] = React.useState(false)

  const filteredNodes = React.useMemo(() => {
    return nodes.filter(node => Object.entries(filterState).every(([column, selectedValues]) => selectedValues.includes(node[column])))
  }, [nodes, filterState])

  const RankData = ({column, node}) => {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '16px 24px',
          gap: '2px 6px',
          whiteSpace: 'pre-line',
          lineHeight: '18px',
        }}
      >
        <svg width='16' height={16 * node.MaxRank + 2 * (node.MaxRank - 1)} style={{ marginTop: '1px' }}>
          <use href={`#rank-${node.MaxRank}`}/>
        </svg>
        {Array.from({ length: node.MaxRank }, (_, i) => node[column + (i + 1)]).join('\n')}
      </Box>
    )
  }

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
      <StyledTableContainer align='center'>
        <Box sx={{ position: 'sticky', top: 0, left: 0, zIndex: 4 }}>
          <IconButton
            onClick={() => setModalOpen(true)}
            sx={{
              position: 'absolute',
              top: '4px',
              left: '4px',
              padding: '4px',
              border: '1px solid',
              borderColor: '#2b4a669f',
              boxShadow: 4,
              background: 'linear-gradient(to bottom, #1f3b53af 0%, #4eb89aaf 100%)',
              '&:hover': {
                background: 'linear-gradient(to bottom, #1f3b53df 0%, #4eb89adf 100%)',
              },
            }}
          >
            {Object.keys(filterState).every(column => filterState[column].length === filterValues[column].length) ? <FilterListIcon sx={{ color: '#ffffff'}}/> : <FilterAltIcon sx={{ color: '#ffffff'}}/>}
          </IconButton>
        </Box>
        <Table stickyHeader sx={{ width: `calc(296px + 156px + 124px * 3 + 100px + 88px + 76px * 4 + 64px * 5 + 52px * 5 + 44px * 12)` }}>
          <TableHead sx={{ position: 'sticky', top: 0, zIndex: 3 }}>
            <TableRow>
              <StyledTh align='center' rowSpan={2} sx={{ position: 'sticky', left: 0, zIndex:  3, width: '156px' }}>名前</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '88px' }}>カテゴリ</StyledTh>
              <StyledTh align='center' colSpan={2}>武器タイプ</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '64px' }}>ランク<br/>アップ<br/>必要回数</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '64px' }}>威力</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '64px' }}>BP<br/>コスト</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '64px' }}>詠唱<br/>ターン数</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '44px' }}>五行</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '100px' }}>リザーブタイプ</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '44px' }}>行動<br/>対象</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '44px' }}>命中<br/>特性</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '52px' }}>基礎<br/>命中率</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '44px' }}>攻撃<br/>回数</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '44px' }}>属性</StyledTh>
              <StyledTh align='center' colSpan={2}>依存能力</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '64px' }}>ダメージ<br/>乱数幅</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '52px' }}>ヘイト<br/>上昇量</StyledTh>
              <StyledTh align='center' colSpan={2}>速度低下量</StyledTh>
              <StyledTh align='center' colSpan={3}>追加効果</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '52px' }}>行動順<br/>補正</StyledTh>
              <StyledTh align='center' colSpan={3}>連携範囲</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '296px' }}>タイムラインイメージ</StyledTh>
              <StyledTh align='center' colSpan={2}>連携名</StyledTh>
              <StyledTh align='center' colSpan={2}>連携率上昇量</StyledTh>
            </TableRow>
            <TableRow>
              <StyledTh align='center' sx={{ width: '76px' }}>メイン</StyledTh>
              <StyledTh align='center' sx={{ width: '76px' }}>サブ</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>自身</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>対象</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>自身</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>対象</StyledTh>
              <StyledTh align='center' sx={{ width: '124px' }}>自身</StyledTh>
              <StyledTh align='center' sx={{ width: '124px' }}>対象</StyledTh>
              <StyledTh align='center' sx={{ width: '124px' }}>その他</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>前方</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>自身</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>後方</StyledTh>
              <StyledTh align='center' sx={{ width: '76px' }}>最後以外</StyledTh>
              <StyledTh align='center' sx={{ width: '76px' }}>最後</StyledTh>
              <StyledTh align='center' sx={{ width: '52px' }}>連携</StyledTh>
              <StyledTh align='center' sx={{ width: '52px' }}>独壇場</StyledTh>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNodes.map((node, index) => {
              return (
                <StyledTrTwoToneB className={index % 2 === 0 ? 'darker-row-w-header' : 'lighter-row-w-header'} key={index}>
                  <StyledTrh align='left' scope='row'>{node.ArtsName}</StyledTrh>
                  <StyledTd align='center'>{node.ArtsCategory}</StyledTd>
                  <StyledTd align='center'>{node.Weapon}</StyledTd>
                  <StyledTd align='center'>{node.WeaponSub}</StyledTd>
                  <StyledTd align='center'><RankData column='Count' node={node}/></StyledTd>
                  <StyledTd align='center'><RankData column='Attack' node={node}/></StyledTd>
                  <StyledTd align='center'><RankData column='BP' node={node}/></StyledTd>
                  <StyledTd align='center'><RankData column='Turn' node={node}/></StyledTd>
                  <StyledTd align='center'>{node.BaseElement}</StyledTd>
                  <StyledTd align='center' sx={{ whiteSpace: 'pre-line' }}>{node.Reserve.join('\n')}</StyledTd>
                  <StyledTd align='center' sx={{ whiteSpace: 'pre-line' }}>{node.Targets.join('\n')}</StyledTd>
                  <StyledTd align='center' sx={{ whiteSpace: 'pre-line' }}>{node.HitProperties.join('\n')}</StyledTd>
                  <StyledTd align='center'>{node.Hit}</StyledTd>
                  <StyledTd align='center'>{node.AttackCount}</StyledTd>
                  <StyledTd align='center'>{node.Attribute}</StyledTd>
                  <StyledTd align='center'>{node.BaseParameter1}</StyledTd>
                  <StyledTd align='center'>{node.BaseParameter2}</StyledTd>
                  <StyledTd align='center'>{node.Random}</StyledTd>
                  <StyledTd align='center'>{node.Hate}</StyledTd>
                  <StyledTd align='center'>{node.AfterCasterSpeed}</StyledTd>
                  <StyledTd align='center'>{node.AfterTargetSpeed}</StyledTd>
                  <StyledTd align='left' sx={{ whiteSpace: 'pre-line' }}>{node.SelfEffects.join('\n')}</StyledTd>
                  <StyledTd align='left' sx={{ whiteSpace: 'pre-line' }}>{node.TargetEffects.join('\n')}</StyledTd>
                  <StyledTd align='left' sx={{ whiteSpace: 'pre-line' }}>{node.MiscEffects.join('\n')}</StyledTd>
                  <StyledTd align='center'>{node.Speed}</StyledTd>
                  <StyledTd align='center'>{node.OverAttackLeft}</StyledTd>
                  <StyledTd align='center'>{node.OverAttackSelf}</StyledTd>
                  <StyledTd align='center'>{node.OverAttackRight}</StyledTd>
                  <StyledTd align='center'><UniteIcons left={parseInt(node.OverAttackLeftNum)} reserve={node.ReserveType} right={parseInt(node.OverAttackRightNum)} self={node.OverAttackSelfNum} speed={parseInt(node.Speed)} unite={node.OverAttack}/></StyledTd>
                  <StyledTd align='center'>{node.OverAttackFirst}</StyledTd>
                  <StyledTd align='center'>{node.OverAttackLast}</StyledTd>
                  <StyledTd align='center'>{node.AddOverAttackDamage}</StyledTd>
                  <StyledTd align='center'>{node.AddSingleStageDamage}</StyledTd>
                </StyledTrTwoToneB>
              )
            })}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  )
}

export const UniteIconLegend = () => {
  const Icon = ({ id }) => (
    <svg width='12' height='20' style={{ marginTop: '-2px', marginBottom: '-4px' }}>
      <use href={`#${id}`}/>
    </svg>
  )

  return (
    <StyledTableContainer align='center'>
      <Table stickyHeader sx={{ maxWidth: '548px', tableLayout: 'fixed' }}>
        <TableHead sx={{ position: 'sticky', top: 0 }}>
          <TableRow>
            <StyledTh align='center' sx={{ width: '68px' }}>アイコン</StyledTh>
            <StyledTh align='center'>説明</StyledTh>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Icon id={'unite-1'}/></StyledTd>
            <StyledTd align='left'>連携範囲</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Icon id={'unite-0'}/></StyledTd>
            <StyledTd align='left'>連携範囲外</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Icon id={'unite-1-self'}/></StyledTd>
            <StyledTd align='left'>行動順補正後のキャラクター位置（連携範囲）</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Icon id={'unite-0-self'}/></StyledTd>
            <StyledTd align='left'>行動順補正後のキャラクター位置（連携範囲すり抜け）</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Icon id={'unite-na-self'}/></StyledTd>
            <StyledTd align='left'>行動順補正後のキャラクター位置（連携不可）</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Icon id={'unite-1-reserve'}/></StyledTd>
            <StyledTd align='left'>行動順補正後のキャラクター位置（発動前は連携不可、発動時は連携範囲）</StyledTd>
          </StyledTr>
          <StyledTr>
            <StyledTd align='center' sx={{ paddingTop: '5px', paddingBottom: '2px' }}><Icon id={'unite-0-reserve'}/></StyledTd>
            <StyledTd align='left'>行動順補正後のキャラクター位置（発動前は連携不可、発動時は連携範囲すり抜け）</StyledTd>
          </StyledTr>
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}