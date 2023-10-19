import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { BleManager } from "react-native-ble-manager";
import { BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer";

const BluetoothPrinterScreen = () => {
  const manager = new BleManager();

  useEffect(() => {
    // Escanear impresoras Bluetooth disponibles
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error("Error de escaneo:", error);
        return;
      }
      // Conectar con la impresora deseada (reemplaza 'NombreDeTuImpresora')
      if (device.name === "NombreDeTuImpresora") {
        manager.stopDeviceScan();
        manager
          .connectToDevice(device.id)
          .then((device) => {
            console.log("Conectado a la impresora:", device.name);
          })
          .catch((error) => {
            console.error("Error de conexión:", error);
          });
      }
    });
  }, []);

  const onPressPrint = async () => {
    try {
      // Imprimir en la impresora conectada
      const result = await BluetoothEscposPrinter.printText("Hola, mundo!", {});
      if (result) {
        console.log("Impresión exitosa");
      } else {
        console.error("Error de impresión");
      }
    } catch (error) {
      console.error("Error de impresión:", error);
    }
  };

  return (
    <View>
      <Text>Conectar con impresora Bluetooth</Text>
      <Button title="Imprimir" onPress={onPressPrint} />
    </View>
  );
};

export default BluetoothPrinterScreen;
