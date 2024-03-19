import React from 'react'
import { View,Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform,Alert,Dimensions  } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 
import firebase from 'firebase/compat';
import { useState } from 'react';


const { width, height } = Dimensions.get('window');
function Reset({ navigation }) {

  const [email, setEmail] = useState('');

  
 //şifre yenileme fonksiyonunpm 
 const handleReset = () => {
  //firebase şifre yenileme e-postası
  if (email) {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        //e-posta gönder ve önceki sayfaya dön
        Alert.alert('Şifre Yenileme', 'Şifre yenileme bağlantısı e-posta adresinize gönderildi.');
        navigation.goBack();
      })
      .catch((error) => {
        //şifre yenileme bağlantısı gönderilmediyse hatayı yaz
        Alert.alert('Şifre Yenileme Hatası', error.message);
      });
  } 
};


  return (
    <View  style={styles.container}>

    <View style={styles.inputContainer}>
    <MaterialIcons style={styles.image} name="work-outline" size={100} color="#008080" />
      <TextInput style={styles.textInput} placeholder="E-posta" 
      value={email}
      onChangeText={(text) => setEmail(text)}
      />
    </View>

    <TouchableOpacity style={styles.button}  onPress={handleReset}>
      <Text style={styles.buttonText}>Gönder</Text>
    </TouchableOpacity>

  </View>
  )
}

const styles = StyleSheet.create({
    image:{
        bottom: 30,
        left: 120,
    },
    container: {
        flex:1,
        backgroundColor: "white",
        padding: 30,
        paddingTop: 200,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    inputContainer: {
      marginBottom: 10,

    },
    textInput: {
      width: width/1.1,
      height: 40,
      borderWidth: 1,
      
      borderColor: 'black',
      borderRadius: 10,
      paddingHorizontal: 10,
      },
    button: {
      width: width/1.3,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:"#008080",
    borderWidth: 1,
    marginTop: 10,
    },
    buttonText: {
      color: 'black',
      fontSize: 16,
    },
   
  });

  
export default Reset;

