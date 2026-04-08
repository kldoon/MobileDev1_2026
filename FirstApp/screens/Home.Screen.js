import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View, Button } from "react-native";
import AddStudentForm from "../components/AddStudentForm";

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: 'https://media.istockphoto.com/id/1064172872/vector/line-circle-abstract-background-seamless-pattern-gold-luxury-color-geometric-vector.jpg?s=612x612&w=0&k=20&c=IUfmx3Q48sDHNXSUnI-syPX1w8rol2p1--wywGddUis=' }}
                resizeMode="repeat"
                style={{ justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: '100%', }}
            >
                <Image
                    source={require('../assets/std-reg.jpg')}
                    style={{ width: 90, height: 90, marginTop: 30 }}
                    borderRadius={50}
                />
                <Text style={styles.title}>Student Registration App</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Button
                        title="Add Student"
                        onPress={() => navigation.navigate("AddStudent")}
                    />
                    <Button title="Students List" onPress={() => { navigation.navigate("StudentsList") }} />
                    <Button title="About App" onPress={() => { navigation.navigate("About") }} />
                </View>

            </ImageBackground>

        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#6633cc',
        marginBottom: 20
    }
});