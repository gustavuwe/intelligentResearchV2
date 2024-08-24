import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from '../routesTypes';
import LoginScreen from '../screens/LoginScreen';
import axios from 'axios';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get('http://localhost:3333/verify', {
          withCredentials: true // Importante para enviar cookies
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log('Token inválido ou expirado');
      }
      setIsLoading(false);
    };
    checkToken();
  }, []);

  return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isLoggedIn ? 'Inicio' : 'Login'}>
                <Stack.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
  );
};

export default AppNavigator;