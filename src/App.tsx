import Game from 'components/Game/Game';
import { AppBar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import StartingScreen from 'components/StartingScreen';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
          <Route path="/" element={<StartingScreen />} />
          <Route path="game" element={<Game />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
