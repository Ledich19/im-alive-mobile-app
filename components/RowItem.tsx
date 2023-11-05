import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';



const RowItem = ({
  onPress,
  onPressOption,
}: {
  onPress: () => void;
  onPressOption: () => void;
}) => {
  const colors = useTheme().colors;
  const styles = StyleSheet.create({
    row: {
      backgroundColor: colors.card,
      borderRadius: 13,
      padding: 16,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      marginTop: 16,
    },
    text: {
      fontSize: 18,
      fontWeight: '500',
    },
  });
  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <Entypo name="cog" size={35} color={colors.sign} onPress={onPressOption} />
      <Entypo name="message" size={60} color="black" />
      <Text style={styles.text}>I&lsquo;m alive</Text>
      <Entypo name="chevron-right" size={20} color={colors.sign} />
    </TouchableOpacity>
  );
};
export default RowItem;
