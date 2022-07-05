import { useNavigate } from 'react-router-dom';
import { AppBar, Typography } from '@mui/material';

import './NavBar.scss';

export default function NavBar(): JSX.Element {
  const navigate = useNavigate();

  return (
    <AppBar position="static" className="app-bar">
      <a className="logo" onClick={() => navigate('/')}>
        <Typography variant="h3">Snake 🐍</Typography>
      </a>
    </AppBar>
  );
}
