import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Pressable, Alert, Linking} from 'react-native';
import {eliminarTablaRegistros, getRegistros} from '../dataBases/configBotones';
import {styles} from '../theme/theme';
const RegistrosScreen = () => {
  const [regs, setRegs] = useState([]);

  //Funciones

  const createTwoButtonAlert = () =>
    Alert.alert('Eliminar todos los registros', '¿Estás seguro?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: eliminarTablaRegistros},
    ]);

    const openWhatsApp = (regs) => {
      // Genera el mensaje con el formato especificado
      const mensaje = regs
        .map((reg) => `${reg.dayOfWeek} ${reg.time} ${reg.categoria}`)
        .join("\n"); // Separa cada registro con un salto de línea
    
      const telefono = "5615976147"; // Incluye el código de país y número de WhatsApp
      const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
      // Abre WhatsApp con el mensaje
      Linking.openURL(url).catch((err) =>
        console.error("Error al abrir WhatsApp:", err)
      );
    };

    //Efectos

  useEffect(() => {
    getRegistros(data => {
      setRegs(data);
    });
  }, [regs]);

  return (
    <ScrollView>
      <View
        style={[
          styles.container,
          {
            padding: 20,
            backgroundColor: '#fff',
            alignItems: 'flex-start',
            padding: 30,
          },
        ]}>
        {/* <Text style={{fontSize: 16, fontWeight: 'bold'}}>Registros:</Text> */}
        {regs.map((reg, index) => (
          <View key={index}>
            <Text>
              {reg.dayOfWeek} {reg.time} {reg.categoria}
            </Text>
          </View>
        ))}
        <Pressable
          style={({pressed}) => [
            styles[`boton1`], // Estilo fijo del botón
            {
              backgroundColor: pressed
                ? '#d2d2d2'
                : StyleSheet.flatten(styles[`boton1`]).backgroundColor,
              shadowColor: '#000',
              shadowOffset: pressed
                ? {width: 0, height: 8} // Sombra más pronunciada al presionar
                : {width: 0, height: 1},
              shadowOpacity: pressed ? 0.9 : 0.1, // Intensidad de la sombra
              shadowRadius: pressed ? 6 : 3, // Radio de sombra más grande al presionar
              elevation: pressed ? 15 : 5, 
              alignSelf:'center'// Sombra para Android
            },
          ]}
          onPress={createTwoButtonAlert}>
          <Text>Eliminar todo</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles[`boton2`], // Estilo fijo del botón
            {
              backgroundColor: pressed
                ? '#d2d2d2'
                : StyleSheet.flatten(styles[`boton2`]).backgroundColor,
              shadowColor: '#000',
              shadowOffset: pressed
                ? {width: 0, height: 8} // Sombra más pronunciada al presionar
                : {width: 0, height: 1},
              shadowOpacity: pressed ? 0.9 : 0.1, // Intensidad de la sombra
              shadowRadius: pressed ? 6 : 3, // Radio de sombra más grande al presionar
              elevation: pressed ? 15 : 5, 
              alignSelf:'center'// Sombra para Android
            },
          ]}
          onPress={openWhatsApp}>
          <Text>Enviar por Whatsapp</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default RegistrosScreen;
