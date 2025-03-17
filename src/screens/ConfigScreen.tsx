import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
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

  return (
    <View style={styles.container}>
      <Text>Escribe el número de botones que necesites{botones}</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => dispatch(setBotones(text))}
        keyboardType="numeric" // Para que el teclado sea numérico
      />

      {miArray.map((elemento, index) => (
        <View key={index}>
          <Text>Nombre del botón {elemento}</Text>
          <TextInput
            style={{borderColor: 'gray', borderWidth: 1}}
            value={inputValues[index]} // Muestra el valor correspondiente
            onChangeText={text => handleChangeText(text, index)} // Maneja los cambios en el texto
            keyboardType="default"
          />
        </View>
      ))}
      <Text>{JSON.stringify(nombresBotones)}</Text>
      <Text>{inputValues}</Text>
      <Pressable style={styles.pressable} onPress={handleButtonPress}>
        <Text style={{color: 'white'}}>Guardar en la base</Text>
      </Pressable>
      <Text>Datos en la base {JSON.stringify(datadb)}</Text>
      <Text>{}</Text>
      <Pressable
              style={{backgroundColor: 'red', padding: 10}}
              onPress={() => navigation.navigate('Registros' as never)}
            > 
            <Text>Ir a Registros</Text>
            </Pressable>
    </View>
  );
};

export default ConfigScreen;
