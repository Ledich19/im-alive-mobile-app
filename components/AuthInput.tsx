import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    height: 40,
  },
  icon: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  input: {
    flex: 1,
  },
});

type TAuthInput = {
  placeholder: string;
  modifyStyle: [];
  state: string;
  borderColor: string;
  onFocus: () => void;
  inputWrapStyle: [];
};

const AuthInput: React.FC<TAuthInput> = ({
  placeholder,
  modifyStyle,
  state,
  borderColor = '#1e90ff',
  onFocus = () => {},
  inputWrapStyle,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View
      style={{
        ...styles.wrap,
        ...inputWrapStyle,
        borderColor: isFocus ? borderColor : '#f0f8ff',
      }}
    >
      <TextInput
        style={{ ...styles.input, ...modifyStyle }}
        placeholder={placeholder ?? ''}
        value={state}
        onFocus={() => {
          onFocus();
          setIsFocus(true);
        }}
      />
    </View>
  );
};

export default AuthInput;
