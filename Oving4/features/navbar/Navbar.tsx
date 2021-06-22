/*Top component in main page */
import React from 'react';
import { View } from 'react-native';
import { Title, Button } from 'react-native-paper'
import { useHistory } from "react-router-native"; //Used for routing
import { SET_USER, GET_USER } from "../../reducers/loginReducer"; //Login global state managment
import { GET_TEXT_COLOR, GET_PRIMARY_COLOR, GET_BUTTON_COLOR } from "../../reducers/themeReducer"; //Styke global state managment
import { useDispatch, useSelector } from 'react-redux';//Global state managment
import TitleSearch from './TitleSearch';
import Constants from 'expo-constants'; //Used to get statusBarHeight for IOS and android
import { Icon } from 'react-native-elements' //Icon in title

export default function Navbar() {
  const user = useSelector(GET_USER); //Name of logged in user. Empty if not logged in
  const dispatch = useDispatch(); //Used for global state managment
  let history = useHistory() //Used for routing
  //Styles from redux
  const buttonColor = useSelector(GET_BUTTON_COLOR)
  const primaryColor = useSelector(GET_PRIMARY_COLOR)
  const textColor = useSelector(GET_TEXT_COLOR)

  const handleLogOut = () => {
    dispatch(SET_USER(''))
  }

  if (user.length === 0) { //If no user is logged in
    return (
      <View>
        <View style={{ backgroundColor: primaryColor, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Title style={{ textAlign: 'center', color: textColor, textAlignVertical: 'center', paddingTop: Constants.statusBarHeight, marginRight: '1%' }}>MovieDatabase</Title>
          <Icon color={textColor} style={{ paddingTop: Constants.statusBarHeight + 5 }} name='movie-filter' />
        </View>
        <View style={{ backgroundColor: primaryColor, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: '2%' }}>
          <Button style={{ width: '45%', backgroundColor: buttonColor }} onPress={() => history.push('/login')} icon="account" mode="contained" >
            Login
          </Button>
          <Button style={{ width: '45%', backgroundColor: buttonColor }} onPress={() => history.push('/registration')} icon="account" mode="contained" >
            Register
          </Button>
        </View>

        <TitleSearch></TitleSearch>
      </View>
    );
  }
  else {
    return (
      <View>
        <View style={{ backgroundColor: primaryColor, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Title style={{ textAlign: 'center', color: textColor, textAlignVertical: 'center', paddingTop: Constants.statusBarHeight, marginRight: '1%' }}>MovieDatabase</Title>
          <Icon color={textColor} style={{ paddingTop: Constants.statusBarHeight + 5 }} name='movie-filter' />
        </View>
        <View style={{ backgroundColor: primaryColor, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Title style={{ color: textColor, textAlign: 'center' }}>
            Welcome, {user}!
        </Title>
          <Button mode="contained" icon="account" style={{ width: '30%', backgroundColor: buttonColor }} onPress={handleLogOut}>
            Log Out
        </Button>
        </View>
        <TitleSearch></TitleSearch>
      </View>
    )
  }

}