import { View } from "react-native";
import StudentsList from "../components/StudentsList";

const StudentsListScreen = (props) => {
  return (
    <View style={{ height: "100%", paddingVertical: 5 }}>
      <StudentsList
        studentsList={props.studentData}
        onDelete={props.deleteStudent}
      />
    </View>
  )
}

export default StudentsListScreen;