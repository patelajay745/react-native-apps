import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icons from './components/Icons';

export default function App() {
  return (
    <>
      <SafeAreaView></SafeAreaView>
      <View style={styles.container}>
        <Pressable style={styles.btnTurn}>
          <Text style={styles.btnTxt}> Player's turn</Text>
        </Pressable>
        <View style={styles.gridLayout}>
          <Icons name="circle" />
        </View>
        <Pressable style={styles.btnReload}>
          <Text style={styles.btnTxt}> Reload Game</Text>
        </Pressable>
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
    backgroundColor: '#F4C724',
    marginVertical: 10,
    borderRadius: 5,
    paddingVertical: 20,
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
});
