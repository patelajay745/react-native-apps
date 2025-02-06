import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  actionBtn: {
    borderRadius: 12,
    backgroundColor: '#6A1B4D',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  actionBtnTxt: {
    fontSize: 24,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
});

function App(): React.JSX.Element {
  const [bgColor, setBgColor] = useState('#FFFFFF');

  const generateColor = () => {
    const hexRange = '0123456789ABCDEF';
    let color = '#';

    for (let index = 0; index < 6; index++) {
      color += hexRange[Math.floor(Math.random() * 16)];
    }

    setBgColor(color);
  };
  return (
    <>
      <StatusBar backgroundColor={bgColor} />
      <View style={[styles.container, {backgroundColor: bgColor}]}>
        <TouchableOpacity onPress={() => generateColor()}>
          <View style={styles.actionBtn}>
            <Text style={styles.actionBtnTxt}>Press me</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default App;
