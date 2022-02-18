import React, { useContext, useState } from "react";
import AuthenticationContext from "../AuthenticationContext";
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
import MustBeLoggedIn from "./MustBeLoggedIn";

import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const authContext = useContext(AuthenticationContext);

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
  const navigate = useNavigate();

  return (
    <AppBar position="static" height="100vh">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <HomeIcon
              fontSize="large"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"></Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Typography variant="h4">Mibrary</Typography>
            <Typography
              variant="subtitle"
              style={{
                paddingLeft: 40,
              }}
            >
              the virtual book exchange app
            </Typography>
          </Box>
          {!authContext.userId && (
            <>
              <Button
                onClick={() => navigate("/signUp")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Sign Up
              </Button>
              <Button
                onClick={() => navigate("/login")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Log in
              </Button>
            </>
          )}

          <Button
            onClick={() => navigate("/about")}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            About
          </Button>
          <MustBeLoggedIn>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Pic" src="/static/images/avatar/2.jpg">
                    {authContext.userId &&
                      authContext.username[0].toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                MenuListProps={{ "aria-labelledby": "basic-button" }}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/profile");
                    handleCloseUserMenu();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/account");
                    handleCloseUserMenu();
                  }}
                >
                  Account
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/userDashboard");
                    handleCloseUserMenu();
                  }}
                >
                  Dashboard
                </MenuItem>
                <MenuItem onClick={authContext.logOut}>Log out</MenuItem>
              </Menu>
            </Box>
            {/* {authContext.username && <p>Welcome {authContext.username}</p>} */}
          </MustBeLoggedIn>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
