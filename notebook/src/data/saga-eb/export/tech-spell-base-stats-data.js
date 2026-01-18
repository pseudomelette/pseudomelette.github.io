import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PushPinIcon from '@mui/icons-material/PushPin'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import {
  useHorizontalScroll,
	StyledTableContainer,
	StyledTd,
	StyledTh,
  StyledTr,
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
        iconId = reserve === '–' ? 'unite-0-self' : 'unite-0-reserve'
      } else {
        iconId = reserve === '–' ? 'unite-1-self' : 'unite-1-reserve'
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

export const TechSpellBaseStatsData = () => {
	const data = useStaticQuery(graphql`
		query {
			allSagaebTechSpellBaseStatsDataCsv(filter: {ArtsCategory: {nin: ["特殊行動", "未使用技"]}}) {
				nodes {
					ArtsName
          AdditionalArts
					ArtsCategory
          PlayerUse
          EnemyUse
					Weapon
					WeaponSub
					Attribute1
					Attribute2
					TargetParty
					TargetType
					Attack
					AttackCount
					BP
          Turn
					Hit
					Speed
					AfterCasterSpeed
					AfterTargetSpeed
					Bump
					Hate
					Random
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
    const preprocessEffect = (effect, param, self) => {
      const noParamEffects = [
        'ダメージ無効',
        'ガード不可',
        '詠唱短縮',
        'ステルス',
        'ヘイト消去',
        '状態回復',
        'メカ修理',
        '特殊効果解除',
        'メカ限定',
      ]
      const blankEffects = [
        '–',
        '範囲バンプ',
        'リザーブ不可',
        '連携時攻撃力',
        'ガード率',
        '吸収回復',
        '召喚',
        'カエル戦士',
        'エレメンタル金',
        'プーカ',
        'デコバット',
        '廻転虫',
        '人格変化',
        '霊機・イワナガヒメ',
        '霊機・カグツチ',
        '霊機・スサノオ',
        '霊機・獅子の精',
        '霊機・弁慶',
        '機人・狂恋フレッド',
        '熱の防壁',
        '冷の防壁',
        '雷の防壁',
        '術扱い',
        'トライ',
      ]

      let updatedEffect = `${effect}（${param}）`
      if (noParamEffects.includes(effect)) {
        updatedEffect = effect
      } else if (blankEffects.includes(effect)) {
        updatedEffect = ''
      } else if (effect === '金剛プログラム') {
        updatedEffect = '半強制メカマヒ'
      } else if (effect === '即死') {
        updatedEffect = self ? '強制即死' : `${effect}（${param}）`
      } else if (effect === '捕食') {
        updatedEffect = '強制即死'
      }

      return updatedEffect
    }

    const findEffect = (effects, name) => effects.find(effect => effect.type === name)

    const findSelfEffects = (effects) => {
      const selfEffects = []
      selfEffects.push(findEffect(effects, '吸収回復') ? '吸収回復' : '')
      selfEffects.push(findEffect(effects, '捕食') ? '全回復' : '')
      selfEffects.push(findEffect(effects, '人格変化') ? '人格変化' : '')
      selfEffects.push(findEffect(effects, '霊機・イワナガヒメ') ? (findEffect(effects, '霊機・イワナガヒメ').param === '0' ? '└ 霊機・イワナガヒメ' : '└ 霊機・コノハナサクヤ') : '')
      selfEffects.push(findEffect(effects, '霊機・カグツチ') ? (findEffect(effects, '霊機・カグツチ').param === '0' ? '└ 霊機・カグツチ' : '└ 霊機・アメノウズメ') : '')
      selfEffects.push(findEffect(effects, '霊機・スサノオ') ? (findEffect(effects, '霊機・スサノオ').param === '0' ? '└ 霊機・スサノオ' : '└ 霊機・ヤマタノオロチ') : '')
      selfEffects.push(findEffect(effects, '霊機・獅子の精') ? (findEffect(effects, '霊機・獅子の精').param === '0' ? '└ 霊機・獅子の精' : '└ 霊機・胡蝶の精') : '')
      selfEffects.push(findEffect(effects, '霊機・弁慶') ? (findEffect(effects, '霊機・弁慶').param === '0' ? '└ 霊機・弁慶' : '└ 霊機・牛若丸') : '')
      selfEffects.push(findEffect(effects, '機人・狂恋フレッド') ? (findEffect(effects, '機人・狂恋フレッド').param === '0' ? '└ 機人・狂恋フレッド' : '└ 機人・妄執フレッド') : '')
      selfEffects.push(findEffect(effects, '熱の防壁') ? '熱の防壁' : '')
      selfEffects.push(findEffect(effects, '冷の防壁') ? '冷の防壁' : '')
      selfEffects.push(findEffect(effects, '雷の防壁') ? '雷の防壁' : '')

      return selfEffects
    }

    const findMiscEffects = (effects) => {
      const miscEffects = []
      miscEffects.push(findEffect(effects, '連携時攻撃力') ? `連携時攻撃力（${findEffect(effects, '連携時攻撃力').param}）` : '')
      miscEffects.push(findEffect(effects, '召喚') ? (findEffect(effects, '廻転虫') ? `号令召喚（${findEffect(effects, '召喚').param}）` : `召喚（${findEffect(effects, '召喚').param}）`) : '')
      miscEffects.push(findEffect(effects, 'カエル戦士') ? (findEffect(effects, 'カエル戦士').param === '1' ? '└ カエル戦士' : '└ 赤ガエル') : '')
      miscEffects.push(findEffect(effects, 'エレメンタル金') ? (findEffect(effects, 'エレメンタル金').param === '0' ? '└ エレメンタル金' : findEffect(effects, 'エレメンタル金').param === '6' ? '└ エレメンタル水' : findEffect(effects, 'エレメンタル金').param === '10' ? '└ エレメンタル火' : findEffect(effects, 'エレメンタル金').param === '14' ? '└ エレメンタル木' : '└ エレメンタル土') : '')
      miscEffects.push(findEffect(effects, 'プーカ') ? (findEffect(effects, 'プーカ').param === '0' ? '└ プーカ' : '└ ラスカル') : '')
      miscEffects.push(findEffect(effects, 'デコバット') ? '└ デコバット' : '')
      miscEffects.push(findEffect(effects, '廻転虫') ? '└ 廻転虫' : '')

      return miscEffects
    }

    const outputNodes = []
    nodes.forEach(node => {
      const outputNode = {}
      outputNode.ArtsName = node.ArtsName
      outputNode.ArtsCategory = node.ArtsCategory
      outputNode.Weapon = node.Weapon
      outputNode.WeaponSub = node.WeaponSub
      outputNode.Attack = node.ArtsName === '食べる' || node.TargetParty === '敵' || node.ReserveType === 'プロテクト' ? node.Attack : '–'
      outputNode.BP = node.ArtsCategory === '支援専用技' || (node.PlayerUse === '0' && node.EnemyUse === '0') ? '–' : node.BP
      outputNode.Turn = node.Turn === '0' || node.ArtsCategory === '支援専用技' ? '–' : node.Turn
      outputNode.BaseElement = node.BaseElement
      outputNode.ReserveType = node.ReserveType
      outputNode.Reserve = ['パリイ', 'カウンター'].includes(node.ReserveType) ? [node.ReserveType, `（${node.ReserveProb}％）`] : [node.ReserveType]
      const targetParty = node.TargetType === '自身' ? '' : node.TargetParty
      const targetType = node.TargetType === '他者' && node.ReserveType === 'フォロー' ? '単体' : node.TargetType
      outputNode.Targets = [targetParty, targetType].filter(target => target !== '')
      const effectTypes = [1, 2, 3, 4].map(i => ({type: node['EffectType' + i], param: node['EffectParam' + i]}))
      const hitArea = node.Weapon === '術' || node.TargetParty === '味方' || node.Attack === '0' || node.HitArea === '–' || (node.SureHit === '1' && node.HitArea !== '対地') || findEffect(effectTypes, '術扱い') ? '' : node.HitArea
      const sureHit = node.Weapon === '術' || node.TargetParty === '味方' || node.Attack === '0' || node.SureHit === '0' || findEffect(effectTypes, '術扱い') ? '' : '必中'
      outputNode.HitProperties = [hitArea, sureHit].filter(effect => effect !== '').length > 0 ? [hitArea, sureHit].filter(effect => effect !== '') : ['–']
      outputNode.Hit = node.Weapon === '術' || node.TargetParty === '味方' || node.Attack === '0' || node.SureHit === '1' || findEffect(effectTypes, '術扱い') ? '–' : node.Hit
      outputNode.AttackCount = node.ArtsName === '食べる' || (node.Attack !== '0' && node.TargetParty === '敵') ? node.AttackCount : '–'
      outputNode.Attribute = [node.Attribute1, node.Attribute2].filter(attr => attr !== '–').length > 0 ? [node.Attribute1, node.Attribute2].filter(attr => attr !== '–').join('') : node.ArtsName === '食べる' ? '無' : '–'
      outputNode.BaseParameter1 = node.Attack === '0' && (node.ArtsCategory === 'メカ技' || (node.PlayerUse === '0' && node.EnemyUse === '1')) ? '–' : ['パリイ', 'プロテクト'].includes(node.ReserveType) || node.Attack === '0' || node.BaseParameter1 !== '–' ? node.BaseParameter1 : '無'
      outputNode.BaseParameter2 = (node.Attack === '0' && node.PlayerUse === '1' && node.EnemyUse === '0' && node.TargetParty === '敵') || (node.Attack === '0' && node.PlayerUse === '0' && node.EnemyUse === '1' && node.TargetParty === '味方') ? '–' : ['パリイ', 'プロテクト'].includes(node.ReserveType) || node.Attack === '0' || node.BaseParameter1 !== '–' ? node.BaseParameter2 : '無'
      outputNode.Random = node.Attack === '0' || ['パリイ', 'プロテクト'].includes(node.ReserveType) ? '–' : node.Random === '0' ? '5' : node.Random
      outputNode.Hate = node.ArtsCategory === '支援専用技' || node.TargetParty === '味方' || [node.AddEffect1, node.AddEffect2].includes('即死') ? '–' : node.Hate
      outputNode.AfterCasterSpeed = node.ArtsCategory === '支援専用技' || [node.AddEffect1, node.AddEffect2].includes('即死') ? '–' : node.AfterCasterSpeed
      outputNode.AfterTargetSpeed = node.ArtsName === '食べる' || node.Attack === '0' || ['パリイ', 'プロテクト'].includes(node.ReserveType) ? '–' : node.AfterTargetSpeed
      const addEffect1 = preprocessEffect(node.AddEffect1, node.AddEffectParam1, true)
      const addEffect2 = preprocessEffect(node.AddEffect2, node.AddEffectParam2, true)
      const effectShield = node.ArtsName === '覚醒術・土' ? '土行盾' : node.ArtsName === '大渦雷［3］' ? '土行盾解除' : ''
      const selfEffects = findSelfEffects(effectTypes)
      outputNode.SelfEffects = [addEffect1, addEffect2, effectShield, ...selfEffects].filter(effect => effect !== '').length > 0 ? [addEffect1, addEffect2, effectShield, ...selfEffects].filter(effect => effect !== '').join('\n') : '–'
      const effectRaceSlayer = node.RaceSlayer === '–' ? '' : node.RaceSlayer + '特攻'
      const effectType1 = preprocessEffect(node.EffectType1, node.EffectParam1, false)
      const effectType2 = preprocessEffect(node.EffectType2, node.EffectParam2, false)
      const effectType3 = preprocessEffect(node.EffectType3, node.EffectParam3, false)
      const effectType4 = preprocessEffect(node.EffectType4, node.EffectParam4, false)
      const effectKongo = findEffect(effectTypes, '金剛プログラム') ? 'ダメージ無効' : ''
      const effectBump = node.Bump === '0' ? '' : findEffect(effectTypes, '範囲バンプ') ? `範囲バンプ（${node.Bump}）` : `バンプ（${node.Bump}）`
      const effectReserveCancel = node.TargetParty === '味方' || node.ReserveCancel === '0' ? '' : 'リザーブ解除'
      const effectPenetration = node.Penetration === '0' ? '' : '防御力無効'
      const targetEffects = [effectRaceSlayer, effectType1, effectType2, effectType3, effectType4, effectKongo, effectReserveCancel, effectPenetration].filter(effect => effect !== '')
      if (effectBump !== '') {
        const bumpIndex = targetEffects.map(effect => effect.split('（')[0]).findIndex(effect => ['ガード不可', '挑発', 'ヘイト消去', 'BP', '特殊効果解除', 'リザーブ解除', '防御力無効'].includes(effect))
        targetEffects.splice(bumpIndex < 0 ? targetEffects.length : bumpIndex, 0, effectBump)
      }
      outputNode.TargetEffects = targetEffects.length > 0 ? targetEffects.filter(effect => effect !== '').join('\n') : '–'
      const defenseType = ['片手銃', '体術'].includes(node.Weapon) && node.WeaponSub !== '剣×銃' ? '回避' : 'ガード'
      const effectBeforeGuard = node.BeforeGuard === '1' ? `行動前${defenseType}` : ''
      const effectAfterGuard = node.AfterGuard === '1' ? `行動後${defenseType}` : ''
      const effectInvalidReserve = findEffect(effectTypes, 'リザーブ不可') ? 'リザーブ不可' : ''
      const miscEffects = findMiscEffects(effectTypes)
      const effectAdd = node.AdditionalArts !== '–' ? '追加発動' : ''
      const effectAddArts = node.AdditionalArts !== '–' ? '└ ' + node.AdditionalArts : ''
      const effectMagicCalc = node.TargetParty === '敵' && findEffect(effectTypes, '術扱い') ? '術扱い' : ''
      const effectDisableSelect = node.TargetParty === '味方' || node.DisableSelect === '0' ? '' : '発動制限'
      outputNode.MiscEffects = [effectBeforeGuard, effectAfterGuard, effectInvalidReserve, ...miscEffects, effectAdd, effectAddArts, effectMagicCalc, effectDisableSelect].filter(effect => effect !== '').length > 0 ? [effectBeforeGuard, effectAfterGuard, effectInvalidReserve, ...miscEffects, effectAdd, effectAddArts, effectMagicCalc, effectDisableSelect].filter(effect => effect !== '').join('\n') : '–'
      const singleStageFirstUnable = effectDisableSelect !== '' && node.ReserveType !== '–' && ((!outputNode.Attribute.includes('斬') && !outputNode.Attribute.includes('打') && !outputNode.Attribute.includes('突')) || effectInvalidReserve !== '') ? true : false
      outputNode.Speed = node.ArtsCategory === '支援専用技' || (node.PlayerUse === '0' && node.EnemyUse === '0') ? '–' : node.Speed
      outputNode.SpeedNum = node.Speed
      outputNode.OverAttackLeft = node.ArtsCategory === '支援専用技' || node.OverAttack === '0' ? '–' : node.OverAttackLeft
      outputNode.OverAttackSelf = node.ArtsCategory === '支援専用技' || node.OverAttack === '0' ? '–' : node.OverAttackSelf
      outputNode.OverAttackRight = node.ArtsCategory === '支援専用技' || node.OverAttack === '0' ? '–' : node.OverAttackRight
      outputNode.Timeline = node.ArtsCategory === '支援専用技' ? '–' : <UniteIcons left={parseInt(node.OverAttackLeft)} reserve={node.ReserveType} right={parseInt(node.OverAttackRight)} self={node.OverAttackSelf} speed={parseInt(node.Speed)} unite={node.OverAttack}/>
      outputNode.AddOverAttackDamage = ['突っつく', '吸引'].includes(node.ArtsName) || node.ArtsCategory === '支援専用技' || node.TargetParty === '味方' || node.OverAttack === '0' ? '–' : node.AddOverAttackDamage
      outputNode.AddSingleStageDamage = ['チェイスブラスター', '号令一下'].includes(node.ArtsName) || node.ArtsCategory === '支援専用技' || node.TargetParty === '味方' || singleStageFirstUnable ? '–' : node.AddSingleStageDamage
      outputNodes.push(outputNode)
    })

    return outputNodes
  }

  const nodes = React.useMemo(() => (
    preprocess(data.allSagaebTechSpellBaseStatsDataCsv.nodes)
  ), [data.allSagaebTechSpellBaseStatsDataCsv.nodes])

  const filterValues = React.useMemo(() => {
    const leafColumns = columns.flatMap(parent => parent.children.length === 0 ? [parent] : parent.children)

    const map = {}
    leafColumns.forEach(column => map[column.key] = Array.from(new Set(nodes.map(node => node[column.key]))))

    return map
  }, [nodes])

  const [pinned, setPinned] = React.useState(true)
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
      <StyledTableContainer align='center'>
        <Box sx={{ position: 'sticky', top: 0, left: 0, zIndex: 4 }}>
          <IconButton
            onClick={() => setModalOpen(true)}
            sx={{
              position: 'absolute',
              top: '2px',
              left: '2px',
              padding: '3px',
              border: '1px solid',
              borderColor: '#2b4a669f',
              borderRadius: 1,
              boxShadow: 4,
              background: 'linear-gradient(to bottom, #1f3b53af 0%, #4eb89aaf 100%)',
              '&:hover': {
                background: 'linear-gradient(to bottom, #1f3b53df 0%, #4eb89adf 100%)',
              },
            }}
          >
            {Object.keys(filterState).every(column => filterState[column].length === filterValues[column].length) ? <FilterListIcon sx={{ color: '#ffffff'}}/> : <FilterAltIcon sx={{ color: '#ffffff'}}/>}
          </IconButton>
          <IconButton
            onClick={() => setPinned(!pinned)}
            sx={{
              display: hasScroll ? 'inline-flex' : 'none',
              position: 'absolute',
              top: '32px',
              left: '2px',
              padding: '3px',
              border: '1px solid',
              borderColor: '#2b4a669f',
              borderRadius: 1,
              boxShadow: 4,
              background: pinned ? 'linear-gradient(to bottom, #1f3b53af 0%, #4eb89aaf 100%)' : 'linear-gradient(to bottom, #1f3b531f 0%, #4eb89a1f 100%)',
              '&:hover': {
                background: pinned ? 'linear-gradient(to bottom, #1f3b53df 0%, #4eb89adf 100%)' : 'linear-gradient(to bottom, #1f3b534f 0%, #4eb89a4f 100%)',
              },
            }}
          >
            {pinned ? <PushPinIcon sx={{ color: '#ffffff'}}/> : <PushPinOutlinedIcon sx={{ color: '#ffffff'}}/>}
          </IconButton>
        </Box>
        <Table ref={ref} stickyHeader sx={{ width: `calc(296px + 168px + 148px * 3 + 100px + 88px + 76px * 2 + 64px * 2 + 52px * 6 + 44px * 13)` }}>
          <TableHead sx={{ position: 'sticky', top: 0, zIndex: 3 }}>
            <TableRow>
              <StyledTh align='center' rowSpan={2} sx={hasHeaderRow ? { position: 'sticky', left: 0, zIndex: 3, width: '168px' } : { width: '168px' }}>名称</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '88px' }}>カテゴリ</StyledTh>
              <StyledTh align='center' colSpan={2}>武器タイプ</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '44px' }}>威力</StyledTh>
              <StyledTh align='center' rowSpan={2} sx={{ width: '52px' }}>BP<br/>コスト</StyledTh>
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
              <StyledTh align='center' colSpan={2}>連携率上昇量</StyledTh>
            </TableRow>
            <TableRow>
              <StyledTh align='center' sx={{ width: '76px' }}>メイン</StyledTh>
              <StyledTh align='center' sx={{ width: '76px' }}>サブ</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>自身</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>対象</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>自身</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>対象</StyledTh>
              <StyledTh align='center' sx={{ width: '148px' }}>自身</StyledTh>
              <StyledTh align='center' sx={{ width: '148px' }}>対象</StyledTh>
              <StyledTh align='center' sx={{ width: '148px' }}>その他</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>前方</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>自身</StyledTh>
              <StyledTh align='center' sx={{ width: '44px' }}>後方</StyledTh>
              <StyledTh align='center' sx={{ width: '52px' }}>連携</StyledTh>
              <StyledTh align='center' sx={{ width: '52px' }}>独壇場</StyledTh>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNodes.map((node, index) => (
              <StyledTrTwoToneB className={index % 2 === 0 ? (hasHeaderRow ? 'darker-row-w-header' : 'darker-row') : (hasHeaderRow ? 'lighter-row-w-header' : 'lighter-row')} key={index}>
                {hasHeaderRow ? <StyledTrh align='left' scope='row'>{node.ArtsName}</StyledTrh> : <StyledTd align='left'>{node.ArtsName}</StyledTd>}
                <StyledTd align='center'>{node.ArtsCategory}</StyledTd>
                <StyledTd align='center'>{node.Weapon}</StyledTd>
                <StyledTd align='center'>{node.WeaponSub}</StyledTd>
                <StyledTd align='center'>{node.Attack}</StyledTd>
                <StyledTd align='center'>{node.BP}</StyledTd>
                <StyledTd align='center'>{node.Turn}</StyledTd>
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
                <StyledTd align='left' sx={{ whiteSpace: 'pre-line' }}>{node.SelfEffects}</StyledTd>
                <StyledTd align='left' sx={{ whiteSpace: 'pre-line' }}>{node.TargetEffects}</StyledTd>
                <StyledTd align='left' sx={{ whiteSpace: 'pre-line' }}>{node.MiscEffects}</StyledTd>
                <StyledTd align='center'>{node.Speed}</StyledTd>
                <StyledTd align='center'>{node.OverAttackLeft}</StyledTd>
                <StyledTd align='center'>{node.OverAttackSelf}</StyledTd>
                <StyledTd align='center'>{node.OverAttackRight}</StyledTd>
                <StyledTd align='center'>{node.Timeline}</StyledTd>
                <StyledTd align='center'>{node.AddOverAttackDamage}</StyledTd>
                <StyledTd align='center'>{node.AddSingleStageDamage}</StyledTd>
              </StyledTrTwoToneB>
            ))}
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
      <Table stickyHeader sx={{ maxWidth: '508px', tableLayout: 'fixed' }}>
        <TableHead sx={{ position: 'sticky', top: 0 }}>
          <TableRow>
            <StyledTh align='center' sx={{ width: '64px' }}>アイコン</StyledTh>
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