import { AppBar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { Route, Routes, useNavigate } from 'react-router-dom';
import GameView from 'views/GameView/GameView';
import StartingScreenView from 'views/StartingScreenView';
import 'styles/App.scss';

const App = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Box className="app">
      <AppBar position="static" className="app-bar">
        <a className="logo" onClick={() => navigate('/')}>
          <Typography variant="h3">Snake 🐍</Typography>
        </a>
      </AppBar>

      <Container className="container">
        <Routes>
          <Route path="/" element={<StartingScreenView />} />
          <Route path="game" element={<GameView />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
