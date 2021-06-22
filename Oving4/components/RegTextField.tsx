/*Customized textfield used in registration page*/

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const TextField = ({ errorText, ...props }: Props) => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      underlineColor="transparent"
      mode="outlined"
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

//Styling for input 
const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 12,
  },
  input: {

  },
  error: {
    fontSize: 14,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default TextField;