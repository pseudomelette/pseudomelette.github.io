import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, responsiveFontSizes, styled, ThemeProvider } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { ClickScrollPlugin, OverlayScrollbars } from 'overlayscrollbars'

import RankSprite from '../../images/rank-sprite.svg'
import UniteSprite from '../../images/unite-sprite.svg'
import { Sidebar, SidebarContextProvider } from './sidebar'
import { Titlebar } from './titlebar'

import 'overlayscrollbars/overlayscrollbars.css'

import './layout.css'

OverlayScrollbars.plugin(ClickScrollPlugin)

const tableScrollbarMap = new WeakMap()
const tableScrollbarListeners = new Set();
const registerTableScrollbar = (elm, instance) => {
  tableScrollbarMap.set(elm, instance)
  tableScrollbarListeners.forEach(cb => cb(elm))
}

export const useHorizontalScroll = (ref) => {
  const [hasScroll, setHasScroll] = React.useState(false)

  React.useLayoutEffect(() => {
    const table = ref.current
    if (table) {
      const attach = (instance) => {
        const vp = instance.elements().viewport
        const check = () => setHasScroll(vp.scrollWidth > vp.clientWidth)
        check()
        instance.on('updated', check)
      }

      const instance = tableScrollbarMap.get(table)
      if (instance) {
        attach(instance)
        return
      } else {
        const listener = (elm) => {
          if (elm === table) {
            attach(tableScrollbarMap.get(elm))
            tableScrollbarListeners.delete(listener)
          }
        }

        tableScrollbarListeners.add(listener)
        return () => tableScrollbarListeners.delete(listener)
      }
    } else {
      return
    }
  }, [ref])

  return hasScroll
}

export const DrawerContext = React.createContext()

export const StyledTextJoin = ({ words }) => {
  return (
    <>
      {words.map((word, index) => (
        <React.Fragment key={index}>
          {word}
          {index < words.length - 1 && <Box component='span'>，<wbr/></Box>}
        </React.Fragment>
      ))}
    </>
  )
}

export const StyledMathBox = styled(Box)(({ theme }) => ({
  margin: '24px 0',
  padding: '4px 0',
  overflow: 'auto',
  overscrollBehaviorX: 'contain',
  boxShadow: '0px 3px 6px -2px #0000007f',
  background: '#36536d',
}))

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  width: 'fit-content',
  maxWidth: '100%',
  maxHeight: `calc(100dvh - 256px)`,
  margin: '24px auto',
  overflow: 'auto',
  overscrollBehaviorX: 'contain',
  boxShadow: '0px 3px 6px -2px #0000007f',
  [theme.breakpoints.up('sm')]: {
    maxHeight: `calc(100dvh - 192px)`,
  },
}))

export const StyledTd = styled(TableCell)(({ theme }) => ({
  padding: '6px 8px',
  border: '1px solid',
  borderColor: '#2b4a66',
  color: '#ffffff',
  lineHeight: 1.5,
  '&.multi-row': {
    whiteSpace: 'pre-line',
  },
}))

export const StyledTh = styled(TableCell)(({ theme }) => ({
  padding: '6px 8px',
  border: '1px solid',
  borderColor: '#2b4a66',
  background: '#cccccc',
  color: '#163148',
  lineHeight: 1.5,
  wordBreak: 'keep-all',
}))

export const StyledTr = styled(TableRow)(({ theme }) => ({
  background: '#163148',
}))

export const StyledTrh = styled(TableCell)(({ theme }) => ({
  padding: '6px 8px',
  border: '1px solid',
  borderColor: '#2b4a66',
  color: '#ffffff',
  lineHeight: 1.5,
  wordBreak: 'keep-all',
  '&.sticky': {
    position: 'sticky',
    left: 0,
    zIndex: 2,
    background: '#cccccc',
    contain: 'layout paint style',
    willChange: 'transform',
  },
}))

export const StyledTrStripedR = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    background: '#382a4b',
  },
  '&:nth-of-type(odd) td:first-of-type': {
    background: '#6c5681',
  },
  '&:nth-of-type(even)': {
    background: '#423356',
  },
  '&:nth-of-type(even) td:first-of-type': {
    background: '#7f6192',
  },
}))

export const StyledTrTwoToneB = styled(TableRow)(({ theme }) => ({
  '&.darker-row, &.darker-row-w-header': {
    background: '#163148',
  },
  '&.darker-row-w-header td:first-of-type': {
    background: '#476381',
  },
  '&.lighter-row, &.lighter-row-w-header': {
    background: '#1f3b53',
  },
  '&.lighter-row-w-header td:first-of-type': {
    background: '#526f92',
  },
}))

export const StyledTrTwoToneR = styled(TableRow)(({ theme }) => ({
  '&.darker-row, &.darker-row-w-header': {
    background: '#382a4b',
  },
  '&.darker-row-w-header td:first-of-type': {
    background: '#6c5681',
  },
  '&.lighter-row, &.lighter-row-w-header': {
    background: '#423356',
  },
  '&.lighter-row-w-header td:first-of-type': {
    background: '#7f6192',
  },
}))

export const SagaEBLayout = ({ children }) => {
  const theme = responsiveFontSizes(createTheme({
    components: {
      MuiCheckbox: {
        styleOverrides: {
          root: {
            padding: '0 6px 0 0',
            '& .MuiSvgIcon-root': { fontSize: 20 },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            fontSize: '0.8rem',
          },
          root: {
            margin: 0,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: '0.7rem',
          },
        },
      },
    },
    palette: {
      background: {
        default: '#2d2127',
      },
    },
    typography: {
      fontSize: 12,
    },
  }))

  const DrawerContextProvider = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = React.useState(null)
    const openNav = () => setDrawerOpen('nav')
    const openToc = () => setDrawerOpen('toc')
    const closeDrawer = () => setDrawerOpen(null)

    return <DrawerContext.Provider value={{ drawerOpen, openNav, openToc, closeDrawer }}>{children}</DrawerContext.Provider>
  }

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.querySelectorAll('.katex-box').forEach((elm) => {
        OverlayScrollbars(elm, {
          scrollbars: {
            theme: 'os-theme-dark os-theme-math',
            clickScroll: true,
          },
        })
      })
      document.querySelectorAll('table').forEach((elm) => {
        const instance = OverlayScrollbars(elm.parentElement, {
          scrollbars: {
            theme: 'os-theme-dark os-theme-table',
            clickScroll: true,
          },
        })

        registerTableScrollbar(elm, instance)
      })
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box sx={{ display: 'none' }}>
        <RankSprite/>
        <UniteSprite/>
      </Box>
      <Box
        sx={{
          display: 'flex',
          minWidth: '300px',
          height: '100%',
          minHeight: '100dvh',
          background: '#2b4a66',
        }}
      >
        <AppBar sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Titlebar/>
        </AppBar>
        <SidebarContextProvider>
          <DrawerContextProvider>
            <Box component='nav'>
              <Sidebar/>
            </Box>
            <Box
              component='main'
              sx={{
                display: 'flex',
                flexGrow: 1,
                flexFlow: 'column',
                width: '100%',
                height: '100%', 
                minHeight: '100dvh',
              }}
            >
              {children}
            </Box>
          </DrawerContextProvider>
        </SidebarContextProvider>
      </Box>
    </ThemeProvider>
  )
}
