import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StudentCard from './components/StudentCard';
import Divider from './components/Divider';

export default function App() {
  return (
    <View style={styles.container}>
      <Divider />
      <Divider />
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
});
