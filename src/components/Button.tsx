import React from 'react';
import { TouchableOpacity, 
    Text, 
    StyleSheet, 
    TouchableOpacityProps } from 'react-native';

import colors from '../styles/colors';
import fonts  from '../styles/fonts';
interface ButtonProps extends TouchableOpacityProps{
    title: string
}

export function Button({ title, ...props }: ButtonProps){

    return(
        <TouchableOpacity 
            activeOpacity = { 0.7 }
            style = { styles.container }
            { ...props }>

            <Text style = { styles.buttonText }>
                { title }
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
 
    container: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        height: 56,
    },
    
    buttonText: {
        color: colors.white,
        fontSize: 24,
        fontFamily: fonts.heading
    }
});