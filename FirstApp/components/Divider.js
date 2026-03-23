import { StyleSheet, View } from "react-native"

const Divider = () => {
  return (
    <View style={styles.border} />
  )
}

export default Divider;

const styles = StyleSheet.create({
  border: {
    borderBottomColor: '#b2b2b2',
    borderBottomWidth: 3,
    width: "100%"
  }
});