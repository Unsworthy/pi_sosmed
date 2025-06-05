import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TwitterIcon from '@mui/icons-material/Twitter'; // Atau logo Anda

const Navbar = ({ onMenuClick }) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1, // Navbar di atas Drawer
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onMenuClick}
                    sx={{ mr: 2, display: { sm: 'none' } }} // Hanya tampil di layar kecil
                >
                    <MenuIcon />
                </IconButton>
                <TwitterIcon sx={{ mr: 1, color: 'white' }} />
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'white' }}>
                    Beranda
                </Typography>
                {/* Anda bisa menambahkan ikon atau tombol lain di sini */}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;