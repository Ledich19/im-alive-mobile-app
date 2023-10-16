import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import colors from '../constants/Colors';

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  title: {
    color: colors.light.text,
    fontSize: 16,
  },
  separator: {
    backgroundColor: colors.light.borderColor,
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
  },
});

export const RowItemEx = ({
  title,
  onPress,
  rightIcon,
}: {
  title: string;
  onPress: () => void;
  rightIcon: React.JSX.Element;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.row}>
    <Text style={styles.title}>{title}</Text>
    {rightIcon}
  </TouchableOpacity>
);

export const RowSeparator = () => <View style={styles.separator} />;
