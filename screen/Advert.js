import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import firebase from 'firebase/compat';
import Message from './Message';

export default function Advert() {
  const [descriptions, setDescriptions] = useState([]);
  const [messageData, setMessageData] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('descriptions')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        const descriptionList = [];
        snapshot.forEach((doc) => {
          descriptionList.push({ id: doc.id, ...doc.data() });
        });
        setDescriptions(descriptionList);
      });

    return () => unsubscribe();
  }, []);

  const handleDeleteDescription = async (descriptionId) => {
    try {
      await firebase.firestore().collection('descriptions').doc(descriptionId).delete();
    } catch (error) {
      console.error('Veri silinirken bir hata oluştu:', error);
    }
  };

  const handleAddDescription = (description) => {
    setMessageData([...messageData, description]);
    console.log('Yeni sınıfa başarıyla eklendi');
  };

  const renderSwipeableCard = (description) => {
    const swipeableRef = React.createRef();

    return (
      <GestureHandlerRootView>
        <Swipeable
          ref={swipeableRef}
          friction={2}
          leftThreshold={30}
          rightThreshold={40}
          overshootLeft={false}
          overshootRight={false}
          renderRightActions={(progress, dragX) => (
            <View style={styles.rightSwipeActions}>
              <Text style={styles.swipeActionText}>Sil</Text>
            </View>
          )}
          onSwipeableRightWillOpen={() => handleDeleteDescription(description.id)}
          renderLeftActions={(progress, dragX) => (
            <View style={styles.leftSwipeActions}>
              <Text style={styles.swipeActionText}>Ekle</Text>
            </View>
          )}
          onSwipeableLeftWillOpen={() => handleAddDescription(description)}
        >
          <Card containerStyle={styles.card}>
            <Card.Title style={styles.Text}>{description.baslik}</Card.Title>
            <Card.Divider />
            <Text style={styles.Text}>{description.bölüm}</Text>
          </Card>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, top: 100 }}>
      {descriptions.map((description) => (
          <View key={description.id} style={styles.cardContainer}>
            {renderSwipeableCard(description)}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Text: {
    textAlign: 'center',
    color: 'white',
  },
  cardContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  card: {
    borderWidth: 1.5,
    borderColor: '#008080',
    borderRadius: 15,
    marginBottom: 8,
    backgroundColor: '#008080',
  },
  rightSwipeActions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    backgroundColor: 'red',
  },
  leftSwipeActions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    backgroundColor: 'green',
  },
  swipeActionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
