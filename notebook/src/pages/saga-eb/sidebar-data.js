import React from "react"
import ContentAbout from './about'
import ContentBattleRank from './battlerank'
import ContentDamage from './damage'
import ContentTrade from './trade'
import ContentFormation from "./formation"
import ContentGlimmer from "./glimmer"
import ContentRankup from "./rankup"
import ContentStatusAilment from "./statusailment"

export const SidebarData = [
  {
    title: "トップ",
    link: "/saga-eb",
    content: ContentAbout,
  },
  {
    title: "バトルランク",
    link: "/saga-eb/battlerank",
    content: ContentBattleRank,
  },
  {
    title: "ダメージ計算",
    link: "/saga-eb/damage",
    content: ContentDamage,
  },
  {
    title: "ひらめき",
    link: "/saga-eb/glimmer",
    content: ContentGlimmer,
  },
  {
    title: "技・術のランクアップ",
    link: "/saga-eb/rankup",
    content: ContentRankup,
  },
  {
    title: "状態異常",
    link: "/saga-eb/statusailment",
    content: ContentStatusAilment,
  },
  {
    title: "トレード",
    link: "/saga-eb/trade",
    content: ContentTrade,
  },
]

