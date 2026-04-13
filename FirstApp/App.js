import { StatusBar } from 'expo-status-bar';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/Home.Screen';
import AboutScreen from './screens/AboutApp.Screen';
import AddStudentScreen from './screens/AddStudent.Screen';
import StudentsListScreen from './screens/StudentsList.Screen';
import StudentDetails from './screens/StudentDetails.Screen';

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
    }
  ]
  );

  const deleteStudent = (studentId) => {
    const newStudentList = studentData.filter((item) => item.id !== studentId);
    setStudentData(newStudentList);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen}
          options={{
            title: "About App",
            headerStyle: {
              backgroundColor: '#aa7744'
            },
            headerLeft: null,
            headerRight: () => (<Button title='Hi' />),
            animation: 'scale_from_center'
          }} />
        <Stack.Screen
          name="AddStudent"
          children={() => (
            <AddStudentScreen
              studentData={studentData}
              setStudentData={setStudentData}
            />
          )}
        />
        <Stack.Screen
          name="StudentsList"
          children={() => {
            return <StudentsListScreen
              studentData={studentData}
              deleteStudent={deleteStudent}
            />
          }}
        />
        <Stack.Screen name="StudentDetails" component={StudentDetails} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}