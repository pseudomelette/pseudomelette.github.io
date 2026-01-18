import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import {
  StyledTableContainer,
  StyledTd,
  StyledTh,
  StyledTrh,
  StyledTrTwoToneB,
  StyledTrTwoToneR,
} from '../../../components/saga-eb/layout'

export const BattleRankData = () => {
  const data = useStaticQuery(graphql`
    query {
      allSagaebEnemyRankDataCsv {
        nodes {
          label
          Attack
          SkillLv
          Defense
          HP
          Parameter
          growRank
        }
      }
    }
  `)
  const nodes = data.allSagaebEnemyRankDataCsv.nodes

  return (
    <StyledTableContainer align='center'>
      <Table stickyHeader sx={{ width: `calc(52px + 64px * 6)`, tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <StyledTh align='center' sx={{ position: 'sticky', left: 0, zIndex: 3, width: '52px' }}>バトル<br/>ランク</StyledTh>
            <StyledTh align='center'>敵武器<br/>威力</StyledTh>
            <StyledTh align='center'>敵SLv</StyledTh>
            <StyledTh align='center'>基本<br/>属性耐性</StyledTh>
            <StyledTh align='center'>HP<br/>補正率</StyledTh>
            <StyledTh align='center'>基本<br/>能力値</StyledTh>
            <StyledTh align='center'>成長<br/>ランク</StyledTh>
          </TableRow>
        </TableHead>
        <TableBody>
          {nodes.map((node, index) => {
            if (Number(node.label.split('_')[1]) > 200) {
              return (
                <StyledTrTwoToneR className={index % 2 === 0 ? 'darker-row-w-header' : 'lighter-row-w-header'} key={index}>
                  <StyledTrh align='center' scope='row'>{Number(node.label.split('_')[1])}</StyledTrh>
                  <StyledTd align='center'>{node.Attack}</StyledTd>
                  <StyledTd align='center'>{node.SkillLv}</StyledTd>
                  <StyledTd align='center'>{node.Defense}</StyledTd>
                  <StyledTd align='center'>{node.HP}</StyledTd>
                  <StyledTd align='center'>{node.Parameter}</StyledTd>
                  <StyledTd align='center'>{node.growRank}</StyledTd>
                </StyledTrTwoToneR>
              )
            } else {
              return (
                <StyledTrTwoToneB className={index % 2 === 0 ? 'darker-row-w-header' : 'lighter-row-w-header'} key={index}>
                  <StyledTrh align='center' scope='row'>{Number(node.label.split('_')[1])}</StyledTrh>
                  <StyledTd align='center'>{node.Attack}</StyledTd>
                  <StyledTd align='center'>{node.SkillLv}</StyledTd>
                  <StyledTd align='center'>{node.Defense}</StyledTd>
                  <StyledTd align='center'>{node.HP}</StyledTd>
                  <StyledTd align='center'>{node.Parameter}</StyledTd>
                  <StyledTd align='center'>{node.growRank}</StyledTd>
                </StyledTrTwoToneB>
              )
            }
          })}
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}
