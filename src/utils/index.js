import { ListItem } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "react-native-elements";

keyExtractor = (item, index) => index.toString();

export const renderItem = ({ item, onPress, icon }) => {
  console.log("icon", icon);

  return (
    <ListItem bottomDivider onPress={() => onPress()}>
      {icon && <Icon name={icon?.name} color={icon?.color} />}
      <ListItem.Content>
        <ListItem.Title>{item?.name}</ListItem.Title>
        {item?.subtitle && (
          <ListItem.Subtitle style={item?.subtitleStyle}>
            {item?.subtitle}
          </ListItem.Subtitle>
        )}
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

// Para guardar datos
export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Datos guardados exitosamente");
    return "SUCCESS";
  } catch (error) {
    console.error("Error al guardar datos:", error);
    return "ERROR";
  }
};

// Para recuperar datos
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error("Error al recuperar datos:", error);
  }
};

// Para eliminar datos
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Datos eliminados exitosamente");
  } catch (error) {
    console.error("Error al eliminar datos:", error);
  }
};
