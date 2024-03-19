import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { View, Dimensions,StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import User from './screen/User';
import Home from './screen/Home';
import Advert from './screen/Advert';
import Add from './screen/Add';
import Message from './screen/Message';
import Signup from './screen/Signup';
import Register from './screen/Register';
import Reset from './screen/Reset';
import { useState } from 'react';






const Tab = createBottomTabNavigator();
const stack = createNativeStackNavigator();

const { width, height } = Dimensions.get('window');

const StackNavigator = () => {
  return    <stack.Navigator option={{headerShown: false}}>
          <stack.Screen name="Signup" component={Signup}  options={{ headerShown: false }}/> 
           <stack.Screen name="User" component={User}  options={{ headerShown: false }}/> 
           <stack.Screen name="Register" component={Register}  options={{ headerShown: false }}/> 
           <stack.Screen name="Reset" component={Reset}  options={{ headerShown: false }}/> 
           <stack.Screen name="Message" component={Message}  options={{ headerShown: false }}/> 
         </stack.Navigator>
  
}



function MyTabs() {


  return (
 
                <Tab.Navigator
                initialRouteName="Profile"
                screenOptions={{
                  tabBarStyle: { backgroundColor: 'white',
                  height: height/12,
                  borderTopEndRadius:50,
                  borderTopStartRadius:50,
              }, 
                }}
                
                >
                  
                 
                  
                  <Tab.Screen
                name="Home"
                options={{
               
                  tabBarActiveTintColor:"#008080",
                  tabBarInactiveTintColor:"black",
                  headerShown: false,
                    tabBarLabel: '--------',
                    tabBarIcon: ({ color }) => (
                      <AntDesign name="home" size={width/14} color={color} />
                    )
                }}
                component={Home} />
                  
  
                <Tab.Screen
                name="Workout"
                options={{
                  tabBarActiveTintColor:"#008080",
                  tabBarInactiveTintColor:"black",
                  headerShown: false,
                  tabBarLabel: '--------',
                    tabBarIcon: ({ color }) => (
                      
                      <AntDesign name="inbox" size={width/14} color={color} />
                      
                      
                    )
                }}
                component={Advert} />
  
               
                <Tab.Screen
           
                name="Add"
                
                options={{
                  headerShown: false,
                  tabBarActiveTintColor:"white",
                  tabBarInactiveTintColor:"black",
                  tabBarStyle:{display:'none'},
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                    

                      
                        <View
                       
                        style={{
                          
                          width: 70,
                          height: 70,
                          borderRadius: 100,
                          borderBottomWidth: 0,
                          backgroundColor: '#008080',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: height/15,
                        
                        }}
                        >
                          
                           <AntDesign name="pluscircleo" size={width/5.9} color="white" />  
                        </View>
              
                    )
                
                }}
                component={Add}
              
                
                />
                <Tab.Screen
  
                name="Store"
                options={{
                  headerShown: false,
                  tabBarActiveTintColor:"#008080",
                  tabBarInactiveTintColor:"black",
                  tabBarLabel: '--------',
                    tabBarIcon: ({ color }) => (
                      
                      <AntDesign name="message1" size={width/14} color={color} />
                      
                      
                    )
                }}
                component={Message} />
  
                <Tab.Screen
                name="Profile"
                options={{
                  headerShown: false,
                  tabBarActiveTintColor:"#008080",
                  tabBarInactiveTintColor:"black",
                  tabBarLabel: '--------',
                    tabBarIcon: ({ color }) => (
                      <AntDesign name="user" size={width/14} color={color} />
                    )
                }}
                component={StackNavigator} />
                
                </Tab.Navigator>
  );
}

export default function Router() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}