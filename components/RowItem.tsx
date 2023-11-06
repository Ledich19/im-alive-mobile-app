import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { BaseTheme } from '../constants/Colors';

const RowItem = ({
  onPress,
  onPressOption,
  text,
  index,
}: {
  onPress: () => void;
  onPressOption: () => void;
  text: string;
  index: number;
}) => {
  const colors = useTheme().colors as BaseTheme;

  const generateColorBasedOnIndex = (i: number, baseColor: string) => {
    const alpha = 0.4; 
    const colorComponents = baseColor.match(/[A-Fa-f\d]{2}/g);
  
    if (colorComponents && colorComponents.length === 4) {
      const red = parseInt(colorComponents[0], 16);
      const green = parseInt(colorComponents[1], 16);
      const blue = parseInt(colorComponents[2], 16);
      const step = 5;
  
      const newRed = Math.min(255, red + i * step);
      const newGreen = Math.min(255, green + i * step);
      const newBlue = Math.min(255, blue + i * step);
  
      const newColor = `rgba(${newRed}, ${newGreen}, ${newBlue}, ${alpha})`;
      return newColor;
    }
  
    return baseColor;
  };

  const styles = StyleSheet.create({
    row: {
      backgroundColor: generateColorBasedOnIndex(index, colors.card),
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
      <Entypo name="message" size={60} color="rgba(0, 0, 0, 0.6)" />
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
