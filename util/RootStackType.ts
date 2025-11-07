import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  TabOne: undefined
  TabTwo: undefined
  TabThree: undefined
  Dashboard: undefined
};

export type RootStackProps = NativeStackScreenProps<RootStackParamList>;