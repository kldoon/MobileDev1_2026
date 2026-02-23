import { View, Text, StyleSheet } from 'react-native';
import Divider from './Divider';

const StudentCard = (props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.info}>{props.studentId}  {props.studentName}            {props.mark + 2}</Text>
      <Text style={styles.info}>University: Hebron</Text>
      <Divider />
    </View>
  )
}

export default StudentCard;

const styles = StyleSheet.create({
  card: {
    borderColor: "#28bd87",
    borderWidth: 2,
    backgroundColor: "#88edc8",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10
  },
  info: {
    color: "#3224f0",
    fontSize: 16,
    fontWeight: "bold"
  },

});