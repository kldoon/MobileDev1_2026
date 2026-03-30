import { StatusBar } from 'expo-status-bar';
import { Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Divider from './components/Divider';
import AddStudentForm from './components/AddStudentForm';
import StudentsList from './components/StudentsList';

import { useState } from 'react';

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
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://media.istockphoto.com/id/1064172872/vector/line-circle-abstract-background-seamless-pattern-gold-luxury-color-geometric-vector.jpg?s=612x612&w=0&k=20&c=IUfmx3Q48sDHNXSUnI-syPX1w8rol2p1--wywGddUis=' }}
        resizeMode="repeat"
        style={{ justifyContent: 'space-evenly', alignItems: 'center', width: '100%', paddingVertical: 20 }}
      >
        <Image
          source={require('./assets/std-reg.jpg')}
          style={{ width: 90, height: 90 }}
          borderRadius={50}
        />
        <Text style={styles.title}>Student Registration App</Text>
        <Button
          title={`${showForm ? 'Close ' : ''}Add Student ${showForm ? '❌' : '➕'}`}
          onPress={() => setShowForm(!showForm)}
        />
        {
          showForm
            ? <AddStudentForm
              studentData={studentData}
              setStudentData={setStudentData}
            />
            : null
        }
      </ImageBackground>
      {
        showForm && <Divider />
      }
      <StudentsList
        studentsList={studentData}
        onDelete={deleteStudent}
      />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6633cc',
    marginBottom: 20
  }
});
