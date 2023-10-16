import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import colors from '../constants/Colors';

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.light.card,
    borderRadius: 13,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'

    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});

const RowItem = () => {
  return (
    <TouchableOpacity style={styles.row}>
      <Entypo name="message" size={60} color="black" />
      <Text style={styles.text}>I&lsquo;m alive</Text>
      <Entypo name="chevron-right" size={20} color={colors.light.sign} />
    </TouchableOpacity>
  );
};
export default RowItem;
