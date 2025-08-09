/**
 * PlayerButton.tsx
 * 
 * Button module for the Players and their displayed LP
 */
import React from 'react';
import { 
    StyleSheet,
    Text,
    Pressable,
    ViewStyle,
    TextStyle
 } from 'react-native';
 import defined_colors from './colors';

interface Props {
    onPress: () => void;
    flipped?: boolean;
}

type PlayerButtonProps<P = unknown> = P & {
    children?: React.ReactNode | undefined;
    color?: string | undefined;
    color_pressed?: string | undefined;
    disabled?: boolean | undefined;
}

/**
 * Big button that takes up half the screen
 * displays its children very largely
 * 
 * @param param0 
 * @returns 
 */
export function PlayerButton({onPress, children, color, color_pressed, flipped, disabled}: PlayerButtonProps<Props>) {
    return (
        <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({pressed}) => [
            {backgroundColor: pressed ? color_pressed : color},
            flipped ? styles.flippedContainer : styles.container
        ]}>
            <Text style={flipped ? styles.flippedText : styles.text}>
                {children}
            </Text>
        </Pressable>
    )
}

interface Styles {
    container: ViewStyle;
    flippedContainer: ViewStyle;
    text: TextStyle;
    flippedText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    flippedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        transform: [{rotate: "180deg"}]
    },
    text: {
        textAlign: 'center',
        color: defined_colors.white,
        fontSize: 100
    },
    flippedText: {
        textAlign: 'center',
        color: defined_colors.white,
        fontSize: 100
    }
});