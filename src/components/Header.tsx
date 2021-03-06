import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { observer, useLocalStore } from 'mobx-react';

import {
  AppBar,
  IconButton,
  Slide,
  useScrollTrigger,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DescriptionIcon from '@material-ui/icons/Description';
import SearchIcon from '@material-ui/icons/Search';

import RoutedLink from './RoutedLink';

const drawerLinkStyle: React.CSSProperties = {
  fontWeight: 'bold',
};

const titleBarLinks: React.CSSProperties = {
  paddingLeft: '6px',
  paddingRight: '6px',
};

interface IHideOnScrollProps {
  children?: React.ReactElement<any, any>;
}

export const HideOnScroll: React.FC<IHideOnScrollProps> = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Header = observer(() => {
  const localStore = useLocalStore(() => ({ isDrawerOpen: false }));

  const onClick = (open: boolean) => () => {
    localStore.isDrawerOpen = open;
  };

  const onKeyDown = (open: boolean) => (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'Tab' || event.key === 'Shift') return;
    localStore.isDrawerOpen = open;
  };

  return (
    <HideOnScroll>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="secondary"
            aria-label="menu"
            onClick={onClick(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={localStore.isDrawerOpen} onClose={onClick(false)}>
            <div
              id="drawer-div"
              role="presentation"
              onClick={onClick(false)}
              onKeyDown={onKeyDown(false)}
              style={{ width: '250px' }}
            >
              <List>
                <ListItem button key={uuidv4()}>
                  <ListItemIcon>
                    <AppsIcon />
                  </ListItemIcon>
                  <RoutedLink
                    routeName="modlists.gallery"
                    style={drawerLinkStyle}
                    underline="none"
                    color="textPrimary"
                  >
                    Gallery
                  </RoutedLink>
                </ListItem>
                <ListItem button key={uuidv4()}>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <RoutedLink
                    routeName="modlists.search.all"
                    color="textPrimary"
                    style={drawerLinkStyle}
                    underline="none"
                  >
                    Archive Search
                  </RoutedLink>
                </ListItem>
                <ListItem button key={uuidv4()}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <RoutedLink
                    routeName="modlists.status"
                    color="textPrimary"
                    style={drawerLinkStyle}
                    underline="none"
                  >
                    Status Dashboard
                  </RoutedLink>
                </ListItem>
                <ListItem button key={uuidv4()}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <RoutedLink
                    routeName="modlists.manifest"
                    color="textPrimary"
                    style={drawerLinkStyle}
                    underline="none"
                  >
                    Manifest Viewer
                  </RoutedLink>
                </ListItem>
              </List>
            </div>
          </Drawer>
          <RoutedLink
            routeName="home"
            underline="none"
            color="textPrimary"
            style={{ ...drawerLinkStyle, marginLeft: '8px', flexGrow: 1 }}
          >
            <Typography variant="button">Wabbajack</Typography>
          </RoutedLink>
          <RoutedLink
            routeName="modlists.gallery"
            underline="none"
            color="textPrimary"
            style={titleBarLinks}
          >
            Gallery
          </RoutedLink>
          <RoutedLink
            routeName="modlists.status"
            underline="none"
            color="textPrimary"
            style={titleBarLinks}
          >
            Status Dashboard
          </RoutedLink>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
});

export default Header;
