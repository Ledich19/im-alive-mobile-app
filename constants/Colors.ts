import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // background: 'white',
    // text: 'black',
    text: '#343434',
    border: '#E2E2E2',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    //
    background: '#36D5E8',
    card: '#A3FEFEBF',
    sign: '#4B5E7C',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    // background: 'black',
    // text: 'white',
    sign: '#4B5E7C',
    text: '#fff',
    border: '#E2E2E2',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
