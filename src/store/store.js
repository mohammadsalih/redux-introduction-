import { configureStore } from "@reduxjs/toolkit";

import accountsSlice from "../features/accounts/accountsSlice";
import customersSlice from "../features/customers/customersSlice";

const store = configureStore({
  reducer: {
    accounts: accountsSlice,
    customers: customersSlice,
  },
});

export default store;
