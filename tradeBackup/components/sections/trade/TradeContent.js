// app/trade/[id]/page.js
// import { useEffect,useState } from 'react';
'use client'
import Layout from "@/components/layout/Layout";
import TradeHeader from "./TradeHeader";
import TradeChart from "./TradeChart";
import TradeMarket from "./TradeMarket";
import TradeHistory from "./TradeHistory";
import TradeSidePanel from "./TradeSidePanel";
import TradeFooter from "./TradeFooter";
// import ChatSupport from "./ChatSupport";
import TradeAssets from "./TradeAssets";
import BuySell from "./BuySell";
import TradingPair from "./TradingPair";
import SliderWithStep from './SliderWithStep';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import Link from "next/link";
import { apiRequest } from '@/hooks/tradeapiCall';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatNumber, buttonLoading } from '@/util/common';
import { formatNumberComma, formatNumberKMB } from '@/util/common';
import { toast } from 'react-toastify';
// export async function generateStaticParams() {
// //   const response = await apiRequest('/trade/allPairs', {}).catch(error => {
// //     console.error("Error fetching pairInfo:", error);
// //     return { data: null }; // Handle error as needed
// // });;
// //   const coins1get = await Object.values(response.data).flatMap(currency => currency.data);
//   let ids = ['BTC-USDT', 'ETH-USDT',
//   'XRP-USDT', 'UPRO-USDT',
//   'SOL-BNB',  'XRP-BNB',
//   'ETH-BTC',  'SOL-BTC',
//   'SOL-ETH',  'BNB-ETH'];
//   // for(let i=0;i<coins1get.length;i++){
//   //   let pai = coins1get[i].pair.replace("_","-");
//   //   ids.push(pai);
//   // }
//   // console.log("ids",ids);
//   return ids.map(id => ({
//     id,

//   }));

// }

