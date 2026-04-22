import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Pressable, ScrollView, Button } from 'react-native'
import AddTask from '../components/AddTask.component';

const HomeScreen = (props) => {

  return (
    <View style={styles.container}>
      <Text>
        Home Screen
      </Text>
      <AddTask onAdd={props.addTask} />
      <ScrollView>
        {
          props.taskList.map(task => (
            <View key={task.id}>
              <Text>{task.id}</Text>
              <Text>{task.title}</Text>
              <Text>{task.date.toDateString()}</Text>
              <Text>{task.completed.toString()}</Text>
              <Pressable onPress={() => { props.onToggle(task.id) }}><Text>✅</Text></Pressable>
            </View>
          ))
        }
      </ScrollView>
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
