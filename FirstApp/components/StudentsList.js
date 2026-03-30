import { ScrollView, StyleSheet, Text } from "react-native";
import StudentCard from "./StudentCard";

const StudentsList = (props) => {

  return (
    <ScrollView style={styles.stdList}>
      {
        props.studentsList.length > 0 
        ? props.studentsList.map((student) => (
          <StudentCard
            key={student.id}
            studentId={student.id}
            studentName={student.name}
            mark={student.mark}
            image={student.image}
            onDelete={props.onDelete}
          />)
        )
        :<Text>No Students Added! You can add students using the form above</Text>
      }
    </ScrollView>
  )
}

export default StudentsList;

const styles = StyleSheet.create({
  stdList: {
    width: '100%',
    paddingTop: 5,
    paddingHorizontal: 30,
    backgroundColor: '#fff4e7'
  }
});