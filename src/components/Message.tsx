import { StyleSheet, View } from 'react-native';
import React from 'react';

import { Text } from './Themed';

type TMessage = {
  name: string;
  message: string;
  time: { seconds: number };
};

const Message: React.FC<TMessage> = ({ name, message, time }) => {
  const deteSent = new Date(time.seconds * 1000).getDate();
  const isTodayday = new Date().getDate();

  const isSendToday = deteSent === isTodayday;

  const classForText = isSendToday ? 'textGreen' : 'textRed';

  return (
    <View style={styles.messageWrap}>
      <View style={{}}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={{ ...styles[classForText], ...styles.messageText }}>
        {isSendToday ? <Text>{message}</Text> : <Text>Waiting for message</Text>}
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
    padding: 16,
    borderRadius: 13,
    height: 112,
    rowGap: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  name: { fontSize: 26 },
  messageText: { padding: 10, borderRadius: 10, marginLeft: 20 },
  textRed: { backgroundColor: '#FF3B30' },
  textGreen: { backgroundColor: '#32D74B' },
});
