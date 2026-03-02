import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import StudentCard from './components/StudentCard';
import Divider from './components/Divider';
import { useState } from 'react';

export default function App() {
  //New student Info
  const [stdName, setStdName] = useState("");
  const [stdId, setStdId] = useState();

  // const handleChangeName = (value) => {
  //   //console.log(value);
  //   setStdName(value);
  // }

  const handleIdChange = (value) => {
    // console.log(typeof(parseInt(value)));
    setStdId(parseInt(value));
  }

  const clear = () => {

  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={handleIdChange} placeholder="Student Id" />
      <TextInput style={styles.input} onChangeText={(value) => setStdName(value)} placeholder="Student Name" />
      <Divider />
      <Text>New Student ID: {stdId}</Text>
      <Text>New Student Name: {stdName}</Text>
      <Divider />
      <StudentCard studentId={1233} studentName="Ahmad Saeed" mark={90} />
      <StudentCard studentId={1324} studentName="Sarah Jameel" mark="87" />
      <StudentCard studentId={1342} studentName="Waleed Nabil" mark={78} />
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
    paddingHorizontal: 10,
    width: "50%",
    marginBottom: 10
  }
});
