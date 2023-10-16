import { StyleSheet, View, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import colors from '../constants/Colors';
import RowItem from '../components/RowItem';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
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
  const colorsa = useTheme().colors;
  console.log(colorsa);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <RowItem /> 
    </View>
  );
};
