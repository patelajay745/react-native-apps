import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';

import {Icon} from '@rneui/themed';

type IconsProps = PropsWithChildren<{
  name: string;
}>;

export default function Icons({name}: IconsProps) {
  switch (name) {
    case 'circle':
      return <Icon name="circle" />;
    case 'cross':
      return <Icon name="cross" size={38} color={'#38CC77'} />;
    default:
      return <Icon name="pencil" size={38} color={'#0D0D0D'} />;
  }
}

const styles = StyleSheet.create({});
