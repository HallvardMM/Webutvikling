/*App - Main component for app */

import React from 'react';
import { StatusBar } from 'expo-status-bar'; // Import of statusbar
import { NativeRouter, Route, Switch } from 'react-router-native'; //Used for routing between pages
import { ScrollView } from 'react-native'; // Used to allow scrolling
import { Provider } from 'react-redux'; //Used for global state managment
import store from './app/store'; //Store for global state managment
import Registration from './maincomponents/Registration'; //Registration page
import Main from './maincomponents/Main'; // Table and data page
import Login from './maincomponents/Login'; // Login page

export default function App() {

  return (
    <ScrollView>
      <NativeRouter>
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/login" component={Login} />
          </Switch>
          <StatusBar style='auto'></StatusBar>
        </Provider>
      </NativeRouter>
    </ScrollView>
  );
}

