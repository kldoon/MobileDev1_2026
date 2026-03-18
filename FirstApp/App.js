import { StatusBar } from 'expo-status-bar';
import { Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import StudentCard from './components/StudentCard';
import Divider from './components/Divider';
import { useState } from 'react';

export default function App() {
  //New student Info
  const [stdName, setStdName] = useState();
  const [stdId, setStdId] = useState();
  const [stdImage, setStdImage] = useState('');
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

  const handleIdChange = (value) => {
    setStdId(parseInt(value));
  }

  const clear = () => {
    setStdName("");
    setStdId("");
    setStdImage("");
  }

  const handleSubmit = () => {
    // We are create a NEW array, then copying all items from the old array into the new array
    // const newStudentData = [...studentData, {
    //   id: stdId,
    //   name: stdName,
    //   mark: 0
    // }];

    // setStudentData(newStudentData);

    // Shorter version
    setStudentData([...studentData, { id: stdId, name: stdName, image: stdImage, mark: 0 }]);

    /// This is wrong because we are creating a new pointer to the old array, and changing the old array
    // newStudentData = studentData;
    // newStudentData.push();

    clear();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://media.istockphoto.com/id/1064172872/vector/line-circle-abstract-background-seamless-pattern-gold-luxury-color-geometric-vector.jpg?s=612x612&w=0&k=20&c=IUfmx3Q48sDHNXSUnI-syPX1w8rol2p1--wywGddUis=' }}
        resizeMode="repeat"
        style={{ flex: 1, justifyContent: 'center', alignItems:'stretch' }}
      >
        <Image
          source={require('./assets/std-reg.jpg')}
          style={{ width: 80, height: 80 }}
        />
        <Text style={styles.title}>Student Registration App</Text>
        {/* Controlled components, when you send the value to the inputs */}
        <TextInput style={styles.input} inputMode="numeric" onChangeText={handleIdChange} placeholder="Student Id" value={stdId} />
        <TextInput style={styles.input} onChangeText={(value) => setStdName(value)} placeholder="Student Name" value={stdName} />
        <TextInput style={styles.input} onChangeText={(value) => setStdImage(value)} placeholder="Student Image" value={stdImage} />
        <View style={{ flexDirection: 'row', columnGap: 15 }}>
          <Button title="Clear" onPress={clear} color="#7d7d7d" />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ImageBackground>
      <Divider />
      {/* To make the scrolling horizontal use the following */}
      {/* <ScrollView style={styles.stdList} horizontal={true}> */}
      <ScrollView style={styles.stdList}>
        {
          // List rendering in react
          studentData.map((student) => {
            return <StudentCard key={student.id} studentId={student.id} studentName={student.name} mark={student.mark} image={student.image} />
          })
        }
      </ScrollView>
      <Divider />
      <Text>Full List of students</Text>
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
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6633cc',
    marginBottom: 20
  },
  stdList: {
    width: '100%',
    paddingHorizontal: 30,
    marginVertical: 20,
    backgroundColor: '#fff4e7'
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
