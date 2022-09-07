import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import Select from '@mui/material/Select';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';
const pages = ['My Products', 'Pricing', 'Blog'];
const settings = ['Logout'];
const Header = () => {
    const token = localStorage.getItem('token')
    const image = localStorage.getItem('image')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [myCategory, setMyCategory] = React.useState('1');
    const userImage = localStorage.getItem('image')
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
    const handleChange = (event) => {
        const category = event.target.value
        setMyCategory(event.target.value);
        if (category == '10') navigate('/products/AUTO%20MOBILE')
        else if (category == "20") navigate('/products/KITCHEN%20ITEMS')
        else if (category == "30") navigate('/products/FASHION%20WEAR')
        else if (category == "40") navigate('/products/ELECTRONICS')
        else navigate('/')
    };
    const handleClick = (event) => {
        event.preventDefault();
        dispatch(logout())
        navigate("/")
    };
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            fontStyle: 'italic',
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MYCOMMERECE
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
                            <MenuIcon />
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
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MY COMMERECE
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={() => navigate('/')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label" sx={{ color: 'white', display: 'block' }}>Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={myCategory}
                                onChange={handleChange}
                                label="Category"
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <MenuItem value=''>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value='10'>Auto Mobile</MenuItem>
                                <MenuItem value='20'>Kitchen Items</MenuItem>
                                <MenuItem value='30'>Fashion Wear</MenuItem>
                                <MenuItem value='40'>Electronics</MenuItem>
                            </Select>
                        </FormControl>
                        {token &&
                            <Button
                                onClick={() => navigate('/myproducts')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                My products
                            </Button>
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Grid container direction="row" justifyContent="space-between" sx={{ width: "100%" }} alignItems="center">
                            {!token &&
                                <Button
                                    onClick={() => navigate('/login')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Login
                                </Button>
                            }
                            {!token &&
                                <Button
                                    onClick={() => navigate('/register')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    SignUp
                                </Button>
                            }
                            <Grid item sx={{ m: 3, fontSize: '30px' }}>
                                {
                                    token && <Tooltip title="your cart"><ShoppingCartIcon onClick={() => navigate('/shoppingcart')} /></Tooltip>
                                }
                            </Grid>
                            {token &&
                                <Grid item>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>

                                            <Avatar src={image} alt="Remy Sharp" />
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
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                <ListItem>
                                                    <ListItemButton onClick={handleClick}>
                                                        <ListItemText primary={setting} />
                                                    </ListItemButton>
                                                </ListItem>
                                            </MenuItem>
                                        ))}
                                    </Menu>

                                </Grid>
                            }
                        </Grid>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
