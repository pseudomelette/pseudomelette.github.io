import * as React from "react"

import Layout from "./layout"
import {
  StyledTypographySub,
  StyledTypographyH6,
  StyledTypographyH7,
  StyledMathT,
  StyledTh,
  StyledTd,
} from "./layout"
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { InlineMath, BlockMath } from 'react-katex';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import 'katex/dist/katex.min.css'
import Seo from "../../components/seo"

export const Head = () => <Seo title="Battle Rank" />

const ContentBattleRank = () => {
  return(
    <Layout>
      <Typography sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h5" align='center'>
          バトルランク
        </Typography>
        <StyledTypographySub align='center'>
          Battle Rank
        </StyledTypographySub>
        <StyledTypographyH6 variant="h6">
          バトルランク（BR）とは
        </StyledTypographyH6>
        <Typography sx={{ marginBottom: 4 }}>
          ゲーム内において、用語は登場するものの定義が説明されない内部数値。<br/>
          以下3種に細分化されます。
        </Typography>
        <StyledTypographyH7>
          現在バトルランク
        </StyledTypographyH7>
        <Typography sx={{ marginBottom: 1 }}>
          味方の強さをバトル実績に基づいて数値化したもので、以下の特徴があります。
        </Typography>
        <Typography sx={{ marginBottom: 3 }}>
          <List sx={{ listStyleType: 'disc', pl: 3 }}>
            <ListItem disablePadding sx={{ display: 'list-item', marginBottom: 1 }}>
              敵バトルランク、バトルの敵編成、イベント・バトルの獲得アイテムに影響する。
            </ListItem>
            <ListItem disablePadding sx={{ display: 'list-item', marginBottom: 1 }}>
              条件を満たすとバトル勝利後に上昇する。
            </ListItem>
            <ListItem disablePadding sx={{ display: 'list-item', marginBottom: 1 }}>
              初期値は1、最大値は200。
            </ListItem>
          </List>
        </Typography>
        <StyledTypographyH7>
          潜在バトルランク
        </StyledTypographyH7>
        <Typography sx={{ marginBottom: 1 }}>
          味方の強さをステータスに基づいて数値化したもので、以下の特徴があります。
        </Typography>
        <Typography sx={{ marginBottom: 3 }}>
          <List sx={{ listStyleType: 'disc', pl: 3 }}>
            <ListItem disablePadding sx={{ display: 'list-item', marginBottom: 1 }}>
              現在バトルランクの上昇量、敵バトルランクに影響する。
            </ListItem>
            <ListItem disablePadding sx={{ display: 'list-item', marginBottom: 1 }}>
              バトルパーティ（戦闘参加メンバー）のステータスによって変動する。
            </ListItem>
            <ListItem disablePadding sx={{ display: 'list-item', marginBottom: 1 }}>
              理論最大値は176.625。
            </ListItem>
          </List>
        </Typography>
        <StyledTypographyH7>
          敵バトルランク
        </StyledTypographyH7>
        <Typography sx={{ marginBottom: 1 }}>
          個々の敵の強さを数値化したもので、以下の特徴があります。
        </Typography>
        <Typography sx={{ marginBottom: 3 }}>
          <List sx={{ listStyleType: 'disc', pl: 3 }}>
            <ListItem disablePadding sx={{ display: 'list-item', marginBottom: 1 }}>
              敵のステータス、味方のひらめき・成長に影響する。
            </ListItem>
            <ListItem disablePadding sx={{ display: 'list-item', marginBottom: 1 }}>
              現在・潜在バトルランク、バトル難易度に基づいて決定される。
            </ListItem>
            <ListItem disablePadding sx={{ display: 'list-item', marginBottom: 1 }}>
              現在バトルランクを下回ることはなく、最大値は250。
            </ListItem>
          </List>
        </Typography>
        <StyledTypographyH6 variant="h6">
          現在バトルランクの上昇条件
        </StyledTypographyH6>
        <Typography sx={{ marginBottom: 3 }}>
          バトル難易度によっては現在バトルランクが上昇しない場合があります。<br/>
          バトル難易度とバトルランク上昇の関係は下表の通りです。
        </Typography>
        <Typography sx={{ marginBottom: 5 }}>
          <TableContainer align="center">
            <Table sx={{ width: 330 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTh align="center">
                    バトル難易度
                  </StyledTh>
                  <StyledTh align="center">
                    バトルランク上昇
                  </StyledTh>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <StyledTd align="left">
                    楽勝<br/>
                    普通（戦闘不能者数 <InlineMath>\geq</InlineMath> 2）
                  </StyledTd>
                  <StyledTd align="center">なし</StyledTd>
                </TableRow>
                <TableRow>
                  <StyledTd align="left">
                    普通（戦闘不能者数 <InlineMath>\lt</InlineMath> 2）<br/>
                    強敵<br/>
                    最凶
                  </StyledTd>
                  <StyledTd align="center">あり</StyledTd>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Typography>
        <StyledTypographyH6 variant="h6">
          現在バトルランクの上昇量
        </StyledTypographyH6>
        <Typography sx={{ marginBottom: 3 }}>
          特定の条件を満たしていればバトル勝利後に現在バトルランクが上昇します。<br/>
          バトルランク上昇量は下式で算出されます。
        </Typography>
        <StyledMathT sx={{ marginBottom: 3, boxShadow: 3 }}>
          <BlockMath math="\text{BR上昇量}=\begin{cases}1&(\text{現在BR}\geq\text{潜在BR})\\1+\text{ランク差ボーナス}&(\text{現在BR}<\text{潜在BR})\end{cases}"/>
        </StyledMathT>
        <Typography sx={{ marginBottom: 3 }}>
          バトルランクは基本的に1ずつ上昇しますが、潜在バトルランクが現在バトルランクを上回る場合は上昇量にボーナスが加わります。<br/>
          ランク差ボーナスは下式で算出されます。
        </Typography>
        <StyledMathT sx={{ marginBottom: 3, boxShadow: 3 }}>
          <BlockMath
            math="\text{ランク差ボーナス}=\min(\text{ランク差評価値}, \text{潜在BR}-\text{現在BR})\\[1.3em]
                \text{ランク差評価値}=\text{潜在BR}\times \frac{\text{潜在BR}\times 1.5-\text{現在BR}}{\text{潜在BR}\times 10+\text{現在BR}\times 1.5}+1"
          />
        </StyledMathT>
        <Typography sx={{ marginBottom: 4 }}>
          ランク差評価値とランク差ボーナスの計算結果は小数点以下が切り捨てられます。<br/>
          潜在バトルランクと現在バトルランクの間に大きな差分があるうちはランク差評価値をそのままボーナスとして上乗せしますが、それによって逆転が起こる場合は差分が埋まる程度のボーナスに修正します。
        </Typography>
        <StyledTypographyH6 variant="h6">
          現在バトルランクの暫定上限
        </StyledTypographyH6>
        <Typography sx={{ marginBottom: 3 }}>
          現在バトルランクには暫定的な上限バトルランクが存在します。<br/>
          上限バトルランクを踏まえると、バトルランク上昇量加算後の現在バトルランクは下式で算出されます。
        </Typography>
        <StyledMathT sx={{ marginBottom: 3, boxShadow: 3 }}>
          <BlockMath math="\text{現在BR}_{next}=\min(\text{現在BR}+\text{BR上昇量}, \text{上限BR})"/>
        </StyledMathT>
        <Typography sx={{ marginBottom: 1 }}>
          上限バトルランクには以下2種の更新タイミングが存在します。
        </Typography>
        <Typography sx={{ marginBottom: 1 }}>
          <List sx={{ pl: 0.5 }}>
            <ListItem disablePadding sx={{ display: 'list-item', marginBottom: 1 }}>
              ① ランク差ボーナス発生状態（現在BR <InlineMath>\lt</InlineMath> 潜在BR）でのバトルランク上昇量加算前
            </ListItem>
            <ListItem disablePadding sx={{ display: 'list-item', marginBottom: 1 }}>
              ② ワールド（連接領域含む）移動後
            </ListItem>
          </List>
        </Typography>
        <Typography sx={{ marginBottom: 3 }}>
          それぞれのタイミングについて、新しい上限バトルランクは下式で算出されます。
        </Typography>
        <StyledMathT sx={{ marginBottom: 3, boxShadow: 3 }}>
          <BlockMath
            math="\text{上限BR}=\begin{cases}\text{現在BR}+10+\text{ランク差ボーナス}&(\text{①})\\\text{現在BR}+10&(\text{②})\end{cases}"
          />
        </StyledMathT>
        <Typography sx={{ marginBottom: 4 }}>
          上限バトルランクの更新はワールドを移動しなくても可能ですが、潜在バトルランクを上昇させる（味方を成長させる）必要があるため時間がかかります。<br/>
          また、潜在バトルランクの理論最大値（176.625）は現在バトルランクの最大値（200）を大きく下回るため、上限バトルランクを最大値まで引き上げるにはワールド移動が必須です。
        </Typography>
        <StyledTypographyH6 variant="h6">
          潜在バトルランク
        </StyledTypographyH6>
        <Typography sx={{ marginBottom: 3 }}>
          潜在バトルランクは下式で算出されます。
        </Typography>
        <StyledMathT sx={{ marginBottom: 3, boxShadow: 3 }}>
          <BlockMath math="\text{潜在BR}=\sum_{m\in BP} \text{メンバー}m\text{の強さ}" />
        </StyledMathT>
        <Typography sx={{ marginBottom: 3 }}>
          ここで、<InlineMath math="BP" />はバトルパーティを意味し、サポートメンバーや控えメンバーを含みません。<br/>
          メンバーの強さは下式で算出されます。
        </Typography>
        <StyledMathT sx={{ marginBottom: 3, boxShadow: 3 }}>
          <BlockMath math="\text{メンバーの強さ}=\text{HP評価値}+\text{能力値評価値}+\text{スキル評価値}\\[1.3em]
              \text{HP評価値}=\frac{(HP-140)\times 18}{1000}\\[1em]
              \text{能力値評価値}=\frac{(\max Stat-20)\times 72}{1000}\\[1em]
              \text{スキル評価値}=\frac{(\max SLv-5)\times 315}{1000}" />
        </StyledMathT>
        <Typography sx={{ marginBottom: 4 }}>
          ここで、<InlineMath math="\max Stat" />は能力値6種の中で装備補正込みで最も高い値、
          <InlineMath math="\max SLv" />は所持スキルのレベルの中で最も高い値を意味します。<br/>
          潜在バトルランクはバトル準備画面突入時点でのバトルパーティのステータスで算出されるため、バトル準備画面でメンバー・装備変更をしても変動しません。
        </Typography>
        <StyledTypographyH6 variant="h6">
          敵バトルランク
        </StyledTypographyH6>
        <Typography sx={{ marginBottom: 3 }}>
          敵バトルランクはそれぞれの敵について下式で算出されます。
        </Typography>
        <StyledMathT sx={{ marginBottom: 3, boxShadow: 3 }}>
          <BlockMath math="\text{敵BR}=\max(\text{基本BR}+\text{相対BR}+\text{ひらめきレベル}, \text{下限BR})" />
        </StyledMathT>
        <Typography sx={{ marginBottom: 3 }}>
        ここで、相対バトルランクと下限バトルランクは個々のバトルに設定されている値で、
        ひらめきレベルは個々の敵に設定されている値です。<br/>
        基本バトルランクは下式で算出されます。
        </Typography>
        <StyledMathT sx={{ marginBottom: 3, boxShadow: 3 }}>
          <BlockMath math="\text{基本BR}=\begin{cases}\text{現在BR}&(\text{楽勝または普通})\\
              \max(\text{現在BR}, \text{潜在BR}\times 0.8)&(\text{強敵})\\
              \max(\text{現在BR}, \text{潜在BR})&(\text{最凶})\end{cases}" />
        </StyledMathT>
        <Typography sx={{ marginBottom: 2 }}>
          基本バトルランクの計算結果は小数点以下が切り捨てられます。<br/>
        </Typography>
      </Typography>
    </Layout>
  )
}

export default ContentBattleRank