import {View, Text} from 'react-native';
 
const StudentCard = (props) => {
  return (
    <View>
      <Text>---------------------------------------------------------------</Text>
      <Text>{props.studentId}  {props.studentName}            {props.mark+2}</Text>
      <Text>---------------------------------------------------------------</Text>
    </View>
  )
}

export default StudentCard;