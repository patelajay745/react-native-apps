import {
  Image,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
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
});

export default function App() {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne);

  const rollDiceOnTap = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;

    switch (randomNumber) {
      case 1:
        setDiceImage(DiceOne);
        break;
      case 2:
        setDiceImage(DiceTwo);
        break;
      case 3:
        setDiceImage(DiceThree);
        break;
      case 4:
        setDiceImage(DiceFour);
        break;
      case 5:
        setDiceImage(DiceFive);
        break;
      case 6:
        setDiceImage(DiceSix);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Dice imageurl={diceImage} />
      <Pressable onPress={rollDiceOnTap}>
        <Text style={styles.rollDiceBtnText}>Roll the dice</Text>
      </Pressable>
    </View>
  );
}
