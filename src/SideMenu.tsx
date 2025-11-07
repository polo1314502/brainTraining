import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Button, TouchableOpacity, Modal } from 'react-native';
import SideNavigationBar from '../util/SideNavigationBar';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { hide, show } from '../redux/sideMenuPopUp/sideMenuPopUpSlice';


const SideMenu = ({ navigate }) => {

    const dispatch = useAppDispatch()

    const sideMenu = useAppSelector((state) => state.sideMenuPopUp.popUp)

    const showSideMenuPopUp = async () => {
        dispatch(show())
    }

    useEffect(()=>{
        dispatch(hide())
    },[])

    return (
        <View style={[styles.mainContainer]}>
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.sideMenuBtn} onPress={() => {
                    showSideMenuPopUp()
                }
                }>
                    <Text style={styles.sideMenuBtnText}>Menu</Text>
                </TouchableOpacity>
            </View>
            {sideMenu && <SideNavigationBar navigate={navigate} />}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: "10%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    sideMenuBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: "30%",
        zIndex: 999,
    },
    topBar: {
        width: "100%",
        height: "5%",
    },
    sideMenuBtnText: {
        color: 'grey',
    },
});

export default SideMenu;