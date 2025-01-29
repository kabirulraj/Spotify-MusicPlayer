import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  IconButton,
  Typography,
  Paper,
  Grid,
  Button
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  MusicNote,
  ViewList,
  ViewModule,
} from '@mui/icons-material';
import SongListView from './SongListView';
import SongGridView from './SongGridView';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const audioRef = useRef(null);

  const handleFileUpload = (files) => {
    const audioFiles = Array.from(files).filter(file =>
      file.type.startsWith('audio/')
    );

    const newSongs = audioFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      file
    }));

    setSongs([...songs, ...newSongs]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    audioRef.current.src = song.url;
    audioRef.current.play();
  };

  const playNext = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextSong = songs[currentIndex + 1] || songs[0];
    playSong(nextSong);
  };

  const playPrevious = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevSong = songs[currentIndex - 1] || songs[songs.length - 1];
    playSong(prevSong);
  };

  const handleSongNameUpdate = (songId, newName) => {
    setSongs(songs.map(song =>
      song.id === songId ? { ...song, name: newName } : song
    ));
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <Container>
      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        sx={{
          border: '2px dashed #ccc',
          padding: 4,
          textAlign: 'center',
          marginY: 2,
          cursor: 'pointer'
        }}
        onClick={() => document.getElementById('file-upload').click()}
      >
        <input
          id="file-upload"
          type="file"
          accept="audio/*"
          multiple
          onChange={(e) => handleFileUpload(e.target.files)}
          style={{ display: 'none' }}
        />
        <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
        <Typography>Click or drag and drop audio files here</Typography>
      </Box>


      <Button
        onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
        startIcon={viewMode === 'list' ? <ViewModule /> : <ViewList />}
      >
        Toggle View
      </Button>

      {viewMode === 'list' ? (
        <SongListView
        songs={songs}
        currentSong={currentSong}
        playSong={playSong}
        onSongNameUpdate={handleSongNameUpdate}
        isPlaying={isPlaying}
        onPause={handlePause}
      />
      
      ) : (
        <SongGridView
          songs={songs}
          currentSong={currentSong}
          playSong={playSong}
          isPlaying={isPlaying}
        onPause={handlePause}
        />
      )}

      {currentSong && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 2
          }}
        >
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Box display="flex" alignItems="center">
                <MusicNote sx={{ marginRight: 1 }} />
                <Typography noWrap>{currentSong.name}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <IconButton onClick={playPrevious}>
                  <SkipPrevious />
                </IconButton>
                <IconButton onClick={() => {
                  if (isPlaying) {
                    audioRef.current.pause();
                  } else {
                    audioRef.current.play();
                  }
                  setIsPlaying(!isPlaying);
                }}>
                  {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>

                <IconButton onClick={playNext}>
                  <SkipNext />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <audio
            ref={audioRef}
            onEnded={playNext}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </Paper>
      )}
    </Container>
  );
};

export default MusicPlayer;
