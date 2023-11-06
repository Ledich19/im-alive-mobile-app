import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export interface BaseTheme {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  menu: string;
  menuItem: string;
  active: string;
  sign: string;
  button: string,
}

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // background: 'white',
    // text: 'black',
    text: '#343434',
    border: '#E2E2E2',
    menu: '#1B1F25',
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
    background: '#2A3547',

    menu: '#1B1F25',
    menuItem: 'white',
    active: '#4B5E7C',

    card: '#A3FEFE40',
    sign: 'white',
    text: 'white',
    border: '#2A3547',
    button: '#36D5E8',

    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,

    // primary: string;
    // notification: string;
  },
};
