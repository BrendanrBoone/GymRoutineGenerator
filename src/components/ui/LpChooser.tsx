/**
 * LpChooser.tsx
 * 
 * Keypad for calculation screen
 */
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import defined_colors from './colors';
import Feather from 'react-native-vector-icons/Feather'

type LpChooserProps<P = unknown> = P & {
    dialPadContent: (string | number)[];
    digitLength: number;
    lpChange: number;
    setLpChange: React.Dispatch<React.SetStateAction<number>>;
    dialPadSize: number;
    dialPadTextSize: number;
}

/**
 * Module to choose what amount of LP is lossed or gained
 * "X" is defined to be the backspace
 * "" is defined to be the clear
 * 
 * @param itemLst list of numbers 
 * @returns React.JSX.Element of arrow selector 
 */
export function LpChooser(
    { dialPadContent, digitLength, lpChange, setLpChange, dialPadSize, dialPadTextSize }: LpChooserProps) {

    //determines what is changed on the displayed LP depending on what key is pressed
    const typeLP = (item: (string | number)): void => {
        let lp_string = lpChange.toString();
        const key = (typeof item === 'string') ? item : item.toString();
        if (lp_string.length < digitLength && key != "X") {
            lp_string = lp_string + key;
        } else if (lp_string.length > 0 && key == "X") {
            lp_string = lp_string.slice(0, -1);
        }
        if (lp_string == "" || key == "") {
            lp_string = "0";
        }
        setLpChange(parseInt(lp_string));
    }

    return (
        <FlatList
            data={dialPadContent}
            numColumns={3}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => typeLP(item)}>
                        <View style={[{
                            width: dialPadSize,
                            height: dialPadSize,
                        }, styles.dialPadContainer]}>
                            {item === "X" ? (
                                <Feather name="delete" size={24} color={defined_colors.white} />
                            ) : item === "" ? (
                                <Feather name="refresh-cw" size={24} color={defined_colors.white} />
                            ) : (
                                <Text style={[{ fontSize: dialPadTextSize }, styles.dialPadText]}>
                                    {item}
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    );
}

const styles = StyleSheet.create({
    dialPadContainer: {
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: 10,
        backgroundColor: defined_colors.dark_grey,
        borderColor: defined_colors.sienna,
        borderWidth: 1,
        borderRadius: 50
    },
    dialPadText: {
        color: defined_colors.white,
    },
});