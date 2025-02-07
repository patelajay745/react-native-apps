import {
  Image,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Vibration,
} from 'react-native';

import React, {PropsWithChildren, useState} from 'react';
import DiceOne from '../assets/One.png';
import DiceTwo from '../assets/Two.png';
import DiceThree from '../assets/Three.png';
import DiceFour from '../assets/Four.png';
import DiceFive from '../assets/Five.png';
import DiceSix from '../assets/Six.png';

type DiceProps = PropsWithChildren<{imageurl: ImageSourcePropType}>;

const Dice = ({imageurl}: DiceProps): JSX.Element => {
  return (
    <View>
      <Image style={styles.diceImage} source={imageurl} />
    </View>
  );
};

const styles = StyleSheet.create({
  diceImage: {
    width: 200,
    height: 200,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rollDiceBtnText: {
    marginTop: 10,
    paddingHorizontal: 32,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E0FF',
    fontSize: 16,
    color: '#8FA7F9',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  btn: {
    flex: 0.1,
  },
  imageContainer: {
    justifyContent: 'center',
    flex: 0.9,
  },
});

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function App() {
  const [diceImage, setDiceImage] = useState<
    [ImageSourcePropType, ImageSourcePropType]
  >([DiceOne, DiceOne]);

  const rollDiceOnTap = () => {
    let [imageOne, imageTwo] = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];

    const getDiceImage = (num: number) => {
      switch (num) {
        case 1:
          return DiceOne;
        case 2:
          return DiceTwo;
        case 3:
          return DiceThree;
        case 4:
          return DiceFour;
        case 5:
          return DiceFive;
        case 6:
          return DiceSix;
      }
    };

    setDiceImage([getDiceImage(imageOne), getDiceImage(imageTwo)]);
    Vibration.vibrate(100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Dice imageurl={diceImage[0]} />
        <Dice imageurl={diceImage[1]} />
      </View>
      <Pressable style={styles.btn} onPress={rollDiceOnTap}>
        <Text style={styles.rollDiceBtnText}>Roll the dice</Text>
      </Pressable>
    </View>
  );
}
