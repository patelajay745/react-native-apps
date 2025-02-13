import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';

type IconsProps = PropsWithChildren<{
  name: string;
}>;

export default function Icons({name}: IconsProps) {
  switch (name) {
    case 'circle':
      return <Text style={[styles.fontTxt, styles.fontCircle]}>O</Text>;
    case 'cross':
      return <Text style={[styles.fontTxt, styles.fontCross]}>X</Text>;
    default:
      return <Text style={styles.fontTxt}>...</Text>;
  }
}

const styles = StyleSheet.create({
  fontTxt: {
    fontSize: 48,
  },
  fontCircle: {
    color: '#0abf81',
  },
  fontCross: {
    color: '#F4C724',
  },
});
