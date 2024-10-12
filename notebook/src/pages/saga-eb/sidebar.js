import { Link } from 'gatsby'

import React from "react"
import "./sidebar.css"
import { SidebarData } from "./sidebar-data"
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
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
  height: '45px',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(to right, #3b627a3f 0%, #3b627a 15%, #3b627a 20%, #3b627a00 97%)',
  },
}));

const ActiveStyles = {
  height: '45px',
  background: 'linear-gradient(to right, #4eb89a3f 0%, #4eb89a 15%, #4eb89a 20%, #4eb89a00 97%)',
  color: 'white',
  fontWeight: '900',
  paddingTop: '2px',
  borderBottom: '2px solid',
  borderImageSlice: 1,
  borderImageSource: 'linear-gradient(to right, #98fde53f 0%, #98fde5 15%, #98fde5 20%, #98fde500 95%)',
};

function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List sx={{ paddingTop: 2, paddingBottom: 2 }}>
      {SidebarData.map((item, index) => (
        <StyledListItem component={Link} to={item.link} activeStyle={ActiveStyles} key={index} disablePadding>
          <ListItemButton>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </StyledListItem>
      ))}
    </List>
  );

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? mobileOpen : true}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      PaperProps={{ sx: { height: 'calc(100% - 64px)', top: 64} }}
    >
      {drawer}
    </StyledDrawer>
  );
}

export default Sidebar