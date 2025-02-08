import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {currencyByRupee} from './constants';
import CurrencyButton from './conponents/CurrencyButton';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      // return Snackbar.show({
      //   text: 'Enter a value to conveter',
      //   backgroundColor: '#EA7773',
      //   textColor: '#000000',
      // });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const converterValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${converterValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      // return Snackbar.show({
      //   text: 'Not a valid number to convert',
      //   backgroundColor: '#F4BE2C',
      //   textColor: '#000000',
      // });
    }
  };
  return (
    <>
      <SafeAreaView></SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.rupee}>₹</Text>
              <TextInput
                style={styles.txtInput}
                maxLength={14}
                value={inputValue}
                clearButtonMode="always"
                onChangeText={setInputValue}
                keyboardType="number-pad"
                placeholder="Enter amount in Rupees"></TextInput>
            </View>
          </View>
          {resultValue && <Text style={styles.resultTxt}>{resultValue}</Text>}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={3}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <Pressable
                style={[
                  styles.button,
                  targetCurrency === item.name && styles.selected,
                ]}
                onPress={() => buttonPressed(item)}>
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1d1d1',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bottomContainer: {
    flex: 3,
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    width: 250,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    padding: 15,
    gap: 10,
    borderRadius: 10,
  },
  txtInput: {
    fontSize: 18,
    width: 200,
  },
  rupee: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
    textAlign: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});
