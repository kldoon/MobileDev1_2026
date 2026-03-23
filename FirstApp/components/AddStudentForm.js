import { useState } from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";

const AddStudentForm = (props) => {
  const [stdName, setStdName] = useState();
  const [stdId, setStdId] = useState();
  const [stdImage, setStdImage] = useState('');

  const handleIdChange = (value) => {
    setStdId(parseInt(value));
  }

  const clear = () => {
    setStdName("");
    setStdId("");
    setStdImage("");
  }

  const handleSubmit = () => {
    props.setStudentData([...props.studentData, { id: stdId, name: stdName, image: stdImage, mark: 0 }]);
    clear();
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} inputMode="numeric" onChangeText={handleIdChange} placeholder="Student Id" value={stdId} />
      <TextInput style={styles.input} onChangeText={(value) => setStdName(value)} placeholder="Student Name" value={stdName} />
      <TextInput style={styles.input} onChangeText={(value) => setStdImage(value)} placeholder="Student Image" value={stdImage} />
      <View style={{ flexDirection: 'row', columnGap: 15 }}>
        <Button title="Clear" onPress={clear} color="#7d7d7d" />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  )
}

export default AddStudentForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingTop: 10
  },
  input: {
    borderColor: "#4455f2",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "70%",
    marginBottom: 10,
    backgroundColor: '#fff'
  }
})