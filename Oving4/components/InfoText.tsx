/*Component used in registration to display help text to the user */
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

interface InfoText {
    username: string,
    password1: string,
    password2: string,
    userExists: string,
    isError: boolean,
    style:string
}

export default function InfoText(props: InfoText ) {
    if (props.isError) {
        return (<Text style={{color:props.style}}>The registration triggered an error.</Text>)
    }
    else if (!(props.password1 === props.password2)) {
        return (<Text style={{color:props.style}} >Passwords don't match</Text>)
    }
    else if (props.userExists) {
        return (<Text style={{color:props.style}}>The user {props.userExists} already exsists.</Text>)
    }
    else {
        return (<View></View>)
    }
}

