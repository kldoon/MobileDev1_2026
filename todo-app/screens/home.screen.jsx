import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native'

const HomeScreen = () => {
  const [task, setTask] = useState('');
  
  const addTask = () => {

  }

  return (
    <View style={styles.container}>
      <Text>
        Home Screen
      </Text>
      <View>
        <TextInput
          placeholder='Add Your Task'
          onChangeText={v => setTask(v)}
          value={task}
        />
        <Pressable style={{ backgroundColor: 'green', borderRadius: 20, padding: 8, alignItems: 'center' }} onPress={addTask}>
          <Text>ADD</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
