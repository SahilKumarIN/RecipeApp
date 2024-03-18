import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'


const SplashScreen = () => {
  const navigation = useNavigation();
  
  useEffect(()=>{
    setTimeout(()=>{
      navigation.replace('Home');
    },1500)
  },[]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.splashTxt}>Recipe App</Text>
    </View>
  )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#81c784'
    },
    splashTxt: {
        fontSize: 20,
        fontWeight: '600',
        // color: '#2e7d32'
        color: '#1b5e20'
    }
});