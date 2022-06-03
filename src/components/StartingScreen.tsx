import { Button, Stack } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface StartingScreenProps {
  setIsGameRunning: Dispatch<SetStateAction<boolean>>;
}

const StartingScreen = ({ setIsGameRunning }: StartingScreenProps) => {
  return (
    <Stack sx={{ alignItems: 'center' }}>
      <Button
        variant="contained"
        color="success"
        sx={{ width: '200px' }}
        onClick={() => setIsGameRunning(true)}
      >
        Starting Screen
      </Button>
    </Stack>
  );
};
export default StartingScreen;
