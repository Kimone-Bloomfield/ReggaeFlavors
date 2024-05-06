import React from 'react';
import { Box, Typography, Link, ListItemButton, ListItemIcon, List, Avatar, ThemeProvider, createTheme } from '@mui/material';
import { useRouter } from 'next/router';
import WorkIcon from '@mui/icons-material/Work';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto', // Change this to a font that suits your restaurant theme
      //'serif',
    ].join(','),
  },
});

const data = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Events', href: '/events'},
  { name: 'Contact', href: '/contact' },
  { name: 'Reservation', href: '/reservation' },
];

export default function NavBar() {
  const router = useRouter();

  const handleClick = (href) => {
    router.push(href);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: "linear-gradient(to right, green, black)",
          padding: '10px',
          width: '100%',
          height: '10vh',
          position: 'fixed',
          top: 0,
          zIndex: 1000,
        }}
      >
        <List sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {data.slice(0, 4).map((item, index) => (
            <Link href={item.href} key={index} passHref style={{ textDecoration: 'none' }}>
              <ListItemButton
                onClick={() => handleClick(item.href)}
                sx={{
                  color: 'white',
                  position: 'relative',
                  borderRadius: '10px',
                  padding: '10px 5px',
                  marginLeft: '5px',
                  '&:hover': {
                    color: 'white',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: 0,
                      height: 0,
                      borderTop: '10px solid transparent',
                      borderBottom: '10px solid transparent',
                      borderLeft: '10px solid yellow',
                      top: '50%',
                      left: '25%',  // Adjusted value to bring the arrow closer
                      transform: 'translateY(-50%)',
                      transition: 'all 0.3s ease',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography variant="inherit">{item.name}</Typography>
              </ListItemButton>
            </Link>
          ))}
        </List>
        <div className="logo" style={{ display: 'flex', marginLeft: 'auto', marginRight: '30%' }}>
          <Avatar src="/logo.png" alt="Logo" sx={{ width: 40, height: 40, marginRight: '10px' }} />
          <Typography variant="h6" style={{ fontSize: '20px', color: 'white' }}>
            ReggaeFlavors
          </Typography>
        </div>
        <Link href="/reservation" passHref style={{ textDecoration: 'none' }}>
          <ListItemButton
            onClick={() => handleClick('/reservation')}
            sx={{
              color: 'white',
              position: 'relative',
              borderRadius: '10px',
              padding: '20px 10px',
              marginRight: '30px',
              '&:hover': {
                color: 'white',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: 0,
                  height: 0,
                  borderTop: '10px solid transparent',
                  borderBottom: '10px solid transparent',
                  borderLeft: '10px solid yellow',
                  top: '50%',
                  left: '25%',  // Adjusted value to bring the arrow closer
                  transform: 'translateY(-50%)',
                  transition: 'all 0.3s ease',
                },
              },
            }}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <Typography variant="inherit">Reservations</Typography>
          </ListItemButton>
        </Link>
      </Box>
    </ThemeProvider>
  );
}
