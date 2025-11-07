import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackType';
import DashBoard from '../src/Dashboard';

const rootStack = createNativeStackNavigator<RootStackParamList>();

const AllStackScreen = () => {
    return (
        <rootStack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
            <rootStack.Group>
                <rootStack.Screen name="Dashboard" component={DashBoard} />
            </rootStack.Group>
        </rootStack.Navigator>
    )
}

export default AllStackScreen 