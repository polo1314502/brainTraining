import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNavigationBar from '../util/BottomNavigationBar';
import SideMenu from './SideMenu';
import { RootStackParamList, RootStackProps } from '../util/RootStackType';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabOne from './TabOne';
import TabTwo from './TabTwo';
import TabThree from './TabThree';
import { useAppDispatch } from '../redux/hook';
import { currentTab } from '../redux/currentTab/currentTabSlice';
import { tabBar } from '../util/tabBar';

const DashBoard = ({ navigation }: RootStackProps) => {

    const Stack = createNativeStackNavigator<RootStackParamList>();

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(currentTab(tabBar[0].navigator))
    }, [])

    return (
        <View style={styles.mainContainer}>
            <SideMenu navigate={navigation} />
                <Stack.Navigator initialRouteName="TabOne" screenOptions={{ headerShown: false }}>
                    <Stack.Group>
                        <Stack.Screen name="TabOne" component={TabOne} />
                        <Stack.Screen name="TabTwo" component={TabTwo} />
                        <Stack.Screen name="TabThree" component={TabThree} />
                    </Stack.Group>
                </Stack.Navigator>
            <BottomNavigationBar navigate={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
});

export default DashBoard;