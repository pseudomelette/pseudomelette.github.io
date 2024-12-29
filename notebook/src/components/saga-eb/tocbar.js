import * as React from 'react'

import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { OverlayScrollbars } from 'overlayscrollbars'

import 'overlayscrollbars/overlayscrollbars.css'

const rootMarginTop = 130
const rootMarginBottom = () => document.documentElement.clientHeight - 216

const StyledAnchorLink = styled(AnchorLink)(({ theme }) => ({
  display: 'flex',
  height: '40px',
  margin: '2px 0',
  color: '#ffffff',
  textDecoration: 'none',
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

const StyledList = styled(List)(({ theme }) => ({
  padding: '16px 0',
  background: '#2b4a66',
}))

export const Tocbar = ({ slug, items }) => {
  const tocItems = items === undefined ? [] : items

  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
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
    if (!isDownMd) {
      OverlayScrollbars(document.querySelector('ul[id=tocList]').parentElement, {
        scrollbars: {
          theme: 'os-theme-dark os-theme-tocbar',
          autoHide: 'leave',
          autoHideDelay: 100,
          clickScroll: true,
        }
      })

      const headings = Array.from(document.querySelectorAll('div[id=doc] > h6'))
      const sections = Array.from(document.querySelectorAll('div[id=doc] > div'))
      const sectionTrackers = Array.from(document.querySelectorAll('ul[id=tocList] > a'))
      headings.forEach((heading, index) => (heading.setAttribute('id', 'section-heading-'+index)))
      sections.forEach((section, index) => (section.setAttribute('id', 'section-body-'+index)))
      sectionTrackers.forEach((tracker, index) => (tracker.setAttribute('id', 'section-body-'+index)))

      const options = {
        root: null,
        rootMargin: `-${rootMarginTop}px 0px -${rootMarginBottom()}px 0px`,
        threshold: 0,
      }
      const observer = new IntersectionObserver(doWhenIntersect, options)    
      sections.forEach(item => observer.observe(item))
    }
  }, [isDownMd])

  const drawer = (
    <StyledList id='tocList'>
      {tocItems.map((item, index) => (
        <StyledAnchorLink disablePadding key={index} stripHash to={slug + '#section-heading-' + index}>
          <ListItemButton>
            <ListItemText primary={item.title} primaryTypographyProps={{ variant: 'body2' }}/>
          </ListItemButton>
        </StyledAnchorLink>
      ))}
    </StyledList>
  )

  return (
    <Drawer
      anchor='right'
      onClose={handleDrawerToggle}
      open={isDownMd ? drawerOpen : true}
      variant={isDownMd ? 'temporary' : 'permanent'}
      ModalProps={{ keepMounted: true }}
      PaperProps={{ sx: { top: 48, height: 'calc(100% - 48px)', border: 0 } }}
      sx={{
        flexShrink: 0,
        width: 256,
        '& .MuiDrawer-paper': {
          width: 256,
          boxSizing: 'border-box',
          background: '#1f3b53',
        },
      }}
    >
      <Typography
        align='center'
        component='div'
        position='fixed'
        variant='h6'
        sx={{
          width: '240px',
          height: '40px',
          mt: 2,
          ml: 1,
          borderBottom: '2px solid',
          borderColor: '#98fde5',
          background: 'linear-gradient(to top, #4eb89a 0%, #1f3b53 100%)',        
          color: '#ffffff',
          lineHeight: '40px',
        }}
      >
        目次
      </Typography>
      <Box
        sx={{
          mt: 7,
          mx: 1,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        {drawer}
      </Box>
    </Drawer>
  )
}
