import * as React from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, responsiveFontSizes, styled, ThemeProvider } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { ClickScrollPlugin, OverlayScrollbars } from 'overlayscrollbars';

import Sidebar, { ContextProvider } from "./sidebar";
import Titlebar from "./titlebar"

import 'overlayscrollbars/overlayscrollbars.css';

import "./layout.css";

OverlayScrollbars.plugin(ClickScrollPlugin);

const drawerWidth = 256;

export const StyledTypographySub = styled(Typography)(({ theme }) => ({
  borderTop: '1px solid',
  borderColor: '#f8d36f',
  background: 'linear-gradient(to right, #805f9200 10%, #805f92 30%, #805f92 70%, #805f9200 90%)',
}));

export const StyledTypographyH6 = styled(Typography)(({ theme }) => ({
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
}));

export const StyledTypographyH7 = styled(Typography)(({ theme }) => ({
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
}));

export const StyledMathT = styled(Box)(({ theme }) => ({
  paddingTop: 8,
  paddingBottom: 8,
  background: '#36536d',
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  width: 'fit-content',
  background: '#36536d',
  maxHeight: `calc(100vh - 192px)`,
  maxWidth: '100%',
}));

export const StyledTr = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    background: '#163148',
  },
  '&:nth-of-type(even)': {
    background: '#1f3b53',
  },
}));

export const StyledTh = styled(TableCell)(({ theme }) => ({
  color: '#163148',
  background: '#cccccc',
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 8,
  paddingRight: 8,
  border: '1px solid',
  borderColor: '#2b4a66',
  lineHeight: '20px',
  wordBreak: 'keep-all',
}));

export const StyledThLeft = styled(TableCell)(({ theme }) => ({
  position: 'sticky',
  left: 0,
  color: '#ffffff',
  background: '#526f92',
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 8,
  paddingRight: 8,
  border: '1px solid',
  borderColor: '#2b4a66',
  lineHeight: '20px',
  wordBreak: 'keep-all',
}));

export const StyledTd = styled(TableCell)(({ theme }) => ({
  color: "white",
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 8,
  paddingRight: 8,
  border: '1px solid',
  borderColor: '#2b4a66',
}));

export const useLogicOpen = () => {
  const [logicOpen, setLogicOpen] = React.useState(true);

  return {
    logicOpen,
    setLogicOpen,
  };
};

const SagaEBLayout = ({ children }) => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  OverlayScrollbars(document.querySelector('body'), {
    paddingAbsolute: true,
    scrollbars: {
      theme: 'os-theme-dark os-theme-body',
      autoHide: 'move',
      autoHideDelay: 750,
      clickScroll: true,
    }
  });  

  React.useEffect(() => {
    document.querySelectorAll('div[data-testid]').forEach((elm) => {
      OverlayScrollbars(elm.parentElement, {
        scrollbars: {
          theme: 'os-theme-dark os-theme-math',
          clickScroll: true,
        }
      });
    });
    document.querySelectorAll('table').forEach((elm) => {
      OverlayScrollbars(elm.parentElement, {
        scrollbars: {
          theme: 'os-theme-dark os-theme-table',
          autoHide: 'move',
          autoHideDelay: 300,
          clickScroll: true,
        }
      });
    });
  })

  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          display: 'flex',
          height: '100%',
          minHeight: '100vh',
          minWidth: '300px',
        }}>
          <AppBar sx={{ zIndex: theme.zIndex.drawer + 1 }}>
            <Titlebar />
          </AppBar>
          <Box 
            component="nav"
            sx={{
              width: { lg: drawerWidth },
              flexShrink: { sm: 0 },
            }}
          >
            <Sidebar className='sidebar' theme={theme} />
          </Box>
          <Box
            component="main"
            sx={{
              display: 'flex',
              flexFlow: 'column',
              flexGrow: 1,
              height: '100%', 
              minHeight: '100vh',
              width: { xs: '100%', lg: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </ContextProvider>
  )
}

export default SagaEBLayout
