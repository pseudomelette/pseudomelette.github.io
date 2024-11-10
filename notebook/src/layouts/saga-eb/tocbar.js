import * as React from 'react'

import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { OverlayScrollbars } from 'overlayscrollbars'

import 'overlayscrollbars/overlayscrollbars.css'

const rootMarginTop = 130
const rootMarginBottom = () => document.documentElement.clientHeight - 215

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 256,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 256,
    boxSizing: 'border-box',
    background: '#163148',
  },
}))

const StyledTocHeader = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  height: '48px',
  width: '239px',
  lineHeight: '48px',
  marginTop: 16,
  marginLeft: 4,
  borderBottom: '2px solid',
  borderColor: '#98fde5',
  background: 'linear-gradient(to top, #4eb89a 0%, #163148 84%)',
}))

const StyledTocBody = styled(Box)(({ theme }) => ({
  marginTop: 64,
  marginLeft: 4,
  marginRight: 12,
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
}))

const StyledList = styled(List)(({ theme }) => ({
  paddingTop: 16,
  paddingBottom: 16,
  border: '0px solid',
  borderRadius: 0,
  borderColor: '#163148',
  background: '#2b4a66',
}))

const StyledListItem = styled(ListItem)(({ theme }) => ({
  height: '45px',
  color: '#ffffff',
  display: 'block',
  '&.active': {
    background: 'linear-gradient(to right, #4eb89a00 4px, #4eb89a 4px, #4eb89a 9px, #4eb89a5f 9px, #4eb89a00 228px)',
  },
  '&:hover': {
    background: 'linear-gradient(to right, #48759400 9px, #487594 40%, #487594 60%, #48759400 228px)',
  },
  '&.active:hover': {
    background: 'linear-gradient(to right, #4eb89a00 4px, #4eb89a 4px, #4eb89a 9px, #4eb89a7f 9px, #487594 60%, #48759400 228px)',
  },
}))

export const Tocbar = ({ items }) => {
  const tocItems = items === undefined ? [] : items

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const doWhenIntersect = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentActiveIndex = document.querySelector('ul[id=tocList] .active')
        if (currentActiveIndex !== null) {
          currentActiveIndex.classList.remove('active')
        }
        const newActiveIndex = document.querySelector(`a[id='${entry.target.id}']`)
        if (newActiveIndex !== null) {
          newActiveIndex.classList.add('active')
        }
      }
    })
  }

  React.useEffect(() => {
    if (!isMobile) {
      OverlayScrollbars(document.querySelector('ul[id=tocList]').parentElement, {
        scrollbars: {
          theme: 'os-theme-dark os-theme-tocbar',
          autoHide: 'leave',
          autoHideDelay: 100,
          clickScroll: true,
        }
      })

      const headings = Array.from(document.querySelectorAll('description > h6'))
      for (let i in headings) {
        headings[i].setAttribute('id', 'heading-'+i)
      }
      const sections = Array.from(document.querySelectorAll('description > div'))
      for (let i in sections) {
        sections[i].setAttribute('id', 'section-'+i)
      }
      const sectionTrackers = Array.from(document.querySelectorAll('ul[id=tocList] > a'))
      for (let i in sectionTrackers) {
        sectionTrackers[i].setAttribute('id', 'section-'+i)
      }

      const options = {
        root: null,
        rootMargin: `-${rootMarginTop}px 0px -${rootMarginBottom()}px 0px`,
        threshold: 0,
      }
      const observer = new IntersectionObserver(doWhenIntersect, options)    
      sections.forEach(item => observer.observe(item))
    }
  }, [isMobile])

  const drawer = (
    <StyledList id='tocList'>
      {tocItems.map((item, index) => (
        <StyledListItem component={AnchorLink} to={window.location.pathname + '#heading-' + index} stripHash disablePadding>
          <ListItemButton>
            <ListItemText primary={item.title} primaryTypographyProps={{ variant: 'body2' }} />
          </ListItemButton>
        </StyledListItem>
      ))}
    </StyledList>
  )

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? mobileOpen : true}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      PaperProps={{ sx: { height: 'calc(100% - 48px)', top: 48 } }}
      anchor='right'
    >
      <StyledTocHeader variant='h6' component='div' align='center' position='fixed'>目次</StyledTocHeader>
      <StyledTocBody>{drawer}</StyledTocBody>
    </StyledDrawer>
  )
}
