import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View, Button, ScrollView } from "react-native";
import Divider from "../components/Divider";
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import { HourglassMediumIcon, UserGearIcon } from "phosphor-react-native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState();

  useEffect(() => {
    // fetch({ method: 'GET', url: 'https://fakestoreapi.com/products'})
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        // console.log(JSON.stringify(data,null,2));
        setProducts(data);
      });
  }, []);

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
        <UserGearIcon size={60} color="#d12e2e" weight="bold" />
        <HourglassMediumIcon size={60} color="green" />
        <Text style={styles.title}>Student Registration App</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button
            title="Add Student"
            onPress={() => navigation.navigate("AddStudent")}
          />
          <Button title="Students List" onPress={() => { navigation.navigate("StudentsList") }} />
          <Button title="About App" onPress={() => { navigation.navigate("About") }} />
        </View>
        <DateTimePicker
          mode="single"
          date={selected}
          onChange={({ date }) => setSelected(date)}
          styles={defaultStyles}
        />
        <ScrollView>
          {
            products.map(prod => <View>
              <Text style={{ backgroundColor: "#fcfccc", fontSize: 14, padding: 5 }}>
                {prod.id} |
                {prod.title} |
                {prod.description} |
                {prod.price}
              </Text>
              <Divider />
            </View>)
          }
        </ScrollView>
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