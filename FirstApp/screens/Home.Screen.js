import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>
                Home Screen
            </Text>
            <Text>
                Welcome to student registration App
            </Text>
            <Text>
                Welcome to student registration App
            </Text><Text>
                Welcome to student registration App
            </Text><Text>
                Welcome to student registration App
            </Text><Text>
                Welcome to student registration App
            </Text><Text>
                Welcome to student registration App
            </Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Button title="About App" onPress={() => { navigation.navigate("About") }} />
                <Button title="Add Student" onPress={() => { navigation.navigate("AddStudent") }} />
            </View>
        </View>
    )
}

export default HomeScreen;