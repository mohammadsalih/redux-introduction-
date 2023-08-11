import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        const createdAt = new Date().toISOString();

        return { payload: { fullName, nationalID, createdAt } };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateCustomerFullName: (state, action) => {
      state.fullName = action.payload;
    },
  },
});

export default customersSlice.reducer;

export const { createCustomer, updateCustomerFullName } =
  customersSlice.actions;
