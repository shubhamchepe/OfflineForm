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

const VideoCaptureScreen = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const cameraRef = useRef(null);
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
  const [RecordingStarted, setRecordingStarted] = useState(false);
  const startRecording = async () => {
    setRecordingStarted(true);
    try {
      const videoConfig = {
        enabled: true,
        filename: 'my_video.mp4', // Replace with your desired filename
        quality: 'H264', // Use 'HEVC' or 'H264' depending on your needs
        onRecordingError: (error) => {
            console.log('Error recording video:', error);
            setRecordingStarted(false);
          },
          onRecordingFinished: (video) => {
            console.log('Video recorded:', video);
            setRecordingStarted(false);
          },
      };
      await cameraRef.current.startRecording(videoConfig);
    } catch (error) {
      console.log('Error starting video recording:', error);
      setRecordingStarted(false);
    }
  };

  const stopRecording = async () => {
    setRecordingStarted(false);
    try {
      const video = await cameraRef.current.stopRecording();
      console.log('Video recorded:', video);
    } catch (error) {
      console.log('Error stopping video recording:', error);
    }
  };
  const RecordVideo = async () => {
    if (cameraRef !== null) {
      setRecordingStarted(true);
      const video = await cameraRef.current.startRecording();
      //setimageData(photo.path);
      //setTakePhotoTapped(false);
      //dispatch(updateValue(photo.path));
      console.log(video);
    }
  };

  const StopRecording = async () => {
    await cameraRef.current.stopRecording();
    setRecordingStarted(false);
  };
  if (device == null) return <ActivityIndicator />;
  return (
    <View style={{flex: 1}}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        video={true}
        audio={true}
      />
      {/* <Text style={{color: '#fff', fontSize: 115}}>{valueToUpdate}</Text> */}
      <TouchableOpacity
        style={[styles.CaptureButton,{backgroundColor: RecordingStarted ? '#fff' : 'red',}]}
        onPress={() => {
          if (RecordingStarted) {
            stopRecording();
          } else {
            startRecording();
          }
        }}></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  CaptureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
});

export default VideoCaptureScreen;
