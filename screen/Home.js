import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import { Card } from 'react-native-elements'; // react-native-elements ekledik

import firebase from 'firebase/compat';

const { width, height } = Dimensions.get('window');

function Home({ navigation }) {
  const [descriptions, setDescriptions] = useState([]);
  const [users, setUsers] = useState([]);

  const getFormattedTime = (timestamp) => {
    if (timestamp) {
      const date = timestamp.toDate();
      const options = { timeZone: 'Europe/Istanbul', hour: 'numeric', minute: 'numeric', hour12: false };
      return new Intl.DateTimeFormat('tr-TR', options).format(date);
    }

    return '';
  };

  useEffect(() => {
    const unsubscribeUsers = firebase.firestore().collection('users')
      .onSnapshot((snapshot) => {
        const userList = [];
        snapshot.forEach((doc) => {
          userList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(userList);
      });

    const unsubscribeDescriptions = firebase.firestore().collection('descriptions')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        const descriptionList = [];
        snapshot.forEach((doc) => {
          descriptionList.push({ id: doc.id, ...doc.data() });
        });
        setDescriptions(descriptionList);
      });

    return () => {
      unsubscribeUsers();
      unsubscribeDescriptions();
    };
  }, []);

  const findUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? `${user.Ad} ${user.Soyad}` : 'Bilinmeyen Kullanıcı';
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ top: 50, marginBottom: 50 }}>
        {descriptions.map((description) => (
          <View key={description.id} style={styles.cardContainer}>
            <Card containerStyle={styles.card}>
              <Card.Title style={styles.title}>{description.baslik}</Card.Title>
              <Card.Divider />
              <Text style={styles.cardText}>{description.acklama}</Text>
              <Text style={styles.cardText}>Konum: {description.adres}</Text>
              <Text style={styles.cardText}>Okul-Firma: {description.firma}</Text>
              <Text style={styles.cardText}>Bölüm - Sektör: {description.bölüm}</Text>
              <Text style={styles.cardText}>Tahmini ücret: {description.ücret} TL</Text>
              <Text style={styles.cardText}>Kişi: {findUserName(description.userId)}</Text>
              <Text style={styles.cardText1}>Saat: {getFormattedTime(description.timestamp)}</Text>
            
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    color:"white",
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardContainer: {
    marginVertical: 10,
  },
  card: {
    borderWidth: 1.5,
    borderColor: '#008080',
    borderRadius: 50,
    backgroundColor: '#008080',
    marginBottom: 0,
    height:height/3,
  },
  cardText: {
    color: 'white',
    marginLeft: 10,
    marginBottom: 5,
  },
  cardText1: {
    color: 'white',
    marginLeft: width/1.75,
    marginBottom: 5,
  },
});

export default Home;
