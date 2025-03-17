import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './routes/StackNavigator';
import { styles } from './theme/theme';




const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