const TradeContent = async () => {

  const dangerLimit = 20;
  const successLimit = 10;


  const searchParams = useSearchParams();
  const pair = searchParams.get('pair') || '';
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [response, setresponse] = useState({});
  const [pairBalance, setpairBalance] = useState({});
  const [openorders, setOpenorders] = useState([]);
  const [completedorders, setcompletedorders] = useState([]);
  const [openorderslist, setopenorderslist] = useState("");
  const [openOrderslistscount, setopenOrderslistscount] = useState(0)
  const [pairInfo, setpairInfo] = useState({});
  const [rows, setRows] = useState([]);
  const [animateRows, setAnimateRows] = useState(false);
  const [flatTabs, setFlatTabs] = useState(1)
  const [flatTabs1, setFlatTabs1] = useState(1)
  const [rows1, setRows1] = useState([]);
  const [animateRows1, setAnimateRows1] = useState(false);
  // const [openOrderslists, setopenOrderslists] = useState({});
  const [amountbuyLimit, setamountbuyLimit] = useState("");
  const [pricebuyLimit, setpricebuyLimit] = useState("");
  const [totalbuyLimit, settotalbuyLimit] = useState("");





  const [amountsellLimit, setamountsellLimit] = useState("");
  const [pricesellLimit, setpricesellLimit] = useState("");
  const [totalsellLimit, settotalsellLimit] = useState("");


  const [amountbuyMarket, setamountbuyMarket] = useState("");
  const [pricebuyMarket, setpricebuyMarket] = useState("");
  const [totalbuyMarket, settotalbuyMarket] = useState("");

  const [amountsellMarket, setamountsellMarket] = useState("");
  const [pricesellMarket, setpricesellMarket] = useState("");
  const [totalsellMarket, settotalsellMarket] = useState("");



  let Cancleorder = async (orderId) => {
    const userConfirmed = confirm("Are you sure?");
    if (userConfirmed) {
      const cancelOrdar = await apiRequest('/trade/liqCancelOrder', { orderId: orderId });
      refreshorders();
      refreshbalance();
    }

  }

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);

    const day = String(date.getUTCDate()).padStart(2, '0'); // Day
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month (0-indexed)
    const year = date.getUTCFullYear(); // Year
    const hours = String(date.getUTCHours()).padStart(2, '0'); // Hours
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Minutes

    const customFormattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
    return customFormattedDate;
  }
  let refreshorders = async () => {
    const openOrderslistKLO = await apiRequest('/trade/openOrders', { perPage: 10, currentPage: 1 });
    setopenOrderslistscount(openOrderslistKLO.data.count)
    setOpenorders(openOrderslistKLO.data.data)

  }
  const id = pair; // Access the dynamic ID from params
  let initData = async () => {

    // if(isAuthenticated){
    const response1 = await apiRequest('/trade/pairInfo', { pair: pair.replace("-", "_") });
    setpricesellMarket(response1.data.lastPrice)

    const myTrades = await apiRequest('/trade/myTrades', { pair: pair.replace("-", "_") });
    console.log("myTrades", myTrades);

    setpairInfo(response1.data)
    const pairBalance1 = await apiRequest('/trade/tradePairBalance', { pair: pair.replace("-", "_") });
    setpairBalance(pairBalance1.data)
    const openOrderslist1 = await apiRequest('/trade/openOrders', { perPage: 10, currentPage: 1 });
    console.log("openOrderslist1", openOrderslist1.data.data)
    // setopenorderslist({openOrderslist1.data.data})
    setopenOrderslistscount(openOrderslist1.data.count)
    setOpenorders(openOrderslist1.data.data)
    /*}
    else{
        setpairBalance({toBal:0,fromBal:0})
    }*/

  }
  useEffect(() => {
    // refreshorders();
    initData()
  }, [])


  const handleFlatTabstrade1 = (index) => {
    setFlatTabs1(index)
  }

  const handleFlatTabstrade = (index) => {
    setFlatTabs(index)
  }


  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }


  const handleFlatTabs1 = (index) => {
    setFlatTabs1(index)
  }

  //for animating danger rows bg


  let getOrderBook = async () => {
    const responseorderBook = await apiRequest('/trade/orderBook', { pair: "BTC_USDT", side: "buy" });
    setRows(responseorderBook.data);

    const responseorderBooksell = await apiRequest('/trade/orderBook', { pair: "BTC_USDT", side: "sell" });
    setRows1(responseorderBooksell.data);


  }

  useEffect(() => {
    getOrderBook();
    setTimeout(() => setAnimateRows(true), 100);
  }, []);


  //for animating success rows bg



  useEffect(() => {
    setTimeout(() => setAnimateRows1(true), 100);
  }, []);








  const [loading, setLoading] = useState(false);
  useEffect(() => {
    refreshbalance();
  }, [])
  let refreshbalance = async () => {
    const refreshBl = await apiRequest('/trade/tradePairBalance', { pair: pair.replace("-", "_") });
    setpairBalance(refreshBl?.data)

    /*const openOrderslist1 = await apiRequest('/trade/openOrders', {perPage:10, currentPage:1}); 
    console.log("openOrderslist1",)
 setopenOrderslist(openOrderslist1.data)*/
    refreshorders();

  }



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

    setamountbuyLimit(value);
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

  //Tabs
  /* const [flatTabs, setFlatTabs] = useState(1)
   const handleFlatTabs = (index) => {
     setFlatTabs(index)
   }
 */
  /*const [flatTabs1, setFlatTabs1] = useState(1)
  const handleFlatTabs1 = (index) => {
    setFlatTabs1(index)
  }*/

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

          } else {
            setLoading(false);
            toast.dismiss()
            toast.error("Please enter below Maxtrade amount.");
          }
        }
        else {
          setLoading(false);
          toast.dismiss()
          toast.error("Please enter above Mintrade amount.")
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
            setLoading(false);
          } else {
            setLoading(false);
            toast.dismiss()
            toast.error("Please enter below Maxtrade amount.");
          }
        }
        else {
          setLoading(false);
          toast.dismiss()
          toast.error("Please enter above Mintrade amount.")
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
            refreshbalance();
          } else {
            setLoading(false);
            toast.dismiss()
            toast.error("Please enter below Maxtrade amount.");
          }
        }
        else {
          setLoading(false);
          toast.dismiss()
          toast.error("Please enter above Mintrade amount.")
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
            refreshbalance();
          } else {
            setLoading(false);
            toast.dismiss()
            toast.error("Please enter below Maxtrade amount.");
          }
        }
        else {
          setLoading(false);
          toast.dismiss()
          toast.error("Please enter above Mintrade amount.")
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

  return (
    <>
      <Layout headerStyle={1} footerStyle={4}>
        <div className="trd_mnsc1">
          {pairInfo && <TradeHeader pair={id} pairInfo={pairInfo} />}
          <div className="w-100 ma_5 trd_hdsc2">
            <div className="trd_lefpanel">
              <div className="w-100 disp_inblock ma_5">
                <div className="trd_grid1 pd_5">

                  <div className='market_tsc1'>
                    <div className='trade_tab'>
                      <ul className="menu-tabtrd d-flex">
                        <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><Link href="#">Order Book</Link></li>
                        <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><Link href="#">Market Trades</Link></li>
                      </ul>
                      <div className="content-tabrd">
                        <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>
                          <ul className='d-flex flex-wrap gap-3 menu_en'>
                            <li className={flatTabs1 === 1 ? "active" : ""} onClick={() => handleFlatTabs1(1)}>
                              <a href='#'>
                                <img src='/assets/images/trade/menu1.png' className='img-fluid' />
                              </a>
                            </li>
                            <li className={flatTabs1 === 2 ? "active" : ""} onClick={() => handleFlatTabs1(2)}>
                              <a href='#'>
                                <img src='/assets/images/trade/menu2.png' className='img-fluid' />
                              </a>
                            </li>
                            <li className={flatTabs1 === 3 ? "active" : ""} onClick={() => handleFlatTabs1(3)}>
                              <a href='#'>
                                <img src='/assets/images/trade/menu3.png' className='img-fluid' />
                              </a>
                            </li>
                          </ul>
                          <div className="content-inner" style={{ display: `${flatTabs1 === 1 ? "block" : "none"}` }}>
                            <div className='trd_table1'>
                              <div className='virtual_thead d-flex align-items-center w-100'>
                                <div className='vir_fd1'>
                                  Price({(pairInfo?.toCurrency) ? pairInfo?.toCurrency : '...'})
                                </div>
                                <div className='vir_fd2'>
                                  Amount({(pairInfo?.fromCurrency) ? pairInfo?.fromCurrency : '...'})
                                </div>
                                <div className='vir_fd2'>
                                  Total({(pairInfo?.toCurrency) ? pairInfo?.toCurrency : '...'})
                                </div>
                              </div>
                              <div className="virtual_tbody d-flex flex-column w-100">
                                {rows.map((row, index) => (
                                  <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                                    {/* Apply animation only to the first and third rows */}
                                    {(index === 0 || index === 2) && (
                                      <div
                                        className="animateBackground1"
                                        style={{
                                          animation: index === 0
                                            ? 'scaleAnimation1 3s infinite ease-in-out'
                                            : 'scaleAnimation2 3s infinite ease-in-out',
                                        }}
                                      ></div>
                                    )}
                                    <div className="vir_fd1">
                                      <p className="text-success">{row.price}</p>
                                    </div>
                                    <div className="vir_fd2">
                                      <p>{row.amount}</p>
                                    </div>
                                    <div className="vir_fd2">
                                      <p>{formatNumberKMB(row.amount * row.price)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="content-inner" style={{ display: `${flatTabs1 === 2 ? "block" : "none"}` }}>
                            <div className='trd_table1'>
                              <div className='virtual_thead d-flex align-items-center w-100'>
                                <div className='vir_fd1'>
                                  Price({(pairInfo?.toCurrency) ? pairInfo?.toCurrency : '...'})
                                </div>
                                <div className='vir_fd2'>
                                  Amount({(pairInfo?.fromCurrency) ? pairInfo?.fromCurrency : '...'})
                                </div>
                                <div className='vir_fd2'>
                                  Total({(pairInfo?.toCurrency) ? pairInfo?.toCurrency : '...'})
                                </div>
                              </div>
                              <div className="virtual_tbody d-flex flex-column w-100">
                                {rows1.map((row, index) => (
                                  <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                                    {/* Apply animation only to the first and third rows */}
                                    {(index === 0 || index === 2) && (
                                      <div
                                        className="animateBackground"
                                        style={{
                                          animation: index === 0
                                            ? 'scaleAnimation1 3s infinite ease-in-out'
                                            : 'scaleAnimation2 3s infinite ease-in-out',
                                        }}
                                      ></div>
                                    )}
                                    <div className="vir_fd1">
                                      <p className="text-danger">{row.price}</p>
                                    </div>
                                    <div className="vir_fd2">
                                      <p>{row.amount}</p>
                                    </div>
                                    <div className="vir_fd2">
                                      <p>{row.total}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="content-inner" style={{ display: `${flatTabs1 === 3 ? "block" : "none"}` }}>
                            <div className='trd_table1'>
                              <div className='virtual_thead d-flex align-items-center w-100'>
                                <div className='vir_fd1'>
                                  Price({(pairInfo?.toCurrency) ? pairInfo?.toCurrency : '...'})
                                </div>
                                <div className='vir_fd2'>
                                  Amount({(pairInfo?.fromCurrency) ? pairInfo?.fromCurrency : '...'})
                                </div>
                                <div className='vir_fd2'>
                                  Total({(pairInfo?.toCurrency) ? pairInfo?.toCurrency : '...'})
                                </div>
                              </div>
                              <div className="virtual_tbody anim_scoll1 d-flex flex-column w-100">
                                {rows.map((row, index) => (
                                  <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                                    {/* Apply animation only to the first and third rows */}
                                    {(index === 0 || index === 2) && (
                                      <div
                                        className="animateBackground"
                                        style={{
                                          animation: index === 0
                                            ? 'scaleAnimation1 3s infinite ease-in-out'
                                            : 'scaleAnimation2 3s infinite ease-in-out',
                                        }}
                                      ></div>
                                    )}
                                    <div className="vir_fd1">
                                      <p className="text-danger">{row.price}</p>
                                    </div>
                                    <div className="vir_fd2">
                                      <p>{row.amount}</p>
                                    </div>
                                    <div className="vir_fd2">
                                      <p>{row.total}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="virtual_tbody d-flex flex-column w-100">
                                <div className="virt_tinrw d-flex align-items-center w-100">
                                  <div className="vir_fd3">
                                    <h4>{(pairInfo.lastPrice) ? formatNumberComma(pairInfo.lastPrice) : "..."}</h4>
                                  </div>
                                  {/*<div className="vir_fd3">
                        <p></p>
                      </div>*/}
                                  {/*<div className="vir_fd4">
                                              <button type='button' className='mor_btn btn'>More</button>
                                            </div>*/}
                                </div>
                              </div>
                              <div className="virtual_tbody anim_scoll1 d-flex flex-column w-100">
                                {rows1.map((row, index) => (
                                  <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                                    {/* Apply animation only to the first and third rows */}
                                    {(index === 0 || index === 2) && (
                                      <div
                                        className="animateBackground1"
                                        style={{
                                          animation: index === 0
                                            ? 'scaleAnimation1 3s infinite ease-in-out'
                                            : 'scaleAnimation2 3s infinite ease-in-out',
                                        }}
                                      ></div>
                                    )}
                                    <div className="vir_fd1">
                                      <p className="text-success">{row.price}</p>
                                    </div>
                                    <div className="vir_fd2">
                                      <p>{row.amount}</p>
                                    </div>
                                    <div className="vir_fd2">
                                      <p>{formatNumberKMB(row.amount * row.price)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
                          <div className='trd_table1'>
                            <div className='virtual_thead d-flex align-items-center w-100 mt-4 mb-5'>
                              <div className='vir_fd1'>
                                Price({(pairInfo.toCurrency) ? pairInfo.toCurrency : '...'})
                              </div>
                              <div className='vir_fd2'>
                                Amount({(pairInfo.fromCurrency) ? pairInfo.fromCurrency : '...'})
                              </div>
                              <div className='vir_fd2'>
                                Total({(pairInfo.toCurrency) ? pairInfo.toCurrency : '...'})
                              </div>
                            </div>
                            <div className="virtual_tbody d-flex flex-column w-100">
                              {rows.slice(0, dangerLimit).map((row, index) => (
                                <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                                  {/* Apply animation only to the first and third rows */}
                                  {(index === 0 || index === 2) && (
                                    <div
                                      className="animateBackground"
                                      style={{
                                        animation: index === 0
                                          ? 'scaleAnimation1 3s infinite ease-in-out'
                                          : 'scaleAnimation2 3s infinite ease-in-out',
                                      }}
                                    ></div>
                                  )}
                                  <div className="vir_fd1">
                                    <p className="text-danger">{row.price}</p>
                                  </div>
                                  <div className="vir_fd2">
                                    <p>{row.amount}</p>
                                  </div>
                                  <div className="vir_fd2">
                                    <p>{formatNumberKMB(row.amount * row.price)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="virtual_tbody d-flex flex-column w-100">
                              {rows.slice(dangerLimit, dangerLimit + successLimit).map((row, index) => (
                                <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                                  {/* Apply animation only to the first and third rows */}
                                  {(index === 0 || index === 2) && (
                                    <div
                                      className="animateBackground1"
                                      style={{
                                        animation: index === 0
                                          ? 'scaleAnimation1 3s infinite ease-in-out'
                                          : 'scaleAnimation2 3s infinite ease-in-out',
                                      }}
                                    ></div>
                                  )}
                                  <div className="vir_fd1">
                                    <p className="text-success">{row.price}</p>
                                  </div>
                                  <div className="vir_fd2">
                                    <p>{row.amount}</p>
                                  </div>
                                  <div className="vir_fd2">
                                    <p>{formatNumberKMB(row.amount * row.price)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="trd_grid2">
                  <TradeChart pair={id} pairInfo={response?.data} />
                </div>
              </div>
              <div className="w-100 disp_inblock ma_5">
                <div className="trd_grid3">
                  <div className='market_tsc2'>


                    <div className='trade_tab'>
                      <ul className="menu-tabtrd d-flex">
                        <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabstrade(1)}><Link href="#">Open Orders</Link></li>
                        {/*<li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabstrade(2)}><Link href="#">Order History</Link></li>*/}
                        <li className={flatTabs === 3 ? "active" : ""} onClick={() => handleFlatTabstrade(3)}><Link href="#">Trade History</Link></li>
                        {/*<li className={flatTabs === 4 ? "active" : ""} onClick={() => handleFlatTabstrade(4)}><Link href="#">Assets</Link></li>*/}
                      </ul>
                      <div className="content-tabrd">
                        <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>

                          <ul className='d-flex flex-wrap gap-3 ord_lis1 mt-3 mb-0'>
                            <li className={flatTabs1 === 1 ? "active" : ""} onClick={() => handleFlatTabstrade1(1)}>
                              <button type='button' className='btn def_btn'>Limit ({openOrderslistscount}) | Market(0)</button>
                            </li>
                            {/*<li className={flatTabs1 === 2 ? "active" : ""} onClick={() => handleFlatTabstrade1(2)}>
                                  <button type='button' className='btn def_btn'>TP/SL(0)</button>
                                </li>
                                <li className={flatTabs1 === 3 ? "active" : ""} onClick={() => handleFlatTabstrade1(3)}>
                                  <button type='button' className='btn def_btn'>Trailing Stop(0)</button>
                                </li>*/}
                          </ul>

                          <div className="content-inner" style={{ display: `${flatTabs1 === 1 ? "block" : "none"}` }}>

                            <div className='trade_table2 table-responsive'>
                              <table className='table'>
                                <thead>
                                  <tr>
                                    <th>Time</th>
                                    <th>Pair</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>

                                {!isAuthenticated &&
                                  <tr>
                                    <td colSpan={10} align='center' className='beflogin'>
                                      <h4><Link href="#" className='pri_color'>Log In</Link> or <Link href="#" className='pri_color'>Sign Up</Link> Now to trade</h4>
                                    </td>
                                  </tr>
                                }

                                {isAuthenticated && (
                                  <tbody>
                                    {openorders?.map((data, index) => (
                                      <tr key={index}>
                                        <td>{formatDate(data.createdAt)}</td>
                                        <td>{data.pair.replace("_", "/")}</td>
                                        <td>{data.type}</td>
                                        <td>{data.price}</td>
                                        <td>{data.amount}</td>
                                        <td>{data.total}</td>
                                        <td><a onClick={() => Cancleorder(data.orderId)} href="javascript:;">Cancel</a></td>
                                      </tr>
                                    ))}

                                  </tbody>
                                )}

                                {isAuthenticated && (
                                  <tbody>
                                    {openorders == "" &&
                                      <tr>
                                        <td colSpan="6">No records.</td>
                                      </tr>
                                    }

                                  </tbody>
                                )}

                              </table>

                            </div>

                          </div>

                          <div className="content-inner" style={{ display: `${flatTabs1 === 2 ? "block" : "none"}` }}>

                            <div className='trade_table2 table-responsive'>
                              <table className='table'>
                                <thead>
                                  <tr>
                                    <th>Time</th>
                                    <th>Pair</th>
                                    <th>Type</th>
                                    <th>Side</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                    <th>Total</th>
                                    <th>Filled</th>
                                    <th>Unfilled</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td colSpan={10} align='center' className='beflogin'>
                                      <h4><Link href="#" className='pri_color'>Log In</Link> or <Link href="#" className='pri_color'>Sign Up</Link> Now to trade</h4>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                            </div>

                          </div>

                          <div className="content-inner" style={{ display: `${flatTabs1 === 3 ? "block" : "none"}` }}>

                            <div className='trade_table2 table-responsive'>
                              <table className='table'>
                                <thead>
                                  <tr>
                                    <th>Time</th>
                                    <th>Pair</th>
                                    <th>Type</th>
                                    <th>Side</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                    <th>Total</th>
                                    <th>Filled</th>
                                    <th>Unfilled</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td colSpan={10} align='center' className='beflogin'>
                                      <h4><Link href="#" className='pri_color'>Log In</Link> or <Link href="#" className='pri_color'>Sign Up</Link> Now to trade</h4>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                            </div>

                          </div>


                        </div>
                        <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>

                          <div className='trade_table2 table-responsive'>
                            <table className='table'>
                              <thead>
                                <tr>
                                  <th>Time</th>
                                  <th>Pair</th>
                                  <th>Type</th>
                                  <th>Side</th>
                                  <th>Price</th>
                                  <th>Amount</th>
                                  <th>Total</th>
                                  <th>Filled</th>
                                  <th>Unfilled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td colSpan={10} align='center' className='beflogin'>
                                    <h4><Link href="#" className='pri_color'>Log In</Link> or <Link href="#" className='pri_color'>Sign Up</Link> Now to trade</h4>
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                          </div>

                        </div>
                        <div className="content-inner" style={{ display: `${flatTabs === 3 ? "block" : "none"}` }}>

                          <div className='trade_table2 table-responsive'>
                            <table className='table'>
                              <thead>
                                <tr>
                                  <th>Time</th>
                                  <th>Pair</th>
                                  <th>Type</th>
                                  <th>Side</th>
                                  <th>Price</th>
                                  <th>Amount</th>
                                  <th>Total</th>
                                  <th>Filled</th>
                                  <th>Unfilled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              {isAuthenticated && (
                                <tbody>
                                  {completedorders && completedorders.map((data, index) => (
                                    <tr key={index}>
                                      <td>{formatDate(data.createdAt)}</td>
                                      <td>{data.pair.replace("_", "/")}</td>
                                      <td>{data.type}</td>
                                      <td>{data.price}</td>
                                      <td>{data.amount}</td>
                                      <td>{data.total}</td>
                                      <td><a onClick={() => Cancleorder(data.orderId)} href="javascript:;">Cancel</a></td>
                                    </tr>
                                  ))}

                                </tbody>
                              )}

                              {isAuthenticated && (
                                <tbody>
                                  {completedorders == "" &&
                                    <tr>
                                      <td colSpan="10">No records </td>
                                    </tr>
                                  }

                                </tbody>
                              )}

                            </table>

                          </div>

                        </div>
                        <div className="content-inner" style={{ display: `${flatTabs === 4 ? "block" : "none"}` }}>

                          <div className='trade_table2 table-responsive'>
                            <table className='table'>
                              <thead>
                                <tr>
                                  <th>Time</th>
                                  <th>Pair</th>
                                  <th>Type</th>
                                  <th>Side</th>
                                  <th>Price</th>
                                  <th>Amount</th>
                                  <th>Total</th>
                                  <th>Filled</th>
                                  <th>Unfilled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td colSpan={10} align='center' className='beflogin'>
                                    <h4><Link href="#" className='pri_color'>Log In</Link> or <Link href="#" className='pri_color'>Sign Up</Link> Now to trade</h4>
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="trd_rigpanel">
              <TradingPair />

              <div className='market_tsc3'>

                <div className='trade_tab1'>
                  <ul className="menu-tabtrd1 d-flex justify-content-evenly">
                    <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><Link href="#">Buy</Link></li>
                    <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><Link href="#">Sell</Link></li>
                  </ul>
                  <div className="content-tabrd">
                    <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>

                      <ul className='d-flex justify-content-evenly gap-3 ord_lis2'>
                        <li className={flatTabs1 === 1 ? "active" : ""} onClick={() => handleFlatTabs1(1)}>
                          <button type='button' className='btn def_btn'>Limit</button>
                        </li>
                        <li className={flatTabs1 === 2 ? "active" : ""} onClick={() => handleFlatTabs1(2)}>
                          <button type='button' className='btn def_btn'>Market</button>
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

                      <div className="content-inner" style={{ display: `${flatTabs1 === 1 ? "block" : "none"}` }}>

                        <form className='trd_form1'>
                          <div className='form-group'>
                            <div className='input-group cm_tinpgrp1'>
                              <span className='input-group-text'>
                                Price
                              </span>
                              <input type='text' value={pricebuyLimit} className='form-control' placeholder='0.00' onKeyDown={handleKeyDown} onChange={(e) => buylimitamountpricechange(e.target.value, 'price')} />
                              <span className='input-group-text fw700'>
                                {(pairInfo.toCurrency) ? pairInfo.toCurrency : "..."}
                              </span>
                            </div>
                          </div>
                          <div className='form-group'>
                            <div className='input-group cm_tinpgrp1'>
                              <span className='input-group-text'>
                                Amount
                              </span>
                              <input type='text' value={amountbuyLimit} onKeyDown={handleKeyDown} className='form-control' placeholder='0.00' onChange={(e) => buylimitamountpricechange(e.target.value, 'amount')} />
                              <span className='input-group-text fw700'>
                                {(pairInfo.fromCurrency) ? pairInfo.fromCurrency : "..."}
                              </span>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between w-100 avail_bk1'>
                            <span className='avail_t1'>Available</span>
                            {isAuthenticated ? (
                              <span className='avail_t2'>
                                {formatNumber(pairBalance?.toBal, pairInfo.priceDecimal)} {pairInfo.toCurrency ? pairInfo.toCurrency : "..."}
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
                            <div className='input-group cm_tinpgrp1'>
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
                                <button type='button' onClick={() => buyLimit()} className='btn btn-action text-white w-100'>
                                  Buy
                                </button>
                              )
                            ) : (
                              <button type='button' className='btn btn-action text-white w-100'>
                                Log In
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      <div className="content-inner" style={{ display: `${flatTabs1 === 2 ? "block" : "none"}` }}>
                        <form className='trd_form1'>
                          <div className='form-group'>
                            <div className='input-group cm_tinpgrp1 disabled_grp'>
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
                            <div className='input-group cm_tinpgrp1'>
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
                                {formatNumber(pairBalance?.toBal, pairInfo.priceDecimal)} {pairInfo.toCurrency ? pairInfo.toCurrency : "..."}
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
                            <div className='input-group cm_tinpgrp1'>
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
                                <button type='button' onClick={() => buyMarket()} className='btn btn-action text-white w-100'>
                                  Buy
                                </button>
                              )
                            ) : (
                              <button type='button' className='btn btn-action text-white w-100'>
                                Log In
                              </button>
                            )}
                          </div>
                        </form>

                      </div>
                      {/* <div className="content-inner" style={{ display: `${flatTabs1 === 3 ? "block" : "none"}` }}>

                <form className='trd_form1'>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1'>
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
                    <div className='input-group cm_tinpgrp1'>
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
                    <div className='input-group cm_tinpgrp1'>
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
                    <div className='input-group cm_tinpgrp1'>
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
                          <button type='button' className='btn def_btn'>Limit</button>
                        </li>
                        <li className={flatTabs2 === 2 ? "active" : ""} onClick={() => handleFlatTabs2(2)}>
                          <button type='button' className='btn def_btn'>Market</button>
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

                      <div className="content-inner" style={{ display: `${flatTabs2 === 1 ? "block" : "none"}` }}>

                        <form className='trd_form1'>
                          <div className='form-group'>
                            <div className='input-group cm_tinpgrp1'>
                              <span className='input-group-text'>
                                Price
                              </span>
                              <input type='text' className='form-control' placeholder='0.00' value={pricesellLimit} onChange={(e) => selllimitamountpricechange(e.target.value, 'price')} />
                              <span className='input-group-text fw700'>
                                {(pairInfo.toCurrency) ? pairInfo.toCurrency : "..."}
                              </span>
                            </div>
                          </div>
                          <div className='form-group'>
                            <div className='input-group cm_tinpgrp1'>
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
                          <SliderWithStep />
                          <div className='form-group'>
                            <div className='input-group cm_tinpgrp1'>
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
                                <button type='button' onClick={() => sellLimit()} className='btn btn-action text-white w-100'>
                                  Sell
                                </button>
                              )
                            ) : (
                              <button type='button' className='btn btn-action text-white w-100'>
                                Log In
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      <div className="content-inner" style={{ display: `${flatTabs2 === 2 ? "block" : "none"}` }}>
                        <form className='trd_form1'>
                          <div className='form-group'>
                            <div className='input-group cm_tinpgrp1 disabled_grp'>
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
                            <div className='input-group cm_tinpgrp1'>
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
                          <SliderWithStep />
                          <div className='form-group'>
                            <div className='input-group cm_tinpgrp1'>
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
                                <button type='button' onClick={() => sellMarket()} className='btn btn-action text-white w-100'>
                                  Sell
                                </button>
                              )
                            ) : (
                              <button type='button' className='btn btn-action text-white w-100'>
                                Log In
                              </button>
                            )}
                          </div>
                        </form>

                      </div>
                      {/* <div className="content-inner" style={{ display: `${flatTabs2 === 3 ? "block" : "none"}` }}>

                <form className='trd_form1'>
                  <div className='form-group'>
                    <div className='input-group cm_tinpgrp1'>
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
                    <div className='input-group cm_tinpgrp1'>
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
                    <div className='input-group cm_tinpgrp1'>
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
                    <div className='input-group cm_tinpgrp1'>
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
              {/*<BuySell pairInfo = {pairInfo} pairBalancefrom={pairBalance}/>*/}
              <TradeAssets />
              {/*  <TradeSidePanel pair={id} pairInfo={pairInfo} pairBalance={pairBalance} />*/}
            </div>
          </div>
        </div>


      </Layout>
    </>
  )
};

export default TradeContent;
