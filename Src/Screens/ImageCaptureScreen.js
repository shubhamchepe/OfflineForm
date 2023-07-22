import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useSelector, useDispatch} from 'react-redux';
import {updateValue} from '../Redux/Slices/FormSlice';

const ImageCaptureScreen = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  useEffect(() => {
    checkPermission();
  });
  const dispatch = useDispatch();
  const valueToUpdate = useSelector(state => state.value.valueToUpdate);
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    console.log(newCameraPermission);
  };
  const [imageData, setimageData] = useState('');
  const [TakePhotoTapped, setTakePhotoTapped] = useState(false);
  const TakePicture = async () => {
    if (camera !== null) {
      const photo = await camera.current.takePhoto();
      setimageData(photo.path);
      setTakePhotoTapped(false);
      dispatch(updateValue(photo.path));
      console.log(valueToUpdate);
    }
  };
  if (device == null) return <ActivityIndicator />;
  return (
    <View style={{flex: 1}}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo
      />
      {/* <Text style={{color: '#fff', fontSize: 115}}>{valueToUpdate}</Text> */}
      <TouchableOpacity
        style={styles.CaptureButton}
        onPress={() => TakePicture()}></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  CaptureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
});

export default ImageCaptureScreen;
