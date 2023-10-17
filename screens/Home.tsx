import {useState} from 'react'
import { StyleSheet, View, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import colors from '../constants/Colors';
import RowItem from '../components/RowItem';
import NumberInput from '../components/NumberInput';
import { MessegeInput } from '../components/MessegeInput';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
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
  const colorsa = useTheme().colors;
  console.log(colorsa);
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState(`I'm alive !`);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <RowItem />
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
    </View>
  );
};
