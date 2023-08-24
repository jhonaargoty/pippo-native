import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { Text, Divider, Input, Card, Button } from "@rneui/themed";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import moment from "moment";
import "moment/locale/es";

const Index = ({ navigation, route }) => {
  moment.locale("es");

  const { data } = route.params;

  const formattedDateTime = moment().format("dddd D [de] MMMM : HH:mm");

  const [litros, setLitros] = useState(null);
  const [cantinas, setCantinas] = useState(null);
  const [temperatura, setTemperatura] = useState(null);
  const [observaciones, setObservaciones] = useState(null);
  const [compartimento, setCompartimento] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={10}>
        <View style={styles.content}>
          <View style={styles.info_navigation}>
            <Button
              icon={<Icon name="arrow-back" />}
              type="clear"
              buttonStyle={{ margin: 0 }}
              onPress={() => navigation.navigate("Create")}
            />

            <View style={styles.info_main}>
              <View style={styles.info}>
                <Icon name="local-shipping" color="#c90000" />
                <Text h3>Ruta Porvenir</Text>
              </View>
              <Text h5 style={styles.date}>
                {formattedDateTime}
              </Text>
            </View>
            <Divider />
          </View>
          <View style={styles.info_ganadero}>
            <Text h4>{data.name}</Text>
            <Text h5>Nit: {data.id}</Text>
            <Text h5>Promedio: {data.promedio} lts</Text>
          </View>
          <Card
            containerStyle={{
              borderRadius: 10,
              margin: 0,
              paddingHorizontal: 30,
              paddingVertical: 20,
            }}
          >
            <View style={styles.labels}>
              <Icon name="local-drink" size={20} />
              <Text h5>Litros</Text>
            </View>
            <View style={styles.inputs_content}>
              <Input
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(e) => setLitros(e)}
                inputContainerStyle={
                  Platform.OS === "android" && { borderBottomWidth: 0 }
                }
              />
            </View>
            <View style={styles.labels}>
              <Icon name="delete" size={20} />
              <Text h5>Cantinas</Text>
            </View>
            <View style={styles.inputs_content}>
              <Input
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(e) => setCantinas(e)}
                inputContainerStyle={
                  Platform.OS === "android" && { borderBottomWidth: 0 }
                }
              />
            </View>
            <View style={styles.labels}>
              <Icon name="device-thermostat" size={20} />
              <Text h5>Temperatura (°c)</Text>
            </View>

            <View style={styles.inputs_content}>
              <Input
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(e) => setTemperatura(e)}
                inputContainerStyle={
                  Platform.OS === "android" && { borderBottomWidth: 0 }
                }
              />
            </View>
            <View style={styles.labels}>
              <Icon name="description" size={20} />
              <Text h5>Observaciones</Text>
            </View>
            <View style={styles.inputs_content}>
              <Input
                onChangeText={(e) => setObservaciones(e)}
                inputContainerStyle={
                  Platform.OS === "android" && { borderBottomWidth: 0 }
                }
              />
            </View>
            <View style={styles.labels}>
              <Icon name="home-repair-service" size={20} />
              <Text h5>Compartimento</Text>
            </View>
            <View style={styles.inputs_content}>
              <Input
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(e) => setCompartimento(e)}
                inputContainerStyle={
                  Platform.OS === "android" && { borderBottomWidth: 0 }
                }
              />
            </View>
          </Card>
        </View>
        <Button
          title={"Guardar"}
          containerStyle={{
            width: "100%",
            marginTop: 20,
          }}
          buttonStyle={{ height: 50, borderRadius: 10 }}
          titleStyle={{ marginHorizontal: 5, fontSize: 20 }}
          color={"green"}
          disabled={!litros || !cantinas || !temperatura || !compartimento}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  info_navigation: {
    flexDirection: "row",
    alignItems: "center",
    /* marginRight: 50, */
  },
  labels: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  content: {
    gap: 20,
  },
  input: {
    fontSize: 25,
    textAlign: "center",
  },
  inputs_content: {
    borderWidth: 0.4,
    borderRadius: 15,
    height: 40,
    marginBottom: 20,
  },
  info_ganadero: {
    flexDirection: "column",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  info_main: {
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
    height: "100%",
  },
});

export default Index;
