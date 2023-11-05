import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, View, Modal, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Entypo } from '@expo/vector-icons';
// import colors from '../constants/Colors';
import { useTheme } from '@react-navigation/native';


interface IProps {
  value: string;
  placeholder: string;
  // eslint-disable-next-line no-unused-vars
  onChangeText: (text: string) => void;
}

const NumberInput = ({ value, onChangeText, placeholder }: IProps) => {
  const colors = useTheme().colors;
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      borderRadius: 5,
      marginTop: 16,
    },
    input: {
      flex: 1,
      backgroundColor: '#EBEBF599',
      borderTopLeftRadius: 13,
      borderBottomLeftRadius: 13,
      height: 40,
      paddingLeft: 40,
      fontSize: 18,
    },
  
    contactButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EBEBF599',
      borderTopRightRadius: 13,
      borderBottomRightRadius: 13,
      borderTopLeftRadius: 13,
      borderBottomLeftRadius: 13,
      width: 40,
      height: 40,
      position: 'absolute',
      zIndex: 5,
    },
  
    contactIcon: {
      fontSize: 24,
    },
    contactModalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contactModalContent: {
      width: '80%',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    contactListItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    contactListItemText: {
      fontSize: 18,
    },
  });
  
  // const [contactName, setContactName] = useState('');
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data);
      }
    }
  };
  const handleModalVisible = () => {
    setModalVisible(true);
    fetchContacts();
  };

  const handleContactPress = (contact: Contacts.Contact) => {
    const { phoneNumbers } = contact;
    if (phoneNumbers) {
      const selectedPhoneNumber = phoneNumbers[0]?.number;
      onChangeText(`${selectedPhoneNumber}`);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.contactButton} onPress={handleModalVisible}>
        <Entypo name="book" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType="phone-pad"
        // editable={false}
      />
      {/* <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity> */}

      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.contactModalContainer}>
          <View style={styles.contactModalContent}>
            <FlatList
              data={contacts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.contactListItem}
                  onPress={() => handleContactPress(item)}
                >
                  <Text style={styles.contactListItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NumberInput;
