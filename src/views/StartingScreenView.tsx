import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'styles/StartingScreen.scss';

const StartingScreenView = () => {
  const navigate = useNavigate();

  return (
    <Stack sx={{ alignItems: 'center' }}>
      <Button
        variant="contained"
        color="success"
        className="start-button"
        onClick={() => navigate('game')}
      >
        Start Game
      </Button>
    </Stack>
  );
};
export default StartingScreenView;
