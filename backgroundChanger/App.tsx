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
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingVertical: 20,
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
  square: {
    width: 100,
    height: 100,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginTop: 10,
  },
});

function App(): React.JSX.Element {
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [squareColor, setSquareColor] = useState('#FFFFFF');
  const [circleColor, setCircleColor] = useState('#FFFFFF');

  const generateColor = () => {
    const hexRange = '0123456789ABCDEF';
    let color = '#';
    let sColor = '#';
    let cColor = '#';

    for (let index = 0; index < 6; index++) {
      color += hexRange[Math.floor(Math.random() * 16)];
      sColor += hexRange[Math.floor(Math.random() * 16)];
      cColor += hexRange[Math.floor(Math.random() * 16)];
    }

    setBgColor(color);
    setSquareColor(sColor);
    setCircleColor(cColor);
  };
  return (
    <>
      <SafeAreaView></SafeAreaView>
      <View style={[styles.container, {backgroundColor: bgColor}]}>
        <View>
          <View style={[styles.square, {backgroundColor: squareColor}]} />
          <View style={[styles.circle, {backgroundColor: circleColor}]} />
        </View>
        <View>
          <TouchableOpacity onPress={() => generateColor()}>
            <View style={styles.actionBtn}>
              <Text style={styles.actionBtnTxt}>Press me</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default App;
