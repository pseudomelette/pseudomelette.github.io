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

const drawerWidth = 256

const StyledMainBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  color: 'white',
  background: '#2b4a66',
}))

const StyledTypographyH6 = styled(Typography)(({ theme }) => ({
  background: '#44757e',
  paddingTop: 4,
  paddingBottom: 2,
  paddingLeft: 12,
  paddingRight: 12,
  marginBottom: 16,
  [theme.breakpoints.up('sm')]: {
    background: `
      linear-gradient(135deg, #44757e calc(100% - 120px), #2b4a66 calc(100% - 120px), #2b4a66 calc(100% - 116px), #2b4a6600 calc(100% - 116px)),
      linear-gradient(45deg, #44757e calc(100% - 92px), #2b4a66 calc(100% - 92px), #2b4a66 calc(100% - 88px), #2b4a6600 calc(100% - 88px)),
      linear-gradient(135deg, #44757e calc(100% - 64px), #44757e00 calc(100% - 64px))
    `,
  },
}))

const StyledTypographyH7 = styled(Typography)(({ theme }) => ({
  background: '#44757e5f',
  paddingTop: 4,
  paddingBottom: 2,
  paddingLeft: 8,
  paddingRight: 8,
  marginBottom: 16,
  borderTop: '1px solid',
  borderBottom: '1px solid',
  [theme.breakpoints.up('sm')]: {
    background: `linear-gradient(to right, #44757e5f calc(100% - 320px), #44757e00 calc(100% - 192px))`,
    borderImageSlice: 1,
    borderImageSource: `linear-gradient(to right, #ffffff calc(100% - 320px), #ffffff00 calc(100% - 192px))`,
  },
}))

const StyledTypographySub = styled(Typography)(({ theme }) => ({
  borderTop: '1px solid',
  borderColor: '#f8d36f',
  background: 'linear-gradient(to right, #805f9200 10%, #805f92 30%, #805f92 70%, #805f9200 90%)',
}))

const components = {
  h1: props => <StyledTypographyH6 variant='h6' sx={{ marginTop: 4 }} {...props} />,
  h2: props => <StyledTypographyH7 sx={{ marginTop: 4 }} {...props} />,
  p: props => <Typography sx={{ marginBottom: 2 }} {...props} />,
  ul: props => <List disablePadding sx={{ listStyleType: 'disc', marginBottom: 2, marginLeft: 3 }} {...props} />,
  ol: props => <List disablePadding sx={{ listStyleType: 'circled-decimal', marginBottom: 2, marginLeft: 3 }} {...props} />,
  li: props => <ListItem disablePadding sx={{ display: 'list-item', marginBottom: 1 }} {...props} />,
  a: props => <Link style={{ color: '#e3aade' }} {...props} />,
}

export const SagaEbTemplate = ({ data, children }) => {
  return (
    <StyledMainBox sx={{ marginTop: 6, flexGrow: 1 }}>
      <Box component='contents' sx={{ width: '100%' }}>
        <Box component='description' sx={{ padding: 3, display: 'block', minHeight: `calc(100% - 80px)`, maxWidth: 680, marginRight: 'auto', marginLeft: 'auto' }}>
          <Typography variant='h5' align='center'>{data.mdx.frontmatter.title}</Typography>
          <StyledTypographySub align='center'>{data.mdx.frontmatter.subtitle}</StyledTypographySub>
          <MDXProvider components={components}>{children}</MDXProvider>
        </Box>
        <Footer />
      </Box>
      <Box component='toc'>
        <Tocbar items={data.mdx.tableOfContents.items} />
      </Box>
    </StyledMainBox>
  )
}

export const SagaEbHead = ({ data }) => {
  const title = 'サガ エメラルド ビヨンド（サガエメ）システム解説：' + data.mdx.frontmatter.title
  return <Seo title={title} />
}
