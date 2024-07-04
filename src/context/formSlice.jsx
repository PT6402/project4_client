import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "formSlice",
  initialState: {
    data: null,
    currentStep: null,
    totalStep: null,
  },
  reducers: {
    setFormData: (state, action) => {
      state.data = action.payload;
    },
    setFormNextStep: (state) => {
      const currentStep = state.currentStep;
      state.currentStep = currentStep + 1;
    },
    setFormPrevStep: (state) => {
      const currentStep = state.currentStep;
      state.currentStep = currentStep - 1;
    },
    firstConfig: (state, action) => {
      state.currentStep = action.payload.currentStep;
      state.totalStep = action.payload.totalStep;
    },
  },
});

export default formSlice.reducer;
export const { setFormData, setFormNextStep, setFormPrevStep, firstConfig } =
  formSlice.actions;
