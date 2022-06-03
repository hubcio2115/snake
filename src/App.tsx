import Board from 'components/Board/Board';
import { AppBar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import 'styles/App.scss';
import { useState } from 'react';
import StartingScreen from 'components/StartingScreen';

const App = (): JSX.Element => {
  const [isGameRunning, setIsGameRunning] = useState(false);

  return (
    <Box className="app">
      <AppBar position="static" className="app-bar">
        <a className="logo" onClick={() => setIsGameRunning(false)}>
          <Typography variant="h3">Snake 🐍</Typography>
        </a>
      </AppBar>

      <Container className="container">
        {isGameRunning ? (
          <Board setIsGameRunning={setIsGameRunning} />
        ) : (
          <StartingScreen setIsGameRunning={setIsGameRunning} />
        )}
      </Container>
    </Box>
  );
};

export default App;
