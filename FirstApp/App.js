import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const StudentCard = (props) => {
  return (
    <View>
      <Text>---------------------------------------------------------------</Text>
      <Text>{props.studentId}  {props.studentName}            {props.mark+2}</Text>
      <Text>---------------------------------------------------------------</Text>
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <StudentCard studentId={1233} studentName="Ahmad Saeed" mark={90} />
      <StudentCard studentId={1324} studentName="Sarah Jameel" mark="87" />
      <StudentCard studentId={1342} studentName="Waleed Nabil" mark={78} />
      <Text>Welcome to my First App! Hello</Text>
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
});
