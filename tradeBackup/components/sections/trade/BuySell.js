import React from 'react';
import Link from "next/link";
import { useState, useEffect } from 'react';
import SliderWithStep from '@/components/sections/trade/SliderWithStep';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './slider.css';
import { apiRequest } from '@/hooks/tradeapiCall';
import { useSelector, useDispatch } from 'react-redux';
import { formatNumber, buttonLoading } from '@/util/common';
import { toast } from 'react-toastify';
import { openOrders } from '@/store/authSlice';
import { updateFormData } from '@/store/commonSlice';

const BuySell = ({ pairInfo, pairBalancefrom }) => {

  const dispatch = useDispatch();

  const [pairBalance, setpairBalance] = useState(pairBalancefrom);

  const { formData } = useSelector((state) => state.common);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const balances = useSelector((state) => state?.auth?.balances);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refreshbalance();
    dispatch(updateFormData({}))
  }, [])

  useEffect(() => {
    refreshbalance();

  }, [balances])
  let refreshbalance = async () => {
    const refreshBl = await apiRequest('/trade/tradePairBalance', { pair: pairInfo.pair });
    setpairBalance(refreshBl.data)
  }

  let refreshOrders = async () => {
    const openOrderslistKLO = await apiRequest('/trade/openOrders', { perPage: 10, currentPage: 1 });
    dispatch(openOrders(openOrderslistKLO.data.data));
  }
  const [amountbuyLimit, setamountbuyLimit] = useState("");
  const [pricebuyLimit, setpricebuyLimit] = useState(formatNumber(pairInfo?.lastPrice, pairInfo?.priceDecimal));
  const [totalbuyLimit, settotalbuyLimit] = useState("");

  const [amountsellLimit, setamountsellLimit] = useState("");
  const [pricesellLimit, setpricesellLimit] = useState(formatNumber(pairInfo?.lastPrice, pairInfo?.priceDecimal));
  const [totalsellLimit, settotalsellLimit] = useState("");

  const [amountbuyMarket, setamountbuyMarket] = useState("");
  const [pricebuyMarket, setpricebuyMarket] = useState(formatNumber(pairInfo?.lastPrice, pairInfo?.priceDecimal));
  const [totalbuyMarket, settotalbuyMarket] = useState("");

  const [amountsellMarket, setamountsellMarket] = useState("");
  const [pricesellMarket, setpricesellMarket] = useState(formatNumber(pairInfo?.lastPrice, pairInfo?.priceDecimal));
  const [totalsellMarket, settotalsellMarket] = useState("");

  let changeLimittotalbuy = (e) => {
    settotalbuyLimit(e.target.value);
    let randtotal = e.target.value;
    if (pricebuyLimit) {
      let amountlimitbuy = +randtotal / +pricebuyLimit;
      setamountbuyLimit(formatNumber(amountlimitbuy, pairInfo.priceDecimal))
    }
  }

  let changeLimittotalsell = (e) => {
    settotalsellLimit(e.target.value);
    let randtotal = e.target.value;
    if (pricesellLimit) {
      let amountlimitsell = +randtotal / +pricesellLimit;
      setamountsellLimit(formatNumber(amountlimitsell, pairInfo.priceDecimal))
    }
  }

  let changeMarkettotalbuy = (e) => {
    settotalbuyMarket(e.target.value);
    let randtotal = e.target.value;
    if (pricebuyMarket) {
      let amountmarketbuy = +randtotal / +pricebuyMarket;
      setamountbuyMarket(formatNumber(amountmarketbuy, pairInfo.amountDecimal))
    }
  }

  let changeMarkettotalsell = (e) => {
    settotalsellMarket(e.target.value);
    let randtotal = e.target.value;
    if (pricesellMarket) {
      let amountmarketsell = +randtotal / +pricesellMarket;
      setamountsellMarket(formatNumber(amountmarketsell, pairInfo.priceDecimal))
    }
  }

  const validateValue = (value, decimal) => {
    const parts = value.split('.');
    if (parts.length > decimal) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    console.log("parts.length", parts.length)
    if (parts.length > 1) {
      const integerPart = parts[0];
      const decimalPart = parts[1].slice(0, decimal);
      value = `${integerPart}.${decimalPart}`;
    } else {
      value = parts[0];
    }
    return value;
  };

  const handleKeyDown = (event) => {
    const allowedKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9',
      '.'
    ];

    if (!allowedKeys.includes(event.key)) {
      event.preventDefault(); // Prevent the default behavior for disallowed keys
    }
  };

  let buylimitamountpricechange = (value1, type) => {
    if (type == "amount") {
      var value = validateValue(value1, pairInfo.amountDecimal);
      setamountbuyLimit(value);
      if (parseFloat(value) > 0) {
        let tot = +pricebuyLimit * value;
        settotalbuyLimit(formatNumber(tot, pairInfo.priceDecimal))
      }
      else {
        settotalbuyLimit("")
      }
    }
    else {
      var value = validateValue(value1, pairInfo.priceDecimal);
      setpricebuyLimit(value);
      if (parseFloat(value) > 0) {
        let tot = +amountbuyLimit * value;
        settotalbuyLimit(formatNumber(tot, pairInfo.priceDecimal))
      }
      else {
        settotalbuyLimit("")
      }
    }
  }

  let selllimitamountpricechange = (value1, type) => {
    if (type == "amount") {
      var value = validateValue(value1, pairInfo.amountDecimal);
      setamountsellLimit(value);
      if (parseFloat(value) > 0) {
        let tot = +pricesellLimit * value;
        settotalsellLimit(formatNumber(tot, pairInfo.priceDecimal))
      }
      else {
        settotalsellLimit("")
      }
    }
    else {
      var value = validateValue(value1, pairInfo.priceDecimal);
      setpricesellLimit(value);
      if (parseFloat(value) > 0) {
        let tot = +amountsellLimit * value;
        settotalsellLimit(formatNumber(tot, pairInfo.priceDecimal))
      }
      else {
        settotalsellLimit("")
      }
    }
  }

  let buymarketamountpricechange = (value1, type) => {
    if (type == "amount") {
      var value = validateValue(value1, pairInfo.amountDecimal);
      setamountbuyMarket(value);
      if (parseFloat(value) > 0) {
        let tot = +pricebuyMarket * value;
        settotalbuyMarket(formatNumber(tot, pairInfo.priceDecimal))
      }
      else {
        settotalbuyMarket("")
      }
    }
  }

  let sellmarketamountpricechange = (value1, type) => {
    if (type == "amount") {
      var value = validateValue(value1, pairInfo.amountDecimal);
      setamountsellMarket(value);
      if (parseFloat(value) > 0) {
        let tot = +pricesellMarket * value;
        settotalsellMarket(formatNumber(tot, pairInfo.priceDecimal))
      }
      else {
        settotalsellMarket("")
      }
    }
  }

  useEffect(() => {
    if (formData && formData.type) {
      setFlatTabs(formData.type)
    }
  }, [formData])

  //Tabs
  const [flatTabs, setFlatTabs] = useState(1)
  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }

  const [flatTabs1, setFlatTabs1] = useState(1)
  const handleFlatTabs1 = (index) => {
    setFlatTabs1(index)
  }

  const [flatTabs2, setFlatTabs2] = useState(1)
  const handleFlatTabs2 = (index) => {
    setFlatTabs2(index)
  }

  // Function to return tooltip text based on the active tab
  const getTooltipText = () => {
    if (flatTabs1 === 1) {
      return "Limit Order: Sets a price at which to buy or sell.";
    } else if (flatTabs1 === 2) {
      return "Market Order: Buys or sells at the current market price.";
    } else if (flatTabs1 === 3) {
      return "Stop-Limit Order: A combination of a stop order and a limit order.";
    }
    return "Default Tooltip Text"; // Fallback if no condition matches
  };

  let buyLimit = async () => {
    setLoading(true);
    if (amountbuyLimit > 0 && pricebuyLimit > 0) {
      if (+totalbuyLimit <= +pairBalance.toBal) {
        if (+amountbuyLimit >= +pairInfo.minTradeAmount) {
          if (+amountbuyLimit <= +pairInfo.maxTradeAmount) {
            const tradeResponse = await apiRequest('/trade/liqBuyLimitOrder', { pair: pairInfo.pair, "amount": amountbuyLimit, "price": pricebuyLimit, "type": "buy", "tradeType": "limit" });
            setLoading(false);
            refreshbalance();
            setTimeout(() => {
              refreshOrders();
            }, 3200)
          } else {
            setLoading(false);
            toast.dismiss()
            toast.error(`Your trade amount must with ${pairInfo.minTradeAmount} to ${pairInfo.maxTradeAmount}`);
          }
        }
        else {
          setLoading(false);
          toast.dismiss()
          toast.error(`Your trade amount must with ${pairInfo.minTradeAmount} to ${pairInfo.maxTradeAmount}`)
        }
      } else {
        setLoading(false);
        toast.dismiss()
        toast.error("Insufficient balance.")
      }
    }
    else {
      setLoading(false);
      toast.dismiss()
      toast.error("Please provide proper amount or price.")
    }
  }

  let sellLimit = async () => {
    setLoading(true);
    if (amountsellLimit > 0 && pricesellLimit > 0) {
      if (+amountsellLimit <= +pairBalance.toBal) {
        if (+amountsellLimit >= +pairInfo.minTradeAmount) {
          if (+amountsellLimit <= +pairInfo.maxTradeAmount) {
            const tradeResponse = await apiRequest('/trade/liqsellLimitOrder', { pair: pairInfo.pair, "amount": amountsellLimit, "price": pricesellLimit, "type": "sell", "tradeType": "limit" });
            refreshbalance();
            refreshOrders();
            setLoading(false);
          } else {
            setLoading(false);
            toast.dismiss()
            toast.error(`Your trade amount must with ${pairInfo.minTradeAmount} to ${pairInfo.maxTradeAmount}`);
          }
        }
        else {
          setLoading(false);
          toast.dismiss()
          toast.error(`Your trade amount must with ${pairInfo.minTradeAmount} to ${pairInfo.maxTradeAmount}`)
        }
      } else {
        setLoading(false);
        toast.dismiss()
        toast.error("Insufficient balance.")
      }
    }
    else {
      setLoading(false);
      toast.dismiss()
      toast.error("Please provide proper amount or price.")
    }
  }

  let buyMarket = async () => {
    setLoading(true);
    if (amountbuyMarket > 0 && pricebuyMarket > 0) {
      if (+totalbuyMarket <= +pairBalance.toBal) {
        if (+amountbuyMarket >= +pairInfo.minTradeAmount) {
          if (+amountbuyMarket <= +pairInfo.maxTradeAmount) {

            const tradeResponse = await apiRequest('/trade/liqBuyMarketOrder', { pair: pairInfo.pair, "amount": amountbuyMarket, "price": pricebuyMarket, "type": "buy", "tradeType": "market" });
            setLoading(false);
            setTimeout(() => {
              refreshOrders();
            }, 3200)
            refreshbalance();
          } else {
            setLoading(false);
            toast.dismiss()
            toast.error(`Your trade amount must with ${pairInfo.minTradeAmount} to ${pairInfo.maxTradeAmount}`);
          }
        }
        else {
          setLoading(false);
          toast.dismiss()
          toast.error(`Your trade amount must with ${pairInfo.minTradeAmount} to ${pairInfo.maxTradeAmount}`)
        }
      } else {
        setLoading(false);
        toast.dismiss()
        toast.error("Insufficient balance.")
      }
    }
    else {
      setLoading(false);
      toast.dismiss()
      toast.error("Please provide proper amount or price.")
    }
  }

  let sellMarket = async () => {
    setLoading(true);
    if (amountsellMarket > 0 && pricesellMarket > 0) {
      if (parseFloat(amountsellMarket) <= parseFloat(pairBalance.fromBal)) {
        if (+amountsellMarket >= +pairInfo.minTradeAmount) {
          if (+amountsellMarket <= +pairInfo.maxTradeAmount) {

            const tradeResponse = await apiRequest('/trade/liqSellMarketOrder', { pair: pairInfo.pair, "amount": amountsellMarket, "price": pricesellMarket, "type": "sell", "tradeType": "market" });
            setLoading(false);
            setTimeout(() => {
              refreshOrders();
            }, 3200)
            refreshbalance();
          } else {
            setLoading(false);
            toast.dismiss()
            toast.error(`Your trade amount must with ${pairInfo.minTradeAmount} to ${pairInfo.maxTradeAmount}`);
          }
        }
        else {
          setLoading(false);
          toast.dismiss()
          toast.error(`Your trade amount must with ${pairInfo.minTradeAmount} to ${pairInfo.maxTradeAmount}`)
        }
      } else {
        setLoading(false);
        toast.dismiss()
        toast.error("Insufficient balance.")
      }
    }
    else {
      setLoading(false);
      toast.dismiss()
      toast.error("Please provide proper amount or price.")
    }
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {getTooltipText()}
    </Tooltip>
  );
  let getLimitbuyAmount = (percentage1) => {
    if (pricebuyLimit > 0 && percentage1 > 0 && pairBalance.toBal > 0) {
      let percentage = percentage1 >= 100 ? 99 : percentage1
      let perccalcAmount = pairBalance.toBal * percentage / 100;
      let tete = perccalcAmount / pricebuyLimit;
      settotalbuyLimit(parseFloat(tete * pricebuyLimit).toFixed(pairInfo.amountDecimal))
      setamountbuyLimit(tete.toFixed(pairInfo.amountDecimal))
    } else {
      settotalbuyLimit(parseFloat(0).toFixed(pairInfo.amountDecimal))
      setamountbuyLimit(parseFloat(0).toFixed(pairInfo.amountDecimal))
    }
  }

  let getMarketbuyAmount = (percentage1) => {
    if (pricebuyMarket > 0 && percentage1 > 0 && pairBalance.toBal > 0) {
      let percentage = percentage1 >= 100 ? 99 : percentage1;
      let perccalcAmount = pairBalance.toBal * percentage / 100;
      let tete = perccalcAmount / pricebuyMarket;
      settotalbuyMarket(parseFloat(tete * pricebuyMarket).toFixed(pairInfo.amountDecimal))
      setamountbuyMarket(tete.toFixed(pairInfo.amountDecimal))
    } else {
      settotalbuyMarket(parseFloat(0).toFixed(pairInfo.amountDecimal))
      setamountbuyMarket(parseFloat(0).toFixed(pairInfo.amountDecimal))
    }
  }

  let getLimitsellAmount = (percentage1) => {
    if (pricesellLimit > 0 && percentage1 > 0 && pairBalance.fromBal > 0) {
      let percentage = percentage1 >= 100 ? 99 : percentage1
      let perccalcAmount = pairBalance.fromBal * percentage / 100;
      let tete = perccalcAmount;
      settotalsellLimit(parseFloat(tete * pricesellLimit).toFixed(pairInfo.amountDecimal))
      setamountsellLimit(tete.toFixed(pairInfo.amountDecimal))
    } else {
      settotalsellLimit(parseFloat(0).toFixed(pairInfo.amountDecimal))
      setamountsellLimit(parseFloat(0).toFixed(pairInfo.amountDecimal))
    }
  }

  let getMarketsellAmount = (percentage1) => {
    if (pricesellMarket > 0 && percentage1 > 0 && pairBalance.fromBal > 0) {
      let percentage = percentage1 >= 100 ? 99 : percentage1
      let perccalcAmount = pairBalance.fromBal * percentage / 100;
      let tete = perccalcAmount;
      settotalsellMarket(parseFloat(tete * pricesellMarket).toFixed(pairInfo.amountDecimal))
      setamountsellMarket(tete.toFixed(pairInfo.amountDecimal))
    } else {
      settotalsellMarket(parseFloat(0).toFixed(pairInfo.amountDecimal))
      setamountsellMarket(parseFloat(0).toFixed(pairInfo.amountDecimal))
    }
  }

  return (
    <>
      <div className='market_tsc3'>
        <div className='trade_tab1'>
          <ul className="menu-tabtrd1 d-flex justify-content-evenly">
            <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><Link href="javascript:;">Buy</Link></li>
            <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><Link href="javascript:;">Sell</Link></li>
          </ul>
          <div className="content-tabrd">
            <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>
              <ul className='d-flex justify-content-evenly gap-3 ord_lis2'>
                <li className={flatTabs1 === 1 ? "active" : ""} onClick={() => handleFlatTabs1(1)}>
                  <button type='button' className='btn def_btn'>Market</button>
                </li>
                <li className={flatTabs1 === 2 ? "active" : ""} onClick={() => handleFlatTabs1(2)}>
                  <button type='button' className='btn def_btn'>Limit</button>
                </li>
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip} // Conditional tooltip based on active tab
                  >
                    <button type='button' className='btn def_btn'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                      </svg>
                    </button>
                  </OverlayTrigger>
                </li>
              </ul>
              <div className="content-inner" style={{ display: `${flatTabs1 === 2 ? "block" : "none"}` }}>
                <form className='trd_form1'>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Price
                      </span>
                      <input type='text' value={pricebuyLimit} className='form-control' placeholder='' onKeyDown={handleKeyDown} onChange={(e) => buylimitamountpricechange(e.target.value, 'price')} />
                      <span className='input-group-text fw700'>
                        {(pairInfo.toCurrency) ? pairInfo.toCurrency : "..."}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Amount
                      </span>
                      <input type='text' value={amountbuyLimit} onKeyDown={handleKeyDown} className='form-control' placeholder='' onChange={(e) => buylimitamountpricechange(e.target.value, 'amount')} />
                      <span className='input-group-text fw700'>
                        {(pairInfo.fromCurrency) ? pairInfo.fromCurrency : "..."}
                      </span>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between w-100 avail_bk1'>
                    <span className='avail_t1'>Available</span>
                    {isAuthenticated ? (
                      <span className='avail_t2'>
                        {formatNumber(pairBalance.toBal, pairInfo.priceDecimal)} {pairInfo.toCurrency ? pairInfo.toCurrency : "..."}
                        <Link href="/deposit">
                          <img src='/assets/images/trade/plus.png' className='avail_ico' />
                        </Link>
                      </span>
                    ) : (
                      <span className='avail_t2'>
                        --{pairInfo.toCurrency ? pairInfo.toCurrency : "..."}
                        <img src='/assets/images/trade/plus.png' className='avail_ico' />
                      </span>
                    )}
                  </div>
                  <SliderWithStep typeside={"Limitbuy"} balance={pairBalance.toBal} passValue={getLimitbuyAmount} />
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Total
                      </span>
                      <input type='text' onKeyDown={handleKeyDown} value={totalbuyLimit} onChange={(e) => changeLimittotalbuy(e)} className='form-control' placeholder='' />
                      <span className='input-group-text'>
                        {(pairInfo.toCurrency) ? pairInfo.toCurrency : "..."}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    {isAuthenticated ? (
                      loading ? (
                        buttonLoading()
                      ) : (
                        <button type='button' onClick={() => buyLimit()} className='btn btn-success text-white w-100'>
                          Buy
                        </button>
                      )
                    ) : (
                      <button type='button' className='btn btn-success text-white w-100'>
                        Log In
                      </button>
                    )}
                  </div>
                </form>
                <span>Maker fee : {pairInfo.makerFee} %</span> <span>Taker fee : {pairInfo.takerFee} %</span>
              </div>
              <div className="content-inner" style={{ display: `${flatTabs1 === 1 ? "block" : "none"}` }}>
                <form className='trd_form1'>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 disabled_grp flex-nowrap'>
                      <span className='input-group-text'>
                        Price
                      </span>
                      <input type='text' className='form-control' placeholder='' value={pricebuyMarket} disabled />
                      <span className='input-group-text fw700'>
                        {(pairInfo.toCurrency) ? pairInfo.toCurrency : "..."}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Amount
                      </span>
                      <input type='text' value={amountbuyMarket} className='form-control' onKeyDown={handleKeyDown} onChange={(e) => buymarketamountpricechange(e.target.value, 'amount')} placeholder='' />
                      <span className='input-group-text fw700'>
                        {(pairInfo.fromCurrency) ? pairInfo.fromCurrency : "..."}
                      </span>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between w-100 avail_bk1'>
                    <span className='avail_t1'>Available</span>
                    {isAuthenticated ? (
                      <span className='avail_t2'>
                        {formatNumber(pairBalance.toBal, pairInfo.priceDecimal)} {pairInfo.toCurrency ? pairInfo.toCurrency : "..."}
                        <Link href="/deposit">
                          <img src='/assets/images/trade/plus.png' className='avail_ico' />
                        </Link>
                      </span>
                    ) : (
                      <span className='avail_t2'>
                        --{pairInfo.toCurrency ? pairInfo.toCurrency : "..."}
                        <img src='/assets/images/trade/plus.png' className='avail_ico' />
                      </span>
                    )}
                  </div>
                  <SliderWithStep typeside={"Limitmarket"} balance={pairBalance.toBal} passValue={getMarketbuyAmount} />
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Total
                      </span>
                      <input type='text' value={totalbuyMarket} onChange={(e) => changeMarkettotalbuy(e)} className='form-control' placeholder='' />
                      <span className='input-group-text'>
                        {(pairInfo.toCurrency) ? pairInfo.toCurrency : "..."}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    {isAuthenticated ? (
                      loading ? (
                        buttonLoading()
                      ) : (
                        <button type='button' onClick={() => buyMarket()} className='btn btn-success text-white w-100'>
                          Buy
                        </button>
                      )
                    ) : (
                      <button type='button' className='btn btn-success text-white w-100'>
                        Log In
                      </button>
                    )}
                  </div>
                  <span>Maker fee : {pairInfo.makerFee} %</span> <span>Taker fee : {pairInfo.takerFee} %</span>
                </form>
              </div>
              {/* <div className="content-inner" style={{ display: `${flatTabs1 === 3 ? "block" : "none"}` }}>
                <form className='trd_form1'>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Stop
                      </span>
                      <input type='text' className='form-control' placeholder='59473' />
                      <span className='input-group-text fw700'>
                        {(pairInfo.toCurrency) ? pairInfo.toCurrency :"..."}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Limit
                      </span>
                      <input type='text' className='form-control' placeholder='59473' />
                      <span className='input-group-text fw700'>
                        {(pairInfo.toCurrency) ? pairInfo.toCurrency :"..."}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Amount
                      </span>
                      <input type='text' className='form-control' placeholder='' />
                      <span className='input-group-text fw700'>
                        {(pairInfo.fromCurrency) ? pairInfo.fromCurrency :"..."}
                      </span>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between w-100 avail_bk1'>
                    <span className='avail_t1'>Available</span>
                    {isAuthenticated ? (
                  <span className='avail_t2'>
                  {formatNumber(pairBalance.toBal,pairInfo.priceDecimal)} {pairInfo.toCurrency ? pairInfo.toCurrency : "..."} 
                  <Link href="/deposit">
                  <img src='/assets/images/trade/plus.png' className='avail_ico' />
                  </Link>
                  </span>
                  ) : (
                  <span className='avail_t2'>
                  --{pairInfo.toCurrency ? pairInfo.toCurrency : "..."} 
                  <img src='/assets/images/trade/plus.png' className='avail_ico' />
                  </span>
                  )}
                  </div>
                  <SliderWithStep />
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Total
                      </span>
                      <input type='text' className='form-control' placeholder='' />
                      <span className='input-group-text'>
                        {(pairInfo.toCurrency) ? pairInfo.toCurrency :"..."}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    {isAuthenticated ? (<button type='button' className='btn btn-action text-white w-100'>Buy</button>) : (<button type='button' className='btn btn-action text-white w-100'>Log In</button>)
                  }
                  </div>
                </form>
              </div>*/}
            </div>
            <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
              <ul className='d-flex justify-content-evenly gap-3 ord_lis2'>
                <li className={flatTabs2 === 1 ? "active" : ""} onClick={() => handleFlatTabs2(1)}>
                  <button type='button' className='btn def_btn'>Market</button>
                </li>
                <li className={flatTabs2 === 2 ? "active" : ""} onClick={() => handleFlatTabs2(2)}>
                  <button type='button' className='btn def_btn'>Limit</button>
                </li>
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip} // Conditional tooltip based on active tab
                  >
                    <button type='button' className='btn def_btn'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                      </svg>
                    </button>
                  </OverlayTrigger>
                </li>
              </ul>
              <div className="content-inner" style={{ display: `${flatTabs2 === 2 ? "block" : "none"}` }}>
                <form className='trd_form1'>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Price
                      </span>
                      <input type='text' className='form-control' placeholder='' value={pricesellLimit} onChange={(e) => selllimitamountpricechange(e.target.value, 'price')} />
                      <span className='input-group-text fw700'>
                        {(pairInfo.toCurrency) ? pairInfo.toCurrency : "..."}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Amount
                      </span>
                      <input type='text' className='form-control' onChange={(e) => selllimitamountpricechange(e.target.value, 'amount')} value={amountsellLimit} placeholder='' />
                      <span className='input-group-text fw700'>
                        {(pairInfo.fromCurrency) ? pairInfo.fromCurrency : "..."}
                      </span>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between w-100 avail_bk1'>
                    <span className='avail_t1'>Available</span>
                    {isAuthenticated ? (
                      <span className='avail_t2'>
                        {formatNumber(pairBalance.fromBal, pairInfo.amountDecimal)} {pairInfo.fromCurrency ? pairInfo.fromCurrency : "..."}
                        <Link href="/deposit">
                          <img src='/assets/images/trade/plus.png' className='avail_ico' />
                        </Link>
                      </span>
                    ) : (
                      <span className='avail_t2'>
                        --{pairInfo.fromCurrency ? pairInfo.fromCurrency : "..."}
                        <img src='/assets/images/trade/plus.png' className='avail_ico' />
                      </span>
                    )}
                  </div>
                  <SliderWithStep typeside={"Limitmarket"} balance={pairBalance.toBal} passValue={getLimitsellAmount} />
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Total
                      </span>
                      <input type='text' value={totalsellLimit} onChange={(e) => changeLimittotalsell(e)} className='form-control' placeholder='' />
                      <span className='input-group-text'>
                        {(pairInfo.toCurrency) ? pairInfo.toCurrency : "..."}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    {isAuthenticated ? (
                      loading ? (
                        buttonLoading()
                      ) : (
                        <button type='button' onClick={() => sellLimit()} className='btn btn-danger text-white w-100'>
                          Sell
                        </button>
                      )
                    ) : (
                      <button type='button' className='btn btn-danger text-white w-100'>
                        Log In
                      </button>
                    )}
                  </div>
                </form>
                <span>Maker fee : {pairInfo.makerFee} %</span> <span>Taker fee : {pairInfo.takerFee} %</span>
              </div>
              <div className="content-inner" style={{ display: `${flatTabs2 === 1 ? "block" : "none"}` }}>
                <form className='trd_form1'>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 disabled_grp flex-nowrap'>
                      <span className='input-group-text'>
                        Price
                      </span>
                      <input type='text' className='form-control' placeholder='' value={pricesellMarket} disabled />
                      <span className='input-group-text fw700'>
                        {(pairInfo.toCurrency) ? pairInfo.toCurrency : "..."}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Amount
                      </span>
                      <input type='text' className='form-control' onKeyDown={handleKeyDown} value={amountsellMarket} onChange={(e) => sellmarketamountpricechange(e.target.value, 'amount')} placeholder='' />
                      <span className='input-group-text fw700'>
                        {(pairInfo.fromCurrency) ? pairInfo.fromCurrency : "..."}
                      </span>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between w-100 avail_bk1'>
                    <span className='avail_t1'>Available</span>
                    {isAuthenticated ? (
                      <span className='avail_t2'>
                        {formatNumber(pairBalance.fromBal, pairInfo.amountDecimal)} {pairInfo.fromCurrency ? pairInfo.fromCurrency : "..."}
                        <Link href="/deposit">
                          <img src='/assets/images/trade/plus.png' className='avail_ico' />
                        </Link>
                      </span>
                    ) : (
                      <span className='avail_t2'>
                        --{pairInfo.fromCurrency ? pairInfo.fromCurrency : "..."}
                        <img src='/assets/images/trade/plus.png' className='avail_ico' />
                      </span>
                    )}
                  </div>
                  <SliderWithStep typeside={"Limitmarket"} balance={pairBalance.toBal} passValue={getMarketsellAmount} />
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Total
                      </span>
                      <input type='text' onKeyDown={handleKeyDown} value={totalsellMarket} onChange={(e) => changeMarkettotalsell(e)} className='form-control' placeholder='' />
                      <span className='input-group-text'>
                        {(pairInfo.toCurrency) ? pairInfo.toCurrency : "..."}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    {isAuthenticated ? (
                      loading ? (
                        buttonLoading()
                      ) : (
                        <button type='button' onClick={() => sellMarket()} className='btn btn-danger text-white w-100'>
                          Sell
                        </button>
                      )
                    ) : (
                      <button type='button' className='btn btn-danger text-white w-100'>
                        Log In
                      </button>
                    )}
                  </div>
                  <span>Maker fee : {pairInfo.makerFee} %</span> <span>Taker fee : {pairInfo.takerFee} %</span>
                </form>
              </div>
              {/* <div className="content-inner" style={{ display: `${flatTabs2 === 3 ? "block" : "none"}` }}>
                <form className='trd_form1'>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Stop
                      </span>
                      <input type='text' className='form-control' placeholder='59473' />
                      <span className='input-group-text fw700'>
                        {(pairInfo.toCurrency) ? pairInfo.toCurrency :"..."}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Limit
                      </span>
                      <input type='text' className='form-control' placeholder='59473' />
                      <span className='input-group-text fw700'>
                        {(pairInfo.toCurrency) ? pairInfo.toCurrency :"..."}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Amount
                      </span>
                      <input type='text' className='form-control' value={amountsellMarket} placeholder='' />
                      <span className='input-group-text fw700'>
                        {(pairInfo.fromCurrency) ? pairInfo.fromCurrency :"..."}
                      </span>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between w-100 avail_bk1'>
                    <span className='avail_t1'>Available</span>
                    <span className='avail_t2'>--{(pairInfo.toCurrency) ? pairInfo.toCurrency :"..."} <img src='/assets/images/trade/plus.png' className='avail_ico' /> </span>
                  </div>
                  <SliderWithStep />
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1 flex-nowrap'>
                      <span className='input-group-text'>
                        Total
                      </span>
                      <input type='text' className='form-control'   placeholder='' />
                      <span className='input-group-text'>
                        {(pairInfo.toCurrency) ? pairInfo.toCurrency :"..."}
                      </span>
                    </div>
                  </div>
                  <div className='form-group'>
                    {isAuthenticated ? (<button type='button' className='btn btn-action text-white w-100'>Sell</button>) : (<button type='button' className='btn btn-action text-white w-100'>Log In</button>)
                  }
                  </div>
                </form>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuySell;
