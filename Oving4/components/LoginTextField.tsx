/*Customized textfield used in login page */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const TextField = ({ errorText, ...props }: Props) => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      underlineColor="white"

      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

//Styling for input 
const styles = StyleSheet.create({
  container: {
    width: '60%',
    marginVertical: 12,
  },
  input: {

  },
  error: {
    fontSize: 8,
    paddingHorizontal: 2,
    paddingTop: 2,
  },
});

export default TextField;