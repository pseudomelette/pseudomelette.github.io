import * as React from "react";

import Seo from "../../components/seo"
import Sidebar from "./sidebar"
import { SidebarData } from "./sidebar-data"
import Toc from "./toc"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TableCell from '@mui/material/TableCell';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles';
import 'overlayscrollbars/overlayscrollbars.css';
import "./layout.css";
import { 
  OverlayScrollbars, 
  ScrollbarsHidingPlugin, 
  SizeObserverPlugin, 
  ClickScrollPlugin 
} from 'overlayscrollbars';
import { useEffect, useRef, useState } from 'react';

OverlayScrollbars.plugin(ClickScrollPlugin);

const osInstance = OverlayScrollbars(document.querySelector('body'), {
  paddingAbsolute: true,
  scrollbars: {
    theme: 'os-theme-dark os-theme-body',
    clickScroll: true,
  }
});

const drawerWidth = 256;

const StyledBox = styled(Box)(({ theme }) => ({
  color: 'white',
  background: '#2b4a66',
}));

export const StyledTypographySub = styled(Typography)(({ theme }) => ({
  marginBottom: 24,
  borderTop: '1px solid',
  borderColor: '#f8d36f',
  background: 'linear-gradient(to right, #805f9200 10%, #805f92 30%, #805f92 70%, #805f9200 90%)',
}));

export const StyledTypographyH6 = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #44757e 81%, #44757e00 81%, #44757e00 82%, #44757e 82%, #44757e 83%, #44757e00 83%, #44757e00 84%, #44757e 84%, #44757e 85%, #44757e00 85%)',
  paddingLeft: 10,
  paddingTop: 4,
  paddingBottom: 2,
  marginBottom: 16,
}));

export const StyledTypographyH7 = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(to right, #44757e5f 35%, #44757e00 65%)',
  paddingLeft: 8,
  paddingTop: 4,
  paddingBottom: 2,
  marginBottom: 16,
  borderTop: '1px solid',
  borderBottom: '1px solid',
  borderImageSlice: 1,
  borderImageSource: 'linear-gradient(to right, #ffffff 35%, #ffffff00 65%)',
}));

export const StyledMathT = styled(Typography)(({ theme }) => ({
  paddingTop: 1,
  paddingBottom: 18,
  background: '#36536d'
}));

export const StyledTh = styled(TableCell)(({ theme }) => ({
  color: 'white',
  background: 'linear-gradient(to bottom, #4eb89a 0%, #4eb89a7f 30%, #4eb89a7f 70%, #4eb89a 100%)',
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 8,
  paddingRight: 8,
  border: '3px solid',
  borderColor: '#2b4a66',
}));

export const StyledTd = styled(TableCell)(({ theme }) => ({
  color: "white",
  background: '#163148',
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 8,
  paddingRight: 8,
  border: '3px solid',
  borderColor: '#2b4a66',
}));

export const StlyedFooter = styled(Box)(({ theme }) => ({
  color: '#bfbfbf',
  width: '100%',
  background: 'linear-gradient(to bottom, #163148bf 0%, #2b4a66 100%), repeating-linear-gradient(135deg, #163148 0px, #163148 4px, #2b4a66 4px, #2b4a66 8px)',
}));

const Layout = ({ children }) => {
  const [state, setState] = useState(0);
  const sidebarscrollbar = useRef();
  const tocbarscrollbar = useRef();
  useEffect(() => {
    console.log(document.querySelector('nav > div > div'))
    sidebarscrollbar.current = OverlayScrollbars(document.querySelector('nav > div > div'), {
      scrollbars: {
        theme: 'os-theme-dark os-theme-sidebar',
        autoHide: 'leave',
        autoHideDelay: 100,
        clickScroll: true,
      }
    });
    tocbarscrollbar.current = OverlayScrollbars(document.querySelector('toc > div > div > div'), {
      scrollbars: {
        theme: 'os-theme-dark os-theme-tocbar',
        autoHide: 'leave',
        autoHideDelay: 100,
        clickScroll: true,
      }
    });
    setState(1)
  })

  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledBox sx={{ display: 'flex', height: '100%', minHeight: '100vh', minWidth: { sm: `calc(680px + ${drawerWidth}px * 2 + 24px * 2)` }}}>
        <AppBar
          position="fixed"
          sx={{
            color: '#16314a',
            backgroundColor: 'white',
            width: '100%',
            ml: { sm: `${drawerWidth}px` },
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <Typography variant="h5" noWrap component="div" sx={{ marginRight: 3, paddingTop: 1, paddingBottom: 1, paddingRight: 3, borderRight: '2px solid' }}>
              調査記録
            </Typography>
            <Typography variant="h5" noWrap component="div">
              サガ エメラルド ビヨンド（SaGa Emerald Beyond） 
            </Typography>
          </Toolbar>
        </AppBar>
        <Box 
          component="nav"
          sx={{
            marginTop: 8,
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="topics"
        >
          <Sidebar className='sidebar' theme={theme} data-overlayscrollbars-initialize />
        </Box>
        <Box
        sx={{
            display: 'flex',
            flexFlow: 'column',
            flexGrow: 1,
            height: '100%', 
            minHeight: '100vh',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <StyledBox
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              height: { sm: `calc(100% - 160px)` }, 
              minHeight: { sm: `calc(100vh - 160px)` },
            }}
          >
            <Toolbar />
            <Box sx={{ minHeight: { flexGrow: 1, sm: `calc(100vh - 160px - 64px - 24px * 2)` } }}>
              {children}
            </Box>
          </StyledBox>
          <StlyedFooter component='footer' sx={{ minHeight: 80, marginTop: 10, marginBottom: 0 }}>
            <Box sx={{ marginTop: 'auto', marginBottom: 0, height:4, borderTop: 1, borderBottom: 1, background: '#163148' }} />
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
        <Box 
          component="toc"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            background: '#163148',
          }}
          aria-label="table of contents"
        >
          <Toc className='tocbar' theme={theme} props={children.HeaderList}/>
        </Box>
      </StyledBox>
    </ThemeProvider>
  )
}

export default Layout
