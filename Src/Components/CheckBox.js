import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React,{useState} from 'react'

const Radio = ({selected, children,title,onPress = () => {}}) => {
    const [SelectedRadio, setSelectedRadio] = useState(1)
  return (
    <View style={styles.radioButtonContainer}>
      <Text style={styles.RadioText}>Gender</Text>
     <TouchableOpacity onPress={()=> setSelectedRadio(1)}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={styles.radioButton}>
                {SelectedRadio === 1 ? <View style={{backgroundColor:'#6464cc',height:12,width:12,borderRadius:6}}></View> : null}
            </View>
            <Text style={styles.RadioText}>Male</Text>
        </View>
     </TouchableOpacity>
     <TouchableOpacity onPress={()=> setSelectedRadio(2)}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={styles.radioButton}>
            {SelectedRadio === 2 ? <View style={{backgroundColor:'#6464cc',height:12,width:12,borderRadius:6}}></View> : null}
            </View>
            <Text style={styles.RadioText}>Female</Text>
        </View>
     </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
    radioButtonContainer: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
      
      },
      radioButton: {
        height:20,
        width:20,
        borderColor:'#000',
        borderWidth:2,
        borderRadius:10,
        margin:10,
        alignItems:'center',
        justifyContent:'center'
      },
      radioButtonIcon: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: "#98CFB6"
      },
      RadioText: {
        fontSize: 16,
        color:'#000'
      }
})
export default Radio