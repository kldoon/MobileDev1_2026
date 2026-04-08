import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import AddStudentForm from "../components/AddStudentForm";

const AddStudentScreen = (props) => {
    const nav = useNavigation();
    return (
        <View>
            <AddStudentForm
                studentData={props.studentData}
                setStudentData={props.setStudentData}
            />
        </View>
    )
}

export default AddStudentScreen;