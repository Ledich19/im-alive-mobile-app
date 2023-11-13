import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type TMessage = {
  name: string;
  message: string;
  time: { seconds: number };
};

const Message: React.FC<TMessage> = ({ name, message, time }) => {
  const deteSent = new Date(time.seconds * 1000).getDate();
  const isTodayday = new Date().getDate();

  const classForText = deteSent === isTodayday ? 'textGreen' : 'textRed';
  return (
    <View style={styles.messageWrap}>
      <View style={{}}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={{ ...styles[classForText], ...styles.messageText }}>
        {isTodayday ? <Text>Waiting for message</Text> : <Text>{message}</Text>}
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  messageWrap: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    height: 60,
  },
  name: { fontSize: 26 },
  messageText: { padding: 10, borderRadius: 10, marginLeft: 20 },
  textRed: { backgroundColor: 'red' },
  textGreen: { backgroundColor: 'green' },
});
