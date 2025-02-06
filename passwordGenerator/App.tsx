import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Appearance,
  useColorScheme,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { darkColors, lightColors, ThemeColors } from './theme';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min. 4 Characters')
    .max(16, 'Should be max. of 16 characters')
    .required('Length is required'),
});

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    appContainer: {},
    formContainer: {
      paddingHorizontal: 18,
      paddingVertical: 20,
    },
    title: {
      fontSize: 30,
      fontWeight: '800',
      color: colors.text,
    },
    inputWrapper: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    formActions: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    inputColumn: {
      flex: 1,
      justifyContent: 'center',
    },
    inputStyle: {
      width: 150,
      fontSize: 18,
      borderRadius: 4,
      borderColor: colors.border,
      borderWidth: 1,
      paddingVertical: 10,
      paddingHorizontal: 4,
      color: colors.text,
    },
    heading: {
      fontSize: 18,
      color: colors.text,
    },
    errorText: {
      color: 'red',
    },
    primaryBtn: {
      width: 150,
      height: 70,
      backgroundColor: '#74B9FF',
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 10,
    },
    resetBtn: {
      width: 150,
      height: 70,
      backgroundColor: '#DAE0E2',
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 10,
      justifyContent: 'center',
    },
    primaryBtnTxt: {
      textAlign: 'center',
      color: colors.btnText,
      fontWeight: '600',
      fontSize: 16,
    },
    resetTxt: {
      textAlign: 'center',
      color: colors.btnText,
      fontWeight: '600',
      fontSize: 16,
    },
    card: {
      flex: 1,
      height: 150,
      marginTop: 10,
      marginHorizontal: 18,
    },
    cardElevated: {
      backgroundColor: '#EAF0F1',
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    generatedPassword: {
      fontSize: 30,
    },
    description: {
      color: '#A4B0BD',
      fontWeight: '600',
    },
    disabledBtn: {
      backgroundColor: '#bdc3c7',
      opacity: 0.7,
    },
  });

const styles = StyleSheet.create({
  appContainer: {},
  formContainer: {
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
  },
  titleDark: {
    fontSize: 30,
    fontWeight: '800',
    color: 'white',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  formActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  inputColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  inputStyle: {
    width: 150,
    fontSize: 18,
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  heading: {
    fontSize: 18,
  },
  errorText: {
    color: 'red',
  },
  primaryBtn: {
    width: 150,
    height: 70,
    backgroundColor: '#74B9FF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  resetBtn: {
    width: 150,
    height: 70,
    backgroundColor: '#DAE0E2',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  primaryBtnTxt: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  resetTxt: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    flex: 1,
    height: 150,
    marginTop: 10,
    marginHorizontal: 18,
  },
  cardElevated: {
    backgroundColor: '#EAF0F1',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generatedPassword: {
    fontSize: 30,
  },
  description: {
    color: '#A4B0BD',
  },
  disabledBtn: {
    backgroundColor: '#bdc3c7',
    opacity: 0.7,
  },
});

export default function App() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;
  const styles = createStyles(colors);

  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const [upperCase, setUpperCase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = (passwordLength: number) => {
    let characterList = '';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += uppercaseChars;
    } else if (lowercase) {
      characterList += lowercaseChars;
    } else if (numbers) {
      characterList += digitChars;
    } else if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i <= passwordLength; i++) {
      const chracterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(chracterIndex);
    }

    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setUpperCase(false);
    setLowercase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={(values) => {
              console.log(values);
              generatePassword(+values.passwordLength);
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              isSubmitting,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                  ></TextInput>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include LowerCase</Text>
                  <BouncyCheckbox
                    isChecked={lowercase}
                    onPress={() => {
                      setLowercase(!lowercase);
                    }}
                    fillColor="#29AB87"
                  ></BouncyCheckbox>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include UpperCase</Text>
                  <BouncyCheckbox
                    isChecked={upperCase}
                    onPress={() => {
                      setUpperCase(!upperCase);
                    }}
                    fillColor="#FED85D"
                  ></BouncyCheckbox>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#C9A0DC"
                  ></BouncyCheckbox>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#FC80A5"
                  ></BouncyCheckbox>
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={
                      !isValid ||
                      !(lowercase || upperCase || numbers || symbols)
                    }
                    style={[
                      styles.primaryBtn,
                      (!isValid ||
                        !(lowercase || upperCase || numbers || symbols)) &&
                        styles.disabledBtn,
                    ]}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}
                    style={styles.resetBtn}
                  >
                    <Text style={styles.resetTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text selectable={true} style={styles.generatedPassword}>
              {password}
            </Text>
            <Text style={styles.description}>Long press to copy</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}
