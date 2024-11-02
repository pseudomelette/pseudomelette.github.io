import * as React from "react"
import { graphql, Link } from "gatsby"

import { MDXProvider } from "@mdx-js/react"
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Seo from "../components/seo";
import {
  StyledTypographySub,
  StyledTypographyH6,
  StyledTypographyH7,
} from "../layouts/saga-eb/layout"
import Tocbar from "../layouts/saga-eb/tocbar"

const drawerWidth = 256;

const StyledMainBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  color: 'white',
  background: '#2b4a66',
}));

const StlyedFooter = styled(Box)(({ theme }) => ({
  color: '#bfbfbf',
  width: '100%',
  background: 'linear-gradient(to bottom, #163148bf 0%, #2b4a66 100%), repeating-linear-gradient(135deg, #163148 0px, #163148 4px, #2b4a66 4px, #2b4a66 8px)',
}));

const components = {
  h1: props => <StyledTypographyH6 variant="h6" sx={{ marginTop: 4 }} {...props} />,
  h2: props => <StyledTypographyH7 sx={{ marginTop: 4 }} {...props} />,
  p: props => <Typography sx={{ marginBottom: 2 }} {...props} />,
  ul: props => <List disablePadding sx={{ listStyleType: 'disc', marginBottom: 2, marginLeft: 3 }} {...props} />,
  ol: props => <List disablePadding sx={{ listStyleType: 'circled-decimal', marginBottom: 2, marginLeft: 3 }} {...props} />,
  li: props => <ListItem disablePadding sx={{ display: 'list-item', marginBottom: 1 }} {...props} />,
  a: props => <Link style={{ color: '#e3aade' }} {...props} />,
};

export default function PageTemplate({ data, children }) {
  return (
    <StyledMainBox sx={{ marginTop: 6, flexGrow: 1 }}>
      <Box component='contents' sx={{ width: '100%' }}>
        <Box component='description' sx={{ padding: 3, display: 'block', minHeight: `calc(100% - 80px)`, maxWidth: 680, marginRight: 'auto', marginLeft: 'auto' }}>
          <Typography variant="h5" align='center'>
          {data.mdx.frontmatter.title}
          </Typography>
          <StyledTypographySub align='center'>
          {data.mdx.frontmatter.subtitle}
          </StyledTypographySub>
          <MDXProvider components={components}>
            {children}
          </MDXProvider>
        </Box>
        <StlyedFooter component='footer' sx={{ minHeight: 80, width: { xs: '100vw', md: `calc(100vw - ${drawerWidth}px)` , lg: `calc(100vw - ${drawerWidth}px * 2)`} }}>
          <Box sx={{ height:4, borderTop: 1, borderBottom: 1, background: '#163148' }} />
          <Typography sx={{ marginLeft: 'auto', marginRight:'auto'}}>
            <Typography variant='body2' align="center" sx={{ marginTop: 1 }}>
              © SQUARE ENIX<br/>
            </Typography>
            <Typography variant='body2' align="center">
              記載されている会社名・製品名・システム名などは、各社の商標、または登録商標です。
            </Typography>
          </Typography>
        </StlyedFooter>
      </Box>
      <Box component='toc'>
        <Tocbar items={data.mdx.tableOfContents.items}/>
      </Box>
    </StyledMainBox>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: {eq: $slug } }) {
      frontmatter {
        title
        subtitle
      }
      tableOfContents(maxDepth: 2)
    }
  }
`

export const Head = ({ data }) => {
  var title = 'サガ エメラルド ビヨンド（サガエメ）システム解説：' + data.mdx.frontmatter.title;
  return (<Seo title={title} />)
}