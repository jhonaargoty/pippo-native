import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Divider, Button } from '@rneui/themed';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMyContext } from '../../../context';

const Index = ({ navigation, route }) => {
  const { listConductores } = useMyContext();
  const { propData } = route.params;

  console.log('item', propData);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info_navigation}>
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
          <Text>{`Fecha: ${propData?.fecha}`}</Text>
        </View>
        <Divider style={styles.dividier} />

        <View style={styles.info_lts}>
          <View>
            <View style={styles.item}>
              <Text style={styles.item_desc}>Ruta:</Text>
              <Text style={styles.capitalize}>{propData?.ruta}</Text>
            </View>
            <View style={styles.item_ganadero}>
              <Text style={styles.item_desc}>Ganadero: </Text>
              <Text>{propData?.ganadero}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.item_desc}>Documento: </Text>
              <Text>{propData?.ganadero_documento}</Text>
            </View>
          </View>
          <View>
            <View style={styles.item}>
              <Text style={styles.item_imp}>Litros</Text>
              <Text style={styles.item_imp_desc}>
                {propData?.litros || '10'}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.item_imp}>Observaciones</Text>
              <Text style={styles.item_imp_desc}>
                {propData?.observaciones || 'Ninguna'}
              </Text>
            </View>
          </View>
        </View>

        <Divider style={styles.last_d} />
        <View style={styles.condc}>
          <View style={styles.item_cond}>
            <Text style={styles.item_desc}>Recolectado por:</Text>
            <Text>{propData?.conductor}</Text>
          </View>
          <View style={styles.item_cond}>
            <Text style={styles.item_desc}>Placas:</Text>
            <Text>
              {
                listConductores?.find((lc) => lc.id === propData?.conductor_id)
                  ?.placa
              }
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Button
          onPress={() => print()}
          buttonStyle={styles.button}
          title={'Imprimir'}
          icon={<Icon name="print" color="white" />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  capitalize: { textTransform: 'capitalize' },
  button: { backgroundColor: '#11B600', width: '100%', borderRadius: 20 },
  last_d: { marginBottom: -15 },
  condc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info_lts: {
    paddingVertical: 20,
    gap: 30,
  },
  item_imp_desc: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  item_imp: { fontSize: 16, fontWeight: 'bold' },
  item_desc: { fontWeight: 'bold' },
  item: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  item_ganadero: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  dividier: { marginTop: -15 },
  main: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: '10%',
    gap: 20,
    flexDirection: 'column',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#aeb6bf',
  },
  recibo: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  info_pippo: { alignItems: 'center' },
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
    height: '100%',
  },
  info_main: {
    alignItems: 'center',
    marginBottom: 5,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  info_navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;
