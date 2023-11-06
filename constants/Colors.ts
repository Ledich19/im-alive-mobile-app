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
  buttonText: string,
}

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // background: 'white',
    // text: 'black',
    background: '#36D5E8',
    border: '#E2E2E2',
    text: '#343434',
    card: '#A3FEFEBF',
    
    menu: '#1B1F25',
    menuItem: 'white',
    active: '#4B5E7C',

    button: '#2A3547',
    buttonText: 'white',

    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    //
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
    text: 'white',
    border: '#2A3547',
    card: '#A3FEFE40',

    menu: '#1B1F25',
    menuItem: 'white',
    active: '#4B5E7C',

    sign: 'white',
    button: '#36D5E8',
    buttonText: 'white',

    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,

    // primary: string;
    // notification: string;
  },
};
