import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen"
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from './RecipeDetailScreen';
import SpecialFeature from '../screens/SpecialFeature';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="Special" component={SpecialFeature} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default AppNavigation