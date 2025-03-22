import * as React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'

import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse'
import Drawer from '@mui/material/Drawer'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import { styled, useTheme } from '@mui/material/styles'
import { OverlayScrollbars } from 'overlayscrollbars'

import 'overlayscrollbars/overlayscrollbars.css'

const StyledListItem = styled(ListItem)(({ theme }) => ({
  height: '40px',
  margin: '2px 0',
  background: 'linear-gradient(to right, #1f3b533f 0%, #1f3b53 15%, #1f3b53 20%, #1f3b5300 97%)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #3964803f 0%, #396480 15%, #396480 20%, #39648000 97%)',
  },
  '&[aria-current=page]': {
    paddingTop: '2px',
    borderBottom: '2px solid',
    borderImageSource: 'linear-gradient(to right, #98fde53f 0%, #98fde5 15%, #98fde5 20%, #98fde500 95%)',
    borderImageSlice: 1,
    background: 'linear-gradient(to right, #163148c0 0%, #16314800 15%, #16314800 20%, #163148 97%), linear-gradient(to top, #4eb89a 0%, #1f3b53 100%)',
  },
  '&[aria-current=page]:hover': {
    paddingTop: '2px',
    borderBottom: '2px solid',
    borderImageSource: 'linear-gradient(to right, #98fde53f 0%, #98fde5 15%, #98fde5 20%, #98fde500 95%)',
    borderImageSlice: 1,
    background: 'linear-gradient(to right, #163148c0 0%, #16314800 15%, #16314800 20%, #163148 97%), linear-gradient(to top, #4eb89a 0%, #396480 100%)',
  },
}))

const StyledListItemParent = styled(ListItem)(({ theme }) => ({
  height: '40px',
  marginTop: 16,
  borderBottom: '2px solid',
  borderColor: '#ffffff',
  borderImageSource: 'linear-gradient(to right, #ffffff3f 0%, #ffffff 15%, #ffffff 20%, #ffffff00 95%)',
  borderImageSlice: 2,
  background: 'linear-gradient(to right, #1d5a6c3f 0%, #1d5a6c 15%, #1d5a6c 20%, #1d5a6c00 97%)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #36889b3f 0%, #36889b 15%, #36889b 20%, #36889b00 97%)',
  },
}))

const stateActions = Object.freeze({
  toggleLogic: 'toggleLogic',
  toggleData: 'toggleData',
})

const Context = React.createContext()

export const ContextProvider = ({ children }) => {
  const initState = {
    logicOpen: true,
    dataOpen: true,
  }

  const reducer = (state, action) => {
    switch (action) {
      case stateActions.toggleLogic:
        return { ...state, logicOpen: !state.logicOpen }
      case stateActions.toggleData:
        return { ...state, dataOpen: !state.dataOpen }
      default:
        return state
    }
  }

  const [state, dispach] = React.useReducer(reducer, initState)

  return <Context.Provider value={{ state, dispach }}>{children}</Context.Provider>
}

export const Sidebar = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx (
        filter: {frontmatter: {status: {ne: "secret"}}}
        sort: {frontmatter: {slug: ASC}}
      ) {
        nodes {
          frontmatter {
            slug
            status
            title
          }
        }
      }
    }
  `)
  const nodes = data.allMdx.nodes

  const theme = useTheme()
  const isDownLg = useMediaQuery(theme.breakpoints.down('lg'))
  const { state, dispach } = React.useContext(Context)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const initOverlayScrollbars = () => {
    OverlayScrollbars(document.querySelector('ul[id=navList]'), {
      scrollbars: {
        theme: 'os-theme-dark os-theme-sidebar',
        autoHide: 'leave',
        autoHideDelay: 100,
        clickScroll: true,
      },
    })
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  React.useEffect(() => {
    if (!isDownLg) {
      initOverlayScrollbars()
      setDrawerOpen(false)
    } else if (drawerOpen) {
      initOverlayScrollbars()
    }
  }, [isDownLg, drawerOpen])

  const topNode = nodes.find((node) => node.frontmatter.slug === '/saga-eb/')
  const logicNodes = nodes.filter((node) => node.frontmatter.slug.startsWith('/saga-eb/logic/'))
  const dataNodes = nodes.filter((node) => node.frontmatter.slug.startsWith('/saga-eb/data/'))

  const drawer = (
    <List id='navList' sx={{ mt: { xs: 8, sm: 6 }, py: 2 }}>
      <StyledListItem component={Link} disablePadding to={topNode.frontmatter.slug}>
        <ListItemButton>
          <ListItemText primary={topNode.frontmatter.title} sx={{ color: topNode.frontmatter.status === 'in progress' ? '#afafaf' : '' }}/>
        </ListItemButton>
      </StyledListItem>
      <StyledListItemParent component={Box} disablePadding>
        <ListItemButton onClick={() => dispach(stateActions.toggleLogic)}>
          <ListItemText primary={'ロジック'}/>
          {state.logicOpen ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>
      </StyledListItemParent>
      <List disablePadding>
        <Collapse in={state.logicOpen} timeout='auto' unmountOnExit>
          {logicNodes.map((node, index) => (
            <StyledListItem component={Link} disablePadding key={index} to={node.frontmatter.slug}>
              <ListItemButton>
                <ListItemText primary={node.frontmatter.title} sx={{ pl: 1, color: node.frontmatter.status === 'in progress' ? '#afafaf' : '' }}/>
              </ListItemButton>
            </StyledListItem>
          ))}
        </Collapse>
      </List>
      <StyledListItemParent component={Box} disablePadding>
        <ListItemButton onClick={() => dispach(stateActions.toggleData)}>
          <ListItemText primary={'データ'}/>
          {state.dataOpen ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>
      </StyledListItemParent>
      <List disablePadding>
        <Collapse in={state.dataOpen} timeout='auto' unmountOnExit>
          {dataNodes.map((node, index) => (
            <StyledListItem component={Link} disablePadding key={index} to={node.frontmatter.slug}>
              <ListItemButton>
                <ListItemText primary={node.frontmatter.title} sx={{ pl: 1, color: node.frontmatter.status === 'in progress' ? '#afafaf' : '' }}/>
              </ListItemButton>
            </StyledListItem>
          ))}
        </Collapse>
      </List>
    </List>
  )

  return (
    <>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          display: { lg: 'none' },
          position: 'fixed',
          zIndex: theme.zIndex.drawer + 100,
          mt: { xs: 3, sm: 1 },
          ml: 1,
          border: '1px solid',
          borderColor: '#f8d36f',
          boxShadow: 8,
          background: 'linear-gradient(to bottom, #805f92cf 0%, #ab84c2cf 100%)',
          '&:hover': {
            background: 'linear-gradient(to bottom, #805f92 0%, #ab84c2 100%)',
          },
        }}
      >
        {drawerOpen ? <CloseIcon sx={{ color: '#ffffff', fontSize: 32 }}/> : <MenuIcon sx={{ color: '#ffffff', fontSize: 32 }}/>}
      </IconButton>
      <Drawer
        onClose={handleDrawerToggle}
        open={isDownLg ? drawerOpen : true}
        variant={isDownLg ? 'temporary' : 'permanent'}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ elevation: 4, sx: { height: '100%' } }}
        sx={{
          flexShrink: 0,
          width: 256,
          '& .MuiDrawer-paper': {
            width: 256, 
            boxSizing: 'border-box',
            background: '#163148',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}
