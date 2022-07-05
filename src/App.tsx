import { useEffect, useState } from 'preact/hooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';

import { Box, Container } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { LeaderBoardContext } from 'context/LeaderBoardContext';

import firebaseConfig from 'api/config';
import { LeaderBoardInterface } from 'utils/interfaces';

import GameView from 'views/GameView/GameView';
import StartingScreenView from 'views/StartingScreenView/StartingScreenView';
import NavBar from 'components/NavBar/NavBar';

import './App.scss';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = (): JSX.Element => {
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
      <BrowserRouter>
        <Box className="app">
          <NavBar />

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
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
