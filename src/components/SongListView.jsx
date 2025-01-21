import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import { PlayArrow, Edit, Save } from '@mui/icons-material';

const SongListView = ({ songs, currentSong, playSong, onSongNameUpdate }) => {
  const [editingSongId, setEditingSongId] = useState(null);
  const [editedName, setEditedName] = useState('');

  const startEditing = (song) => {
    setEditingSongId(song.id);
    setEditedName(song.name);
  };

  const saveEdit = (song) => {
    onSongNameUpdate(song.id, editedName);
    setEditingSongId(null);
  };

  return (
    <TableContainer 
  component={Paper} 
  sx={{ 
    boxShadow: 3,
    borderRadius: 2,
    overflow: 'hidden'
  }}
>
  <Table>
    <TableHead>
      <TableRow sx={{ backgroundColor: 'primary.main' }}>
        <TableCell sx={{ color: 'white' }}>Play</TableCell>
        <TableCell sx={{ color: 'white' }}>Name</TableCell>
        <TableCell sx={{ color: 'white' }}>Edit</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {songs.map((song) => (
        <TableRow
          key={song.id}
          
        >
          <TableCell>
            <IconButton 
              onClick={() => playSong(song)}
              sx={{
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              <PlayArrow color="primary" />
            </IconButton>
          </TableCell>
          <TableCell>
            {editingSongId === song.id ? (
              <TextField
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                size="small"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
            ) : (
              <Typography sx={{ fontWeight: 500 }}>{song.name}</Typography>
            )}
          </TableCell>
          <TableCell>
            {editingSongId === song.id ? (
              <IconButton onClick={() => saveEdit(song)} color="primary">
                <Save />
              </IconButton>
            ) : (
              <IconButton onClick={() => startEditing(song)} color="primary">
                <Edit />
              </IconButton>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

  );
};

export default SongListView;
