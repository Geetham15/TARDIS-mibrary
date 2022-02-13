import React, { useState } from "react";
import AuthenticationContext from "../AuthenticationContext"
import AuthenticationProvider from "../AuthenticationProvider"
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";

import Login from "../pages/Login.js";


const pages = ["SignUp", "LogIn"]



const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

 
  return (
    <AppBar position="fixed" height="100vh">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
           <HomeIcon  fontSize="large" />
           
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
           
              <MenuIcon>
                 <Button component={Link} href={"/"}/>
              </MenuIcon>
           
              
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem  onClick={handleCloseNavMenu}>
                
                  <Typography textAlign="center"></Typography>
                  
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        
              <Button component={Link} href={`/signup`} onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}>SignUp
               

                
               </Button>
               <Button component={Link} href={`/login`} onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}>Login
           

                
               </Button>
               
               </Box>
                {/* {page} */}
             
            {/* ))} */}
          

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Pic" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             
                <MenuItem  onClick={handleCloseUserMenu} flexDirection="column">
                 <Button component={Link} href={`/profile`} variant="contained" color="primary">
                   Profile
                 </Button>
                 <Button component={Link} href={`/account`} variant="contained" color="primary">
                   Account
                 </Button>
                 <Button component={Link} href={`/userDashboard`} variant="contained" color="primary">
                   Dashboard
                 </Button>
                 <Button component={Link} href={`/`} variant="contained" color="primary">
                   Logout
                 </Button>
                </MenuItem>
        
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;