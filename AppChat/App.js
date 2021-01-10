import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScr from "./Screens/LoginScr.js";
import SignupScr from './Screens/SignupScr.js';
import HomeScr from './Screens/Home/HomeScr.js';
import GUIchat from './Screens/Chat/GUIchat.js';

const Stack = createStackNavigator();



export default class App extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScr">
          <Stack.Screen name='LoginScr' component={LoginScr} options={{headerShown: false}}/>
          <Stack.Screen name='HomeScr' component={HomeScr} options={{headerShown: false}}/>
          <Stack.Screen name='GUIchat' component={GUIchat} options={{headerShown: false}}/>
          <Stack.Screen name='SignupScr' component={SignupScr} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
