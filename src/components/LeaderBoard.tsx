import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { LeaderBoardInterface } from 'utils/interfaces';

interface LeaderBoardProps {
  leaderBoard: LeaderBoardInterface[];
  isLeaderBoardLoading: boolean;
}
const LeaderBoard = ({
  leaderBoard,
  isLeaderBoardLoading,
}: LeaderBoardProps) => {
  return (
    <Stack minHeight={558}>
      <Typography variant="h4" pb={isLeaderBoardLoading ? 4 : 0}>
        Leader Board
      </Typography>
      {isLeaderBoardLoading ? (
        <CircularProgress
          color="primary"
          sx={{ alignSelf: 'center', justifySelf: 'center' }}
        />
      ) : (
        <List style={{ textAlign: 'left', listStyleType: 'decimal' }}>
          {leaderBoard.length === 0 ? (
            <Typography variant="body1">
              There are no registered records yet, be the first to play the
              game!
            </Typography>
          ) : (
            leaderBoard.map((entry, index) => {
              return (
                <ListItem key={index} sx={{ display: 'list-item' }}>
                  <ListItemText>
                    {entry.name}: {entry.score}
                  </ListItemText>
                </ListItem>
              );
            })
          )}
        </List>
      )}
    </Stack>
  );
};

export default LeaderBoard;
