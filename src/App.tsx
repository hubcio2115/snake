import { Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';
import firebaseConfig from 'api/config';

import GameView from 'views/GameView/GameView';
import StartingScreenView from 'views/StartingScreenView';

import 'styles/App.scss';
import { useEffect, useState } from 'react';
import { LeaderBoardInterface } from 'utils/interfaces';

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
        if (snapshot.exists()) setLeaderBoard(snapshot.val());
        else console.log('no data available');
        setIsLeaderBoardLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Box className="app">
      <AppBar position="static" className="app-bar">
        <a className="logo" onClick={() => navigate('/')}>
          <Typography variant="h3">Snake 🐍</Typography>
        </a>
      </AppBar>

      <Container className="container">
        <Routes>
          <Route
            path="/"
            element={
              <StartingScreenView
                leaderBoard={leaderBoard}
                isLeaderBoardLoading={isLeaderBoardLoading}
              />
            }
          />
          <Route path="game" element={<GameView />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
