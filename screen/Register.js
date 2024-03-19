import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat';
import 'firebase/storage';
import 'firebase/firestore';

const { width } = Dimensions.get('window');

function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [nick, setNick] = useState('');
  const [cv, setCV] = useState(null);
  const [photo, setPhoto] = useState(null);

  

  const handleSignUp = async () => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const userId = user.uid;

      // Firestore'a kullanıcı verilerini kaydetme
      await firebase.firestore().collection('users').doc(userId).set({
        "Ad": name,
        "Soyad": surname,
        'E-posta': email,
        "Şifre": password,
        'Kullanıcı Adı': nick,
        
      });

      Alert.alert('Kayıt', 'Doğrulama e-postası gönderildi.');
      await user.sendEmailVerification();
      navigation.goBack();
    } catch (error) {
      console.error('Kayıt hatası:', error);
    }
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="İsim"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Soy İsim"
          value={surname}
          onChangeText={(text) => setSurname(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Kullanıcı Adı"
          value={nick}
          onChangeText={(text) => setNick(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="E-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Şifre"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
     
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    paddingTop: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 10,
  },
  textInput: {
    width: width / 1.1,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: width / 1.3,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#008080',
    borderWidth: 1,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Register;

   
