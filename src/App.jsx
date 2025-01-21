import React, { useState } from 'react';
import { ThemeProvider, Typography, createTheme, Box, Container, Paper } from '@mui/material';
import MusicPlayer from './components/MusicPlayer';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1DB954', 
      },
      secondary: {
        main: '#191414', 
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      h4: {
        fontWeight: 800,
        letterSpacing: '-0.5px',
        background: '-webkit-linear-gradient(45deg, #1DB954 30%, #191414 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: 'rgba(29, 185, 84, 0.1)',
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: darkMode 
              ? '0 8px 32px rgba(0, 0, 0, 0.4)'
              : '0 8px 32px rgba(0, 0, 0, 0.1)',
          }
        }
      }
    }
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        transition: 'all 0.3s ease',
      }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '2px solid',
            borderColor: 'rgba(29, 185, 84, 0.2)',
            marginBottom: 4
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.3s ease'
              }
            }}>
              <MusicNoteIcon sx={{ 
                fontSize: 45, 
                color: '#1DB954',
                filter: 'drop-shadow(0 2px 4px rgba(29, 185, 84, 0.3))'
              }} />
              <Typography variant="h4">
                Spotify
              </Typography>
            </Box>
            <IconButton 
              onClick={toggleDarkMode} 
              color="inherit"
              sx={{
                border: '2px solid',
                borderColor: 'rgba(29, 185, 84, 0.2)',
                padding: 1.5
              }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
          <Paper elevation={3} sx={{ 
            padding: 4,
            backgroundColor: theme.palette.background.paper,
            transition: 'all 0.3s ease',
          }}>
            <MusicPlayer />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
