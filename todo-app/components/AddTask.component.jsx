import React, { useState } from 'react'
import { View, TextInput, Pressable, Text } from 'react-native'
// import { v4 } from 'uuid';

const AddTask = (props) => {
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task.length <= 2) {
      return;
    }
    
    const newTask = {
      id: Date.now(),
      title: task,
      date: new Date(),
      completed: false
    }
    props.onAdd(newTask);
    setTask('');
  }

  return (
    <View>
      <TextInput
        placeholder='Add Your Task'
        onChangeText={v => setTask(v)}
        value={task}
      />
      <Pressable
        style={{ width: 90, backgroundColor: 'green', borderRadius: 20, padding: 8, alignItems: 'center' }}
        onPress={addTask}
      >
        <Text>ADD</Text>
      </Pressable>
    </View>
  )
}

export default AddTask