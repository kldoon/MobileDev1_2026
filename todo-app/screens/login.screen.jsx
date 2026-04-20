import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const LoginScreen = () => {
  const [data, setData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const nav = useNavigation();

  const login = () => {
    if (data.username === 'admin' && data.password === '123') {
      // Correct Login
      setError("");
      nav.replace("home")
    } else {
      setError("Incorrect Username or Password!")
    }
  }

  const clear = () => {
    setData({ username: '', password: '' });
    setError(null);
  }

  return (
    <View style={styles.container}>
      <Text>
        Login Screen
      </Text>
      <View>
        <Text>User Name:</Text>
        <TextInput
          placeholder='username'
          value={data.username}
          inputMode='text'
          onChangeText={v => setData({ ...data, username: v })}
        />
        <Text>Password:</Text>
        <TextInput
          placeholder='password'
          value={data.password}
          inputMode='text'
          secureTextEntry
          onChangeText={v => setData({ ...data, password: v })}
        />
      </View>
      <Text>{error}</Text>
      <View>
        <Button title='Login' onPress={login} />
        <Button title='Clear' onPress={clear} />
      </View>
    </View>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
