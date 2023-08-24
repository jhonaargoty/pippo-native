import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, Divider } from "@rneui/themed";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import { keyExtractor, renderItem } from "../../utils";
import { ganaderos } from "../../utils/data";

import moment from "moment";
import "moment/locale/es";

const Index = ({ navigation }) => {
  moment.locale("es");

  const formattedDateTime = moment().format("dddd D [de] MMMM : HH:mm");

  return (
    <SafeAreaView style={styles.container}>
      <View>
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
      <Text h4>Seleccione ganadero</Text>
      <View style={styles.list}>
        <FlatList
          keyExtractor={keyExtractor}
          data={ganaderos}
          renderItem={({ item }) =>
            renderItem({
              item,
              onPress: () => {
                navigation.navigate("Form", { data: item });
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
});

export default Index;
