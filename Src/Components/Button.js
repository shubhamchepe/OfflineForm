import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Button = ({title,onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.Button,{backgroundColor: title !== 'Registration' ? 'red' : '#4343e6',}]}>
        <Text style={styles.ButtonTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    Button:{
    height:55,
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
    },
    ButtonTitle:{
     color:'#fff',
     fontWeight:'bold',
     fontSize:18
    }
})
export default Button