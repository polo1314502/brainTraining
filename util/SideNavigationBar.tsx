import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { currentTab } from '../redux/currentTab/currentTabSlice';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { hide } from '../redux/sideMenuPopUp/sideMenuPopUpSlice';
import { tabBar, TabType } from './tabBar';

const SideNavigationBar = ({ navigate }) => {

    const dispatch = useAppDispatch()

    const changeTab = async (tab: string) => {
        dispatch(currentTab(tab))
    }

    const sideMenu = useAppSelector((state) => state.sideMenuPopUp.popUp)

    const hideSideMenuPopUp = async () => {
        dispatch(hide())
    }

    const RenderTabBarBtn = (tab: TabType) => {
        return (
                <TouchableOpacity
                style={styles.tabBtn}
                onPress={() => {
                    navigate.navigate(tab.navigator)
                    hideSideMenuPopUp()
                    changeTab(tab.navigator)
                }}>
                <Text style={styles.tabText}>{tab.text}</Text>
            </TouchableOpacity>
        )
    }


    return (
            <Modal
            animationType='fade'
            transparent={true}
            visible={sideMenu}
        >
            <View style={styles.sideNavigationBarContainer}>
                <TouchableOpacity style={styles.closeBtnContainer} onPress={() => {
                    hideSideMenuPopUp()
                }}>
                    <Text style={{ color: 'grey' }}>Close</Text>
                </TouchableOpacity>
                {tabBar.map(tab => <RenderTabBarBtn key={tab.text} text={tab.text} navigator={tab.navigator} />)}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        height: "100%",
        width: '100%',
        backgroundColor: 'transparent',
        zIndex: 999,
    },
    sideNavigationBarContainer:{
        width: "25%", 
        height: "100%", 
        backgroundColor: 'white',
    },
    closeBtnContainer: {
        width: "100%",
        paddingHorizontal: "5%",
        paddingVertical: 15,
        marginTop: 50,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    tabBtn: {
        width: '100%',
        height: 35,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    tabText: {
        color: '#154c79',
    },
});

export default SideNavigationBar;