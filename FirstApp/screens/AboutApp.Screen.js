import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

const AboutScreen = () => {
    const nav = useNavigation();

    return (
        <View>
            <Text>
                About The App
            </Text>
            <Text>
                This app was build in Hebron University by Mobile App Development course students
            </Text>
            {
                nav.canGoBack() && <Button title="Back" onPress={() => { nav.goBack() }} />
            }
        </View>
    )
}

export default AboutScreen;