/* eslint-disable no-unused-expressions */

import React, { useEffect, useReducer, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoggedIn, selectUser } from "../../reducers/loginReducer";
import Typography from '@material-ui/core/Typography';
import { selectNavbarText, selectButton, selectErrorColor } from '../../reducers/themeReducer';

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

const Login = () => {
    //Use selector to import redux style, the color state allows for error-indication
    const [color, setColor] = useState(useSelector(selectNavbarText));
    const error = useSelector(selectErrorColor)
    const text = useSelector(selectNavbarText)
    const button = useSelector(selectButton)
    //useReducer-function from react used for local reducer-logic
    const [localState, send] = useReducer(reducerLogic, initialState);

    useEffect(() => {
        //useEffect updates color of components dependent on localState.isError
        if (localState.isError) {
            setColor(error)
        }
        else {
            setColor(text)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localState.isError, button]);

    //Apply redux colors and style components
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                maxWidth: 400,
                [theme.breakpoints.up('sm')]: {
                    flexWrap: 'nowrap',
                },
                width: 'auto',
                margin: `${theme.spacing(0)} auto`,
            },
            text: {
                color: text,
            },
            button: {
                background: button,
                color: text,
                marginTop: 0,
                marginLeft: 4,
            },
            buttonDisabled: {
                marginTop: 0,
                marginLeft: 4
            },
            root: {
                //Override color and borderColor of textfield
                "& .MuiFormLabel-root": {
                    color: color,
                },
                "& .MuiInput-underline:before": {
                    borderBottomColor: color,
                },
                "& .MuiInput-underline:after": {
                    borderBottomColor: color,
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: color
                }
            }
        })
    );
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

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
        fetch('http://localhost:5000/checkuser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        }).then((res) => res.json()).then(
            (result) => {
                if (result.userLoggedIn) {
                    send({ type: 'loginSuccess', payload: true });
                    dispatch(setUserLoggedIn(result.userLoggedIn))
                }
                else {
                    send({ type: 'loginFailed', payload: 'Incorrect' });
                }
            })
    };

    const handleLogOut = () => {
        //Updates states on logout, sets userLoggedIn in redux to empty
        send({ type: 'loginSuccess', payload: false });
        send({ type: 'setUsername', payload: "" });
        send({ type: 'setPassword', payload: "" });
        dispatch(setUserLoggedIn(""))
    };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
        //Updates username in local state, called by onchange
        (event) => {
            send({ type: 'setUsername', payload: event.target.value });
        };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        //Updates password in local state, called by onchange
        (event) => {
            send({ type: 'setPassword', payload: event.target.value });
        }
    if (user.length === 0) {
        //If no user is logged in, return login-form
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    style={{ marginRight: '2%' }}
                    error={localState.isError}
                    //Classes used on textfield to override material ui standard
                    classes={{ root: classes.root }}
                    fullWidth
                    id="username"
                    type="email"
                    label={localState.userText}
                    placeholder="Username"
                    margin="normal"
                    onChange={handleUsernameChange}
                    InputProps={{
                        className: classes.text,
                    }}
                />
                <TextField
                    style={{ marginRight: '2%' }}
                    classes={{ root: classes.root }}
                    error={localState.isError}
                    fullWidth
                    id="password"
                    type="password"
                    label={localState.passText}
                    placeholder="Password"
                    margin="normal"
                    onChange={handlePasswordChange}
                    InputProps={{
                        className: classes.text,
                    }}
                />
                <Box mx="auto" my="auto" p={0}>
                    <Button
                        variant="contained"
                        id='loginButton'
                        className={!localState.isButtonDisabled ? classes.button : classes.buttonDisabled}
                        onClick={handleLogin}
                        disabled={localState.isButtonDisabled}>
                        Login
                    </Button>
                </Box>
                <Box mx="auto" my="auto" p={0}>
                    <Button
                        variant="contained"
                        color="inherit"
                        className={classes.button}
                        href="/registration">
                        Register
                </Button>
                </Box>
            </form>
        );
    }
    else {
        //if user is logged in, return logged in form (with logout possibility and greeting)
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Box mx="auto" p={0}>
                    <Typography
                        variant="h5"
                        style={{ marginRight: 10 }}
                        className={classes.text}>
                        Welcome, {user}!
                    </Typography>
                </Box>
                <Box mx="auto" p={0}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleLogOut}>
                        Log Out
                    </Button>
                </Box>
            </form>
        );
    }
}

export default Login;
