import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.balance += action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state) {
      if (state.loan > state.balance) return;

      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export default accountsSlice.reducer;

export const { withdraw, requestLoan, payLoan } =
  accountsSlice.actions;

export const deposit = function (amount, currency) {
  if (currency === "USD") {
    return { type: "accounts/deposit", payload: amount };
  }

  return async function (dispatch) {
    try {
      dispatch(accountsSlice.actions.convertingCurrency());

      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );
      const data = await response.json();

      const convertedAmount = data.rates.USD;

      dispatch(accountsSlice.actions.deposit(convertedAmount));
    } catch (err) {
      console.error(err.message);
      return { type: "accounts/deposit", payload: 0 };
    }
  };
};
