import { View, Text } from "react-native";

const StudentDetails = ({ route }) => {
  const data = route.params;
  return (
    <View style={{ height: "100%", paddingVertical: 5 }}>
      <Text>Student Id: {data.studentId}</Text>
      <Text>Student Name: {data.studentName}</Text>
      <Text>Student Mark: {data.mark}</Text>
    </View>
  )
}

export default StudentDetails;