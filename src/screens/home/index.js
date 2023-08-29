import React, { useEffect, useState } from "react";

import { StyleSheet, View, Image, FlatList } from "react-native";
import { Button, Text, Card, Slider, Overlay, Divider } from "@rneui/themed";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  keyExtractor,
  renderItem,
  saveData,
  getData,
  removeData,
} from "../../utils";

import { listRoutes, conductores, ganaderos } from "../../utils/data";

import moment from "moment";
import "moment/locale/es";

const Index = ({ navigation }) => {
  moment.locale("es");

  const formattedDateTime = moment().format("dddd D [de] MMMM : HH:mm");

  const [routeSelected, setRouteSelected] = useState();
  const [userData, setUserData] = useState();
  const [toggleOverlay, setToggleOverlay] = useState(false);
  const [recolecciones, setRecolecciones] = useState();
  const [percentage, setPercentage] = useState(0);

  async function fetchData() {
    const user = await getData("user");
    const recolect = await getData("form");

    setRecolecciones(
      Object.entries(JSON.parse(recolect))
        .map(([id, values]) => ({
          id,
          ...values,
        }))
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    );

    setUserData(conductores.find((item) => item.id === user));
    setRouteSelected(conductores.find((item) => item.id === user)?.ruta);
  }
  /*  useEffect(() => {
    const fetchPercentage = async () => {
      const p = await getPercent();
      setPercentage(p);
    };

    fetchPercentage();
  }, [third]);

  async function getPercent() {
    const totalElements = ganaderos?.filter(
      (item) => item.ruta === routeSelected
    )?.length;
    const selectedElements = recolecciones?.filter(
      (item) => item.ruta === routeSelected
    )?.length;
    percentageSelected = Math.round((selectedElements / totalElements) * 100);

    console.log("totalElements", totalElements);
    console.log("selectedElements", selectedElements);

    return percentageSelected;
  } */

  console.log("percentage", percentage);

  const saveRouteSelected = (routeName) => {
    saveData("ruta", routeName);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.info}>
          <View>
            <Text h3>Hola,</Text>
            <Text h4>{userData?.name}</Text>
          </View>
          <View style={styles.info_icon}>
            <Icon name="account-circle" color="red" />
          </View>
        </View>
        <View style={styles.date_placas}>
          <Text style={styles.date}>{formattedDateTime}</Text>
          <Text style={styles.placas}>{userData?.placas}</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <Button
          title={"Ruta"}
          icon={<Icon name="local-shipping" color="white" />}
          buttonStyle={styles.button}
          onPress={() => setToggleOverlay(true)}
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
              <Icon name="near-me" color="black" />
              <Text>
                {`Ruta: ${
                  listRoutes.find((item) => item.id === routeSelected)?.name
                }`}
              </Text>
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
                value={0}
              />
              <Text>{percentage}%</Text>
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
                  data={recolecciones?.map((item) => {
                    return {
                      ...item,
                      id: item.id,
                      name: ganaderos.find((g) => g.id === item.ganadero)?.name,
                      subtitle: item.fecha,
                    };
                  })}
                  renderItem={({ item }) => renderItem({ item })}
                />
              </View>
            </Card>
            <View />
          </View>
        </View>
        <Overlay isVisible={toggleOverlay} overlayStyle={styles.overlay}>
          <View style={styles.title_overlay}>
            <Text style={styles.overlay_text}>{"Cambiar ruta"}</Text>
            <Icon
              name="close"
              color="#c90000"
              onPress={() => setToggleOverlay(false)}
            />
          </View>
          <Divider />
          <View style={styles.overlay_list}>
            <FlatList
              keyExtractor={keyExtractor}
              data={listRoutes}
              renderItem={({ item }) =>
                renderItem({
                  item,
                  onPress: () => {
                    saveRouteSelected(item.id);
                    setToggleOverlay(false);
                    fetchData();
                  },
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

  overlay_list: {
    flex: 1,
  },
  last_list: { height: "100%", marginTop: 20 },
  date_placas: { flexDirection: "row", justifyContent: "space-between" },
  placas: { textTransform: "uppercase", fontWeight: "bold" },
  title_overlay: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignContent: "center",
  },
  overlay_text: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: "center",
    color: "#c90000",
    width: "90%",
  },
});

export default Index;
