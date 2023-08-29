import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Text, Input, LinearProgress } from "@rneui/themed";
import { Icon } from "react-native-elements";
import { saveData } from "../../utils";

const Index = ({ navigation }) => {
  const [user, setuser] = useState(null);
  const [password, setpassword] = useState(null);

  const login = () => {
    saveData("user", "1");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <View>
          <Image source={require("../../assets/logo_pipo.png")} />
          <Text h1>Bienvenido</Text>
        </View>

        <View style={styles.inputs}>
          <View style={styles.inputs_content}>
            <Input
              style={styles.input}
              onChangeText={(e) => setuser(e)}
              placeholder="Usuario"
              leftIcon={<Icon name="person" size={24} color="black" />}
              inputContainerStyle={
                Platform.OS === "android" && { borderBottomWidth: 0 }
              }
            />
          </View>
          <View style={styles.inputs_content}>
            <Input
              style={styles.input}
              onChangeText={(e) => setpassword(e)}
              placeholder="Contraseña"
              leftIcon={<Icon name="vpn-key" size={24} color="black" />}
              secureTextEntry={true}
              inputContainerStyle={
                Platform.OS === "android" && { borderBottomWidth: 0 }
              }
            />
          </View>
        </View>
        <View>
          <Button
            color={"red"}
            title="Iniciar sesion"
            icon={<Icon name="east" color="white" />}
            size="lg"
            titleStyle={{ marginHorizontal: 7 }}
            buttonStyle={{
              backgroundColor: "#c90000",
              borderRadius: 100,
            }}
            /*   disabled={password && user ? false : true} */
            onPress={() => login()}
          />
        </View>
      </View>
      <LinearProgress style={styles.bottomView} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputs: {
    marginVertical: 50,
    width: "80%",
  },
  inputs_content: {
    borderWidth: 1,
    borderRadius: 100,
    height: 50,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  bottomView: {
    alignSelf: "flex-end",
    height: 5,
  },
});

export default Index;
