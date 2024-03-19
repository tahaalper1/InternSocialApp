import React from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions,TouchableOpacity,KeyboardAvoidingView,Platform, ScrollView } from 'react-native'
import { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import firebase from 'firebase/compat';
import 'firebase/compat/firestore';




const { width, height } = Dimensions.get('window');

function Add(props) {
    const [baslik, setBaslik] = useState('');
    const [acklama, setAciklama] = useState('');
    const [adres, setAdres] = useState('');
    const [numara, setNumara] = useState('');
    const [firma, setFirma] = useState('');
    const [bölüm, setBölüm] = useState('');
    const [ücret, setÜcret] = useState('');

    const handleShareDescription = async () => {
        try {
            const user = firebase.auth().currentUser;

            if (user) {
              const userId = user.uid;
              const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    
              await firebase.firestore().collection('descriptions').add({
                userId: userId,
                baslik,
                acklama,
                adres,
                numara,
                firma,
                bölüm,
                ücret,
                timestamp,
                
              });
              
              setAciklama('');
            } else {
              console.log("Kullanıcı oturum açmamış.");
            }
        } catch (error) {
          console.error('Açıklama paylaşma hatası:', error);
        }
        props.navigation.goBack();
      };
    


  const [selectedLanguage, setSelectedLanguage] = useState();



  return (
   
       <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}>
       <ScrollView>
           <View  style={styles.container}> 
      <View style={styles.inputContainer}>
      <TextInput style={styles.textInput} placeholder="Başlık"  multiline={true}
        value={baslik}
        onChangeText={setBaslik}
      />
      <TextInput style={styles.textInput_aciklama} placeholder="Açıklama"  multiline={true}
       value={acklama}
       onChangeText={setAciklama}
      />
      <TextInput style={styles.textInput_adres} placeholder="Adres"  multiline={true}
       value={adres}
       onChangeText={setAdres}
      />
      <TextInput style={styles.textInput_adres} placeholder="Telefon Numarası"  multiline={true}
       value={numara}
       onChangeText={setNumara}
      />
      <TextInput style={styles.textInput_adres} placeholder="Okul veya Firma"  multiline={true}
       value={firma}
       onChangeText={setFirma}
      />
      <TextInput style={styles.textInput_adres} placeholder="Bölüm veya Sektör"  multiline={true}
       value={bölüm}
       onChangeText={setBölüm}
      />
      <TextInput style={styles.textInput_adres} placeholder="Ücret"  multiline={true}
       value={ücret}
       onChangeText={setÜcret}
      />
   
      <TouchableOpacity style={styles.button} onPress={handleShareDescription}>
      <Text style={styles.buttonText}>Paylaş</Text>
    </TouchableOpacity>

</View>
   </View>
       </ScrollView>

   
</KeyboardAvoidingView>
  
   
  )
}


const styles = StyleSheet.create({
    container: {
       
      flex:1,
      backgroundColor: "white",
      justifyContent: 'center', 
      alignItems: 'center',
       
      },
      textInput:{
        width: width/1.1,
      height: 40,
      borderWidth: 1,
      marginTop:height/4,
      borderColor: 'black',
      borderRadius: 10,
      paddingHorizontal: 10,
      },
      textInput_aciklama:{
        width: width/1.1,
      height: height/6,
      borderWidth: 1,
      marginTop:20,
      borderColor: 'black',
      marginBottom:10,
      borderRadius: 10,
      paddingHorizontal: 10,
      },
      textInput_adres:{
        width: width/1.1,
        height: 40,
        borderWidth: 1,
        marginTop:10,
        marginBottom:10,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
      },
   

      button: {
        width: width/1.1,
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
export default Add;