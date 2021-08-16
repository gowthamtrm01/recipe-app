import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { Link } from 'react-router-dom';
import { themeContext } from './../App';
import { useContext } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { darkMode, setDarkMode } = useContext(themeContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} style={{ display: 'inherit' }}>
            My Recipes
            <div style={{ margin: '0 15px' }}>
              <Link to='/' style={{ color: 'white' }}>Home</Link>
            </div>
          </Typography>
          <IconButton
            onClick={() => {
              setDarkMode(!darkMode);
              const color = darkMode ? "#434343" : "#f3f3f3"
              document.body.style.backgroundColor = color;
            }}
            edge="start"
            className={classes.menuButton}
            color="inherit" aria-label="menu">
            <InvertColorsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}