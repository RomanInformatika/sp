import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setParallels } from "../redux/filterSlice"

// crap

export const ParallelSwitch = (props) => {
    const { label } = props
    const [isEnabled, setIsEnabled] = useState(false);   

    const setParallelD = useDispatch()
    const switchState = useSelector(state=>state.filter.parallels)

    useEffect(() => {
        setIsEnabled(switchState[label]==true)
    }, [])

    useEffect(() => {
        setParallelD(setParallels({[label]: isEnabled}))

    }, [isEnabled])
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
    
    };

    return (
        <View style={styles.container}>
            <Text>{label}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // flex: 1,
        backgroundColor: '#8888FF',
        alignItems: "center",
        justifyContent: "flex-start",
        height: 50,
    }
});