import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routesTypes';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text className="font-bold">Login Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Inicio')}><Text><Login></Login></Text></TouchableOpacity>
    </View>
  );
};

export default LoginScreen;