import { Box, Button, Modal, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LoseModalProps {
  lost: boolean;
  score: number;
  handleStartGameOver: () => void;
}

const LoseModal = ({ lost, score, handleStartGameOver }: LoseModalProps) => {
  const navigate = useNavigate();

  return (
    <Modal open={lost} onClose={() => {}}>
      <Box className="modal-box">
        <Typography variant="h3">You lost 🙁</Typography>
        <Typography variant="h6" className="modal-score">
          Your final score: {score}
        </Typography>
        <Box className="button-container">
          <Button
            variant="contained"
            color="success"
            onClick={handleStartGameOver}
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
};

export default LoseModal;
