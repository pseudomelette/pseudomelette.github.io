import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, responsiveFontSizes, styled, ThemeProvider } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { ClickScrollPlugin, OverlayScrollbars } from 'overlayscrollbars'

import { Sidebar, ContextProvider } from './sidebar'
import { Titlebar } from './titlebar'

import 'overlayscrollbars/overlayscrollbars.css'

import './layout.css'

OverlayScrollbars.plugin(ClickScrollPlugin)

export const StyledMathBox = styled(Box)(({ theme }) => ({
  margin: '24px 0',
  padding: '8px 0',
  boxShadow: '0px 3px 6px -2px #0000007f',
  background: '#36536d',
}))

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  width: 'fit-content',
  maxWidth: '100%',
  maxHeight: `calc(100vh - 192px)`,
  margin: '24px auto',
  boxShadow: '0px 3px 6px -2px #0000007f',
  background: '#36536d',
}))

export const StyledTd = styled(TableCell)(({ theme }) => ({
  padding: '5px 8px',
  border: '1px solid',
  borderColor: '#2b4a66',
  color: '#ffffff',
}))

export const StyledTh = styled(TableCell)(({ theme }) => ({
  padding: '5px 8px',
  border: '1px solid',
  borderColor: '#2b4a66',
  background: '#cccccc',
  color: '#163148',
  lineHeight: '20px',
  wordBreak: 'keep-all',
}))

export const StyledTr = styled(TableRow)(({ theme }) => ({
    background: '#163148',
}))

export const StyledTrh = styled(TableCell)(({ theme }) => ({
  position: 'sticky',
  left: 0,
  padding: '5px 8px',
  border: '1px solid',
  borderColor: '#2b4a66',
  background: '#cccccc',
  color: '#ffffff',
  lineHeight: '20px',
  wordBreak: 'keep-all',
}))


export const StyledTrStripedR = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    background: '#382a4b',
  },
  '&:nth-of-type(odd) :first-of-type': {
    background: '#6c5681',
  },
  '&:nth-of-type(even)': {
    background: '#423356',
  },
  '&:nth-of-type(even) :first-of-type': {
    background: '#7f6192',
  },
}))

export const StyledTrStripedB = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    background: '#163148',
  },
  '&:nth-of-type(odd) :first-of-type': {
    background: '#476381',
  },
  '&:nth-of-type(even)': {
    background: '#1f3b53',
  },
  '&:nth-of-type(even) :first-of-type': {
    background: '#526f92',
  },
}))

export const SagaEBLayout = ({ children }) => {
  const theme = responsiveFontSizes(createTheme())

  if (typeof document !== 'undefined') {
    OverlayScrollbars(document.querySelector('body'), {
      paddingAbsolute: true,
      scrollbars: {
        theme: 'os-theme-dark os-theme-body',
        autoHide: 'move',
        autoHideDelay: 750,
        clickScroll: true,
      }
    })
  }

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.querySelectorAll('div[data-testid]').forEach((elm) => {
        OverlayScrollbars(elm.parentElement, {
          scrollbars: {
            theme: 'os-theme-dark os-theme-math',
            clickScroll: true,
          }
        })
      })
      document.querySelectorAll('table').forEach((elm) => {
        OverlayScrollbars(elm.parentElement, {
          scrollbars: {
            theme: 'os-theme-dark os-theme-table',
            autoHide: 'move',
            autoHideDelay: 300,
            clickScroll: true,
          }
        })
      })
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box sx={{
        display: 'flex',
        minWidth: '300px',
        height: '100%',
        minHeight: '100vh',
      }}>
        <AppBar sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Titlebar/>
        </AppBar>
        <Box component='nav'>
          <ContextProvider>
            <Sidebar/>
          </ContextProvider>
        </Box>
        <Box
          component='main'
          sx={{
            display: 'flex',
            flexGrow: 1,
            flexFlow: 'column',
            width: '100%',
            height: '100%', 
            minHeight: '100vh',
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
