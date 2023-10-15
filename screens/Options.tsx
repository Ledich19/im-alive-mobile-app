import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default () => {
  return (
    <View style={styles.container}>
      <Text>Options</Text>
      <StatusBar style="auto" />
      <TouchableOpacity>
        <Text>Themes</Text>
      </TouchableOpacity>
    </View>
  );
};
