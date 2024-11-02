import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import { OverlayScrollbars } from 'overlayscrollbars';

import 'overlayscrollbars/overlayscrollbars.css';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  marginTop: 10,
  marginLeft: 8,
  border: '1px solid',
  borderColor: '#f8d36f',
  background: 'linear-gradient(to bottom, #805f92cf 0%, #ab84c2cf 100%)',
  '&:hover': {
    background: 'linear-gradient(to bottom, #805f92 0%, #ab84c2 100%)',
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: 26,
  }
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 256,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 256,
    boxSizing: 'border-box',
    background: '#163148',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginTop: 2,
  marginBottom: 2,
  height: '45px',
  color: 'white',
  background: 'linear-gradient(to right, #1f3b533f 0%, #1f3b53 15%, #1f3b53 20%, #1f3b5300 97%)',
  '&:hover': {
    background: 'linear-gradient(to right, #3964803f 0%, #396480 15%, #396480 20%, #39648000 97%)',
  },
}));

const StyledListItemParent = styled(ListItem)(({ theme }) => ({
  marginTop: 16,
  height: '45px',
  color: 'white',
  background: 'linear-gradient(to right, #1d5a6c3f 0%, #1d5a6c 15%, #1d5a6c 20%, #1d5a6c00 97%)',
  borderBottom: '2px solid',
  borderColor: '#ffffff',
  borderImageSlice: 2,
  borderImageSource: 'linear-gradient(to right, #ffffff3f 0%, #ffffff 15%, #ffffff 20%, #ffffff00 95%)',
  '&:hover': {
    background: 'linear-gradient(to right, #36889b3f 0%, #36889b 15%, #36889b 20%, #36889b00 97%)',
  },
}));

const ActiveStyles = {
  height: '45px',
  background: 'linear-gradient(to right, #163148c0 0%, #16314800 15%, #16314800 20%, #163148 97%), linear-gradient(to top, #4eb89a 0%, #1f3b53 100%)',
  color: 'white',
  fontWeight: '900',
  paddingTop: '2px',
  borderBottom: '2px solid',
  borderImageSlice: 1,
  borderImageSource: 'linear-gradient(to right, #98fde53f 0%, #98fde5 15%, #98fde5 20%, #98fde500 95%)',
};

const Context = React.createContext()

export const ContextProvider = ({ children }) => {
  const [logicOpen, setLogicOpen] = React.useState(true);
  const [dataOpen, setDataOpen] = React.useState(true);

  const contextValue = {
    logicOpen,
    setLogicOpen,
    dataOpen,
    setDataOpen,
  }

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

function Sidebar() {
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
  `);
  const nodes = data.allMdx.nodes;

  const { logicOpen, dataOpen, setLogicOpen, setDataOpen } = React.useContext(Context);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    if (mobileOpen === false) {
      OverlayScrollbars(document.querySelector('ul[id=navList]'), {
        scrollbars: {
          theme: 'os-theme-dark os-theme-sidebar',
          autoHide: 'leave',
          autoHideDelay: 100,
          clickScroll: true,
        },
      });
    }
  };

  const handleClickLogic = () => {
    setLogicOpen(!logicOpen);
  };

  const handleClickData = () => {
    setDataOpen(!dataOpen);
  };

  React.useEffect(() => {
    if (isMobile === false) {
      OverlayScrollbars(document.querySelector('ul[id=navList]'), {
        scrollbars: {
          theme: 'os-theme-dark os-theme-sidebar',
          autoHide: 'leave',
          autoHideDelay: 100,
          clickScroll: true,
        },
      });
      setMobileOpen(false);
    }
  }, [isMobile]);

  const topNode = nodes.find((node) => node.frontmatter.slug === '/saga-eb/');
  const logicNodes = nodes.filter((node) => node.frontmatter.slug.startsWith('/saga-eb/logic/'));
  const dataNodes = nodes.filter((node) => node.frontmatter.slug.startsWith('/saga-eb/data/'));

  const drawer = (
    <List id='navList' sx={{ paddingTop: 2, paddingBottom: 2, marginTop: 6 }}>
      <StyledListItem component={Link} to={topNode.frontmatter.slug} activeStyle={ActiveStyles} disablePadding>
        <ListItemButton>
          <ListItemText primary={topNode.frontmatter.title} />
        </ListItemButton>
      </StyledListItem>
      <StyledListItemParent component={Box} activeStyle={ActiveStyles} disablePadding>
        <ListItemButton onClick={handleClickLogic}>
          <ListItemText primary={'ロジック'} />
          {logicOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </StyledListItemParent>
      <List disablePadding>
        <Collapse in={logicOpen} timeout="auto" unmountOnExit>
          {logicNodes.map((node, index) => (
            <StyledListItem component={Link} to={node.frontmatter.slug} activeStyle={ActiveStyles} key={index} disablePadding>
              <ListItemButton>
                <ListItemText primary={node.frontmatter.title} sx={{ pl: 1 }} />
              </ListItemButton>
            </StyledListItem>
          ))}
        </Collapse>
      </List>
      <StyledListItemParent component={Link} activeStyle={ActiveStyles} disablePadding>
        <ListItemButton onClick={handleClickData}>
          <ListItemText primary={'データ'} />
          {dataOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </StyledListItemParent>
      <List disablePadding>
        <Collapse in={dataOpen} timeout="auto" unmountOnExit>
          {dataNodes.map((node, index) => (
            <StyledListItem component={Link} to={node.frontmatter.slug} activeStyle={ActiveStyles} key={index} disablePadding>
              <ListItemButton>
                <ListItemText primary={node.frontmatter.title} sx={{ pl: 1 }} />
              </ListItemButton>
            </StyledListItem>
          ))}
        </Collapse>
      </List>
    </List>
  );

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
  );
}

export default Sidebar