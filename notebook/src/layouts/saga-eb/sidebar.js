import * as React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'

import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
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

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  margin: '8px 0 0 8px',
  border: '1px solid',
  borderColor: '#f8d36f',
  background: 'linear-gradient(to bottom, #805f92cf 0%, #ab84c2cf 100%)',
  [theme.breakpoints.down('sm')]: {
    marginTop: 24,
  },
  '&:hover': {
    background: 'linear-gradient(to bottom, #805f92 0%, #ab84c2 100%)',
  },
}))

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 256,
    boxSizing: 'border-box',
    background: '#163148',
  },
}))

const StyledListItem = styled(ListItem)(({ theme }) => ({
  margin: '2px 0',
  height: '45px',
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
    fontWeight: '900',
  },
  '&[aria-current=page]:hover': {
    paddingTop: '2px',
    borderBottom: '2px solid',
    borderImageSource: 'linear-gradient(to right, #98fde53f 0%, #98fde5 15%, #98fde5 20%, #98fde500 95%)',
    borderImageSlice: 1,
    background: 'linear-gradient(to right, #163148c0 0%, #16314800 15%, #16314800 20%, #163148 97%), linear-gradient(to top, #4eb89a 0%, #396480 100%)',
    fontWeight: '900',
  },
}))

const StyledListItemParent = styled(ListItem)(({ theme }) => ({
  height: '45px',
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
      allMdx (sort: {frontmatter: {slug: ASC}}) {
        nodes {
          frontmatter {
            slug
            title
          }
        }
      }
    }
  `)
  const nodes = data.allMdx.nodes

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const { state, dispach } = React.useContext(Context)
  const [mobileOpen, setMobileOpen] = React.useState(false)

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
    setMobileOpen(!mobileOpen)
  }

  React.useEffect(() => {
    if (!isMobile) {
      initOverlayScrollbars()
      setMobileOpen(false)
    } else if (mobileOpen) {
      initOverlayScrollbars()
    }
  }, [isMobile, mobileOpen])

  const topNode = nodes.find((node) => node.frontmatter.slug === '/saga-eb/')
  const logicNodes = nodes.filter((node) => node.frontmatter.slug.startsWith('/saga-eb/logic/'))
  const dataNodes = nodes.filter((node) => node.frontmatter.slug.startsWith('/saga-eb/data/'))

  const drawer = (
    <List id='navList' sx={{ mt: 6, py: 2 }}>
      <StyledListItem component={Link} to={topNode.frontmatter.slug} disablePadding>
        <ListItemButton>
          <ListItemText primary={topNode.frontmatter.title} />
        </ListItemButton>
      </StyledListItem>
      <StyledListItemParent component={Box} disablePadding>
        <ListItemButton onClick={() => dispach(stateActions.toggleLogic)}>
          <ListItemText primary={'ロジック'} />
          {state.logicOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </StyledListItemParent>
      <List disablePadding>
        <Collapse in={state.logicOpen} timeout='auto' unmountOnExit>
          {logicNodes.map((node, index) => (
            <StyledListItem component={Link} to={node.frontmatter.slug} key={index} disablePadding>
              <ListItemButton>
                <ListItemText primary={node.frontmatter.title} sx={{ pl: 1 }} />
              </ListItemButton>
            </StyledListItem>
          ))}
        </Collapse>
      </List>
      <StyledListItemParent component={Link} disablePadding>
        <ListItemButton onClick={() => dispach(stateActions.toggleData)}>
          <ListItemText primary={'データ'} />
          {state.dataOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </StyledListItemParent>
      <List disablePadding>
        <Collapse in={state.dataOpen} timeout='auto' unmountOnExit>
          {dataNodes.map((node, index) => (
            <StyledListItem component={Link} to={node.frontmatter.slug} key={index} disablePadding>
              <ListItemButton>
                <ListItemText primary={node.frontmatter.title} sx={{ pl: 1 }} />
              </ListItemButton>
            </StyledListItem>
          ))}
        </Collapse>
      </List>
    </List>
  )

  return (
    <>
      <StyledIconButton onClick={handleDrawerToggle} sx={{ display: { lg: 'none' }, boxShadow: 8, zIndex: theme.zIndex.drawer + 100 }}>
        <MenuIcon sx={{ fontSize: 32, color: '#ffffff' }} />
      </StyledIconButton>
      <StyledDrawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ height: '100%', elevation: 4 }}
      >
        {drawer}
      </StyledDrawer>
    </>
  )
}
