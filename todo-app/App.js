import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screens/home.screen';
import LoginScreen from './screens/login.screen';
import DetailScreen from './screens/details.screen';
import { useState } from 'react';

export default function App() {
  const Stack = createStackNavigator();
  const [taskList, setTaskList] = useState([]);

  const addTask = (task) => {
    setTaskList([task, ...taskList]);
  }

  const toggleTask = (id) => {
    const newList = [...taskList];
    const ind = newList.findIndex((task) => task.id === id); // find the index of the element
    newList[ind].completed = !newList[ind].completed;   // toggle the element complete
    setTaskList(newList);   // set new state
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen
          name="home"
          // component={HomeScreen}
          children={() => (
            <HomeScreen
              addTask={addTask}
              taskList={taskList}
              onToggle={toggleTask}
            />
          )}
        />
        <Stack.Screen name="details" component={DetailScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}