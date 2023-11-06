import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { BaseTheme } from '../constants/Colors';

const RowItem = ({
  onPress,
  onPressOption,
  text,
}: {
  onPress: () => void;
  onPressOption: () => void;
  text: string;
}) => {
  const colors = useTheme().colors as BaseTheme;
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
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
          {text}
        </Text>
      </View>
      <Entypo name="chevron-right" size={20} color={colors.sign} />
    </TouchableOpacity>
  );
};
export default RowItem;
