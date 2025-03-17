import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {getRegistros} from '../dataBases/configBotones';
import { styles } from '../theme/theme';

const RegistrosScreen = () => {
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    getRegistros(data => {
      setRegs(data);
    });
  }, []);

  return (
    <ScrollView>

    <View style={[styles.container, {padding: 20, backgroundColor: '#fff', alignItems: 'flex-start', padding: 30,}]}>
      {/* <Text style={{fontSize: 16, fontWeight: 'bold'}}>Registros:</Text> */}
      {regs.map((reg, index) => (
        <View key={index}>
          <Text>
            {reg.dayOfWeek} {reg.time} {reg.categoria}
          </Text>
        </View>
      ))}
    </View>
    </ScrollView>
  );
};

export default RegistrosScreen;
