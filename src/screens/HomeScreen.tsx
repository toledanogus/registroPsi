import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from'react';
import { View, Text, Pressable } from'react-native';
import { getBotones } from '../dataBases/configBotones';
import { styles } from '../theme/theme';

const HomeScreen = () => {

  //Variables
  const navigation = useNavigation();
  const [datadb, setDatadb] = useState([]);


  //Funciones



  //Efectos

  useEffect(() => {
    getBotones(data => {
      setDatadb(data);
    });
  }, [datadb])
  

  return (
    <View>
      <Text>Home of Gustavo</Text>
      <Pressable onPress={() => navigation.navigate('Config' as never)}>
        <Text>Go to Config</Text>
      </Pressable>
      {
        datadb[0]?.nombreBotones.split(',').map((elemento, index)=>(
          <Pressable
          style={styles.pressable}
           key={index}
            onPress={(e)=>(console.log('first'))}>
            <Text>{elemento}</Text>
          </Pressable>
        ))
      }
      <Text>{JSON.stringify(datadb)}</Text>
      <Text>{datadb[0]?.nombreBotones.split(',')[1]}</Text>
    </View>
  );
};

export default HomeScreen;