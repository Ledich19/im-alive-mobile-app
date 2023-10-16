import { StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import colors from '../constants/Colors';
import { RowItemEx } from '../components/RowItemEx';
import RowItem from '../components/RowItem';

const styles = StyleSheet.create({
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
  const colorsa = useTheme().colors;
  console.log(colorsa);

  return (
    <SafeAreaView>
      <RowItemEx
        title="Themes"
        onPress={() => alert('todo!')}
        rightIcon={<Entypo name="adjust" size={24} color="black" />}
      />
      <RowItemEx
        title="React Native Basics"
        onPress={() => alert('todo!')}
        rightIcon={<Entypo name="home" size={24} color="black" />}
      />
      <RowItemEx
        title="React Native by Example"
        onPress={() => alert('todo!')}
        rightIcon={<Entypo name="cog" size={24} color="black" />}
      />
      <RowItem />
    </SafeAreaView>
  );
};
