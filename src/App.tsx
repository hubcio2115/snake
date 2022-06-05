import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';

import { LeaderBoardContext } from 'context/LeaderBoardContext';

import { AppBar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';

import firebaseConfig from 'api/config';
import { LeaderBoardInterface } from 'utils/interfaces';

import GameView from 'views/GameView/GameView';
import StartingScreenView from 'views/StartingScreenView';

import 'styles/App.scss';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = (): JSX.Element => {
  const navigate = useNavigate();
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoardInterface[]>([]);
  const [isLeaderBoardLoading, setIsLeaderBoardLoading] = useState(true);

  useEffect(() => {
    initializeApp(firebaseConfig);
    const dbRef = ref(getDatabase());

    (async () => {
      try {
        const snapshot = await get(child(dbRef, 'leaderboard'));
        if (snapshot.exists() && snapshot.val() !== '')
          setLeaderBoard(snapshot.val());

        setIsLeaderBoardLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="app">
        <AppBar position="static" className="app-bar">
          <a className="logo" onClick={() => navigate('/')}>
            <Typography variant="h3">Snake 🐍</Typography>
          </a>
        </AppBar>

        <Container className="container">
          <LeaderBoardContext.Provider value={[leaderBoard, setLeaderBoard]}>
            <Routes>
              <Route
                path="/"
                element={
                  <StartingScreenView
                    isLeaderBoardLoading={isLeaderBoardLoading}
                  />
                }
              />
              <Route path="game" element={<GameView />} />
            </Routes>
          </LeaderBoardContext.Provider>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
