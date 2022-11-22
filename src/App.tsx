import React from 'react';
import {View, Text, Button, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import Login from './pages/Login';

import {DataProvider} from './context/DataContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Home" component={Home} options={{
            title: '',
            headerStyle: {
            backgroundColor: '#A9A9A9',
            },
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;
