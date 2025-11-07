import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { hide } from '../redux/sideMenuPopUp/sideMenuPopUpSlice';
import { currentTab } from '../redux/currentTab/currentTabSlice';
import { tabBar, TabType } from './tabBar';
import { RootStackParamList } from './RootStackType';

const BottomNavigationBar = ({ navigate }) => {

    const routeNameArr: Array<keyof RootStackParamList> = [
        'TabOne',
        'TabTwo',
        'TabThree'
    ]

    let tabBarArr: string[] = [...routeNameArr]

    const dispatch = useAppDispatch()

    const selectedTab = useAppSelector((state) => state.currentTab.tab)
    const previousTab = useAppSelector((state) => state.currentTab.previousTab)

    const positionAnim = useRef(new Animated.Value(0)).current;

    const changeTab = async (tab: string) => {
        dispatch(currentTab(tab))
    }

    const hideSideMenuPopUp = async () => {
        dispatch(hide())
    }

    const triggerTabBarAnim = () => {
        Animated.timing(positionAnim, {
            toValue: tabBarArr.indexOf(selectedTab) * (100 / (tabBarArr.length - 1)),
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    const RenderTabBarBtn = (tab: TabType) => {

        const textSizeAnim = useRef(new Animated.Value(
            previousTab == tab.navigator ? 1.2
                : 1
        )).current;
        const textColorAnim = useRef(new Animated.Value(
            previousTab == tab.navigator ? 100
                : 0
        )).current

        const triggerChangeTabAnim = () => {
            Animated.parallel([
                Animated.timing(textSizeAnim, {
                    toValue: selectedTab == tab.navigator ? 1.2 : 1,
                    duration: 500,
                    useNativeDriver: false,
                }),
                Animated.timing(textColorAnim, {
                    toValue: selectedTab == tab.navigator ? 100 : 0,
                    duration: 500,
                    useNativeDriver: false,
                }),
            ]).start()
        }

        useEffect(() => {
            triggerChangeTabAnim()
            triggerTabBarAnim()
        }, [tab.navigator])

        return (
            <TouchableOpacity
                style={[styles.tabBtn,{
                    width: `${100 / tabBarArr.length}%`,
                }]}
                onPress={() => {
                    changeTab(tab.navigator)
                    navigate.navigate(tab.navigator)
                    hideSideMenuPopUp()
                }}>
                <Animated.Text style={{
                    color: textColorAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['black', '#154c79']
                    }),
                    transform: [{ scale: textSizeAnim }]
                }}>
                    {tab.text}
                </Animated.Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <Animated.View
                style={[styles.tabBarLine, {
                    width: `${100 / tabBarArr.length}%`,
                    transform: [{
                        translateX: positionAnim.interpolate({
                            inputRange: [0, 100],
                            outputRange: [0, Dimensions.get('window').width / tabBarArr.length * (tabBarArr.length - 1)]
                        })
                    }],
                }]}>
            </Animated.View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {tabBar.map(tab => <RenderTabBarBtn key={tab.text} text={tab.text} navigator={tab.navigator} />)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '10%',
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
    },
    tabBarLine: {
        backgroundColor: '#154c79',
        height: 6,
    },
    tabBtn: {
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BottomNavigationBar;