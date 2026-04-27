import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Pressable, ScrollView, Button } from 'react-native'
import AddTask from '../components/AddTask.component';
import TaskItem from '../components/TaskItem.component';

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
            <TaskItem 
            key={task.id}
             task={task} 
             onToggle={props.onToggle}
             />
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
