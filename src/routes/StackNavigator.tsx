import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ConfigScreen from '../screens/ConfigScreen';
import RegistrosScreen from '../screens/RegistrosScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: true,
      headerStyle:{
        elevation: 15,
      }
      }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{
        title: 'Registrar conductas',
        headerTitleAlign: 'center',
      }}/>
      <Stack.Screen name="Config" component={ConfigScreen} options={{
        title: 'Configurar botones',
        headerTitleAlign: 'center',
      }}/>
      <Stack.Screen name="Registros" component={RegistrosScreen} options={{
        title: 'Registros',
        headerTitleAlign: 'center',
      }}/>
    </Stack.Navigator>
  );
};