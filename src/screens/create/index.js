import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, Divider, Button } from "@rneui/themed";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import { keyExtractor, renderItem } from "../../utils";
import { getData } from "../../utils";

import moment from "moment";
import "moment/locale/es";

const Index = ({ navigation, route }) => {
  const { fetchData } = route.params || {};
  const [routeSelected, setRouteSelected] = useState();
  const [ganaderosList, setGanaderosList] = useState([]);
  const [rutasList, setRutasList] = useState([]);
  const [recolecciones, setRecolecciones] = useState();
  moment.locale("es");

  const formattedDateTime = moment().format("dddd D [de] MMMM : HH:mm");

  async function fetchDataCreate() {
    const rutaData = await getData("ruta");
    const ganaderos = await getData("ganaderos");
    const rutas = await getData("rutas");
    const recolectForm = await getData("form");
    setRouteSelected(rutaData);
    setGanaderosList(ganaderos);
    setRutasList(rutas);

    /*  const recoletArray = Object.entries(recolectForm).map(([id, values]) => ({
      id,
      ...values,
    }));

    setRecolecciones(recoletArray); */
  }

  useEffect(() => {
    fetchDataCreate();
  }, []);

  const existRecolet = (item) => {
    /*  return recolecciones?.find(
      (r) => parseInt(r.ganadero) === parseInt(item.id)
    )
      ? true
      : false; */
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info_navigation}>
        <Button
          icon={<Icon name="arrow-back" />}
          type="clear"
          buttonStyle={{ margin: 0 }}
          onPress={() => navigation.navigate("Home")}
        />

        <View style={styles.info_main}>
          <View style={styles.info}>
            <Icon name="local-shipping" color="#c90000" />
            <Text h3>{`Ruta: ${
              rutasList.find((item) => item.id === routeSelected)?.name
            }`}</Text>
          </View>
          <Text h5 style={styles.date}>
            {formattedDateTime}
          </Text>
        </View>
        <Divider />
      </View>
      <Text h4>Seleccione ganadero</Text>
      <View style={styles.list}>
        <FlatList
          keyExtractor={keyExtractor}
          data={ganaderosList}
          renderItem={({ item }) =>
            renderItem({
              item,
              icon: existRecolet(item) && {
                name: "check-circle",
                color: "green",
              },
              onPress: () => {
                navigation.navigate(existRecolet(item) ? "Print" : "Form", {
                  data: item,
                  fetchData,
                });
              },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: { borderRadius: 10, padding: 10, backgroundColor: "white", flex: 1 },
  date: { textTransform: "capitalize" },
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
    height: "100%",
  },
  info_main: {
    alignItems: "center",
    marginBottom: 5,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  info_navigation: {
    flexDirection: "row",
    alignItems: "center",
    /* marginRight: 50, */
  },
  info_main: {
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
    flex: 1,
  },
});

export default Index;
