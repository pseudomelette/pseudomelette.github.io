import { Link } from 'gatsby'

import React from "react"
import "./sidebar.css"
import "./toc.css"
import { SidebarData } from "./sidebar-data"
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import 'overlayscrollbars/overlayscrollbars.css';
import { 
  OverlayScrollbars, 
  ScrollbarsHidingPlugin, 
  SizeObserverPlugin, 
  ClickScrollPlugin 
} from 'overlayscrollbars';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from '@reach/router'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import Box from '@mui/material/Box';
import ScrollSpy from 'react-ui-scrollspy';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 256,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 256,
    boxSizing: 'border-box',
    background: '#163148',
  },
}));

const StyledTocHeader = styled(Typography)(({ theme }) => ({
  color: 'white',
  height: '48px',
  width: '237px',
  lineHeight: '48px',
  marginTop: 16,
  marginLeft: 4,
  borderBottom: '2px solid',
  borderColor: '#98fde5',
  background: 'linear-gradient(to top, #4eb89a 0%, #163148 84%)',
}));

const StyledTocBox = styled(Box)(({ theme }) => ({
  marginTop: 64,
  marginLeft: 4,
  marginRight: 14,
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
}));

const StyledList = styled(List)(({ theme }) => ({
  paddingTop: 16,
  paddingBottom: 16,
  border: '1px solid',
  borderRadius: 0,
  borderColor: '#163148',
  background: '#2b4a66',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  height: '45px',
  color: 'white',
  background: '#2b4a66',
  '&:hover': {
    backgroundColor: '#3b627a',
  },
}));

const ActiveStyles = {
  height: '45px',
  background: 'linear-gradient(to right, #4eb89a3f 0%, #4eb89a 15%, #4eb89a 20%, #4eb89a00 100%)',
  color: 'white',
  fontWeight: '900',
  paddingTop: '2px',
  borderBottom: '2px solid',
  borderImageSlice: 1,
  borderImageSource: 'linear-gradient(to right, #98fde53f 0%, #98fde5 15%, #98fde5 20%, #98fde500 100%)',
};

function Toc(props) {
  const [state, setState] = useState(0);
  const headings = useRef();
  if (state == 0) {
    headings.current = new Array(0);
  }
  useEffect(() => {
    headings.current = Array.from(document.querySelectorAll('main > div > p > h6'));
    for (var i in headings.current) {
      headings.current[i].setAttribute('id', 'heading-'+i);
    }
    setState(1)
  })

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const location = useLocation();

  const drawer = (
      <StyledTocBox>
        <StyledList>
          <ScrollSpy>
            {headings.current.map((item, index) => (
              <StyledListItem component={AnchorLink} to={location.pathname + '#' + item.id} stripHash activeStyle={ActiveStyles} disablePadding>
                <ListItemButton>
                  <ListItemText primary={item.innerText} primaryTypographyProps={{ variant: 'body2' }}  data-to-scrollspy-id={item.id}/>
                </ListItemButton>
              </StyledListItem>
            ))}
          </ScrollSpy>
        </StyledList>
      </StyledTocBox>
  );

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? mobileOpen : true}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      PaperProps={{ sx: { height: 'calc(100% - 64px)', top: 64, overflow: 'hidden' } }}
      anchor='right'
    >
      <StyledTocHeader variant='h6' align='center' position='fixed'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >目次</StyledTocHeader>
      {drawer}
    </StyledDrawer>
  );
}

export default Toc