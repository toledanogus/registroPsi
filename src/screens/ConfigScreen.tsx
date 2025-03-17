import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable, ScrollView, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setBotones, setNombresBotones} from '../store/slices/registrosSlice';
import {styles} from '../theme/theme';
import {
  createTable,
  getBotones,
  registrarBotones,
} from '../dataBases/configBotones';
import { useNavigation } from '@react-navigation/native';

const ConfigScreen = () => {
  //Variables
  const dispatch = useDispatch();
  const {botones, nombresBotones} = useSelector(
    (state: any) => state.registros,
  );
  const miArray = Array.from({length: botones}, (_, index) => index + 1);
  const [inputValues, setInputValues] = useState([]);
  const [datadb, setDatadb] = useState([]);
  const navigation = useNavigation();
  const showSuccessAlert = () => {
    Alert.alert('Registrado correctamente', '');
  };

  //Funciones

  const handleChangeText = (text, index) => {
    const newValues = [...inputValues];
    newValues[index] = text;
    setInputValues(newValues);
  };
  const handleButtonPress = () => {
    registrarBotones(botones, nombresBotones);
    getBotones(data => {
      setDatadb(data);
      showSuccessAlert();
    });
  };

  //Efectos
  useEffect(() => {
    // Sincroniza inputValues con miArray
    if (inputValues.length !== miArray.length) {
      setInputValues(prevValues =>
        miArray.map((_, index) => prevValues[index] || ''),
      );
    }
  }, [miArray]);

  useEffect(() => {
    dispatch(setNombresBotones(inputValues));
  }, [inputValues]);

  useEffect(() => {
    createTable();
    getBotones(data => {
      setDatadb(data);
    });
  }, []);

  useEffect(() => {
    dispatch(setBotones(0))
  }, [])
  

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>
          Escribe el número de botones que necesites:
        </Text>
        <TextInput
          style={[
            styles.input,
            {width: '20%', marginBottom: 5, textAlign: 'center'},
          ]}
          onChangeText={text => dispatch(setBotones(text))}
          keyboardType="numeric" // Para que el teclado sea numérico
        />

        {miArray.map((elemento, index) => (
          <View
            style={[
              styles.subContainer,
              {marginBottom: 0,},
            ]}
            key={index}>
            <Text style={styles.text}>Nombre del botón {elemento}</Text>
            <TextInput
              style={styles.input}
              value={inputValues[index]} // Muestra el valor correspondiente
              onChangeText={text => handleChangeText(text, index)} // Maneja los cambios en el texto
              keyboardType="default"
            />
          </View>
        ))}
        {/* <Text>{JSON.stringify(nombresBotones)}</Text> */}
        {/* <Text>{inputValues}</Text> */}
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
            elevation: pressed ? 15 : 5, // Sombra para Android
          },
        ]}
          onPress={handleButtonPress}>
          <Text>Aplicar</Text>
        </Pressable>
        {/* <Text>Datos en la base {JSON.stringify(datadb)}</Text>
      <Text>{}</Text> */}
        <Pressable
          style={{
            backgroundColor: '#35f438',
            padding: 10,
            margin: 20,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate('Registros' as never)}>
          <Text>Ir a Registros</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ConfigScreen;
