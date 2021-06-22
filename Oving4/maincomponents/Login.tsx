/* Login page used for logging in to a created account */
import { Button, Title, DefaultTheme } from 'react-native-paper';
import React, { useEffect, useReducer, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'; //Dimensions used to get screen height
import { useDispatch, useSelector } from 'react-redux'; //Used for global state managment
import { GET_TEXT_COLOR, GET_PRIMARY_COLOR, GET_BUTTON_COLOR, GET_SECONDARY_COLOR } from '../reducers/themeReducer'; //Used for global style/color managment
import { SET_USER, GET_USER } from "../reducers/loginReducer"; //Used for global state managment of login logic
import TextField from '../components/LoginTextField'; //Styled textfield component
import { useOrientation } from '../components/useOrientation'; //Used to check if phone is in landscape or portrait mode
import { useHistory } from "react-router-native"; //Used for routing 
import Constants from 'expo-constants' //Used to get statusBarHeight on iphone and android

//Define type localState for the local reducer logic
type localState = {
    username: string
    password: string
    isButtonDisabled: boolean
    userText: string
    passText: string
    isError: boolean
};

//Set intialState for local Reducer logic
const initialState: localState = {
    username: '',
    password: '',
    isButtonDisabled: true,
    userText: 'Username',
    passText: 'Password',
    isError: false
};

//Define type Action, with type and payload, for local reducer logic
type Action = { type: 'setUsername', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'loginSuccess', payload: boolean }
    | { type: 'loginFailed', payload: string };

const reducerLogic = (localState: localState, action: Action): localState => {
    //Switch-reducer logic used for login component, switch on action type
    switch (action.type) {
        case 'setUsername':
            return {
                ...localState,
                username: action.payload
                //Update localState according to type of action, with action.payload
            };
        case 'setPassword':
            return {
                ...localState,
                password: action.payload
            };
        case 'setIsButtonDisabled':
            return {
                ...localState,
                isButtonDisabled: action.payload
            };
        case 'loginSuccess':
            return {
                ...localState,
                userText: 'Username',
                passText: 'Password',
                isError: false
                //Update localState according to type of action
                //Resets local state if loginSuccess
            };
        case 'loginFailed':
            return {
                ...localState,
                userText: action.payload,
                passText: action.payload,
                isError: true
                //Sets error-indicator if the login fails
            };
    }
}

export default function Login() {
    let portrait = useOrientation(); //Is phone in portrait mode?
    let history = useHistory(); //Used to route to different page

    //Use selector to import redux style, the color state allows for error-indication
    const [color, setColor] = useState(useSelector(GET_TEXT_COLOR));
    const navbarColor = useSelector(GET_PRIMARY_COLOR)
    const textColor = useSelector(GET_TEXT_COLOR)
    const buttonColor = useSelector(GET_BUTTON_COLOR)
    const textFieldColor = useSelector(GET_SECONDARY_COLOR)
    //useReducer-function from react used for local reducer-logic
    const [localState, send] = useReducer(reducerLogic, initialState);


    //Styling
    const styles = StyleSheet.create({
        containerPortrait: {
            backgroundColor: navbarColor,
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimensions.get('window').height + Constants.statusBarHeight
        },
        containerLandscape: {
            backgroundColor: navbarColor,
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimensions.get('window').height
        },
        Verticaltop: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        },
        Horizontaltop: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        }
    });

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: textColor,
            text: textColor

        },
    };

    useEffect(() => {
        //useEffect updates color of components dependent on localState.isError
        if (localState.isError) {
            setColor("#FF0000")
        }
        else {
            setColor(textColor)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localState.isError, buttonColor]);

    //Apply redux colors and style components
    const dispatch = useDispatch();
    const user = useSelector(GET_USER);

    useEffect(() => {
        //useEffect to check if button should be disabled or not uses local 
        //reducer-logic, and is disabled if username or password is empty
        if (localState.username.trim() && localState.password.trim()) {
            send({ type: 'setIsButtonDisabled', payload: false });
        }
        else {
            send({ type: 'setIsButtonDisabled', payload: true });
        }
    }, [localState.username, localState.password]);

    const handleLogin = () => {
        //Checks if user is in database, if so sets userLoggedIn in Redux
        const body = JSON.stringify({ username: localState.username, password: localState.password })
        fetch('http://it2810-65.idi.ntnu.no:3000/checkuser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        }).then((res) => res.json()).then(
            (result) => {
                if (result.userLoggedIn) {
                    send({ type: 'loginSuccess', payload: true });
                    dispatch(SET_USER(result.userLoggedIn))
                    history.push('/')
                }
                else {
                    send({ type: 'loginFailed', payload: 'Incorrect' });
                }
            })
    };

    useEffect(() => {
        if (!user) {
            //Updates states on logout, sets userLoggedIn in redux to empty
            send({ type: 'loginSuccess', payload: false });
            send({ type: 'setUsername', payload: "" });
            send({ type: 'setPassword', payload: "" });
        }
    }, [user]);

    if (portrait) { //Is phone in portrait mode?
        return (
            <View style={styles.containerPortrait}>
                <View style={styles.Verticaltop}>
                    <Title style={{ color: textColor, width: "45%" }}>Login</Title>
                    <Button
                        color={buttonColor}
                        style={{ width: 1, paddingLeft: "10%" }}
                        icon="window-close" mode="text"
                        onPress={() => history.push('/')}
                    >
                    </Button >
                </View>
                <TextField
                    onChangeText={(event) => {
                        send({ type: 'setUsername', payload: event });
                    }}
                    theme={theme}
                    mode="flat"
                    underlineColor={textColor}
                    selectionColor={textColor}
                    underlineColorAndroid={textColor}
                    placeholderTextColor={textColor}
                    style={{ backgroundColor: textFieldColor, color: textColor }}
                    error={localState.isError}
                    placeholder="Username"
                />
                <TextField
                    onChangeText={(event) => {
                        send({ type: 'setPassword', payload: event })
                    }}
                    theme={theme}
                    mode="flat"
                    underlineColor={textColor}
                    selectionColor={textColor}
                    underlineColorAndroid={textColor}
                    placeholderTextColor={textColor}
                    style={{ backgroundColor: textFieldColor, color: textColor }}
                    error={localState.isError}
                    placeholder="Password"
                    secureTextEntry
                />
                <Button mode='contained' style={{ backgroundColor: buttonColor, marginLeft: 'auto', marginRight: 'auto', width: '60%' }}
                    disabled={localState.isButtonDisabled} onPress={handleLogin}>
                    Login
                </Button>
                <Title style={{ color: textColor, marginTop: '10%', marginLeft: "20%", alignSelf: "flex-start" }}>Register</Title>
                <Button mode='contained' icon="account" onPress={() => history.push('/registration')}
                    style={{ backgroundColor: buttonColor, marginLeft: 'auto', marginRight: 'auto', width: '60%' }} >
                    Register
                </Button>
            </View>);
    }
    else { // Is phone in landscape mode?
        return (
            <View style={styles.containerLandscape}>
                <View style={styles.Horizontaltop}>
                    <Title style={{ color: textColor, width: "50%" }}>Login</Title>
                    <Button
                        color={buttonColor}
                        style={{ width: 1, paddingLeft: "5%" }}
                        icon="window-close" mode="text"
                        onPress={() => history.push('/')}
                    >
                    </Button >
                </View>
                <TextField
                    onChangeText={(event) => {
                        send({ type: 'setUsername', payload: event });
                    }}
                    theme={theme}
                    mode="flat"
                    underlineColor={textColor}
                    selectionColor={textColor}
                    underlineColorAndroid={textColor}
                    placeholderTextColor={textColor}
                    style={{ backgroundColor: textFieldColor, color: textColor, width: '100%' }}
                    error={localState.isError}
                    placeholder="Username"
                />
                <TextField
                    onChangeText={(event) => {
                        send({ type: 'setPassword', payload: event })
                    }}
                    theme={theme}
                    mode="flat"
                    underlineColor={textColor}
                    selectionColor={textColor}
                    underlineColorAndroid={textColor}
                    placeholderTextColor={textColor}
                    style={{ backgroundColor: textFieldColor, color: textColor, marginTop: '3%', width: '100%' }}
                    error={localState.isError}
                    placeholder="Password"
                    secureTextEntry
                />
                <Button mode='contained' style={{ backgroundColor: buttonColor, marginLeft: 'auto', marginRight: 'auto', width: '60%' }}
                    disabled={localState.isButtonDisabled} onPress={handleLogin}>
                    Login
                </Button>
                <Title style={{ color: textColor, marginTop: '2%', marginLeft: "20%", alignSelf: "flex-start" }}>Register</Title>
                <Button mode='contained' icon="account" onPress={() => history.push('/registration')}
                    style={{ backgroundColor: buttonColor, marginLeft: 'auto', marginRight: 'auto', width: '60%' }} >
                    Register
                </Button>
            </View>
        );
    }
}