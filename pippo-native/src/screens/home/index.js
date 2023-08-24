import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, FlatList, ScrollView } from "react-native";
import { Button, Text, Card, Slider, ListItem, Overlay } from "@rneui/themed";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { keyExtractor, renderItem } from "../../utils";

import moment from "moment";
import "moment/locale/es";

const Index = ({ navigation }) => {
  moment.locale("es");

  const formattedDateTime = moment().format("dddd D [de] MMMM : HH:mm");

  const list = [
    {
      name: "Finca1",
      subtitle: "Litros fecha",
    },
    {
      name: "Finca2",
      subtitle: "Litros fecha",
    },
    {
      name: "Finca3",
      subtitle: "Litros fecha",
    },
    {
      name: "Finca4",
      subtitle: "Litros fecha",
    },
    {
      name: "Finca5",
      subtitle: "Litros fecha",
    },
    {
      name: "Finca6",
      subtitle: "Litros fecha",
    },
    {
      name: "Finca6",
      subtitle: "Litros fecha",
    },
    {
      name: "Finca6",
      subtitle: "Litros fecha",
    },
    {
      name: "Finca6",
      subtitle: "Litros fecha",
    },
    {
      name: "Finca6",
      subtitle: "Litros fecha",
    },
  ];

  const listRoutes = [
    { name: "Porvenir" },
    { name: "San Carlos" },
    { name: "Rosal" },
    { name: "San Jorge" },
    { name: "San Marcos" },
    { name: "Alfarero" },
    { name: "Rafa SAS" },
    { name: "Choachi" },
    { name: "Almeciga" },
    { name: "Pinalact" },
    { name: "Aquileo" },
    { name: "Sopo" },
    { name: "Ricolacteos" },
    { name: "Fasalact" },
    { name: "Avella" },
    { name: "Choconta" },
  ];

  const [routeSelected, setRouteSelected] = useState(undefined);
  const [toggleOverlay, setToggleOverlay] = useState(
    routeSelected ? false : true
  );

  useEffect(() => {
    routeSelected && setToggleOverlay(false);
  }, [routeSelected]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.info}>
          <View>
            <Text h3>Hola,</Text>
            <Text h4>Pepito Perez</Text>
          </View>
          <View style={styles.info_icon}>
            <Icon name="account-circle" color="red" />
          </View>
        </View>
        <Text style={styles.date}>{formattedDateTime}</Text>
      </View>

      <View style={styles.buttons}>
        <Button
          title={"Ruta"}
          icon={<Icon name="local-shipping" color="white" />}
          buttonStyle={styles.button}
        />
        <Button
          title={"Registro"}
          icon={<Icon name="note-add" color="white" />}
          buttonStyle={styles.button}
          onPress={() => navigation.navigate("Create")}
        />

        <Button
          buttonStyle={styles.button}
          title={"Perfil"}
          icon={<Icon name="person" color="white" />}
        />
      </View>

      <View style={styles.content}>
        <View>
          <Card containerStyle={{ borderRadius: 10, margin: 0 }}>
            <View style={styles.card_route}>
              <Icon
                onPress={() => setToggleOverlay(true)}
                name="near-me"
                color="black"
              />
              <Text>Ruta {routeSelected}</Text>
            </View>

            <View style={styles.card_route}>
              <Slider
                disabled
                animateTransitions
                animationType="timing"
                maximumValue={100}
                minimumValue={0}
                orientation="horizontal"
                style={{ width: "90%", height: 50 }}
                thumbStyle={{ height: 20, width: 20 }}
                thumbProps={{
                  children: (
                    <Icon
                      name="local-shipping"
                      size={20}
                      containerStyle={{ bottom: 8, right: 10 }}
                      color="black"
                    />
                  ),
                }}
                thumbTintColor="transparent"
                trackStyle={{ height: 5, borderRadius: 20 }}
                value={50}
              />
              <Text>80%</Text>
            </View>
            <View style={styles.card_percent}>
              <Text>Recorrido</Text>
            </View>
          </Card>

          <View style={styles.last}>
            <Card containerStyle={{ borderRadius: 10, margin: 0 }}>
              <View>
                <Text>Ultimas recolecciones</Text>
              </View>
              <View style={styles.last_list}>
                <FlatList
                  keyExtractor={keyExtractor}
                  data={list}
                  renderItem={({ item }) => renderItem({ item })}
                />
              </View>
            </Card>
            <View />
          </View>
        </View>
        <Overlay isVisible={toggleOverlay} overlayStyle={styles.overlay}>
          <Text style={styles.overlay_text}>
            {routeSelected ? "Cambiar ruta" : "Que ruta deseas iniciar hoy?"}
          </Text>
          <View style={styles.overlay_list}>
            <FlatList
              keyExtractor={keyExtractor}
              data={listRoutes}
              renderItem={({ item }) =>
                renderItem({
                  item,

                  onPress: () => setRouteSelected(item.name),
                })
              }
            />
          </View>
        </Overlay>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card_percent: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -20,
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
    height: "100%",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    /* flex: 1 */
  },
  info_icon: { width: 30 },
  buttons: {
    /* flex: 1, */
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#c90000",
    borderRadius: 20,
    height: 81,
    width: 81,
    flexDirection: "column",
    alignItems: "center",
  },
  card_route: { flexDirection: "row", alignItems: "center", gap: 10 },
  date: { textTransform: "capitalize" },
  last: { marginTop: 20, height: 500 },
  overlay: { padding: 20, width: "90%", height: "50%", borderRadius: 20 },
  overlay_text: {
    marginBottom: 40,
    fontSize: 20,
    textAlign: "center",
    color: "#c90000",
  },
  overlay_list: {
    flex: 1,
  },
  last_list: { height: "100%", marginTop: 20 },
});

export default Index;
