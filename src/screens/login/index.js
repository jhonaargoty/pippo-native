import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Text, Input, LinearProgress } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome5";
import { saveData } from "../../utils";
import axios from "axios";

const Index = ({ navigation }) => {
  const [user, setuser] = useState(null);
  const [password, setpassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorlogin] = useState(null);

  const baseUrl = "https://pippo-test.000webhostapp.com/api/";

  const login = async () => {
    const url = `${baseUrl}/login/login.php`;
    setLoading(true);

    await axios
      .post(url, {
        user,
        password,
      })
      .then((response) => {
        if (response?.status === 200) {
          saveData("user", JSON.stringify(response?.data));
          navigation.navigate("Home");
        }
      })
      .catch((error) => {
        setErrorlogin(true);
      });

    setLoading(false);
  };

  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <View>
          <View style={styles.logo_main}>
            <Image
              style={styles.logo}
              source={require("../../assets/logo_pipo.png")}
            />
          </View>
          <Text h1>Bienvenido</Text>
        </View>

        <View style={styles.inputs}>
          <View style={styles.inputs_content}>
            <Input
              style={styles.input}
              onChangeText={(e) => setuser(e)}
              placeholder="Usuario"
              leftIcon={<Icon name="user-alt" size={20} />}
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
              leftIcon={<Icon name="key" size={20} />}
              secureTextEntry={true}
              inputContainerStyle={
                Platform.OS === "android" && { borderBottomWidth: 0 }
              }
            />
          </View>
          <View>
            {errorLogin && (
              <Text style={styles.error_login}>Datos incorrectos</Text>
            )}
          </View>
        </View>
        <View>
          <Button
            color={"red"}
            title="Iniciar sesion"
            icon={<Icon name="long-arrow-alt-right" color="white" size={20} />}
            size="lg"
            titleStyle={{ marginHorizontal: 7 }}
            buttonStyle={{
              backgroundColor: "#c90000",
              borderRadius: 100,
            }}
            disabled={password && user ? false : true}
            onPress={() => login()}
          />
        </View>
      </View>
      {loading && <LinearProgress style={styles.bottomView} color="red" />}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: { backgroundColor: "red" },
  error_login: {
    color: "red",
    marginHorizontal: "30%",
  },
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
    paddingHorizontal: 10,
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
