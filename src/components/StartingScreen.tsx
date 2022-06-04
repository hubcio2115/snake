import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StartingScreen = () => {
  const navigate = useNavigate();

  return (
    <Stack sx={{ alignItems: 'center' }}>
      <Button
        variant="contained"
        color="success"
        sx={{ width: '200px' }}
        onClick={() => navigate('game')}
      >
        Start Game
      </Button>
    </Stack>
  );
};
export default StartingScreen;
