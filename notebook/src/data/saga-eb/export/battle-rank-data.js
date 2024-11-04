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
	StyledThLeft,
	StyledTr,
} from '../../../layouts/saga-eb/layout'

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

  return(
    <StyledTableContainer align='center' sx={{ marginTop: 3, boxShadow: 3 }}>
      <Table stickyHeader sx={{ width: `calc(80px * 7)`, tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <StyledTh align='center' sx={{ position: 'sticky', left: 0, zIndex: 3 }}>バトル<br/>ランク</StyledTh>
            <StyledTh align='center'>武器威力</StyledTh>
            <StyledTh align='center'>スキル<br/>レベル</StyledTh>
            <StyledTh align='center'>基礎<br/>属性耐性</StyledTh>
            <StyledTh align='center'>基礎HP</StyledTh>
            <StyledTh align='center'>基礎<br/>能力値</StyledTh>
            <StyledTh align='center'>成長<br/>ランク</StyledTh>
          </TableRow>
        </TableHead>
        <TableBody>
          {nodes.map(node => {
						if (Number(node.label.split('_')[1]) > 200) {
							return (
								<StyledTr>
									<StyledThLeft align='center' scope='row' sx={{ background: '#ab84c2' }}>{Number(node.label.split('_')[1])}</StyledThLeft>
									<StyledTd align='center'>{node.Attack}</StyledTd>
									<StyledTd align='center'>{Number(node.SkillLv)}</StyledTd>
									<StyledTd align='center'>{node.Defense}</StyledTd>
									<StyledTd align='center'>{node.HP}</StyledTd>
									<StyledTd align='center'>{node.Parameter}</StyledTd>
									<StyledTd align='center'>{node.growRank}</StyledTd>
								</StyledTr>
							)
						} else {
							return (
								<StyledTr>
									<StyledThLeft align='center' scope='row'>{Number(node.label.split('_')[1])}</StyledThLeft>
									<StyledTd align='center'>{node.Attack}</StyledTd>
									<StyledTd align='center'>{Number(node.SkillLv)}</StyledTd>
									<StyledTd align='center'>{node.Defense}</StyledTd>
									<StyledTd align='center'>{node.HP}</StyledTd>
									<StyledTd align='center'>{node.Parameter}</StyledTd>
									<StyledTd align='center'>{node.growRank}</StyledTd>
								</StyledTr>
							)
						}
          })}
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}
