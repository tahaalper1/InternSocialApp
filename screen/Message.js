import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

export default function Message({ messageData = []}) {
  return (
    <View style={styles.container}>
      {messageData.map((Des, index) => (
        <View key={index} style={styles.cardContainer}>
          <Card containerStyle={styles.card}>
            <Card.Title style={styles.title}>{Des.baslik}</Card.Title>
            <Card.Divider />
            <Text style={styles.cardText}>{Des.bölüm}</Text>
          </Card>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
  cardContainer: {
    marginHorizontal: 10,
    marginVertical: 15,
  },
  card: {
    borderWidth: 1.5,
    borderColor: '#008080',
    borderRadius: 15,
    marginBottom: 8,
    backgroundColor: '#008080',
    marginTop: 10,
  },
});
