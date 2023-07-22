import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from './Src/Screens/MainScreen';
import ResultScreen from './Src/Screens/ResultScreen';
import {store} from './Src/Redux/Store';
import { Provider } from 'react-redux';
import ImageCaptureScreen from './Src/Screens/ImageCaptureScreen';
import VideoCaptureScreen from './Src/Screens/VideoCaptureScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{headerShown: false}}
        />
           <Stack.Screen 
         name="ResultScreen"
         component={ResultScreen}
         options={{headerShown: false}}
        />
          <Stack.Screen 
         name="ImageCaptureScreen"
         component={ImageCaptureScreen}
         options={{headerShown: false}}
        />
        <Stack.Screen 
         name="VideoCaptureScreen"
         component={VideoCaptureScreen}
         options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default AppNavigator;
