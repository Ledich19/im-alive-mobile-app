import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import colors from '../constants/Colors';
import RowItem from '../components/RowItem';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: colors.light.background,
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: colors.light.text,
  },
  separator: {
    backgroundColor: colors.light.borderColor,
    height: 1,
  },
  header: {
    alignItems: 'flex-end',
    marginHorizontal: 20,
  },
});

export default () => {
  const colorsa = useTheme().colors;
  console.log(colorsa);

  return (
    <View style={styles.container}>
      <RowItem />
    </View>
  );
};
