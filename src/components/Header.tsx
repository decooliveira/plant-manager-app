import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image
} from 'react-native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import colors from '../styles/colors';
import userImg  from '../assets/deco.png';
import fonts from '../styles/fonts';
interface HeaderProps {}

export function Header(){

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.username}>Deco</Text>
            </View>
            <Image source={userImg} style={ styles.image}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginTop : getStatusBarHeight()
    },
    greeting:{
        fontSize:32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    username:{
        fontSize: 32,
        fontFamily: fonts.heading,
        color:colors.heading,
        lineHeight:40
    },
    image:{
        width:70,
        height: 70,
        borderRadius:40
    }
});