import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import StudentCard from './components/StudentCard';
import Divider from './components/Divider';
import { useState } from 'react';

export default function App() {
  //New student Info
  const [stdName, setStdName] = useState();
  const [stdId, setStdId] = useState();
  const STUDENT_DATA = [
    {
      id: 1233,
      name: "Ahmad Saeed",
      mark: 90
    },
    {
      id: 1324,
      name: "Sarah Jameel",
      mark: 87
    },
    {
      id: 1342,
      name: "Waleed Nabil",
      mark: 78
    },
    // {
    //   id: 1343,
    //   name: "Hiba Nabil",
    //   mark: 90
    // },
  ]

  // const handleChangeName = (value) => {
  //   //console.log(value);
  //   setStdName(value);
  // }

  const handleIdChange = (value) => {
    // console.log(typeof(parseInt(value)));
    setStdId(parseInt(value));
  }

  const clear = () => {
    setStdName("");
    setStdId("");
  }

  return (
    <View style={styles.container}>
      {/* Controlled components, when you send the value to the inputs */}
      <TextInput style={styles.input} inputMode="numeric" onChangeText={handleIdChange} placeholder="Student Id" value={stdId} />
      <TextInput style={styles.input} onChangeText={(value) => setStdName(value)} placeholder="Student Name" value={stdName} />
      <Button title="Clear" onPress={clear} />
      <Button title="Submit" onPress={() => { }} />
      <Divider />
      <Text>New Student ID: {stdId}</Text>
      <Text>New Student Name: {stdName}</Text>
      <Divider />
      {
        // List rendering in react
        STUDENT_DATA.map((student) => {
          return <StudentCard key={student.id} studentId={student.id} studentName={student.name} mark={student.mark} />
        })
      }
      <Divider />
      <Text>Welcome to my First App! Hello</Text>
      <Divider />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: "#4455f2",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 2,
    width: "50%",
    marginBottom: 10
  }
});
