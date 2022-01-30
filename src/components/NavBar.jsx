import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { history } from '../helpers';
import { userService } from '../services';

import { createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';



const pages = ['upload', 'explore', 'Blog'];
const settings = ['Profile', 'settings', 'Dashboard'];

function NavBar({profile, user})  {

  // console.log(user)

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const open = Boolean(anchorElUser);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


  // const handleOpenNavMenu = (event) => {
    // setAnchorElNav(event.currentTarget);
  // };
 

  const handleCloseNavMenu = () => {
    // window.location.reload();
    setAnchorElNav(null);
  };

  const logout = () => {
    userService.logout()  
  }

  

  return (
    
    <>
          
      {user ? (
              
      <AppBar position="sticky" sx={{bgcolor: '#FFFFFF', color: 'black', width: '100%'}} >
     
        <Toolbar> 

          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}> */}
           <Link to='/'>
           <img src='/public/logo2.jpg' alt='35mm logo' width='80px'/>                
           </Link>
          {/* </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
            {/* <IconButton */}
              {/* // size="large" */}
              {/* // aria-label="account of current user" */}
              {/* // aria-controls="menu-appbar" */}
              {/* // aria-haspopup="true" */}
              {/* // onClick={handleOpenNavMenu} */}
              {/* // color="inherit" */}
            {/* // > */}
              {/* <MenuIcon /> */}
            {/* </IconButton> */}
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
              {/* {pages.map((page) => ( */}
                {/* // <MenuItem key={page} onClick={handleCloseNavMenu} onClick={() => history.push(`${page}`)}> */}
                  {/* <Typography textAlign="center">{page}</Typography> */}
                {/* </MenuItem> */}
              {/* // ))} */}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            35mm
          </Typography>
          <Box sx={{ flexGrow: 20, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                onClick={() => history.push(`${page}`)}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button> 
            ))}
          </Box>

              <Search>
                  <SearchIconWrapper sx={{ color: 'black' }} >
                    <SearchIcon />
                  </SearchIconWrapper >
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search', }} 
                    sx={{ color: 'black' }}
                  />
                </Search>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={profile.avatar_url} sx={{width: 32, height: 32, mr: '10px'}} alt="Remy Sharp"/>
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
              open={open}
              onClose={handleCloseUserMenu}
              onClick={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu} onClick={() => history.push(`${setting}`)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu} onClick={logout} onClick={() => history.push("/login")}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      
    </AppBar>

          ) : (

        <>
            <Box sx={{ flexGrow: 1 }}>
                  <AppBar position="fixed" sx={{bgcolor: '#FFFFFF', color: 'black', width: '100%'}} >
                    <Toolbar>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
                      <Link to='/'>
                      <img src='/public/logo2.jpg' alt='35mm logo' width='80px'/>                
                      </Link>
                      </Typography>
                      <Search>
                          <SearchIconWrapper sx={{ color: 'black' }} >
                            <SearchIcon />
                          </SearchIconWrapper >
                          <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search', }} 
                            sx={{ color: 'black' }}
                          />
                        </Search>
                      <Button color="inherit" onClick={() => history.push("/login")}>Login</Button>
                      <Button color="inherit" onClick={() => history.push("/register")} >SignUp</Button>
                    </Toolbar>
                  </AppBar>
                </Box>
            </>
          )}      
        </>

  );
};

export {NavBar}
