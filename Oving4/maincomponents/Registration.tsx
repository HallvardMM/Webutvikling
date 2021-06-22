/*Page made for registration of new users */
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'; //Dimensions used for getting screen height
import { useOrientation } from '../components/useOrientation'; //Used to track orientation of phone
import Constants from 'expo-constants'; //Used to get screen size since the logic is different on IOS and android
import { useDispatch, useSelector } from 'react-redux'; //Global state managment 
import { GET_TEXT_COLOR, GET_PRIMARY_COLOR, GET_BUTTON_COLOR, GET_SECONDARY_COLOR } from '../reducers/themeReducer'; //Global state managment of styles
import { Text, Title, HelperText, Button, DefaultTheme } from 'react-native-paper' //Components 
import { SET_USER } from '../reducers/loginReducer'; //Global state managment of login state
import { useHistory } from "react-router-native"; //Global state managment 
import TextField from '../components/RegTextField'; //Styled textfield
import InfoText from '../components/InfoText'; //Logic for info text

interface newUser {
    username: string,
    password: string
}

export default function Registration() {
    const [userName, setUserName] = React.useState("");
    const [password1, setPassword1] = React.useState("");
    const [password2, setPassword2] = React.useState(""); //Password state to check if user writes correct
    const [isError, setIsError] = React.useState(false); //Error with creating user from backend?
    const [userExists, setUserExists] = React.useState(""); //Does Backend say user already exists?
    const dispatch = useDispatch(); //Dispath global state
    let history = useHistory(); //Used for routing 
    let portrait = useOrientation(); //Used to check orientation of phone

    //Use selector to import redux style, the color state allows for error-indication
    const NavbarColor = useSelector(GET_PRIMARY_COLOR)
    const textColor = useSelector(GET_TEXT_COLOR)
    const buttonColor = useSelector(GET_BUTTON_COLOR)
    const textFieldColor = useSelector(GET_SECONDARY_COLOR)

    //Styles used for components
    const styles = StyleSheet.create({
        containerPortrait: {
            flex: 1,
            backgroundColor: NavbarColor,
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimensions.get('window').height + Constants.statusBarHeight
        },
        containerLandscape: {
            flex: 1,
            backgroundColor: NavbarColor,
            alignItems: 'center',
            justifyContent: 'center'
        },
        Verticaltop: {
            display: "flex",
            marginTop: Constants.statusBarHeight + 30,
            flexDirection: "row",
            justifyContent: "space-between"
        },
        Horizontaltop: {
            display: "flex",
            marginTop: Constants.statusBarHeight,
            flexDirection: "row",
            justifyContent: "space-between"
        }
    });

    //Theme used for styling to override some styles in react-native-paper
    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: textColor,
            text: textColor

        },
    };


    // Add a new user to database
    async function newUser(newUser: newUser) {
        const body = JSON.stringify(newUser)
        fetch('http://it2810-65.idi.ntnu.no:3000/addUser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        }).then((res) => res.json()).then(
            (result) => {
                if (result.createuser) { // User created
                    dispatch(SET_USER(result.createuser)) //Set name and logged in as a global state
                    history.push('/'); //Move back to main page
                }
                else if (result.checkuser) { // User already exisists
                    setUserExists(result.checkuser);
                }
                else { //Error when backend querying database
                    setIsError(true);
                }
            }
        ).catch(function (error) { //Error when querying backend
            setIsError(true);
        });
    }

    if (portrait) { //Phone is in portrait mode
        return (
            <View style={styles.containerPortrait}>
                <View style={styles.Verticaltop}>
                    <Title style={{ color: textColor, width: "60%" }}>User Registration</Title>
                    <Button style={{ width: 1, paddingLeft: "10%" }}
                        color={buttonColor}
                        icon="window-close" mode="text"
                        onPress={() => history.push('/')}
                    >
                    </Button >
                </View>
                <TextField
                    returnKeyType="next"
                    value={userName}
                    onChangeText={event => setUserName(event)}
                    placeholder='Username'
                    theme={theme}
                    mode="flat"
                    underlineColor={textColor}
                    selectionColor={textColor}
                    underlineColorAndroid={textColor}
                    placeholderTextColor={textColor}
                    style={{ backgroundColor: textFieldColor, color: textColor }}
                    maxLength={8}
                >
                </TextField>
                <HelperText style={{ color: textColor, marginLeft: "10%", alignSelf: "flex-start" }} type='info'>{userName.length.toString() + "/8"}</HelperText>
                <TextField
                    returnKeyType="next"
                    value={password1}
                    onChangeText={event => setPassword1(event)}
                    placeholder='Password'
                    theme={theme}
                    mode="flat"
                    underlineColor={textColor}
                    selectionColor={textColor}
                    underlineColorAndroid={textColor}
                    placeholderTextColor={textColor}
                    style={{ backgroundColor: textFieldColor, color: textColor }}
                    maxLength={16}
                    secureTextEntry
                ></TextField>
                <HelperText style={{ color: textColor, marginLeft: "10%", alignSelf: "flex-start" }} type='info' >{password1.length.toString() + "/16"}</HelperText>
                <TextField
                    returnKeyType="next"
                    value={password2}
                    onChangeText={event => setPassword2(event)}
                    placeholder='Password'
                    theme={theme}
                    mode="flat"
                    underlineColor={textColor}
                    selectionColor={textColor}
                    underlineColorAndroid={textColor}
                    placeholderTextColor={textColor}
                    style={{ backgroundColor: textFieldColor, color: textColor }}
                    maxLength={16}
                    secureTextEntry>
                </TextField>
                <HelperText style={{ color: textColor, marginLeft: "10%", alignSelf: "flex-start" }} type='info' >{password2.length.toString() + "/16"}</HelperText>
                <Text style={{ color: textColor, marginHorizontal: "10%", marginVertical: "5%" }} >Encryption not added. Please don't use your regular password...</Text>
                <Button style={{ backgroundColor: buttonColor }} mode="contained" icon="account" disabled={(!(password1 === password2) || !userName.trim() || !password1.trim())} onPress={() => { newUser({ username: userName, password: password1 }) }}>
                    Create user
                </Button>
                <InfoText
                    username={userName}
                    password1={password1}
                    password2={password2}
                    userExists={userExists}
                    isError={isError}
                    style={textColor} />
            </View>
        )
    }
    else { //Phone is in landscape mode
        return (
            <View style={styles.containerLandscape}>
                <View style={styles.Horizontaltop}>
                    <Title style={{ color: textColor, width: "70%" }}>User Registration</Title>
                    <Button style={{ width: 1, paddingLeft: "5%" }}
                        icon="window-close" mode="text"
                        onPress={() => history.push('/')}
                        color={buttonColor}
                    >
                    </Button >
                </View>
                <TextField
                    returnKeyType="next"
                    value={userName}
                    onChangeText={event => setUserName(event)}
                    placeholder='Username'
                    theme={theme}
                    mode="flat"
                    underlineColor={textColor}
                    selectionColor={textColor}
                    underlineColorAndroid={textColor}
                    placeholderTextColor={textColor}
                    style={{ backgroundColor: textFieldColor, color: textColor }}
                    maxLength={8}
                >
                </TextField>
                <HelperText style={{ color: textColor, marginLeft: "10%", alignSelf: "flex-start" }} type='info'>{userName.length.toString() + "/8"}</HelperText>
                <TextField
                    returnKeyType="next"
                    value={password1}
                    onChangeText={event => setPassword1(event)}
                    placeholder='Password'
                    theme={theme}
                    mode="flat"
                    underlineColor={textColor}
                    selectionColor={textColor}
                    underlineColorAndroid={textColor}
                    placeholderTextColor={textColor}
                    style={{ backgroundColor: textFieldColor, color: textColor }}
                    maxLength={16}
                    secureTextEntry
                ></TextField>
                <HelperText style={{ color: textColor, marginLeft: "10%", alignSelf: "flex-start" }} type='info' >{password1.length.toString() + "/16"}</HelperText>
                <TextField
                    returnKeyType="next"
                    value={password2}
                    onChangeText={event => setPassword2(event)}
                    placeholder='Password'
                    theme={theme}
                    mode="flat"
                    underlineColor={textColor}
                    selectionColor={textColor}
                    underlineColorAndroid={textColor}
                    placeholderTextColor={textColor}
                    style={{ backgroundColor: textFieldColor, color: textColor }}
                    maxLength={16}
                    secureTextEntry>
                </TextField>
                <HelperText style={{ color: textColor, marginLeft: "10%", alignSelf: "flex-start" }} type='info' >{password2.length.toString() + "/16"}</HelperText>
                <Text style={{ color: textColor, marginVertical: "2%" }}>Encryption not added. Please don't use your regular password...</Text>
                <Button style={{ backgroundColor: buttonColor, marginBottom: '3%' }} mode="contained" icon="account" disabled={(!(password1 === password2) || !userName.trim() || !password1.trim())} onPress={() => { newUser({ username: userName, password: password1 }) }}>
                    Create user
                </Button>
                <InfoText
                    username={userName}
                    password1={password1}
                    password2={password2}
                    userExists={userExists}
                    isError={isError}
                    style={textColor} />
            </View>)
    }
}
