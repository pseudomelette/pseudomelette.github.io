import * as React from 'react'

import CloseIcon from '@mui/icons-material/Close';
import ListIcon from '@mui/icons-material/List'
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { OverlayScrollbars } from 'overlayscrollbars'

import { DrawerContext } from './layout'

import 'overlayscrollbars/overlayscrollbars.css'

const rootMarginTop = 130
const rootMarginBottom = () => document.documentElement.clientHeight - 216

const StyledAnchorLink = styled(AnchorLink)(({ theme }) => ({
  display: 'flex',
  height: '32px',
  margin: '2px 0',
  color: '#ffffff',
  textDecoration: 'none',
  '&.active': {
    background: 'linear-gradient(to right, #4eb89a00 5px, #4eb89a 5px, #4eb89a 10px, #4eb89a5f 10px, #4eb89a00 228px)',
  },
  '&:hover': {
    background: 'linear-gradient(to right, #48759400 10px, #487594 25%, #487594 40%, #48759400 228px)',
  },
  '&.active:hover': {
    background: 'linear-gradient(to right, #4eb89a00 5px, #4eb89a 5px, #4eb89a 10px, #4eb89a7f 10px, #487594 40%, #48759400 228px)',
  },
}))

const StyledList = styled(List)(({ theme }) => ({
  padding: '8px 0',
  background: '#2b4a66',
}))

export const Tocbar = ({ slug, items }) => {
  const tocItems = items === undefined ? [] : items

  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))
  const { drawerOpen, openToc, closeDrawer } = React.useContext(DrawerContext)

  const initOverlayScrollbars = () => {
    OverlayScrollbars(document.querySelector('ul[id=tocList]').parentElement, {
      scrollbars: {
        theme: 'os-theme-dark os-theme-sidebar',
        autoHide: 'leave',
        autoHideDelay: 100,
        clickScroll: true,
      },
    })
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
    const initIntersectionObsever = (sections) => {
      const sectionTrackers = Array.from(document.querySelectorAll('ul[id=tocList] > a'))
      sectionTrackers.forEach((tracker, index) => tracker.setAttribute('id', 'section-body-'+index))

      const options = {
        root: null,
        rootMargin: `-${rootMarginTop}px 0px -${rootMarginBottom()}px 0px`,
        threshold: 0,
      }
      const observer = new IntersectionObserver(doWhenIntersect, options)    
      sections.forEach(item => observer.observe(item))
    }

    const headings = Array.from(document.querySelectorAll('div[id=doc] > h6'))
    const sections = Array.from(document.querySelectorAll('div[id=doc] > div'))
    headings.forEach((heading, index) => heading.setAttribute('id', 'section-heading-'+index))
    sections.forEach((section, index) => section.setAttribute('id', 'section-body-'+index))

    if (!isDownMd) {
      initOverlayScrollbars()
      initIntersectionObsever(sections)
      closeDrawer()
    } else if (drawerOpen === 'toc') {
      initOverlayScrollbars()
      initIntersectionObsever(sections)

      const stop = (e) => {
        const modal = document.getElementById('tocList')
        if (!modal || !modal.contains(e.target)) {
          e.preventDefault()
        }
      }

      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      document.addEventListener('wheel', stop, { passive: false })
      document.addEventListener('touchmove', stop, { passive: false })
      return () => {
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
        document.removeEventListener('wheel', stop)
        document.removeEventListener('touchmove', stop)
      }
    }
  }, [isDownMd, closeDrawer, drawerOpen])

  const drawer = (
    <StyledList id='tocList'>
      {tocItems.map((item, index) => (
        <StyledAnchorLink disablePadding key={index} stripHash to={slug + '#section-heading-' + index}>
          <ListItemButton onClick={closeDrawer} tabIndex={-1}>
            <ListItemText primary={item.title} primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}/>
          </ListItemButton>
        </StyledAnchorLink>
      ))}
    </StyledList>
  )

  return (
    <>
      <Drawer
        anchor='right'
        onClose={closeDrawer}
        open={isDownMd ? drawerOpen === 'toc' : true}
        variant={isDownMd ? 'temporary' : 'permanent'}
        ModalProps={{ keepMounted: true }}
        sx={{
          flexShrink: 0,
          zIndex: theme.zIndex.drawer - 10,
          width: '256px',
          '& .MuiDrawer-paper': {
            width: '256px',
            height: '100%',
            border: 0,
            boxSizing: 'border-box',
            background: '#1f3b53',
          },
        }}
      >
        <Typography
          align='center'
          variant='h6'
          sx={{
            width: '240px',
            height: '40px',
            mt: { xs: 9, sm: 8 },
            ml: 1,
            borderBottom: '2px solid',
            borderColor: '#98fde5',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            background: 'linear-gradient(to top, #4eb89adf 0%, #4eb89a3f 100%)',
            color: '#ffffff',
            lineHeight: '48px',
          }}
        >
          目次
        </Typography>
        <Box
          sx={{
            mx: 1,
            borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8,
          }}
        >
          {drawer}
        </Box>
      </Drawer>
      <IconButton
        onClick={drawerOpen === 'toc' ? closeDrawer : openToc}
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          top: { xs: '72px', sm: '64px' },
          right: '16px',
          zIndex: theme.zIndex.drawer - 1,
          padding: '4px',
          transform: 'rotate(45deg)',
          border: '1px solid',
          borderColor: '#f8d36f',
          borderRadius: 0,
          boxShadow: 8,
          background: 'linear-gradient(135deg, #805f92cf 30%, #ab84c2cf 70%)',
          '&:hover': {
            filter: 'brightness(1.1)',
          },
          '& .MuiSvgIcon-root': {
            transform: 'rotate(-45deg)',
          },
        }}
      >
        {drawerOpen === 'toc' ? <CloseIcon sx={{ color: '#ffffff' }}/> : <ListIcon sx={{ color: '#ffffff' }}/>}
      </IconButton>
    </>
  )
}
