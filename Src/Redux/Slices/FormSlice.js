import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  valueToUpdate: '',
  name: '',
  address: '',
  gender: 'Male',
  hobbies: {},
  country: '',
  password: '',
  videopath: '',
};

const valueSlice = createSlice({
  name: 'value',
  initialState,
  reducers: {
    updateValue: (state, action) => {
      state.valueToUpdate = action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
    updateGender: (state, action) => {
      state.gender = action.payload;
    },
    updateHobbies: (state, action) => {
      state.hobbies = action.payload;
    },
    updateCountry: (state, action) => {
      state.country = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
    updateVideopath: (state, action) => {
      state.videopath = action.payload;
    },
  },
});

export const {
  updateValue,
  updateName,
  updateAddress,
  updateGender,
  updateHobbies,
  updateCountry,
  updatePassword,
  updateVideopath,
} = valueSlice.actions;
export default valueSlice.reducer;
