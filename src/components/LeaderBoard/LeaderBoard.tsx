import { useContext } from 'preact/hooks';

import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import { LeaderBoardContext } from 'context/LeaderBoardContext';

import './LeaderBoard.scss';

interface LeaderBoardProps {
  isLeaderBoardLoading: boolean;
}

export default function LeaderBoard({
  isLeaderBoardLoading,
}: LeaderBoardProps): JSX.Element {
  const [leaderBoard] = useContext(LeaderBoardContext);

  return (
    <Stack className="leader-board-stack">
      <Typography variant="h4" pb={isLeaderBoardLoading ? 4 : 0}>
        Leader Board
      </Typography>
      {isLeaderBoardLoading ? (
        <CircularProgress color="primary" className="progress-circle" />
      ) : (
        <List className="list">
          {leaderBoard.length === 0 ? (
            <Typography variant="body1">
              There are no registered records yet, be the first to play the
              game!
            </Typography>
          ) : (
            leaderBoard.map((entry, index) => {
              return (
                <ListItem key={index} className="list-item">
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
}
