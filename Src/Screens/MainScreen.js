import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dropdown} from 'react-native-element-dropdown';
import CheckBox from 'react-native-check-box';
import Inputs from '../Components/Inputs';
import Button from '../Components/Button';
import Radio from '../Components/Radio';
import {useSelector, useDispatch} from 'react-redux';
import {
  updateValue,
  updateName,
  updateAddress,
  updateGender,
  updateHobbies,
  updateCountry,
  updatePassword,
  updateVideopath,
} from '../Redux/Slices/FormSlice';
import { valueActions } from '../Redux/Slices/FormSlice'
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const MainScreen = ({navigation}) => {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  useEffect(() => {
    checkPermission();
  });
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    console.log(newCameraPermission);
  };
  const [imageData, setimageData] = useState('');
  const [TakePhotoTapped, setTakePhotoTapped] = useState(false);
  const [ImageError, setImageError] = useState(false)
  const [isChecked, setisChecked] = React.useState({
    Gym: false,
    Reading: false,
    Swimming: false,
  });
  
  const TakePicture = async () => {
    if (camera !== null) {
      const photo = await camera.current.takePhoto();
      setimageData(photo.path);
      setTakePhotoTapped(false);
      console.log(photo.path);
    }
  };
  const dispatch = useDispatch();
  const valueToUpdate = useSelector(state => state.value.valueToUpdate);
  const UpdatedName = useSelector(state => state.value.name);
  const UpdatedGender = useSelector(state => state.value.gender);
  const UpdatedHobbies = useSelector(state => state.value.hobbies)
  const UpdatedCountry = useSelector(state => state.value.country)
  const [inputs, setInputs] = React.useState({
    name: '',
    address: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  console.log(UpdatedHobbies)
  const [SelectedRadio, setSelectedRadio] = useState(1);
  const [ErrorMsg,setErrorMsg] = useState('Register');
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.name) {
      handleError('Please provide your name', 'name');
      valid = false;
    }
    if (!inputs.address) {
      handleError('Please provide your address', 'address');
    }
    if (!inputs.password) {
      handleError('create your password', 'password');
    }
    if(!valueToUpdate){
      setImageError(true)
    }

    dispatch(updateName(inputs.name));
    dispatch(updateAddress(inputs.address));
    dispatch(updateHobbies(isChecked))
    dispatch(updatePassword(inputs.password))
  if(!valueToUpdate || !UpdatedName || !UpdatedGender || !UpdatedHobbies || !UpdatedCountry){
    setErrorMsg('Check All Fields')
  }

  navigation.navigate('ResultScreen')
  };
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const [value, setValue] = useState(null);
  console.log(value)
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    {label: 'India', value: '1'},
    {label: 'Singapore', value: '2'},
    {label: 'Bangladesh', value: '3'},
    {label: 'Malaysia', value: '4'},
    {label: 'Sri Lanka', value: '5'},
    {label: 'China', value: '6'},
    {label: 'France', value: '7'},
    {label: 'Belgium', value: '8'},
  ];
  if (device == null) return <ActivityIndicator />;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={styles.H1}>REGISTER</Text>
        <Text style={styles.H3}>Enter your details</Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              width: '30%',
              height: 90,
              borderRadius: 60,
              borderWidth: ImageError ? 2 : 1,
              borderColor:ImageError ? 'red' : '#000',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.navigate('ImageCaptureScreen');
            }}>
            <Image
              source={require('../../assets/images/photo.png')}
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '30%',
              height: 90,
              borderRadius: 60,
              borderWidth: 1,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }} onPress={() => {
              navigation.navigate('VideoCaptureScreen');
            }}>
            <Image
              source={require('../../assets/images/video.png')}
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
        </View>

        <View style={{marginVertical: 20}}>
          <Inputs
            placeholder="Enter your name"
            label="Name"
            iconName="account"
            error={errors.name}
            onFocus={() => {
              handleError(null, 'name');
            }}
            onChangeText={text => handleOnChange(text, 'name')}
          />
          <Inputs
            placeholder="Enter your address"
            label="Address"
            iconName="home-city"
            error={errors.address}
            onFocus={() => {
              handleError(null, 'address');
            }}
            onChangeText={text => handleOnChange(text, 'address')}
          />
          <Inputs
            placeholder="Enter your password"
            label="password"
            iconName="lock-outline"
            password
            error={errors.password}
            onFocus={() => {
              handleError(null, 'password');
            }}
            onChangeText={text => handleOnChange(text, 'password')}
          />
          {/* Radio button part */}
          <View style={styles.radioButtonContainer}>
            <Text style={styles.RadioText}>Gender</Text>
            <TouchableOpacity onPress={() => {
              setSelectedRadio(1);
              dispatch(updateGender('Male'))
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.radioButton}>
                  {SelectedRadio === 1 ? (
                    <View
                      style={{
                        backgroundColor: '#6464cc',
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                      }}></View>
                  ) : null}
                </View>
                <Text style={styles.RadioText}>Male</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setSelectedRadio(2)
              dispatch(updateGender('Female'))
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.radioButton}>
                  {SelectedRadio === 2 ? (
                    <View
                      style={{
                        backgroundColor: '#6464cc',
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                      }}></View>
                  ) : null}
                </View>
                <Text style={styles.RadioText}>Female</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Check Box Part */}
          <View>
            <View>
              <Text style={{color: '#000', fontSize: 16, marginVertical: 10}}>
                Your Hobbies
              </Text>
            </View>
            <View>
              <CheckBox
                style={{marginBottom: 16}}
                isChecked={isChecked.Gym}
                onClick={() =>{
                  setisChecked({...isChecked, Gym: !isChecked.Gym});
                }
                }
                rightText="Gym"
                rightTextStyle={{
                  fontSize: 19,
                  color: '#000',
                  fontWeight: 'bold',
                }}
                checkBoxColor="red"
              />
              <CheckBox
                style={{marginBottom: 16}}
                isChecked={isChecked.Reading}
                onClick={() =>
                  setisChecked({...isChecked, Reading: !isChecked.Reading})
                }
                rightText="Reading"
                rightTextStyle={{
                  fontSize: 19,
                  color: '#000',
                  fontWeight: 'bold',
                }}
                checkBoxColor="red"
              />
              <CheckBox
                style={{marginBottom: 16}}
                isChecked={isChecked.Swimming}
                onClick={() =>
                  setisChecked({...isChecked, Swimming: !isChecked.Swimming})
                }
                rightText="Swimming"
                rightTextStyle={{
                  fontSize: 19,
                  color: '#000',
                  fontWeight: 'bold',
                }}
                checkBoxColor="red"
              />
            </View>
          </View>
          {/* Drop Down Menu Part*/}
          <View style={styles.dropdowncontainer}>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={{color: '#000'}}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select Country' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                dispatch(updateCountry(item.label))
                setIsFocus(false);
              }}
            />
          </View>
          {/* Drop Down Menu Ends Here */}
          <Button title={ErrorMsg} onPress={validate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  H1: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
  },
  H3: {
    color: '#7d7d7d',
    fontSize: 18,
    marginVertical: 10,
  },
  dropdowncontainer: {
    backgroundColor: 'white',
    marginVertical:30
  },
  dropdown: {
    height: 50,
    borderColor: '#000',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#000',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: '#000',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  radioButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#98CFB6',
  },
  RadioText: {
    fontSize: 16,
    color: '#000',
  },
  CaptureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 300,
    alignSelf: 'center',
  },
});

export default MainScreen;
