import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  createTable,
  createTableRegistros,
  getBotones,
  getRegistros,
  registrar,
} from '../dataBases/configBotones';
import {styles} from '../theme/theme';
import Sound from 'react-native-sound';

const HomeScreen = () => {
  //Variables
  const navigation = useNavigation();
  const [datadb, setDatadb] = useState([]);
  const diasSemana = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  //Funciones
  const showSuccessAlert = () => {
    Alert.alert('Registrado correctamente', '');
  };

  const handleButtonPress = elemento => {
    const now = new Date();
    const dayOfWeek = diasSemana[now.getDay()];
    const time = new Date().toLocaleTimeString('es-MX', {
      timeZone: 'America/Mexico_City',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    registrar(dayOfWeek, time, elemento);
    showSuccessAlert();
  };

  const playSound = () => {
    const sound = new Sound(
      require('../assets/click.wav'),
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Error al cargar el sonido', error);
          return;
        }
        sound.play(() => {
          sound.release(); // Libera el recurso una vez que el sonido termina
        });
      },
    );
  };

  //Efectos

  useEffect(() => {
    createTable();
  }, []);

  useEffect(() => {
    createTableRegistros();
  }, []);

  useEffect(() => {
    getBotones(data => {
      setDatadb(data);
    });
  }, [datadb]);


  return (
    <ScrollView>
      <View style={styles.container}>
        {datadb[0]?.nombreBotones.split(',').map((elemento, index) => (
          <Pressable
            style={({pressed}) => [
              styles[`boton${index}`], // Estilo fijo del botón
              {
                backgroundColor: pressed
                  ? '#d2d2d2'
                  : StyleSheet.flatten(styles[`boton${index}`]).backgroundColor,
                shadowColor: '#000',
                shadowOffset: pressed
                  ? {width: 0, height: 8} // Sombra más pronunciada al presionar
                  : {width: 0, height: 1},
                shadowOpacity: pressed ? 0.9 : 0.1, // Intensidad de la sombra
                shadowRadius: pressed ? 6 : 3, // Radio de sombra más grande al presionar
                elevation: pressed ? 15 : 5, // Sombra para Android
              },
            ]}
            key={index}
            onPress={() => {
              playSound(); // Aquí se invoca correctamente
              handleButtonPress(elemento);
            }}>
            <Text>{elemento}</Text>
          </Pressable>
        ))}

        <Pressable
          onLongPress={() => navigation.navigate('Config' as never)}
          delayLongPress={1000}>
          <Text style={[{margin: 40}]}>Configurar botones</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
