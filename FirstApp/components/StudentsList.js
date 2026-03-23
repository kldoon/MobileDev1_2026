import { ScrollView, StyleSheet } from "react-native";
import StudentCard from "./StudentCard";

const StudentsList = (props) => {

  return (
    <ScrollView style={styles.stdList}>
      {
        props.studentsList.map((student) => <StudentCard
          key={student.id}
          studentId={student.id}
          studentName={student.name}
          mark={student.mark}
          image={student.image}
        />
        )
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