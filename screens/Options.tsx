import { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import colors from '../constants/Colors';
import NumberInput from '../components/NumberInput';
import { MessegeInput } from '../components/MessegeInput';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: colors.light.background,
    flex: 1,
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.light.background,
  },
  text: {
    fontSize: 16,
    color: colors.light.text,
  },
  separator: {
    backgroundColor: colors.light.borderColor,
    height: 1,
  },
});

export default () => {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState(`Everything is OK`);

  return (
    <SafeAreaView style={styles.container}>
      <NumberInput
        text="save"
        value={number}
        placeholder="Number"
        onButtonPress={() => alert('todo!')}
        onChangeText={(text) => setNumber(text)}
      />
      <MessegeInput
        text="Save"
        value={message}
        placeholder="Message"
        onButtonPress={() => alert('todo!')}
        onChangeText={(text) => setMessage(text)}
      />
    </SafeAreaView>
  );
};
