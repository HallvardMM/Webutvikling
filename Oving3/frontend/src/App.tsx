import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Main from './maincomponents/Main';
import Registration from './maincomponents/Registration';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import { selectTable } from './reducers/themeReducer';


//App is a SPA with support for routing between registration page and main

function App() {
  const tableBackground = useSelector(selectTable);
  const useStyles = makeStyles(() =>
      createStyles({
          paper: {
              background: tableBackground,
              height: '100vh',
              width: 'auto',
          }
      }));
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/registration" component={Registration} />
      </Switch>
    </div>
  );
}

export default App;
