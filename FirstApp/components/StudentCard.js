import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Pressable } from 'react-native';

const StudentCard = (props) => {
  const [abs, setAbs] = useState(0);
  const nav = useNavigation();
  console.log("Hi, without useEffect");

  useEffect(() => {
    console.log("Hi, with useEffect");
  }, []);

  const addAtt = () => {
    setAbs(abs + 1);
  }

  function removeAtt() {
    if (abs - 1 >= 0) {
      setAbs(abs - 1);
    }
  }

  const zeroAtt = () => {
    setAbs(0);
  }

  const is26 = props.studentId.toString().startsWith('26');
  const stdIdStyle = {
    fontStyle: is26 ? 'italic' : 'normal',
    color: is26 ? '#ed7868' : '#3224f0'
  };

  return (
    <View style={{ ...styles.card, borderColor: (is26 ? '#ed7868' : styles.card.borderColor) }}>
      <Pressable style={styles.deleteBtn} onPress={() => { props.onDelete(props.studentId) }}>
        <Text style={{ fontSize: 12 }}>❌</Text>
      </Pressable>
      <View style={styles.left}>
        <Text style={styles.info}><Text style={stdIdStyle}>{props.studentId}</Text>  {props.studentName}            {props.mark}</Text>
        <Text style={styles.info}>University: Hebron</Text>
        <Text style={{ color: abs < 5 ? '#073507' : (abs < 9 ? '#ffa341' : '#ff0000') }}>Absents Days: {abs}</Text>
        <View style={styles.attActions}>
          <Button title=" + " onPress={addAtt} />
          <Button title="  -  " onPress={removeAtt} />
          <Button title="  0  " onPress={zeroAtt} />
        </View>
        <Pressable
          onPress={() => nav.navigate("StudentDetails", {
            studentId: props.studentId,
            studentName: props.studentName,
            mark: props.mark,
            image: props.image
          })}>
          <Text>➡️</Text>
        </Pressable>
      </View>
      <View style={styles.right}>
        <Image
          source={{ uri: props.image || 'https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png' }}
          style={{ width: '100%', minWidth: 110, height: 110 }}
          resizeMode="cover"
          blurRadius={0}
        />
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
    marginBottom: 10,
    flexDirection: 'row'
  },
  info: {
    color: "#3224f0",
    fontSize: 16,
    fontWeight: "bold",
    maxWidth: 170
  },
  attActions: {
    flexDirection: "row",
    columnGap: 5
  },
  attBtn: {
    paddingHorizontal: 10,
  },
  left: {
    rowGap: 3,
    flexGrow: 1
  },
  right: {
    borderColor: '#cbcbcb',
    borderWidth: 1,
    flexGrow: 1,
    marginLeft: 10
  },
  deleteBtn: {
    position: 'absolute',
    left: -10,
    top: -10,
    backgroundColor: '#fee795',
    padding: 5,
    borderRadius: '50%'
  }
});