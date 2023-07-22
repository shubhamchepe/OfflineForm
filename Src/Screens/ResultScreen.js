import { View, Text,Image } from 'react-native'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux';

const ResultScreen = () => {
  const valueToUpdate = useSelector(state => state.value.valueToUpdate);
  const UpdatedName = useSelector(state => state.value.name);
  const UpdatedGender = useSelector(state => state.value.gender);
  const UpdatedHobbies = useSelector(state => state.value.hobbies)
  const UpdatedPassword = useSelector(state => state.value.password)
  const USerObject = useSelector(state => state)
  console.log(USerObject)
  return (
    <View>
      <Text style={{color:'#000'}}>{valueToUpdate}</Text>
      <Image source={{uri:'file://' + valueToUpdate}} style={{width:'80%',height:150}}/>
      <Text style={{color:'#000'}}>{UpdatedName}</Text>
      <Text style={{color:'#000'}}>{UpdatedGender}</Text>
      <Text style={{color:'#000'}}>{UpdatedPassword}</Text>
    </View>
  )
}

export default ResultScreen