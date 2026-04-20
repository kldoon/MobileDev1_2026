import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screens/home.screen';
import LoginScreen from './screens/login.screen';
import DetailScreen from './screens/details.screen';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="details" component={DetailScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
    </NavigationContainer>
  );
}