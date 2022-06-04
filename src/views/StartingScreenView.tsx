import { Button, Stack } from '@mui/material';
import LeaderBoard from 'components/LeaderBoard';
import { useNavigate } from 'react-router-dom';
import 'styles/StartingScreen.scss';
import { LeaderBoardInterface } from 'utils/interfaces';

interface StartingScreenViewProps {
  leaderBoard: LeaderBoardInterface[];
  isLeaderBoardLoading: boolean;
}

const StartingScreenView = ({
  leaderBoard,
  isLeaderBoardLoading,
}: StartingScreenViewProps) => {
  const navigate = useNavigate();

  return (
    <Stack sx={{ alignItems: 'center', gap: 10 }}>
      <Button
        variant="contained"
        color="success"
        className="start-button"
        onClick={() => navigate('game')}
      >
        Start Game
      </Button>
      <LeaderBoard
        leaderBoard={leaderBoard}
        isLeaderBoardLoading={isLeaderBoardLoading}
      />
    </Stack>
  );
};
export default StartingScreenView;
