import { Button, Stack } from '@mui/material';
import LeaderBoard from 'components/LeaderBoard/LeaderBoard';
import { useNavigate } from 'react-router-dom';

import './StartingScreen.scss';

interface StartingScreenViewProps {
  isLeaderBoardLoading: boolean;
}

export default function StartingScreenView({
  isLeaderBoardLoading,
}: StartingScreenViewProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <Stack className="start-stack">
      <Button
        variant="contained"
        color="success"
        className="start-button"
        onClick={() => navigate('game')}
      >
        Start Game
      </Button>
      <LeaderBoard isLeaderBoardLoading={isLeaderBoardLoading} />
    </Stack>
  );
}
