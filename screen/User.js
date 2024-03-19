import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, Alert, StyleSheet, Dimensions } from 'react-native';
import firebase from 'firebase/compat';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';



const { width, height } = Dimensions.get('window');
const User = (currentUser ) => {
    const [userData, setUserData] = useState({});
    const [editing, setEditing] = useState(false);
    const [newData, setNewData] = useState({});
    const [selectedUserInfo, setSelectedUserInfo] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [updatedValue, setUpdatedValue] = useState('');
    const [user, setUser] = useState(firebase.auth().currentUser);
    const navigation = useNavigation();
    useEffect(() => {
    
      // Kullanıcının oturum açmasını sağla (eğer daha önce oturum açıldıysa)
      const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
              const userToken = await user.getIdToken();
              console.log('User Token:', userToken);
              // Oturum sürekli yenilenir
          }
      });

      return () => {
          unsubscribe(); // Komponent kaldırıldığında izleme aboneliğini iptal et
      };
  }, []);


    useEffect(() => {
      // Oturum açmış kullanıcının UID'sini al
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        
        // Firestore veritabanına erişim sağla
        const db = firebase.firestore();
  
        // "users" koleksiyonuna referans al
        const usersCollection = db.collection('users');
  
        // Kullanıcı bilgilerini oku
        usersCollection.doc(userId).get()
          .then((doc) => {
            if (doc.exists) {
              setUserData(doc.data());
            } else {
              console.log("Kullanıcı belgesi bulunamadı.");
            }
          })
          .catch((error) => {
            console.log("Kullanıcı bilgilerini okuma hatası:", error);
          });
      } else {
        console.log('Kullanıcı oturum açmamış.');
      }
    }, []);
  
    const handleSavePress = () => {
      const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
      userRef.update(newData).then(() => {
        setUserData(newData);
        setEditing(false);
      });
    };
  
  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      Alert.alert('Çıkış', 'Çıkış başarılı');
      navigation.goBack();
    }).catch((error) => {
      // Çıkış hatası, hata mesajını göster veya işle
      Alert.alert('Çıkış', 'Çıkış başarısız.');
      
    });
  };

  const handleDeleteAccount = async () => {
    try {
      if (!user) {
        Alert.alert('Hata', 'Oturum açmış bir kullanıcı bulunamadı.');
        return;
      }

      // Firestore'da kullanıcı verilerini silme
      const db = firebase.firestore();
      const userRef = db.collection('users').doc(user.uid);
      await userRef.delete();

      user.delete()
        .then(() => {
          console.log('Hesap başarıyla silindi.');
          // Hesap silindiğinde yapılması gereken işlemleri burada gerçekleştirebilirsiniz.
        })
      Alert.alert('Başarılı', 'Hesabınız başarıyla silindi.');
      navigation.goBack();
    } catch (error) {
      console.error('Hesap silinirken bir hata oluştu:', error);
      Alert.alert('Hata', 'Hesap silinirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };


  const handleCardClick = (userInfo) => {
    setSelectedUserInfo(userInfo);
    setIsModalVisible(true);
  };

  const handleUpdateValue = () => {
    if (updatedValue) {
      if (!user) {
        Alert.alert('Hata', 'Oturum açmış bir kullanıcı bulunamadı.');
        return;
      }
  
      // Firestore'da güncelleme işlemini gerçekleştir
      const db = firebase.firestore();
      const userRef = db.collection('users').doc(user.uid);
  
      // selectedUserInfo ile seçilen kullanıcı verisinin alanını güncelleyin
      const updatedData = { [selectedUserInfo]: updatedValue };
  
      userRef.update(updatedData)
        .then(() => {
          console.log('Veri başarıyla güncellendi.');
          setUserData(prevUserData => ({
            ...prevUserData,
            [selectedUserInfo]: updatedValue
          }));
          setIsModalVisible(false);
          setUpdatedValue('');
        })
        .catch(error => {
          console.error('Veri güncellenirken bir hata oluştu:', error);
          Alert.alert('Hata', 'Veri güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
        });
    } else {
      Alert.alert('Uyarı', 'Lütfen geçerli bir değer girin.');
    }
  };

  

  
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
      <MaterialIcons name="person-pin" size={150} color="#008080" />
      </View>
 {userData && (
        <View style={styles.card}>
          {Object.keys(userData).map((key) => (
            <TouchableOpacity key={key} onPress={() => handleCardClick(key)} >
              <Card containerStyle={styles.touch}>  
                 <Text>{key}: {userData[key]}</Text>
              </Card>
             
            </TouchableOpacity>
          ))}
           <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.buttonText}>Çıkış Yap</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
      <Text style={styles.buttonText}>Hesabı Sil</Text>
    </TouchableOpacity>

      </View>
        </View>
      )}

      <Modal visible={isModalVisible} animationType="slide" >
        <View style={styles.modal}>
       
       <Card containerStyle={styles.cardd}>  
         <TextInput
            placeholder={selectedUserInfo}
            value={updatedValue}
            onChangeText={(text) => setUpdatedValue(text)}
          />
        <TouchableOpacity style={styles.update} onPress={handleUpdateValue}>
      <Text style={styles.update_text}>Güncelle</Text>
    </TouchableOpacity>
        </Card>  
       
          
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  touch:{
    borderWidth:1,
    borderColor:"#008080",
    borderRadius:8,

  },
  update:{
    width: width/1.3,
  height: 40,
  backgroundColor: 'white',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor:"#008080",
  borderWidth: 1,
  marginTop: height/15,
  marginLeft:width/20,
  },
  update_text:{
    color: 'black',
    fontSize: 16,
  },
  cardd:{
    marginTop:100,
    height:150,
    borderWidth:1,
    borderColor:"#008080",
    borderRadius:25,
  },
  icon:{
    top:height/20,
    justifyContent:"center",
    alignItems:"center"
  },
  card:{
    top:height/25,
   
  },
  modal:{
    top:200,
  },  
  container: {
    flex: 1,
    backgroundColor:"white",
   
  },
  infoContainer: {
    marginTop:0,
    marginLeft:0,
  },
  buttonContainer:{
    marginTop:25,
    marginLeft:50,
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

export default User;
