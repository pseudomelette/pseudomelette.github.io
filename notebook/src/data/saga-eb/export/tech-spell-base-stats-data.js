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
  StyledTr,
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
    values: ['片手剣', '両手剣', '片手銃', '両手銃', '体術', '継承', 'モンスター', '近接メカ', '射撃メカ', '補助メカ', '術', '敵専用'],
    default: ['片手剣', '両手剣', '片手銃', '両手銃', '体術', '継承', 'モンスター', '近接メカ', '射撃メカ', '補助メカ', '術', '敵専用'],
  }],
  ['WeaponSub', {
    label: '武器タイプ：サブ',
    values: ['汎用片手剣', '長剣', '細剣', '短剣', '斧', '二刀', '汎用両手剣', '大剣', '刀', '薙刀', '片手銃', '二丁拳銃', '剣×銃', '汎用両手銃', '機関銃', '火炎放射器', '電撃銃', '爆撃銃', '化学銃', 'パンチ', 'キック', '体当たり', '–'],
    default: ['汎用片手剣', '長剣', '細剣', '短剣', '斧', '二刀', '汎用両手剣', '大剣', '刀', '薙刀', '片手銃', '二丁拳銃', '剣×銃', '汎用両手銃', '機関銃', '火炎放射器', '電撃銃', '爆撃銃', '化学銃', 'パンチ', 'キック', '体当たり', '–'],
  }],
  ['BaseElement', {
    label: '五行',
    values: ['木', '火', '土', '金', '水', '–'],
    default: ['木', '火', '土', '金', '水', '–'],
  }],
  ['Reserve', {
    label: 'リザーブタイプ',
    values: ['斬インタラプト', '打インタラプト', '突インタラプト', 'カウンター', 'プロテクト', 'パリイ', 'フォロー', 'チェイス', '–'],
    default: ['斬インタラプト', '打インタラプト', '突インタラプト', 'カウンター', 'プロテクト', 'パリイ', 'フォロー', 'チェイス', '–'],
  }],
  ['Targets', {
    label: '行動対象',
    values: ['敵/単体', '敵/乱撃', '敵/前方', '敵/後方', '敵/全体', '自身', '味方/他者', '味方/単体', '味方/全体'],
    default: ['敵/単体', '敵/乱撃', '敵/前方', '敵/後方', '敵/全体', '自身', '味方/他者', '味方/単体', '味方/全体'],
  }],
  ['HitProperties', {
    label: '命中特性',
    values: ['対地', '対空', '地上必中', '必中', '–'],
    default: ['対地', '対空', '地上必中', '必中', '–'],
  }],
  ['Attribute', {
    label: '属性',
    values: ['斬', '打', '突', '熱', '冷', '雷', '斬打', '斬突', '斬熱', '斬冷', '斬雷', '打突', '打熱', '打冷', '打雷', '突冷', '突雷', '熱冷', '冷雷', '無', '–'],
    default: ['斬', '打', '突', '熱', '冷', '雷', '斬打', '斬突', '斬熱', '斬冷', '斬雷', '打突', '打熱', '打冷', '打雷', '突冷', '突雷', '熱冷', '冷雷', '無', '–'],
  }],
  ['BaseParameter1', {
    label: '依存能力：自身',
    values: ['筋', '技', '運', '体', '知', '集', '無', '–'],
    default: ['筋', '技', '運', '体', '知', '集', '無', '–'],
  }],
  ['BaseParameter2', {
    label: '依存能力：対象',
    values: ['体', '集', '無', '–'],
    default: ['体', '集', '無', '–'],
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
  ['威力', {
    group: ['Attack'],
    width: 44,
    mandatory: false,
    default: true,
    searchable: true,
  }],
  ['BPコスト', {
    group: ['BP'],
    width: 52,
    mandatory: false,
    default: true,
    searchable: true,
  }],
  ['詠唱ターン数', {
    group: ['Turn'],
    width: 64,
    mandatory: false,
    default: true,
    searchable: true,
  }],
  ['五行', {
    group: ['BaseElement'],
    width: 44,
    mandatory: false,
    default: true,
    searchable: true,
  }],
  ['リザーブタイプ', {
    group: ['Reserve'],
    width: 100,
    mandatory: false,
    default: true,
    searchable: true,
  }],
  ['行動対象', {
    group: ['Targets'],
    width: 44,
    mandatory: false,
    default: true,
    searchable: true,
  }],
  ['命中特性', {
    group: ['HitProperties'],
    width: 44,
    mandatory: false,
    default: true,
    searchable: true,
  }],
  ['基礎命中率', {
    group: ['Hit'],
    width: 52,
    mandatory: false,
    default: false,
    searchable: true,
  }],
  ['攻撃回数', {
    group: ['AttackCount'],
    width: 44,
    mandatory: false,
    default: false,
    searchable: true,
  }],
  ['属性', {
    group: ['Attribute'],
    width: 44,
    mandatory: false,
    default: true,
    searchable: true,
  }],
  ['依存能力', {
    group: ['BaseParameter1', 'BaseParameter2'],
    width: 88,
    mandatory: false,
    default: true,
    searchable: true,
  }],
  ['ダメージ乱数幅', {
    group: ['Random'],
    width: 64,
    mandatory: false,
    default: false,
    searchable: true,
  }],
  ['ヘイト上昇量', {
    group: ['Hate'],
    width: 52,
    mandatory: false,
    default: false,
    searchable: true,
  }],
  ['速度低下量', {
    group: ['AfterCasterSpeed', 'AfterTargetSpeed'],
    width: 88,
    mandatory: false,
    default: false,
    searchable: true,
  }],
  ['追加効果', {
    group: ['SelfEffects', 'TargetEffects', 'MiscEffects'],
    width: 444,
    mandatory: false,
    default: true,
    searchable: true,
  }],
  ['行動順補正', {
    group: ['Speed'],
    width: 52,
    mandatory: false,
    default: false,
    searchable: true,
  }],
  ['連携範囲', {
    group: ['OverAttackLeft', 'OverAttackSelf', 'OverAttackRight'],
    width: 132,
    mandatory: false,
    default: false,
    searchable: true,
  }],
  ['タイムラインイメージ', {
    group: 'TimelineProps',
    width: 296,
    mandatory: false,
    default: true,
    searchable: false,
  }],
  ['連携率上昇量', {
    group: ['AddOverAttackDamage', 'AddSingleStageDamage'],
    width: 104,
    mandatory: false,
    default: false,
    searchable: true,
  }],
])

