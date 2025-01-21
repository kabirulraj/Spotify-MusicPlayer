import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton
} from '@mui/material';
import { PlayArrow, MusicNote } from '@mui/icons-material';

const SongGridView = ({ songs, currentSong, playSong }) => {
  return (
    <Grid container spacing={2}>
      {songs.map((song) => (
        <Grid item xs={12} sm={6} md={4} key={song.id}>
          <Card
  sx={{
    backgroundColor: currentSong?.id === song.id ? 'green' : 'background.paper',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 6,
    },
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }}
>
  <CardContent sx={{ flex: 1, p: 2 }}>
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <MusicNote sx={{ color: currentSong?.id === song.id ? 'white' : 'primary.main' }} />
      </Grid>
      <Grid item xs>
        <Typography 
          noWrap 
          sx={{ 
            fontWeight: 500,
            color: currentSong?.id === song.id ? 'white' : 'text.primary'
          }}
        >
          {song.name}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton 
          onClick={() => playSong(song)}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          <PlayArrow sx={{ color: currentSong?.id === song.id ? 'white' : 'primary.main' }} />
        </IconButton>
      </Grid>
    </Grid>
  </CardContent>
</Card>

        </Grid>
      ))}
    </Grid>
  );
};

export default SongGridView;
