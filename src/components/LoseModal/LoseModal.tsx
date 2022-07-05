import { useContext, useState } from 'preact/hooks';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';

import {
  Box,
  Button,
  FormControl,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { LeaderBoardContext } from 'context/LeaderBoardContext';

import './LoseModal.scss';

interface LoseModalProps {
  lost: boolean;
  score: number;
  handleStartGameOver: () => void;
}

export default function LoseModal({
  lost,
  score,
  handleStartGameOver,
}: LoseModalProps): JSX.Element {
  const navigate = useNavigate();

  const [leaderBoard, setLeaderBoard] = useContext(LeaderBoardContext);

  const [name, setName] = useState('');
  const [sentNewEntry, setSentNewEntry] = useState(false);

  const isApplicableToBeInLeaderBoard = () => {
    const indexOfLastElement = leaderBoard.length - 1;

    if (indexOfLastElement === -1) return true;
    if (leaderBoard[indexOfLastElement] === undefined) return false;

    return score > leaderBoard[indexOfLastElement].score;
  };

  const handleSetNewLeaderBoard = () => {
    const newEntry = { name, score };
    const newLeaderBoard = [...leaderBoard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    const db = getDatabase();
    set(ref(db, 'leaderboard'), newLeaderBoard);

    setSentNewEntry(true);
    setLeaderBoard(newLeaderBoard);
  };

  return (
    <Modal open={lost} onClose={() => {}}>
      <Box className="modal-box">
        <Stack>
          <Typography variant="h4" className="modal-header">
            {sentNewEntry
              ? 'You are now in the leader board!'
              : isApplicableToBeInLeaderBoard()
              ? 'Congratulations you beat someone in the leader board! 🎉 '
              : 'You lost 🙁'}
          </Typography>
          <Typography variant="h5">Your final score: {score}</Typography>
        </Stack>

        {isApplicableToBeInLeaderBoard() || sentNewEntry ? (
          <Box className="add-score-form-box">
            {sentNewEntry ? null : (
              <FormControl className="form-control">
                <TextField
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  disabled={name.length === 0}
                  onClick={handleSetNewLeaderBoard}
                  variant="contained"
                  color="warning"
                >
                  Send
                </Button>
              </FormControl>
            )}
          </Box>
        ) : null}

        <Box className="button-container">
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleStartGameOver();
              setSentNewEntry(false);
              setName('');
            }}
          >
            Play Again
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => navigate('/')}
          >
            Back To Menu
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
