/**
 * DemoButton.tsx
 * 
 * Button module
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
}

type DemoButtonProps<P = unknown> = P & {
    children?: React.ReactNode | undefined;
    color?: string | undefined;
    color_pressed?: string | undefined;
    flipped?: boolean | undefined
}

/**
 * general button that can be specified if it is oriented upside down or not
 * 
 * @param param0 
 * @returns 
 */
export function DemoButton({onPress, children, color, color_pressed, flipped}: DemoButtonProps<Props>) {
    return (
        <Pressable
        onPress={onPress}
        style={({pressed}) => [
            {backgroundColor: pressed ? color_pressed : color},
            styles.container
        ]}>
            <Text style={flipped ? styles.flippedText : styles.text}>
                {children}
            </Text>
        </Pressable>
    )
}

interface Styles {
    container: ViewStyle;
    text: TextStyle;
    flippedText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        minWidth: '45%',
        maxWidth: '100%',
        marginHorizontal: 8,
        marginVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: defined_colors.sienna
    },
    text: {
        textAlign: 'center',
        color: defined_colors.bright_orange,
        fontSize: 30
    },
    flippedText: {
        textAlign: 'center',
        color: defined_colors.bright_orange,
        fontSize: 30,
        transform: [{scaleX: -1}]
    }
});