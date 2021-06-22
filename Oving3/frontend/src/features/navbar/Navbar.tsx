import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Login from './Login';
import Typography from '@material-ui/core/Typography';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import { useSelector } from 'react-redux';
import { selectNavbar, selectNavbarText } from '../../reducers/themeReducer';
import Virtualize from './VirtualizedSearchComponent';

export default function Navbar() {
  //Get colors from Redux
  const navbar = useSelector(selectNavbar);
  const navbarText = useSelector(selectNavbarText)

  //Style components
  const useStyles = makeStyles(() =>
    createStyles({
      container: {
        justifyContent: 'space-around',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 'auto',
      },
      color: {
        background: navbar,
        paddingTop: 5,
        paddingBottom: 5
      },
      text: {
        color: navbarText
      }
    })
  )
  const classes = useStyles();

  return (
    //Use react.fragment, cssBaseline and Appbar to create navbar
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.color} /*Apply styles through ClassName*/>
        <div className={classes.container}>
          <Box mx="12px" my="auto" p={0} /*Boxes used for scaling and margins on components*/>
            <Typography
              variant="h5"
              className={classes.text}>
              Movie Database <MovieFilterIcon fontSize='inherit' />
            </Typography>
          </Box>
          <Box mx="12px" my="auto" p={0}>
            <Virtualize />
          </Box>
          <Box mx="12px" my="auto" p={0}>
            <Login />
          </Box>
        </div>
      </AppBar>
    </React.Fragment >
  );
};