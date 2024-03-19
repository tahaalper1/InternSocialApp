import React from 'react'
import { View,Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform,Alert, Dimensions  } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from '../firebase';
import Register from './Register';
import User from './User';
import Reset from './Reset';

const { width, height } = Dimensions.get('window');
const Signup = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


   //firebase giriş yapma işlemi
   const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        if (user && user.emailVerified) {
            console.log('Giriş başarılı.');
            props.navigation.navigate('User');
          } else {
            Alert.alert('Giriş', 'E posta onaylanmadı.');
          }
        console.log('Giriş yapıldı:');
        //Giriş başarılı ise geçmesi gereken sayfa
        
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //giriş başarısız ise başarısızlığın nedeni
        Alert.alert('Giriş', 'Giriş Başarısız.');
        
      });
  };

    const handleRegister = () => {
      props.navigation.navigate('Register');
    };

    const handleReset = () => {
      props.navigation.navigate('Reset');
    };
  

  return (

    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}>
    <View style={styles.container}>
        <View>
             <MaterialIcons style={styles.image} name="work-outline" size={100} color="#008080" />
        </View>
   
    <View style={styles.inputContainer}>
      <TextInput style={styles.textInput} placeholder="E-posta"
      //girilen değerleri değişkene atama
      value={email}
      onChangeText={(text) => setEmail(text)}
   
      />
      <AntDesign  style={styles.icon} name="mail" size={24} color="grey" />
    </View>

    <View style={styles.inputContainer}>
      <TextInput style={styles.textInput} placeholder="Şifre" secureTextEntry={true}
      //girilen değerleri değişkene atama
      value={password}
      onChangeText={(text) => setPassword(text)}
      />
      <MaterialCommunityIcons  style={styles.icon} name="form-textbox-password" size={24} color="grey" />
    </View>
    
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Giriş Yap</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={handleRegister}>
      <Text style={styles.registerText}>Henüz kaydolmadın mı? <Text style={styles.registerLink}>Hemen kayıt ol!</Text></Text>
    </TouchableOpacity>

    <TouchableOpacity  style={styles.button2} onPress={handleReset}>
        <Text style={styles.buttonText2}>Şifremi Unuttum</Text>
      </TouchableOpacity>
      
  </View>

</KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
    image:{
        bottom: height/20,
      
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
        color: '#008080',
        fontSize: 16,
      },
      registerText: {
        marginTop: 20,
        fontSize: 14,
        paddingLeft: 0,
      },
      registerLink: {
        color: '#008080',
        textDecorationLine: 'underline',
      },
      button2: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        paddingLeft:15,
      },
      buttonText2: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },

      icon: {
        position: 'absolute',
        right: 20,
        top: 8,
      }
});

export default Signup;