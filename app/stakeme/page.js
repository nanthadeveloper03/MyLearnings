"use client"
import React, { useEffect, useState } from 'react'
import { apiRequest } from '@/hooks/apiCall';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

function Page() {
  const [balance, setBalanceData] = useState();
  const [usdt,setUsdtValue] = useState('');

  const [calculatedValue, setCalculatedValue] = useState(0); // For coin value in selected price
  const [receivedCoinValue, setReceivedCoinValue] = useState(0); // For received coin value based on input

//   const usdt = 0.03989;
  const upro = 1;
  // Fetch balance data
  async function initLoad() {
    try {
      const response = await apiRequest('/account/dashboardinfo', { symbol: 'USDT' });
      console.log(response,"RER ");
      
      if (response?.status) {
        setBalanceData(response?.data.walletInfo);
      }
    } catch (error) {
      console.error(error); 
    }
  }
  async function initCurrencyValue() {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ultrapro&vs_currencies=usd');
      setUsdtValue(response.data?.ultrapro?.usd,);
      
      if (response?.status) {
        
      }
    } catch (error) {
      console.error(error);
    }
  }

  
  useEffect(() => {
    initLoad();
    initCurrencyValue()
  }, []);

  // Formik for balance validation
  const balanceValidate = useFormik({
    initialValues: {
      balanceCoin: "",
    },
    validationSchema: Yup.object({
      balanceCoin: Yup.string()
        .required("Balance is required")
        .test(
          "is-greater-than-spotAsset",
          `Balance must be less than ${balance?.spotAsset}`,
          function (value) {
            return Number(value) <= balance?.spotAsset;
          }
        ),
    }),
    onSubmit: (values) => {
      console.log(values, 'VALUES');
    },
  });


  useEffect(() => {
    const enteredCoinAmount = Number(balanceValidate.values.balanceCoin);
    if (!isNaN(enteredCoinAmount) && enteredCoinAmount > 0) {
      const equivalentValue = enteredCoinAmount;
      setCalculatedValue(equivalentValue);
  
      const receivedValue = equivalentValue / usdt;
      setReceivedCoinValue(receivedValue); 
    } else {
      setCalculatedValue(0);
      setReceivedCoinValue(0);
    }
  }, [balanceValidate.values.balanceCoin]);
  return (
    <div>
      <h1>Spot Asset: {balance?.spotAsset}</h1>
      
      <div className="form-group">
        <label className="form-label">Enter Coin Amount</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter coin amount"
          name="balanceCoin"
          onChange={balanceValidate.handleChange}
          onBlur={balanceValidate.handleBlur}
          value={balanceValidate.values.balanceCoin}
        />
        {balanceValidate.touched.balanceCoin && balanceValidate.errors.balanceCoin ? (
          <div className="error">{balanceValidate.errors.balanceCoin}</div>
        ) : null}
      </div>

      {/* Display calculated equivalent value and received coins */}
      <div>
        <h3>Equivalent Value: {calculatedValue} (Price per coin: {usdt})</h3>
        <h3>Received Coins: {receivedCoinValue} (Price per received coin: {upro})</h3>
      </div>
    </div>
  );
}

export default Page;

