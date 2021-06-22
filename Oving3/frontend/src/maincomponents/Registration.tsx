import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import movies from '../movies.jpg';
import { useDispatch } from 'react-redux';
import { setUserLoggedIn } from '../reducers/loginReducer';

interface newUser {
    username: string,
    password: string
}

interface helperText {
    username: string,
    password1: string,
    password2: string,
    userExists: string,
    isError: boolean
}

function HelperText(props: helperText) {
    if (props.isError) {
        return (
            <Typography variant="body1" color='error'>
                The registration triggered an error.
            </Typography>
        )

    }
    else if (!(props.password1 === props.password2)) {
        return (
            <Typography variant="body1" color='error'>
                Passwords don't match
            </Typography>
        )
    }
    else if (props.userExists) {
        return (
            <Typography id='UserExist' variant="body1" color='error'>
                The user {props.userExists} already exsists.
            </Typography>
        )
    }
    else {
        return (
            <div style={{ height: "1.5rem", width: "100%", clear: "both" }}></div>
        )
    }
}

export default function Registration() {
    const tableBackground = 'linear-gradient(90deg, #F08080 10%, #F49785 60%)';
    const buttonStyle = 'linear-gradient(45deg, #A480CF 30%, #D264B6 90%)';
    const navbarText = '#F5F5F5';

    const useStyles = makeStyles(() =>
        createStyles({
            text: {
                color: navbarText
            },
            button: {
                background: buttonStyle,
                color: navbarText,
                marginLeft: "0.5rem"
            },
            field: {
                color: navbarText,
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
                width: "75%",
                '& .MuiFormLabel-root': {
                    color: navbarText
                },
                '& .MuiInputBase-root': {
                    color: navbarText
                },
                '& .MuiInputBase-input:focus:not:hover': {
                    outline: navbarText,
                    borderWidth: 1
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: navbarText,
                    borderWidth: 1
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: navbarText,
                    borderWidth: 1
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: navbarText,
                    borderWidth: 1
                },
                '& .MuiFormHelperText-root': {
                    color: navbarText
                }
            },
            main: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            },
            paper: {
                padding: "0.5rem",
                background: tableBackground,
            },
            heroImage: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${movies})`,
                height: "100vh",
                backgroundPosition: "center",
                backgroundRepeat: "norepeat",
                backgroundSize: "cover",
                position: "relative",
            }
        }));
    const classes = useStyles();
    const [userName, setUserName] = React.useState("");
    const [password1, setPassword1] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [isError, setIsError] = React.useState(false);
    const [userExists, setUserExists] = React.useState("");
    let history = useHistory();
    const dispatch = useDispatch();



    async function newUser(newUser: newUser) {
        const body = JSON.stringify(newUser)
        fetch('http://localhost:5000/addUser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        }).then((res) => res.json()).then(
            (result) => {
                if (result.createuser) {
                    dispatch(setUserLoggedIn(result.createuser))
                    history.push('/');
                }
                else if (result.checkuser) {
                    setUserExists(result.checkuser);
                }
                else {
                    setIsError(true);
                }
            }
        ).catch(function (error) {
            setIsError(true);
        });
    }


    return (
        <div className={classes.heroImage}>
            <Paper className={classes.paper} elevation={3}>
                <div className={classes.main}>
                    <Typography classes={{ root: classes.text }} variant="h4" gutterBottom >
                        User registration
                    </Typography>
                    <TextField
                        classes={{ root: classes.field }}
                        id="userNameField"
                        label="Username"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                        inputProps={{ maxLength: 8, className: classes.field }}
                        helperText={userName.length.toString() + "/8"}
                    /><TextField
                        classes={{ root: classes.field }}
                        id="Password1Field"
                        label="Password"
                        type="password"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        value={password1}
                        onChange={(event) => setPassword1(event.target.value)}
                        inputProps={{ maxLength: 16, className: classes.field }}
                        helperText={password1.length.toString() + "/16"}
                    /><TextField
                        classes={{ root: classes.field }}
                        id="ReviewField"
                        label="Password"
                        type="password"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        value={password2}
                        onChange={(event) => setPassword2(event.target.value)}
                        inputProps={{ maxLength: 16, className: classes.field }}
                        helperText={password2.length.toString() + "/16"}></TextField>
                    <Typography classes={{ root: classes.text }} variant="body1" gutterBottom >
                        Encryption not added. Please don't use your regular password...
                    </Typography>
                    {(!(password1 === password2) || !userName.trim() || !password1.trim()) ? <Button variant="contained" color="primary" disabled={true} onClick={() => { newUser({ username: userName, password: password1 }) }}>
                        Create user
                    </Button> :
                        <Button variant="contained" className={classes.button} disabled={false} onClick={() => { newUser({ username: userName, password: password1 }) }}>
                            Create user
                    </Button>}
                    <HelperText
                        username={userName}
                        password1={password1}
                        password2={password2}
                        userExists={userExists}
                        isError={isError} />
                </div>

            </Paper>
        </div >

    );
}