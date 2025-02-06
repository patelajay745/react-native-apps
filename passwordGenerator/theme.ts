export interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  card: string;
  error: string;
  disabled: string;
  success: string;
  warning: string;
  border: string;
  btnText: string;
}

export const lightColors: ThemeColors = {
  background: '#FFFFFF',
  text: '#000000',
  primary: '#74B9FF',
  secondary: '#DAE0E2',
  card: '#EAF0F1',
  error: 'red',
  disabled: '#bdc3c7',
  success: '#29AB87',
  warning: '#FED85D',
  border: 'black',
  btnText: 'white',
};

export const darkColors: ThemeColors = {
  background: '#121212',
  text: '#FFFFFF',
  primary: '#74B9FF',
  secondary: '#2C3E50',
  card: '#2C3E50',
  error: '#FF6B6B',
  disabled: '#505050',
  success: '#29AB87',
  warning: '#FED85D',
  border: 'white',
  btnText: 'black',
};
