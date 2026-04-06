import { StatusBar } from 'expo-status-bar';
import { Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Divider from './components/Divider';
import AddStudentForm from './components/AddStudentForm';
import StudentsList from './components/StudentsList';
import { createStackNavigator } from '@react-navigation/stack';

import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/Home.Screen';
import AboutScreen from './screens/AboutApp.Screen';
import AddStudentScreen from './screens/AddStudent.Screen';
import StudentsListScreen from './screens/StudentsList.Screen';

const Stack = createStackNavigator();

export default function App() {
  const [studentData, setStudentData] = useState([
    {
      id: 1233,
      name: "Ahmad Saeed",
      mark: 90,
      image: 'https://img.freepik.com/premium-psd/avatar-wearing-t-shirt-mockup_23-2151560907.jpg'
    },
    {
      id: 1324,
      name: "Sarah Jameel",
      mark: 87,
      image: 'https://static.vecteezy.com/system/resources/previews/055/056/329/non_2x/3d-icon-avatar-cartoon-woman-holding-a-mockup-phone-with-blank-white-screen-png.png'
    }]
  );

  const [showForm, setShowForm] = useState(false);

  const deleteStudent = (studentId) => {
    console.log("Delete student called!!", studentId);
    const newStudentList = studentData.filter((item) => item.id !== studentId);
    setStudentData(newStudentList);

    // const newStudentList = [];
    // for (let i = 0; i < studentData.length; i++) {
    //   if (studentData.id === studentId) {
    //     //delete this\
    //     continue;
    //   } else {
    //     newStudentList.push(studentData[i]);
    //   }
    // }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="AddStudent" component={AddStudentScreen} />
        <Stack.Screen name="StudentsList" component={StudentsListScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6633cc',
    marginBottom: 20
  }
});