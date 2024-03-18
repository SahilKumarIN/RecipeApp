import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import Search from './screens/Search';

const Stack = createNativeStackNavigator();

const NavigationComp = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Splash' component={SplashScreen}/>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Search' component={Search} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default NavigationComp ;