import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  deposit,
  payLoan,
  requestLoan,
  withdraw,
} from "./accountsSlice";

function AccountOperations() {
  const dispatch = useDispatch();

  const {
    balance,
    loan,
    loanPurpose: purpose,
    isLoading,
  } = useSelector((store) => store.accounts);

  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  function handleDeposit() {
    if (!depositAmount || !currency) return;

    dispatch(deposit(depositAmount, currency));

    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdrawal() {
    if (!withdrawalAmount || withdrawalAmount < 0) return;
    if (withdrawalAmount > balance) return;

    dispatch(withdraw(withdrawalAmount));

    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    if (loanAmount > balance * 10) return;

    dispatch(requestLoan(loanAmount, loanPurpose));

    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit}>
            Deposit {depositAmount}
          </button>
          {isLoading ? <p>convertying currency</p> : ""}
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        <div>
          <span>
            Pay back ${loan} {purpose ? `(${purpose})` : ""}
          </span>
          {loan ? (
            <button onClick={handlePayLoan}>Pay loan</button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountOperations;
