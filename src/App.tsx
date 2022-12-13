import React, {useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {useAppSelector} from "./hooks";
import HomePage from "./components/HomePage";
import FormPage from "./components/FormPage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ProfilePage from "./components/auth/ProfilePage";
import LogoutPage from "./components/auth/LogoutPage";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Box, IconButton, Menu, MenuItem, useMediaQuery, useTheme} from "@mui/material";
import Logo from "./components/custom/logo/Logo";
import EasterEgg1 from "./components/eggs/EasterEgg1";
import EasterEgg2 from "./components/eggs/EasterEgg2";
import EasterEgg3 from "./components/eggs/EasterEgg3";
import MenuIcon from '@mui/icons-material/Menu';
import {AccountCircle} from "@mui/icons-material";
import {getUserNavPages, getUserUserPages, isAdmin} from "./services/userService";


const App = () => {
    const {user} = useAppSelector(state => state.user);
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between("mobile", "tablet"));

    const navPages = getUserNavPages(user);
    const userPages = getUserUserPages(user);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    {/* mobile */}
                    <Box sx={{ flexGrow: 1 }} display={{ mobile: "flex", tablet: "none" }}>
                        <IconButton
                            size="large"
                            onClick={(e) => {setAnchorElNav(e.currentTarget)}}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={() => {setAnchorElNav(null)}}
                            sx={{ display: { mobile: "block", tablet: "none" }}}
                        >
                            {navPages.map((page) => (
                                <MenuItem key={page.name} onClick={() => {setAnchorElNav(null); navigate(page.navigate)}}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                            {isAdmin(user) && isMobile &&
                                <MenuItem onClick={() => {setAnchorElNav(null); navigate("/easter-egg/3")}}>
                                    <Typography textAlign="center">big striped fly</Typography>
                                </MenuItem>
                            }
                        </Menu>
                    </Box>

                    {/* LOGO */}
                    <Box><Logo size={60}/></Box>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        COOKIE FORM
                    </Typography>

                    {/* not mobile */}
                    <Box sx={{ flexGrow: 1 }} display={{ mobile: "none", tablet: "inline"}}>
                        {navPages.map((page) => (
                            <Button key={page.name} color="inherit" onClick={() => {navigate(page.navigate)}}>
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }} display={{ mobile: "none", tablet: "inline"}}>
                        {userPages.map((page) => (
                            <Button key={page.name} color="inherit" onClick={() => {navigate(page.navigate)}}>
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {/* mobile */}
                    <Box sx={{ flexGrow: 0 }} display={{ mobile: "flex", tablet: "none" }}>
                        <IconButton
                            size="large"
                            onClick={(e) => {setAnchorElUser(e.currentTarget)}}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={() => {setAnchorElUser(null)}}
                            sx={{ display: { mobile: "block", tablet: "none" }}}
                        >
                            {userPages.map((page) => (
                                <MenuItem key={page.name} onClick={() => {setAnchorElUser(null); navigate(page.navigate)}}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box style={{ padding: "20px" }}>
                <Routes>
                    <Route path={"/"} element={<HomePage />}/>
                    <Route path={"/home"} element={<HomePage />}/>
                    <Route path={"/form"} element={<FormPage />}/>
                    <Route path={"/register"} element={<RegisterPage />}/>
                    <Route path={"/login"} element={<LoginPage />}/>
                    <Route path={"/profile"} element={<ProfilePage />}/>
                    <Route path={"/logout"} element={<LogoutPage />}/>

                    <Route path={"/easter-egg/1"} element={<EasterEgg1 />}/>
                    <Route path={"/easter-egg/2"} element={<EasterEgg2 />}/>
                    <Route path={"/easter-egg/3"} element={<EasterEgg3 />}/>
                </Routes>
            </Box>
        </>
    );
};

export default App;