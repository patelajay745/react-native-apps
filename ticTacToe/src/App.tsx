import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icons from './components/Icons';
import {Snackbar} from 'react-native-paper';

export default function App() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  let winner: string = '';

  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
    setShowSnackbar(false);
  };

  const checkIsWinner = () => {
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      winner = `${gameState[0]} won the game! 🥳`;
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      winner = `${gameState[3]} won the game! 🥳`;
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      winner = `${gameState[6]} won the game! 🥳`;
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      winner = `${gameState[0]} won the game! 🥳`;
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      winner = `${gameState[1]} won the game! 🥳`;
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      winner = `${gameState[2]} won the game! 🥳`;
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      winner = `${gameState[0]} won the game! 🥳`;
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      winner = `${gameState[2]} won the game! 🥳`;
    } else if (!gameState.includes('empty', 0)) {
      winner = 'Draw game... ⌛️';
    }

    if (winner) {
      setGameWinner(winner);
      setShowSnackbar(true);
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      setShowSnackbar(true);
    } else if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      //do Something if postion is already filled
      setSnackbarText('Position is already filled');
      setShowSnackbar(true);
    }

    checkIsWinner();
  };
  return (
    <>
      <SafeAreaView></SafeAreaView>
      <View style={styles.container}>
        <Pressable style={[styles.btnTurn]}>
          <Text
            style={[
              styles.btnTxt,
              isCross ? styles.btnOneTurn : styles.btnTwoTurn,
            ]}>
            {gameWinner
              ? `${gameWinner}  `
              : `Player ${isCross ? 'X' : 'O'} 's Turn`}
          </Text>
        </Pressable>

        {/* Game Grid */}
        <FlatList
          numColumns={3}
          data={gameState}
          renderItem={({item, index}) => (
            <Pressable
              style={styles.card}
              key={index}
              onPress={() => {
                if (gameWinner) return;
                onChangeItem(index);
              }}>
              <Icons name={item}></Icons>
            </Pressable>
          )}
        />

        <Pressable style={styles.btnReload}>
          <Text style={styles.btnTxt} onPress={reloadGame}>
            {gameWinner ? 'Start new Game' : 'Reload Game'}
          </Text>
        </Pressable>
        <Snackbar
          visible={showSnackbar}
          duration={3000}
          onDismiss={() => {
            setSnackbarText('');
            // setGameWinner('');
            setShowSnackbar(false);
          }}>
          {snackbarText ? snackbarText : gameWinner}
        </Snackbar>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#535C68',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btnTurn: {
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: 20,
  },
  btnOneTurn: {
    color: '#F4C724',
  },
  btnTwoTurn: {
    color: '#0abf81',
  },
  btnTxt: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  gridLayout: {},
  btnReload: {
    backgroundColor: '#BB2CD9',
    marginHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
});
