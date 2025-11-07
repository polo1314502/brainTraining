import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const StatusRow = () => {

    const [valueArr, setValueArr] = useState(new Array(4).fill(0))

    const resetValue = () => {
        let temp = []
        for (let i = 0; i < valueArr.length; i++) {
            temp.push(Math.random())
        }
        setValueArr(temp)
    }

    useEffect(()=>{
        resetValue()
    },[])

    const StatusRowItem = ({value, idx}) => {

        return (
            <View style={{flexDirection:'row', alignItems:'center', width: 300, marginVertical: 5}}>
                <View style={{width: 50, height: 50, 
                    backgroundColor: value>0.5?"green":"red", 
                    marginRight:20}}>

                </View>
                {idx == 3 && value<=0.5?
                <View>
                    <Text>
                        Pending
                    </Text>
                </View>
                :
                <View>
                <Text>
                    Status {idx + 1}
                </Text>
            </View>
                }
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            {valueArr.map((value, idx)=>
                <StatusRowItem key={`${value}_${idx}`} value={value} idx={idx}/>
            )}
            <TouchableOpacity style={styles.resetBtn} onPress={() => { resetValue() }}>
                <Text>Reset</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        borderRadius: 16,
        padding: 8,
        marginVertical: 16,
    },
    resetBtn: {
        backgroundColor: 'yellow',
        padding: 4,
        borderRadius: 4,
        marginVertical: 4,
    },
});

export default StatusRow;