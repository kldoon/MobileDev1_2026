import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

const AddStudentScreen = () => {
    const nav = useNavigation();
    return (
        <View>
            <Text>
                Add Student
            </Text>
            <Text>
                Add new student
            </Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Button title="About App" onPress={() => { nav.navigate("About") }} />
                <Button title="Students List" onPress={() => { nav.navigate("StudentsList") }} />
            </View>
        </View>
    )
}

export default AddStudentScreen;