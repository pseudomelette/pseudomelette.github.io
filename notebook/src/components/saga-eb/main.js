import * as React from 'react'
import { Link } from 'gatsby'

import { MDXProvider } from '@mdx-js/react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import Seo from '../../components/seo'
import { Tocbar } from './tocbar'
import { Footer } from './footer'

const StyledTypographyH6 = styled(Typography)(({ theme }) => ({
  margin: '32px 0 16px 0',
  padding: '4px 12px 2px 12px',
  background: '#44757e',
  [theme.breakpoints.up('sm')]: {
    background: `
      linear-gradient(135deg, #44757e calc(100% - 120px), #2b4a66 calc(100% - 120px), #2b4a66 calc(100% - 116px), #2b4a6600 calc(100% - 116px)),
      linear-gradient(45deg, #44757e calc(100% - 92px), #2b4a66 calc(100% - 92px), #2b4a66 calc(100% - 88px), #2b4a6600 calc(100% - 88px)),
      linear-gradient(135deg, #44757e calc(100% - 64px), #44757e00 calc(100% - 64px))
    `,
  },
}))

const StyledTypographyH7 = styled(Typography)(({ theme }) => ({
  margin: '32px 0 16px 0',
  padding: '4px 8px 2px 8px',
  borderTop: '1px solid',
  borderBottom: '1px solid',
  background: '#44757e5f',
  [theme.breakpoints.up('sm')]: {
    borderImageSource: `linear-gradient(to right, #ffffff calc(100% - 320px), #ffffff00 calc(100% - 192px))`,
    borderImageSlice: 1,
    background: `linear-gradient(to right, #44757e5f calc(100% - 320px), #44757e00 calc(100% - 192px))`,
  },
}))

const components = {
  h1: props => <StyledTypographyH6 variant='h6' {...props}/>,
  h2: props => <StyledTypographyH7 {...props}/>,
  p: props => <Typography sx={{ mb: 2 }} {...props}/>,
  ul: props => <List disablePadding sx={{ mb: 2, ml: 3, listStyleType: 'disc' }} {...props}/>,
  ol: props => <List disablePadding sx={{ mb: 2, ml: 3, listStyleType: 'decimal' }} {...props}/>,
  li: props => <ListItem disablePadding sx={{ display: 'list-item', mb: 1 }} {...props}/>,
  a: props => <Link style={{ color: '#e3aade' }} {...props}/>,
}

export const SagaEbTemplate = ({ data, children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        mt: { xs: 8, sm: 6 },
        background: '#1f3b53',
        color: '#ffffff',      
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'block',
            minHeight: `calc(100% - 80px)`,
            borderBottomRightRadius: { xs: 0, md: 8 },
            background: '#2b4a66',
          }}
        >
          <Box id='doc' sx={{ maxWidth: `calc(680px + 24px * 2)`, mx: 'auto', p: 3 }}>
            <Typography align='center' variant='h5'>
              {data.mdx.frontmatter.title}
            </Typography>
            <Typography
              align='center'
              sx={{
                borderTop: 1,
                borderColor: '#f8d36f',
                background: 'linear-gradient(to right, #805f9200 10%, #805f92 30%, #805f92 70%, #805f9200 90%)',
              }}
            >
              {data.mdx.frontmatter.subtitle}
            </Typography>
            <MDXProvider components={components}>
              {children}
            </MDXProvider>
          </Box>
        </Box>
        <Box>
          <Footer/>
        </Box>
      </Box>
      <Box>
        <Tocbar slug={data.mdx.frontmatter.slug} items={data.mdx.tableOfContents.items}/>
      </Box>
    </Box>
  )
}

export const SagaEbHead = ({ data }) => {
  const category = data.mdx.frontmatter.slug.includes('/saga-eb/logic/') ? 'ロジック ＞ '
      : data.mdx.frontmatter.slug.includes('/saga-eb/data/') ? 'データ ＞ '
      : ''
  const title = category + data.mdx.frontmatter.title + ' — サガ エメラルド ビヨンド システム解説'
  const description = 'サガ エメラルド ビヨンド（サガエメ）のシステム解説サイト。' + data.mdx.frontmatter.description
  return <Seo title={title} description={description}/>
}
