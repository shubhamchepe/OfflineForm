import { configureStore } from '@reduxjs/toolkit'
import valueReducer from './Slices/FormSlice'; 


export const store = configureStore({
  reducer: {
    value: valueReducer
  }
})



// import { configureStore } from '@reduxjs/toolkit';
// import valueReducer from './Slices/FormSlice'; 
// import { combineReducers } from 'redux';

// const rootReducer = combineReducers({
//   value: valueReducer,
//   // Add other reducers here if needed
// });

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;