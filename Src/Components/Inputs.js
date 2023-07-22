import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState} from 'react';

const Inputs = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setisFocused] = React.useState(false);
  const [HidePass, setHidePass] = React.useState(password);
  return (
    <View style={{marginBottom: 20}}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {borderColor: error ? 'red' : isFocused ? '#000' : '#fff'},
        ]}>
        <Icon name={iconName} style={styles.IconStyle} />
        <TextInput
        secureTextEntry={HidePass}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setisFocused(true);
          }}
          onBlur={() => {
            setisFocused(false);
          }}
          style={styles.TextInput}
          {...props}
        />
        {password && <Icon onPress={()=>setHidePass(!HidePass)} style={{fontSize:22,color:'#5e5ec4'}} name={HidePass ? "eye-outline" : "eye-off-outline"} /> }
      </View>
      {error && (
        <Text style={{color: 'red', fontSize: 12, marginTop: 7}}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#000',
    fontSize: 14,
    marginVertical: 5,
  },
  inputContainer: {
    height: 55,
    backgroundColor: '#c5c5e6',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: 'center',
  },
  IconStyle: {
    fontSize: 22,
    color: '#000',
    marginRight: 10,
  },
  TextInput: {
    flex: 1,
    color: '#4949d1',
  },
});

export default Inputs;
