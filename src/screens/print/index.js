import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, Divider, Button } from "@rneui/themed";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import { keyExtractor, renderItem } from "../../utils";
import { conductores, ganaderos, listRoutes } from "../../utils/data";
import { getData } from "../../utils";

import moment from "moment";
import "moment/locale/es";

const Index = ({ navigation, route }) => {
  const { item } = route.params;

  const [routeSelected, setRouteSelected] = useState();
  moment.locale("es");

  const formattedDateTime = moment().format("dddd D [de] MMMM : HH:mm");

  async function fetchData() {
    const rutaData = await getData("ruta");
    setRouteSelected(rutaData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const press = () => {};

  console.log("ITEM---", item);

  /* ITEM-- -
    {
      cantinas: null,
      compartimento: null,
      conductor: 1,
      fecha: "2023-08-29 11:14:44",
      ganadero: 10693024272,
      id: "item-7",
      litros: null,
      observaciones: null,
      ruta: "1",
      temperatura: null,
    }; */

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
            <Icon name="assignment" color="#c90000" />
            <Text h3>{`Recibo`}</Text>
          </View>
        </View>
        <Divider />
      </View>
      <View style={styles.main}>
        <View style={styles.info_pippo}>
          <Text style={styles.name}>Alimentos Pippo SAS</Text>
          <Text>Parque Agroindustrial Buenos Aires</Text>
          <Text>Guasca - Cundinamarca</Text>
          <Text>gerencia@alimentospippo.com</Text>
        </View>
        <View style={styles.info_pippo}>
          <Text style={styles.recibo}>Recibo de recolección</Text>
          <Text>{`Fecha: ${item?.fecha}`}</Text>
        </View>
        <Divider style={styles.dividier} />

        <View style={styles.info_lts}>
          <View>
            <View style={styles.item}>
              <Text style={styles.item_desc}>Ruta:</Text>
              <Text>{listRoutes?.find((l) => l.id === item?.ruta)?.name}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.item_desc}>Ganadero: </Text>
              <Text>
                {ganaderos?.find((g) => g.id === item?.ganadero)?.name}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.item_desc}>Documento: </Text>
              <Text>{item?.ganadero}</Text>
            </View>
          </View>
          <View>
            <View style={styles.item}>
              <Text style={styles.item_imp}>Litros</Text>
              <Text style={styles.item_imp_desc}>{item?.litros || "10"}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.item_imp}>Observaciones</Text>
              <Text style={styles.item_imp_desc}>
                {item?.observaciones || "Ninguna"}
              </Text>
            </View>
          </View>
        </View>

        <Divider style={styles.last_d} />
        <View style={styles.condc}>
          <View style={styles.item}>
            <Text style={styles.item_desc}>Recolectado por:</Text>
            <Text>
              {
                conductores?.find(
                  (c) => parseInt(c.id) === parseInt(item?.conductor)
                )?.name
              }
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.item_desc}>Placas:</Text>
            <Text>
              {
                conductores?.find(
                  (c) => parseInt(c.id) === parseInt(item?.conductor)
                )?.placas
              }
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Button
          onPress={() => print()}
          buttonStyle={styles.button}
          title={"Imprimir"}
          icon={<Icon name="print" color="white" />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: { backgroundColor: "#11B600", width: "100%", borderRadius: 20 },
  last_d: { marginBottom: -15 },
  condc: { flexDirection: "row", justifyContent: "space-between" },
  info_lts: { paddingVertical: 20, gap: 30 },
  item_imp_desc: {
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  item_imp: { fontSize: 16, fontWeight: "bold" },
  item_desc: { fontWeight: "bold" },
  item: { flexDirection: "row", gap: 5, alignItems: "center" },
  dividier: { marginTop: -15 },
  main: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: "10%",
    gap: 20,
    flexDirection: "column",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#aeb6bf",
  },
  recibo: {
    fontSize: 15,
    fontWeight: "bold",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  info_pippo: { alignItems: "center" },
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
  },
});

export default Index;
