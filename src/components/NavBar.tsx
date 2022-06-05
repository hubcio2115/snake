import { AppBar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" className="app-bar">
      <a className="logo" onClick={() => navigate('/')}>
        <Typography variant="h3">Snake 🐍</Typography>
      </a>
    </AppBar>
  );
};
export default NavBar;
