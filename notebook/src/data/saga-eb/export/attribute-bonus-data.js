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
} from '../../../components/saga-eb/layout'

export const AttributeBonusData = () => {
  const data = useStaticQuery(graphql`
    query {
      allSagaebAttributeBonusDataCsv {
        nodes {
          Status
          DamageBonus
          SuccessRateBonus
          DefenseBonus
        }
      }
    }
  `)
  const nodes = data.allSagaebAttributeBonusDataCsv.nodes

  return(
    <StyledTableContainer align='center'>
      <Table stickyHeader sx={{ width: `calc(56px + 68px * 3)`, tableLayout: 'fixed' }}>
        <TableHead sx={{ position: 'sticky', top: 0, zIndex: 3 }}>
          <TableRow>
            <StyledTh align='center' sx={{ position: 'sticky', left: 0, zIndex: 3, width: '56px' }}>能力値</StyledTh>
            <StyledTh align='center' sx={{ width: '68px' }}>攻撃<br/>ボーナス</StyledTh>
            <StyledTh align='center' sx={{ width: '68px' }}>防御<br/>ボーナス</StyledTh>
            <StyledTh align='center' sx={{ width: '68px' }}>状態異常<br/>ボーナス</StyledTh>
          </TableRow>
        </TableHead>
        <TableBody>
          {nodes.map((node, index) => {
            return(
              <StyledTrTwoToneB className={index % 2 === 0 ? 'darker-row-w-header' : 'lighter-row-w-header'} key={index}>
                <StyledTrh align='center' scope='row'>{node.Status}</StyledTrh>
                <StyledTd align='center'>{Number(node.DamageBonus)}</StyledTd>
                <StyledTd align='center'>{Number(node.DefenseBonus)}</StyledTd>
                <StyledTd align='center'>{Number(node.SuccessRateBonus)}</StyledTd>
              </StyledTrTwoToneB>
            )
          })}
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}
