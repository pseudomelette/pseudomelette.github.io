import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { Link } from 'gatsby'

import List from '@mui/material/List'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import {
  StyledTableContainer,
  StyledTd,
  StyledTh,
  StyledTr,
} from '../../../components/saga-eb/layout'

export const ChangeLogData = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
            title
          }
        }
      }
      allSagaebChangeLogDataCsv {
        nodes {
          comment
          date
          slug
        }
      }
    }
  `)
  const mdxNodes = data.allMdx.nodes
  const csvNodes = data.allSagaebChangeLogDataCsv.nodes

  const outputNodes = []
  csvNodes.forEach(csvNode => {
    let text = ''
    if (csvNode.slug.startsWith('/saga-eb/logic/')) {
      text = 'ロジック ＞ ' + mdxNodes.find(mdxNode => mdxNode.frontmatter.slug === csvNode.slug).frontmatter.title
    } else if (csvNode.slug.startsWith('/saga-eb/data/')) {
      text = 'データ ＞ ' + mdxNodes.find(mdxNode => mdxNode.frontmatter.slug === csvNode.slug).frontmatter.title
    }

    if (outputNodes.find(outputNode => outputNode.date === csvNode.date) === undefined) {
      outputNodes.push({'date': csvNode.date, 'updates': [{'url': csvNode.slug, 'breadcrumb': text, 'comment': csvNode.comment}]})
    } else {
      outputNodes.find(outputNode => outputNode.date === csvNode.date).updates.push({'url': csvNode.slug, 'breadcrumb': text, 'comment': csvNode.comment})
    }
  })
  console.log(outputNodes)

  return(
		<StyledTableContainer align='center'>
			<Table stickyHeader sx={{ maxWidth: '500px', tableLayout: 'fixed' }}>
        <TableHead sx={{ position: 'sticky', top: 0 }}>
					<TableRow>
            <StyledTh align='center' sx={{ width: '84px' }}>更新日</StyledTh>
            <StyledTh align='center'>内容</StyledTh>
					</TableRow>
        </TableHead>
        <TableBody>
          {outputNodes.map((outputNode, index) => (
            <StyledTr key={index}>
              <StyledTd align='center' sx={{ verticalAlign: 'top' }}>{outputNode.date}</StyledTd>
              <StyledTd align='left'>
                <List disablePadding sx={{ ml: 2, listStyleType: 'disc' }}>
                  {outputNode.updates.map((update, subindex) => (
                    <li style={{ marginBottom: 0 }} key={subindex}>
                      {update.url === '/saga-eb/' ? <>本ページ{update.comment}</> : <><Link to={update.url}>{update.breadcrumb}</Link> {update.comment}</>}
                    </li>
                  ))}
                </List>
              </StyledTd>
            </StyledTr>
          ))}
        </TableBody>
			</Table>
		</StyledTableContainer>
	)
}
