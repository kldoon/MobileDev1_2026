// import { CheckBox } from '@rneui/themed';
import React from 'react'
import { View, Text, Pressable } from 'react-native'

const TaskItem = (props) => {
    const { task } = props; // Object destruction

    return (
        <View>
            <Text>{task.id}</Text>
            <Text>{task.title}</Text>
            <Text>{task.date.toDateString()}</Text>
            <Text>{task.completed.toString()}</Text>
            <Pressable onPress={() => { props.onToggle(task.id) }}><Text>✅</Text></Pressable>
            {/* <CheckBox
                checked={props.task.completed}
                onPress={() => { props.onToggle(task.id) }}
            /> */}
        </View>
    )
}

export default TaskItem;