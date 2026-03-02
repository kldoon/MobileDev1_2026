import { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const StudentCard = (props) => {
  // let att = 0;
  const [att, setAtt] = useState(0);   // useState hook

  const addAtt = () => {
    console.log("Add Attendnace:");
    //att=att+1;
    setAtt(att + 1);
  }
  
  function removeAtt() {
    if (att - 1 >= 0) {
      //att-=1;
      setAtt(att - 1);
    }
  }

  const zeroAtt = () => {
    //att=0;
    setAtt(0);
  }

  return (
    <View style={styles.card}>
      <Text style={styles.info}>{props.studentId}  {props.studentName}            {props.mark}</Text>
      <Text style={styles.info}>University: Hebron</Text>
      <Text>Attendance Days: {att}</Text>
      <View style={styles.attActions}>
        <Button title=" + " onPress={addAtt} />
        <Button title="  -  " onPress={removeAtt} />
        <Button title="  0  " onPress={zeroAtt} />
      </View>
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
  attActions: {
    flexDirection: "row",
    columnGap: 5
  },
  attBtn: {
    paddingHorizontal: 10,
  }
});