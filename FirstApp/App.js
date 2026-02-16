import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// const App=()=>
const Welcome = () =>{
  return(
    <View>
      <Text>==================</Text>
      <Text>Welcome to the APP</Text>
      <Text>==================</Text>
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Welcome />
      <Text>Welcome to my First App! Hello</Text>
      <Welcome />
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
