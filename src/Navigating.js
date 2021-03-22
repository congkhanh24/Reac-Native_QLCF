import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Screens/Login';
import RegisterScreen from './Screens/Register';
import ProductScreen from './Screens/Product';
import MainScreen from './Screens/Main';
import ProductTypeScreen from './Screens/ProductType';
import ProductDetailScreen from './Screens/ProductDetail';
import ProfileScreen from './Screens/Profile';

const Stack = createStackNavigator();

const Navigating = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName = 'Login' screenOptions = {{headerShown: true}}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ 
              title: 'Login', 
              headerStyle: {
                backgroundColor: 'purple'
              },
              headerTintColor: '#ffff',
              headerShown: false
          }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ title: 'Register', headerShown: false }}
          />
          <Stack.Screen 
            name="Product" 
            component={ProductScreen} 
            options={{ 
              title: 'DANH SÁCH SẢN PHẨM', 
              headerStyle: {
                backgroundColor: 'purple'
              },
              headerTintColor: '#ffff' 
            }}
          />
          <Stack.Screen 
            name="Main" 
            component={MainScreen} 
            options={{ 
              title: 'Home',
              headerStyle: {
                backgroundColor: 'purple'
              },
              headerTintColor: '#ffff',
              headerShown: false 
            }}
          />
          <Stack.Screen 
            name="ProductType" 
            component={ProductTypeScreen} 
            options={{ 
              title: 'ProductType',
              headerStyle: {
                backgroundColor: 'purple'
              },
              headerTintColor: '#ffff',
            }}
          />
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen} 
            options={{ 
              title: 'ProductDetail',
              headerStyle: {
                backgroundColor: 'purple'
              },
              headerTintColor: '#ffff',
            }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ 
              title: 'Profile',
              headerStyle: {
                backgroundColor: 'purple'
              },
              headerTintColor: '#ffff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
export default Navigating;

