import { StyleSheet, Text, View } from "react-native"

const Divider = () => {
    return (
        <View style={styles.border} />
    )
}

export default Divider;

const styles = StyleSheet.create({
    border: {
        borderBottomColor: '#f3f3f3',
        borderWidth: 1,
        width: "100%",
        marginVertical: 5
    }
});