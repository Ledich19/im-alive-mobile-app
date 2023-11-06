import { DarkTheme, DefaultTheme } from '@react-navigation/native';

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
  // primary: string;
    // notification: string;
}

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    background: '#36D5E8',
    border: '#E2E2E2',
    text: '#343434',
    card: '#A3FEFEBF',
    
    menu: '#1B1F25',
    menuItem: 'white',
    active: '#4B5E7C',

    button: '#2A3547',
    buttonText: 'white',

    tint: '#fff',
    tabIconDefault: '#ccc',
    tabIconSelected: '#2f95dc',
    sign: '#4B5E7C',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
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

    tint: '#fff',
    tabIconDefault: '#ccc',
    tabIconSelected: '#2f95dc',

    
  },
};
