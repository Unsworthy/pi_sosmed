import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TwitterIcon from '@mui/icons-material/Twitter';

const drawerWidth = 240;

const menuItems = [
    { text: 'Beranda', icon: <HomeIcon /> },
    { text: 'Jelajahi', icon: <ExploreIcon /> },
    { text: 'Notifikasi', icon: <NotificationsIcon /> },
    { text: 'Pesan', icon: <MailIcon /> },
    { text: 'Markah', icon: <BookmarkIcon /> },
    { text: 'Daftar', icon: <ListAltIcon /> },
    { text: 'Profil', icon: <PersonIcon /> },
    { text: 'Lainnya', icon: <MoreHorizIcon /> },
];

const Sidebar = ({ open, onClose }) => {
    const drawerContent = (
        <div>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 1 }}>
                <TwitterIcon color="primary" sx={{ fontSize: 30 }} />
            </Toolbar>
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton sx={{ py: 0.5, px: 3 }}>
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'h6', fontWeight: item.text === 'Beranda' ? 'bold' : 'normal' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {/* Anda bisa menambahkan tombol Tweet besar di sini */}
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* Drawer untuk mobile */}
            <Drawer
                variant="temporary"
                open={open}
                onClose={onClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>
            {/* Drawer permanen untuk desktop */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default Sidebar;