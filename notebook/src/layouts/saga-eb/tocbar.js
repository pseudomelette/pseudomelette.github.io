import * as React from "react"

import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useLocation } from '@reach/router'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { OverlayScrollbars } from 'overlayscrollbars';

import 'overlayscrollbars/overlayscrollbars.css';

import "./tocbar.css"

const rootMarginTop = 130;
const rootMarginBottom = () => document.documentElement.clientHeight - 215;
;

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
  width: '239px',
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
  marginRight: 12,
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
}));

const StyledList = styled(List)(({ theme }) => ({
  paddingTop: 16,
  paddingBottom: 16,
  border: '0px solid',
  borderRadius: 0,
  borderColor: '#163148',
  background: '#2b4a66',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  height: '45px',
  color: 'white',
  display: 'block',
}));

function doWhenIntersect(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const currentActiveIndex = document.querySelector('ul[id=tocList] .active');
      if (currentActiveIndex !== null) {
        currentActiveIndex.classList.remove('active');
      }
      const newActiveIndex = document.querySelector(`a[id='${entry.target.id}']`);
      if (newActiveIndex !== null) {
        newActiveIndex.classList.add('active');
      }
    }
  })
}

function Tocbar({items}) {
  let tocItems = []; 
  if (items !== undefined) {
    tocItems = items;
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const options = {
    root: null,
    rootMargin: `-${rootMarginTop}px 0px -${rootMarginBottom()}px 0px`,
    threshold: 0,
  }

  const observer = new IntersectionObserver(doWhenIntersect, options);
  React.useEffect(() => {
    if (isMobile === false) {
      OverlayScrollbars(document.querySelector('ul[id=tocList]').parentElement, {
        scrollbars: {
          theme: 'os-theme-dark os-theme-tocbar',
          autoHide: 'leave',
          autoHideDelay: 100,
          clickScroll: true,
        }
      });
    };

    var headings = Array.from(document.querySelectorAll('description > h6'));
    for (var i in headings) {
      headings[i].setAttribute('id', 'heading-'+i);
    }
    var sections = Array.from(document.querySelectorAll('description > div'));
    for (i in sections) {
      sections[i].setAttribute('id', 'section-'+i);
    }
    var tocList = Array.from(document.querySelectorAll('ul[id=tocList] > a'));
    for (i in tocList) {
      tocList[i].setAttribute('id', 'section-'+i);
    }
    sections.forEach(item => {
      observer.observe(item);
    });
  })
 
  const location = useLocation();

  const drawer = (
    <StyledTocBox>
      <StyledList id='tocList'>
        {tocItems.map((item, index) => (
          <StyledListItem component={AnchorLink} to={location.pathname + '#heading-' + index} stripHash disablePadding>
            <ListItemButton>
              <ListItemText primary={item.title} primaryTypographyProps={{ variant: 'body2' }} />
            </ListItemButton>
          </StyledListItem>
        ))}
      </StyledList>
    </StyledTocBox>
  );

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? mobileOpen : true}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      PaperProps={{ sx: { height: 'calc(100% - 48px)', top: 48 } }}
      anchor='right'
    >
      <StyledTocHeader variant='h6' align='center' position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        目次
      </StyledTocHeader>
      {drawer}
    </StyledDrawer>
  );
}

export default Tocbar
