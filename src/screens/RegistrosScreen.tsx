import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import {eliminarTablaRegistros, getRegistros} from '../dataBases/configBotones';
import {styles} from '../theme/theme';
import RNFS from 'react-native-fs'; // Para manejar archivos
import Share from 'react-native-share'; // Para compartir archivos

const RegistrosScreen = () => {
  const [regs, setRegs] = useState([]);

  // Funciones

  const createTwoButtonAlert = () =>
    Alert.alert('Eliminar todos los registros', '¿Estás seguro?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: eliminarTablaRegistros},
    ]);

    const shareRegistrosAsTxt = async () => {
      try {
        // Verifica que haya registros
        if (!regs || regs.length === 0) {
          Alert.alert("Error", "No hay registros para compartir.");
          return;
        }
    
        // Genera el contenido del archivo .txt
        const fileContent = regs
          .map((reg) => {
            // Reemplaza caracteres no ASCII por sus equivalentes ASCII
            const text = `${reg.dayOfWeek} ${reg.time} ${reg.categoria}`;
            return text
              .replace(/[“”]/g, '"') // Reemplaza comillas tipográficas por comillas simples
              .replace(/[‘’]/g, "'") // Reemplaza comillas tipográficas por comillas simples
              .replace(/[–—]/g, "-") // Reemplaza guiones especiales por guiones simples
              .replace(/ñ/g, "n") // Normaliza la ñ
              .replace(/[¿¡]/g, ""); // Elimina caracteres especiales como ¿ y ¡
          })
          .join("\n");
    
        // Define la ruta del archivo
        const filePath = `${RNFS.DocumentDirectoryPath}/registros.txt`;
    
        // Escribe el archivo en el sistema con codificación UTF-8
        await RNFS.writeFile(filePath, fileContent, 'utf8');
    
        // Comparte el archivo por WhatsApp
        const shareOptions = {
          title: 'Compartir registros',
          message: 'Aquí están tus registros:', // Mensaje opcional
          url: `file://${filePath}`, // Ruta del archivo
          type: 'text/plain', // Tipo de archivo
          social: Share.Social.WHATSAPP, // Compartir directamente en WhatsApp
        };
    
        await Share.open(shareOptions);
      } catch (error) {
        console.error("Error al generar o compartir el archivo:", error);
        Alert.alert("Error", "No se pudo generar o compartir el archivo.");
      }
    };

  // Efectos

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
        {/* Lista de registros */}
        {regs.map((reg, index) => (
          <View key={index}>
            <Text>
              {reg.dayOfWeek} {reg.time} {reg.categoria}
            </Text>
          </View>
        ))}

        {/* Botón para eliminar registros */}
        <Pressable
          style={({pressed}) => [
            styles[`boton1`],
            {
              backgroundColor: pressed
                ? '#d2d2d2'
                : StyleSheet.flatten(styles[`boton1`]).backgroundColor,
              shadowColor: '#000',
              shadowOffset: pressed
                ? {width: 0, height: 8}
                : {width: 0, height: 1},
              shadowOpacity: pressed ? 0.9 : 0.1,
              shadowRadius: pressed ? 6 : 3,
              elevation: pressed ? 15 : 5,
              alignSelf: 'center',
            },
          ]}
          onPress={createTwoButtonAlert}>
          <Text>Eliminar todo</Text>
        </Pressable>

        {/* Botón para compartir registros por WhatsApp */}
        <Pressable
          style={({pressed}) => [
            styles[`boton2`],
            {
              backgroundColor: pressed
                ? '#d2d2d2'
                : StyleSheet.flatten(styles[`boton2`]).backgroundColor,
              shadowColor: '#000',
              shadowOffset: pressed
                ? {width: 0, height: 8}
                : {width: 0, height: 1},
              shadowOpacity: pressed ? 0.9 : 0.1,
              shadowRadius: pressed ? 6 : 3,
              elevation: pressed ? 15 : 5,
              alignSelf: 'center',
            },
          ]}
          onPress={shareRegistrosAsTxt}>
          <Text>Compartir Registros</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default RegistrosScreen;