const UniteIcons = React.memo(({ left, mode, position, reserve, right, self, unite }) => {
  const area = []
  for (let i = position - left; i <= position + right; i++) {
    let iconId = 'unite-1'
    if (i === position) {
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
        <rect width='12' height='20' fill={mode === 0 ? '#163148' : '#1f3b53'}/>
        <use href={`#${iconId}`}/>
      </g>
    )
  }

  return (
    <svg width={276} height={30} style={{ marginTop: '-2px', marginBottom: '-4px' }}>
      <use href='#unite-0x23'/>
      {area}
    </svg>
  )
})

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
    const blankEffects = new Set([
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
    ])

    const noParamEffects = new Set([
      'ダメージ無効',
      'ガード不可',
      '詠唱短縮',
      'ステルス',
      'ヘイト消去',
      '状態回復',
      'メカ修理',
      '特殊効果解除',
      'メカ限定',
    ])

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
      outputNode.Reserve = [
        node.ReserveType,
        ['パリイ', 'カウンター'].includes(node.ReserveType) && `（${node.ReserveProb}％）`,
      ].filter(Boolean).join('\n')
      outputNode.Targets = [
        node.TargetType !== '自身' && node.TargetParty,
        node.TargetType === '他者' && node.ReserveType === 'フォロー' ? '単体' : node.TargetType,
      ].filter(Boolean).join('\n')
      const effectMap = new Map([1, 2, 3, 4].map(i => [node['EffectType' + i], node['EffectParam' + i]]))
      const hitProperties = [
        node.Weapon !== '術' && node.TargetParty === '敵' && node.Attack !== '0' && node.HitArea !== '–' && (node.SureHit === '0' || node.HitArea === '対地') && !effectMap.has('術扱い') && (node.HitArea === '対地' && node.SureHit === '1' ? '地上' : node.HitArea),
        node.Weapon !== '術' && node.TargetParty === '敵' && node.Attack !== '0' && node.SureHit === '1' && !effectMap.has('術扱い') && '必中',
      ].filter(Boolean)
      outputNode.HitProperties = hitProperties.length ? hitProperties.join('\n') : '–'
      outputNode.Hit = node.Weapon === '術' || node.TargetParty === '味方' || node.Attack === '0' || node.SureHit === '1' || effectMap.has('術扱い') ? '–' : node.Hit
      outputNode.AttackCount = node.ArtsName === '食べる' || (node.Attack !== '0' && node.TargetParty === '敵') ? node.AttackCount : '–'
      outputNode.Attribute = node.ArtsName === '幻惑演舞' ? [node.Attribute2, node.Attribute1].filter(attr => attr !== '–').join('') : [node.Attribute1, node.Attribute2].filter(attr => attr !== '–').length ? [node.Attribute1, node.Attribute2].filter(attr => attr !== '–').join('') : node.ArtsName === '食べる' ? '無' : '–'
      outputNode.BaseParameter1 = node.Attack === '0' && (node.ArtsCategory === 'メカ技' || (node.PlayerUse === '0' && node.EnemyUse === '1')) ? '–' : ['パリイ', 'プロテクト'].includes(node.ReserveType) || node.Attack === '0' || node.BaseParameter1 !== '–' ? node.BaseParameter1 : '無'
      outputNode.BaseParameter2 = (node.Attack === '0' && node.PlayerUse === '1' && node.EnemyUse === '0' && node.TargetParty === '敵') || (node.Attack === '0' && node.PlayerUse === '0' && node.EnemyUse === '1' && node.TargetParty === '味方') ? '–' : ['パリイ', 'プロテクト'].includes(node.ReserveType) || node.Attack === '0' || node.BaseParameter1 !== '–' ? node.BaseParameter2 : '無'
      outputNode.Random = node.Attack === '0' || ['パリイ', 'プロテクト'].includes(node.ReserveType) ? '–' : node.Random === '0' ? '5' : node.Random
      outputNode.Hate = node.ArtsCategory === '支援専用技' || node.TargetParty === '味方' || [node.AddEffect1, node.AddEffect2].includes('即死') ? '–' : node.Hate
      outputNode.AfterCasterSpeed = node.ArtsCategory === '支援専用技' || [node.AddEffect1, node.AddEffect2].includes('即死') ? '–' : node.AfterCasterSpeed
      outputNode.AfterTargetSpeed = node.ArtsName === '食べる' || node.Attack === '0' || ['パリイ', 'プロテクト'].includes(node.ReserveType) ? '–' : node.AfterTargetSpeed
      const selfEffects = [
        node.AddEffect1 === '即死' ? '強制即死' : noParamEffects.has(node.AddEffect1) ? node.AddEffect1 : !blankEffects.has(node.AddEffect1) && `${node.AddEffect1}（${node.AddEffectParam1}）`,
        node.AddEffect2 === '即死' ? '強制即死' : noParamEffects.has(node.AddEffect2) ? node.AddEffect2 : !blankEffects.has(node.AddEffect2) && `${node.AddEffect2}（${node.AddEffectParam2}）`,
        node.ArtsName === '覚醒術・土' ? '土行盾' : (node.ArtsName === '大渦雷［3］' && '土行盾解除'),
        effectMap.has('吸収回復') && '吸収回復',
        effectMap.has('捕食') && '全回復',
        effectMap.has('人格変化') && '人格変化',
        effectMap.has('霊機・イワナガヒメ') && (effectMap.get('霊機・イワナガヒメ') === '0' ? '└ 霊機・イワナガヒメ' : '└ 霊機・コノハナサクヤ'),
        effectMap.has('霊機・カグツチ') && (effectMap.get('霊機・カグツチ') === '0' ? '└ 霊機・カグツチ' : '└ 霊機・アメノウズメ'),
        effectMap.has('霊機・スサノオ') && (effectMap.get('霊機・スサノオ') === '0' ? '└ 霊機・スサノオ' : '└ 霊機・ヤマタノオロチ'),
        effectMap.has('霊機・獅子の精') && (effectMap.get('霊機・獅子の精') === '0' ? '└ 霊機・獅子の精' : '└ 霊機・胡蝶の精'),
        effectMap.has('霊機・弁慶') && (effectMap.get('霊機・弁慶') === '0' ? '└ 霊機・弁慶' : '└ 霊機・牛若丸'),
        effectMap.has('機人・狂恋フレッド') && (effectMap.get('機人・狂恋フレッド') === '0' ? '└ 機人・狂恋フレッド' : '└ 機人・妄執フレッド'),
        effectMap.has('熱の防壁') && '熱の防壁',
        effectMap.has('冷の防壁') && '冷の防壁',
        effectMap.has('雷の防壁') && '雷の防壁',
      ].filter(Boolean)
      outputNode.SelfEffects = selfEffects.length ? selfEffects.join('\n') : '–'
      const targetEffects = [
        node.RaceSlayer !== '–' && node.RaceSlayer + '特攻',
        node.EffectType1 === '金剛プログラム' ? '必中メカマヒ' : node.EffectType1 === '捕食' ? '強制即死' : noParamEffects.has(node.EffectType1) ? node.EffectType1 : !blankEffects.has(node.EffectType1) && `${node.EffectType1}（${node.EffectParam1}）`,
        node.EffectType2 === '金剛プログラム' ? '必中メカマヒ' : node.EffectType2 === '捕食' ? '強制即死' : noParamEffects.has(node.EffectType2) ? node.EffectType2 : !blankEffects.has(node.EffectType2) && `${node.EffectType2}（${node.EffectParam2}）`,
        node.EffectType3 === '金剛プログラム' ? '必中メカマヒ' : node.EffectType3 === '捕食' ? '強制即死' : noParamEffects.has(node.EffectType3) ? node.EffectType3 : !blankEffects.has(node.EffectType3) && `${node.EffectType3}（${node.EffectParam3}）`,
        node.EffectType4 === '金剛プログラム' ? '必中メカマヒ' : node.EffectType4 === '捕食' ? '強制即死' : noParamEffects.has(node.EffectType4) ? node.EffectType4 : !blankEffects.has(node.EffectType4) && `${node.EffectType4}（${node.EffectParam4}）`,
        effectMap.has('金剛プログラム') && 'ダメージ無効',
        node.TargetParty === '敵' && node.ReserveCancel === '1' && 'リザーブ解除',
        node.Penetration === '1' && '防御力無効',
      ].filter(Boolean)
      if (node.Bump !== '0') {
        const bumpIndex = targetEffects.map(effect => effect.split('（')[0]).findIndex(effect => ['ガード不可', '挑発', 'ヘイト消去', 'BP', '特殊効果解除', 'リザーブ解除', '防御力無効'].includes(effect))
        targetEffects.splice(bumpIndex < 0 ? targetEffects.length : bumpIndex, 0, effectMap.has('範囲バンプ') ? `範囲バンプ（${node.Bump}）` : `バンプ（${node.Bump}）`)
      }
      outputNode.TargetEffects = targetEffects.length ? targetEffects.join('\n') : '–'
      const miscEffects = [
        node.BeforeGuard === '1' && (['片手銃', '体術'].includes(node.Weapon) && node.WeaponSub !== '剣×銃' ? '行動前回避' : '行動前ガード'),
        node.AfterGuard === '1' && (['片手銃', '体術'].includes(node.Weapon) && node.WeaponSub !== '剣×銃' ? '行動後回避' : '行動後ガード'),
        effectMap.has('リザーブ不可') && 'リザーブ不可',
        effectMap.has('連携時攻撃力') && `連携時攻撃力（${effectMap.get('連携時攻撃力')}）`,
        effectMap.has('召喚') && (effectMap.has('廻転虫') ? `号令召喚（${effectMap.get('召喚')}）` : `召喚（${effectMap.get('召喚')}）`),
        effectMap.has('カエル戦士') && (effectMap.get('カエル戦士') === '1' ? '└ カエル戦士' : '└ 赤ガエル'),
        effectMap.has('エレメンタル金') && (effectMap.get('エレメンタル金') === '0' ? '└ エレメンタル金' : effectMap.get('エレメンタル金') === '6' ? '└ エレメンタル水' : effectMap.get('エレメンタル金') === '10' ? '└ エレメンタル火' : effectMap.get('エレメンタル金') === '14' ? '└ エレメンタル木' : '└ エレメンタル土'),
        effectMap.has('プーカ') && (effectMap.get('プーカ') === '0' ? '└ プーカ' : '└ ラスカル'),
        effectMap.has('デコバット') && '└ デコバット',
        effectMap.has('廻転虫') && '└ 廻転虫',
        node.AdditionalArts !== '–' && '追加発動',
        node.AdditionalArts !== '–' && '└ ' + node.AdditionalArts,
        node.TargetParty === '敵' && effectMap.has('術扱い') && '術扱い',
        node.TargetParty === '敵' && node.DisableSelect === '1' && '発動制限',
      ].filter(Boolean)
      outputNode.MiscEffects = miscEffects.length ? miscEffects.join('\n') : '–'
      outputNode.Speed = node.ArtsCategory === '支援専用技' || (node.PlayerUse === '0' && node.EnemyUse === '0') ? '–' : node.Speed
      outputNode.OverAttackLeft = node.ArtsCategory === '支援専用技' || node.OverAttack === '0' ? '–' : node.OverAttackLeft
      outputNode.OverAttackSelf = node.ArtsCategory === '支援専用技' || node.OverAttack === '0' ? '–' : node.OverAttackSelf
      outputNode.OverAttackRight = node.ArtsCategory === '支援専用技' || node.OverAttack === '0' ? '–' : node.OverAttackRight
      outputNode.TimelineProps = node.ArtsCategory !== '支援専用技' &&  {
        left: Number(node.OverAttackLeft),
        position: 11 - Number(node.Speed),
        reserve: node.ReserveType,
        right: Number(node.OverAttackRight),
        self: node.OverAttackSelf,
        unite: node.OverAttack,
      }
      outputNode.AddOverAttackDamage = ['突っつく', '吸引'].includes(node.ArtsName) || node.ArtsCategory === '支援専用技' || node.TargetParty === '味方' || node.OverAttack === '0' ? '–' : node.AddOverAttackDamage
      const singleStageFirstUnable = node.TargetParty === '敵' && node.DisableSelect === '1' && node.ReserveType !== '–' && ((!['斬', '打', '突'].includes(node.Attribute1) && !['斬', '打', '突'].includes(node.Attribute2)) || effectMap.has('リザーブ不可')) ? true : false
      outputNode.AddSingleStageDamage = ['チェイスブラスター', '号令一下'].includes(node.ArtsName) || node.ArtsCategory === '支援専用技' || node.TargetParty === '味方' || singleStageFirstUnable ? '–' : node.AddSingleStageDamage
      outputNodes.push(outputNode)
    })

    return outputNodes
  }

  const nodes = React.useMemo(() => (
    preprocess(data.allSagaebTechSpellBaseStatsDataCsv.nodes)
  ), [data.allSagaebTechSpellBaseStatsDataCsv.nodes])

  const theme = useTheme()
  const [filterStateMap, setFilterStateMap] = React.useState(new Map([...filterColumnMap.keys()].map(key => [key, filterColumnMap.get(key).default])))
  const [filterModalOpen, setFilterModalOpen] = React.useState(false)
  const [columnState, setColumnState] = React.useState([...customColumnMap.keys()].filter(key => customColumnMap.get(key).default))
  const [columnModalOpen, setColumnModalOpen] = React.useState(false)
  const [pinned, setPinned] = React.useState(useMediaQuery(theme.breakpoints.up('sm')))
  const [mounted, setMounted] = React.useState(false)
  const [keyword, setKeyword] = React.useState('')

  const filteredNodes = React.useMemo(() => {
    const filteredRows = nodes.filter(node => [...filterStateMap.entries()].every(([column, values]) => values.includes(node[column].replace(/\n/, '').split('（')[0]) || values.includes(node[column].replace(/\n/, '/'))))

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
                  {columnState.includes('威力') && <StyledTh align='center' rowSpan={2} sx={{ width: `${customColumnMap.get('威力').width}px` }}>威力</StyledTh>}
                  {columnState.includes('BPコスト') && <StyledTh align='center' rowSpan={2} sx={{ width: `${customColumnMap.get('BPコスト').width}px` }}>BP<br/>コスト</StyledTh>}
                  {columnState.includes('詠唱ターン数') && <StyledTh align='center' rowSpan={2} sx={{ width: `${customColumnMap.get('詠唱ターン数').width}px` }}>詠唱<br/>ターン数</StyledTh>}
                  {columnState.includes('五行') && <StyledTh align='center' rowSpan={2} sx={{ width: `${customColumnMap.get('五行').width}px` }}>五行</StyledTh>}
                  {columnState.includes('リザーブタイプ') && <StyledTh align='center' rowSpan={2} sx={{ width: `${customColumnMap.get('リザーブタイプ').width}px` }}>リザーブタイプ</StyledTh>}
                  {columnState.includes('行動対象') && <StyledTh align='center' rowSpan={2} sx={{ width: `${customColumnMap.get('行動対象').width}px` }}>行動<br/>対象</StyledTh>}
                  {columnState.includes('命中特性') && <StyledTh align='center' rowSpan={2} sx={{ width: `${customColumnMap.get('命中特性').width}px` }}>命中<br/>特性</StyledTh>}
                  {columnState.includes('基礎命中率') && <StyledTh align='center' rowSpan={2} sx={{ width: `${customColumnMap.get('基礎命中率').width}px` }}>基礎<br/>命中率</StyledTh>}
                  {columnState.includes('攻撃回数') && <StyledTh align='center' rowSpan={2} sx={{ width: `${customColumnMap.get('攻撃回数').width}px` }}>攻撃<br/>回数</StyledTh>}
                  {columnState.includes('属性') && <StyledTh align='center' rowSpan={2} sx={{ width: `${customColumnMap.get('属性').width}px` }}>属性</StyledTh>}
                  {columnState.includes('依存能力') && <StyledTh align='center' colSpan={2} sx={{ width: `${customColumnMap.get('依存能力').width}px` }}>依存能力</StyledTh>}
                  {columnState.includes('ダメージ乱数幅') && <StyledTh align='center' rowSpan={2} sx={{ width: `${customColumnMap.get('ダメージ乱数幅').width}px` }}>ダメージ<br/>乱数幅</StyledTh>}
                  {columnState.includes('ヘイト上昇量') && <StyledTh align='center' rowSpan={2} sx={{ width: `${customColumnMap.get('ヘイト上昇量').width}px` }}>ヘイト<br/>上昇量</StyledTh>}
                  {columnState.includes('速度低下量') && <StyledTh align='center' colSpan={2} sx={{ width: `${customColumnMap.get('速度低下量').width}px` }}>速度低下量</StyledTh>}
                  {columnState.includes('追加効果') && <StyledTh align='center' colSpan={3} sx={{ width: `${customColumnMap.get('追加効果').width}px` }}>追加効果</StyledTh>}
                  {columnState.includes('行動順補正') && <StyledTh align='center' rowSpan={2} sx={{ width: `${customColumnMap.get('行動順補正').width}px` }}>行動順<br/>補正</StyledTh>}
                  {columnState.includes('連携範囲') && <StyledTh align='center' colSpan={3} sx={{ width: `${customColumnMap.get('連携範囲').width}px` }}>連携範囲</StyledTh>}
                  {columnState.includes('タイムラインイメージ') && <StyledTh align='center' rowSpan={2} sx={{ width: `${customColumnMap.get('タイムラインイメージ').width}px` }}>タイムラインイメージ</StyledTh>}
                  {columnState.includes('連携率上昇量') && <StyledTh align='center' colSpan={2} sx={{ width: `${customColumnMap.get('連携率上昇量').width}px` }}>連携率上昇量</StyledTh>}
                </TableRow>
                <TableRow>
                  {columnState.includes('武器タイプ') && <StyledTh align='center'>メイン</StyledTh>}
                  {columnState.includes('武器タイプ') && <StyledTh align='center'>サブ</StyledTh>}
                  {columnState.includes('依存能力') && <StyledTh align='center'>自身</StyledTh>}
                  {columnState.includes('依存能力') && <StyledTh align='center'>対象</StyledTh>}
                  {columnState.includes('速度低下量') && <StyledTh align='center'>自身</StyledTh>}
                  {columnState.includes('速度低下量') && <StyledTh align='center'>対象</StyledTh>}
                  {columnState.includes('追加効果') && <StyledTh align='center'>自身</StyledTh>}
                  {columnState.includes('追加効果') && <StyledTh align='center'>対象</StyledTh>}
                  {columnState.includes('追加効果') && <StyledTh align='center'>その他</StyledTh>}
                  {columnState.includes('連携範囲') && <StyledTh align='center'>前方</StyledTh>}
                  {columnState.includes('連携範囲') && <StyledTh align='center'>自身</StyledTh>}
                  {columnState.includes('連携範囲') && <StyledTh align='center'>後方</StyledTh>}
                  {columnState.includes('連携率上昇量') && <StyledTh align='center'>連携</StyledTh>}
                  {columnState.includes('連携率上昇量') && <StyledTh align='center'>独壇場</StyledTh>}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredNodes.map((node, index) => (
                  <StyledTrTwoToneB className={index % 2 === 0 ? (hasHeaderColumn ? 'darker-row-w-header' : 'darker-row') : (hasHeaderColumn ? 'lighter-row-w-header' : 'lighter-row')} key={index}>
                    {columnState.includes('名称') && <StyledTrh align='left' className={hasHeaderColumn ? 'sticky' : undefined} scope='row'>{node.ArtsName}</StyledTrh>}
                    {columnState.includes('カテゴリ') && <StyledTd align='center'>{node.ArtsCategory}</StyledTd>}
                    {columnState.includes('武器タイプ') && <StyledTd align='center'>{node.Weapon}</StyledTd>}
                    {columnState.includes('武器タイプ') && <StyledTd align='center'>{node.WeaponSub}</StyledTd>}
                    {columnState.includes('威力') && <StyledTd align='center'>{node.Attack}</StyledTd>}
                    {columnState.includes('BPコスト') && <StyledTd align='center'>{node.BP}</StyledTd>}
                    {columnState.includes('詠唱ターン数') && <StyledTd align='center'>{node.Turn}</StyledTd>}
                    {columnState.includes('五行') && <StyledTd align='center'>{node.BaseElement}</StyledTd>}
                    {columnState.includes('リザーブタイプ') && <StyledTd align='center' className='multi-row'>{node.Reserve}</StyledTd>}
                    {columnState.includes('行動対象') && <StyledTd align='center' className='multi-row'>{node.Targets}</StyledTd>}
                    {columnState.includes('命中特性') && <StyledTd align='center' className='multi-row'>{node.HitProperties}</StyledTd>}
                    {columnState.includes('基礎命中率') && <StyledTd align='center'>{node.Hit}</StyledTd>}
                    {columnState.includes('攻撃回数') && <StyledTd align='center'>{node.AttackCount}</StyledTd>}
                    {columnState.includes('属性') && <StyledTd align='center'>{node.Attribute}</StyledTd>}
                    {columnState.includes('依存能力') && <StyledTd align='center'>{node.BaseParameter1}</StyledTd>}
                    {columnState.includes('依存能力') && <StyledTd align='center'>{node.BaseParameter2}</StyledTd>}
                    {columnState.includes('ダメージ乱数幅') && <StyledTd align='center'>{node.Random}</StyledTd>}
                    {columnState.includes('ヘイト上昇量') && <StyledTd align='center'>{node.Hate}</StyledTd>}
                    {columnState.includes('速度低下量') && <StyledTd align='center'>{node.AfterCasterSpeed}</StyledTd>}
                    {columnState.includes('速度低下量') && <StyledTd align='center'>{node.AfterTargetSpeed}</StyledTd>}
                    {columnState.includes('追加効果') && <StyledTd align='left' className='multi-row'>{node.SelfEffects}</StyledTd>}
                    {columnState.includes('追加効果') && <StyledTd align='left' className='multi-row'>{node.TargetEffects}</StyledTd>}
                    {columnState.includes('追加効果') && <StyledTd align='left' className='multi-row'>{node.MiscEffects}</StyledTd>}
                    {columnState.includes('行動順補正') && <StyledTd align='center'>{node.Speed}</StyledTd>}
                    {columnState.includes('連携範囲') && <StyledTd align='center'>{node.OverAttackLeft}</StyledTd>}
                    {columnState.includes('連携範囲') && <StyledTd align='center'>{node.OverAttackSelf}</StyledTd>}
                    {columnState.includes('連携範囲') && <StyledTd align='center'>{node.OverAttackRight}</StyledTd>}
                    {columnState.includes('タイムラインイメージ') && <StyledTd align='center'>{node.TimelineProps ? <UniteIcons mode={index % 2} {...node.TimelineProps}/> : '–'}</StyledTd>}
                    {columnState.includes('連携率上昇量') && <StyledTd align='center'>{node.AddOverAttackDamage}</StyledTd>}
                    {columnState.includes('連携率上昇量') && <StyledTd align='center'>{node.AddSingleStageDamage}</StyledTd>}
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

export const UniteIconLegend = () => {
  const Icon = ({ id }) => (
    <svg width='12' height='20' style={{ marginTop: '-2px', marginBottom: '-4px' }}>
      <use href={`#${id}`}/>
    </svg>
  )

  return (
    <StyledTableContainer align='center'>
      <Table stickyHeader sx={{ maxWidth: '516px', tableLayout: 'fixed' }}>
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