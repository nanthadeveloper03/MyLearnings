'use client'
import { formatDate, formatNumber, handleCopy } from "@/util/common";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import dashboard from "../../styles/dashboard.css";
import referral from "./referral.css";
import "./withdraw.css";
import Link from "next/link";
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { QRCode } from 'react-qrcode-logo';
import * as Yup from 'yup';
import { useFormik } from "formik";
import { apiRequest } from "@/hooks/apiCall";
import { useRouter, useSearchParams } from "next/navigation";
import DataTable from "react-data-table-component";
import Tooltip from '@mui/material/Tooltip';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector } from "react-redux";
import Loading from "@/app/loading";
import MaintanencePage from "@/components/sections/maintanence/MaintanencePage";
import { toast } from "react-toastify";
import ChatSupport from "@/components/sections/support/ChatSupport";
import '../support/support.css';
import FiatDeposit from "@/components/sections/deposit/fiatDeposit";
import FiatDepositRecentHistory from "@/components/sections/deposit/fiatRecentHistory";


export default function Deposit() {
  // const { isTheme } = useSelector((state) => state.auth);  
  const router = useRouter();
  const [data, setData] = useState([])
  const searchParams = useSearchParams();
  const [currency, setCurrency] = useState('');
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState(false);

  const [coins, setCoins] = useState([
  ]);
  const [isLoading, setIsLoading] = useState(true)

  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [networkList, setNetworkList] = useState([])
  const [flatTabs, setFlatTabs] = useState(1)
  const [flatTabs1, setFlatTabs1] = useState(3)
  const [isActive, setIsActive] = useState(1)
  const [coinData, setCreateCoinData] = useState({})
  const [selectedCoin, setSelectedCoin] = useState('');
  useEffect(() => {
    const currencyParam = searchParams.get('coin');
    setSelectedCoin(currencyParam);
    if (currencyParam) {

      handleSelectCoin(currencyParam);
    }
  }, [searchParams, coins]);

  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }
  const [selectedValue, setSelectedValue] = useState({})
  const [pageLoading, setPageLoading] = useState(false);
  const [tabValue, setTabValue] = useState(null);
  const [maintanenceShare, setMaintanence] = useState({})

  const columns = [
    {
      name: 'Date & Time',
      selector: row => formatDate(row.createdAt, 'MMM Do YYYY, h:mm a'),
      sortable: true,
      wrap: true,
      grow: 3,
    },
    {
      name: 'Currency',
      selector: row => row.tds,
      cell: row => (<> <span>{row.coin}</span> </>),
      sortable: true,
      grow: 2,
    },
    {
      name: 'Address',
      selector: row => row.toAddress,
      cell: row => (<> <span className="mx-1">{row.toAddress && row.toAddress.substring(0, 12)} ...</span> <Tooltip title="Copy Deposit Address"><FileCopyIcon color='warning' className="cursor-pointer" onClick={() => handleCopy(row.toAddress, 0)} /></Tooltip>  </>),
      sortable: true,
      wrap: true,
      grow: 3,
      style: { minWidth: '50px' },
    },
    {
      name: 'Amount',
      selector: row => row.receivedAmount,
      cell: row => (<> <span>{formatNumber(row.receivedAmount)}</span> <span className="mx-1 small">{row.coin}</span> </>),
      sortable: true,
      wrap: true,
      grow: 3,
    },
    {
      name: 'Transaction Id',
      selector: row => row.txid,
      cell: row => (<>
        {(row.txid) ? <Link href={row.explorerLink ?? '-'} target='_blank'>
          <span className="mx-1 text-decoration-underline"> {row.txid ? row?.txid?.substring(0, 12) + '...' : row.txid}</span>
        </Link> :
          <span className="mx-1">{row.txid ? row?.txid?.substring(0, 12) + '...' : row.txid}</span>}
        <Tooltip title="Copy Transaction Id"><FileCopyIcon color='warning' className="cursor-pointer" onClick={() => handleCopy(row.txid, 1)} /></Tooltip>
      </>),
      sortable: true,
      wrap: true,
      grow: 2,
      style: { minWidth: '50px' },
    },

    // {
    //     name: 'Action',
    //     selector: row => row.status,
    //     cell: (row, index) => (<> <Tooltip title="View"><VisibilityIcon color="info" onClick={() => viewDetails(index)} className='cursor-pointer' /></Tooltip> {row.status == 'Pending' && <Tooltip title="Cancel"><DeleteIcon color="error" onClick={() => showAlert(row._id)} className='cursor-pointer' /></Tooltip>} </>),
    //     sortable: true,
    // }
  ];
  const history = async () => {
    try {
      setIsLoading(true)
      let response = await apiRequest('/historyOfDeposit')
      if (response?.status) {
        setData(response.data?.txList ?? [])

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching data:', error);
    }
  };

  async function initLoad() {

    try {
      setPageLoading(true);
      const response = await apiRequest('/currencyList', { 'currencyType': 0 });
      if (response?.status) {
        let result = response?.data;


        setCoins(result.currencyList ?? [])


      } else if (response?.data.maintenance) {
        setMaintanence(response.data)
      }

    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    initLoad();
    history()
  }, []);

  const handleFlatTabs1 = (index) => {
    setFlatTabs1(index)
  }
  const handleClick = (key) => {
    setIsActive(prevState => prevState === key ? null : key)
  }

  const handleSelectCoin = async (value) => {
    const matchedCoin = coins.find((coin) => coin.symbol === value);

    if (matchedCoin) {
      setSelectedValue({})
      setSelectedCoin(matchedCoin?.symbol);

      const postForm = {
        coin: matchedCoin.symbol,
        allToken: true,
        walletId: matchedCoin.depositWalletId,
      };

      if (matchedCoin.coinType === 1) {
        if (matchedCoin?.settingsData?.networkTypes) {
          setNetworkList(matchedCoin?.settingsData?.networkTypes);
        }
        setSelectedNetwork('');
        setTabValue(true)
        setFlatTabs1(4);

      } else {

        try {
          setPageLoading(true);
          const response = await apiRequest('/createCoinAddress', postForm);

          if (response?.status) {
            setTabValue(false)
            setCreateCoinData(response.data)
            setFlatTabs1(5);
          } else {
            setFlatTabs1(3);
          }
        } catch (error) {
          console.error(error);
        }
        finally {
          setPageLoading(false);
        }
      }
    }
  };

  const handleSelectNetwork = async (value) => {
    const selectedNetwork = JSON.parse(value);
    setSelectedValue(selectedNetwork);
    setSelectedNetwork(selectedNetwork);
    const postForm = {
      coin: selectedNetwork.coinName.toLowerCase(),
      allToken: true,
      walletId: selectedNetwork.depositWalletId
    };

    try {
      setPageLoading(true);
      setPageLoading(true);
      const response = await apiRequest('/createCoinAddress', postForm);

      if (response?.status) {
        setCreateCoinData(response.data)
        setFlatTabs1(5)

      } else {
        setFlatTabs1(4)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setPageLoading(false);
    }
  };

  const handleNavigate = () => {
    router.push('/history?tab=true');
  }

  // Detect theme on mount and when it changes
  useEffect(() => {
    const updateTheme = () => {
      const themeIsLight = document.body.classList.contains('is_light');
      setIsLightTheme(themeIsLight);
    };
    updateTheme();
    const observer = new MutationObserver(() => {
      updateTheme();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => {
      observer.disconnect();
    };
  }, []);

  const customStyles = {
    noData: {
      style: {
        color: isLightTheme ? '#000' : '#fff', // Black for light theme, white for dark
        backgroundColor: isLightTheme ? '#f0f0f0' : '#222', // Light background for light theme, dark for dark theme
      },
    },
    progress: {
      style: {
        color: isLightTheme ? '#000' : '#fff', // Black text for light theme, white for dark theme
        backgroundColor: isLightTheme ? '#f0f0f0' : '#222', // Light background for light theme, dark for dark theme
      },
    },
  };

  const [fileName, setFileName] = useState("screenshot92024.jpg");
  const [showPreview, setShowPreview] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);





  const handleHistoryCall = () => {
    setSubmissionStatus(true)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {maintanenceShare.maintenance == 1 ?
        <MaintanencePage maintanenceName='Deposit' MaintananceCont={maintanenceShare.maintenanceTxt} /> :

        <DashboardLayout>
          <div className="user_balance_dashboard mb-4">
            <div className="row cm_inw rsp-mma5">
              <div className="col-lg-6 col-md-7 rsp-mpd5">
                <div className="flat-tabs">
                  <ul className="menu-tab2 d-flex">
                    <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><Link href="#">Deposit Crypto</Link></li>
                    {/* <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><Link href="#">Deposit Fiat</Link></li> */}
                  </ul>
                  <div className={`content-tab2 ${pageLoading && "loading"}`}>
                    <div className="content-inner wctab" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>
                      <ul className="step_lister">
                        <form className="cm_infrm1">
                          <li className="active">
                            <div className={flatTabs1 === 3 || flatTabs1 === 4 || flatTabs1 === 5 ? "active" : ""}>
                              <Link href="#">
                                <h4 className="tit">
                                  <span className="num_t">1</span>
                                  Select coin to deposit {selectedCoin?.symbol}
                                </h4>
                              </Link>
                            </div>
                            <div className="content-inner" style={{ display: `${flatTabs1 === 3 || flatTabs1 === 4 || flatTabs1 === 5 ? "block" : "none"}` }}>
                              <div className="form-group">
                                <div className="select2bx">
                                  <select className="select2"
                                    name="coinName"
                                    // Value={selectedCoin?.symbol || 'Select Currency'}
                                    onChange={(e) => handleSelectCoin(e.target.value)}
                                    defaultValue={selectedCoin}
                                  >
                                    <option vla>
                                      Select Currency
                                    </option>
                                    {coins.map((coin, index) => (
                                      <option key={index} value={coin.symbol}>{coin.symbol}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              {/* <div className="d-flex flex-wrap gap-1">
                              {coins.slice(0, 6).map((coin, index) => (
                                <span
                                  className="co_tx"
                                  key={index}
                                  onClick={() => {
                                    const coinData = JSON.stringify({
                                      coinType: coin.coinType,
                                      symbol: coin.symbol,
                                      networkTypes: coin.settingsData?.networkTypes,
                                      depositWalletId: coin.depositWalletId,
                                      depositType: coin.depositType,
                                    });
                                    handleSelectCoin(coinData); // Call the function to update state
                                    setSelectedCoin(JSON.parse(coinData)); // Update the select box to reflect this change
                                  }} // Add onClick event to select coin
                                >
                                  <img src={coin.image} className="img-fluid wico" /> {coin.symbol}
                                </span>
                              ))}
                            </div> */}
                            </div>
                          </li>
                          {tabValue ?
                            <li className={`${flatTabs1 === 4 || tabValue ? "active" : ""}`}>
                              <div className={flatTabs1 === 4 || flatTabs1 === 5 ? "active" : ""}>
                                <Link href="#">
                                  <h4 className="tit">
                                    <span className="num_t">2</span>
                                    Select a network
                                  </h4>
                                </Link>
                              </div>
                              <div className="content-inner" style={{ display: `${flatTabs1 === 4 || flatTabs1 === 5 ? "block" : "none"}` }}>
                                <div className="form-group">
                                  <div className="select2bx">
                                    <select className="select2"
                                      defaultValue='Select Coin'
                                      name="coinNetwork"
                                      onChange={(e) => handleSelectNetwork(e.target.value)}
                                      // value={selectedNetwork}
                                      value={selectedNetwork ? JSON.stringify(selectedNetwork) : ''}
                                    >
                                      <option value='' disabled>Select Network</option>
                                      {networkList.length > 0 && networkList.map((data, index) => (
                                        <option key={index} value={JSON.stringify({ coinName: data.coinName, walletId: data.depositWalletId, networkName: data.networkName })}>{data.networkName}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </li>
                            : ""
                          }
                          {tabValue === false || flatTabs1 === 5 ?
                            <li className={`${flatTabs1 === 5 ? "active" : ""}`}>
                              <div className={flatTabs1 === 5 ? "active" : ""}>
                                <Link href="#">
                                  <h4 className="tit">
                                    <span className="num_t">{tabValue === false ? "2" : "3"}</span>
                                    Confirm deposit details
                                  </h4>
                                </Link>
                              </div>
                              <div className="content-inner" style={{ display: `${flatTabs1 === 5 ? "block" : "none"}` }}>
                                <div className="row">
                                  <div className="col-md-12 rsp_w100">
                                    <div className="cm_qr1">
                                      <div className="row">
                                        <div className="col-md-8 rsp_w100">
                                          <h6>Address</h6>
                                          <div className="input-group cm_ingrp3 flex-nowrap">
                                            <input type="text" className="form-control"
                                              placeholder="" value={coinData.address.toLowerCase()} readOnly />
                                            <button type="button" className="btn">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#ff8300" onClick={() => handleCopy(coinData.address)}>
                                                <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" />
                                              </svg>
                                            </button>
                                          </div>
                                        </div>
                                        {coinData.memoOrTag ?
                                          <div className="col-md-8 rsp_w100">
                                            <h6>Memo Tag</h6>
                                            <div className="input-group cm_ingrp3 flex-nowrap">
                                              <input type="text" className="form-control"
                                                placeholder="" value={coinData.memoOrTag} readOnly />
                                              <button type="button" className="btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#ff8300" onClick={() => handleCopy(coinData.memoOrTag)}>
                                                  <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" />
                                                </svg>
                                              </button>
                                            </div>
                                          </div>
                                          : ''}
                                        <div className="col-md-4 rsp_w100 text-center rsp_tlef depo_qr">
                                          {/* <Link href="#" className="adr_tx1">Address book
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="#ff8300">
                                            <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                          </svg> </Link> */}
                                          {/* <img src="/assets/images/nico/qr_ico2.png" className="img-fluid" /> */}
                                          <QRCode
                                            value={coinData.address}
                                            size={120}
                                            logoOpacity={0.4}
                                            qrStyle="dots"
                                            // eyeRadius={10}
                                            bgColor="#ffffff"
                                            fgColor="black"
                                            // quietZone={40}
                                            removeQrCodeBehindLogo={false}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    {selectedCoin === 'USDT' &&
                                      <div className="qr_tx1">
                                        <p className="text-danger">
                                          <b>Note: </b>
                                          Minimum deposit is 3 USDT. Deposits below this amount may result in fund loss.
                                        </p>
                                      </div>
                                    }
                                    <div className="qr_tx1">
                                      <p>Only send {selectedCoin} to this address. Sending any other asset to this address may result in the loss of your deposit!</p>
                                      {selectedValue.networkName ?
                                        <p>Ensure the network is <span className="pri_color">{selectedValue.networkName}</span></p>
                                        : ''}
                                      <p>Please be sure that the contract address is related to the tokens that you are depositing.</p>
                                      {/* <button type="button" className="btn btn-action text-white">Deposit</button> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li> : ""
                          }
                        </form>
                      </ul>
                    </div>

                    <div className="content-inner wctab1" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
                      {/* <FiatDeposit onHit={handleHistoryCall} /> */}


                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-5 order-md-2 order-3 rsp-mpd5">
                <div className="cm_faq2">
                  <div className="cm_faq1">
                    <h6 className="fw600 finter text-center mt-3 mb-3 text-uppercase">Faq</h6>
                    <div className="flat-accordion">
                      <div className={isActive == 1 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(1)}>
                        <h6 className="toggle-title fopsans fw600 black11">1. What should I do if my deposit hasn’t appeared in my account?</h6>
                        <div className="toggle-content" style={{ display: `${isActive == 1 ? "block" : "none"}` }}>
                          <p>
                            If your deposit has not appeared within the expected time frame, check the transaction details and network confirmations. If the issue persists, contact our customer support team for assistance.
                          </p>
                        </div>
                      </div>
                      <div className={isActive == 2 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(2)}>
                        <h6 className="toggle-title fopsans fw600 black11">2. Can I deposit multiple cryptocurrencies at once?</h6>
                        <div className="toggle-content" style={{ display: `${isActive == 2 ? "block" : "none"}` }}>
                          <p>
                            Yes, you can deposit multiple cryptocurrencies separately into your Ultrapro Exchange account, each with its own deposit address.
                          </p>
                        </div>
                      </div>
                      <div className={isActive == 3 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(3)}>
                        <h6 className="toggle-title fopsans fw600 black11">
                          3. What should I do if I accidentally sent cryptocurrency to the wrong address?
                        </h6>
                        <div className="toggle-content" style={{ display: `${isActive == 3 ? "block" : "none"}` }}>
                          <p>
                            Unfortunately, transactions sent to incorrect addresses are generally irreversible. Double-check addresses before sending and ensure you are sending to the correct deposit address for the specific cryptocurrency.
                          </p>
                        </div>
                      </div>
                      <div className={isActive == 4 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(4)}>
                        <h6 className="toggle-title fopsans fw600 black11"> 4. How do I find my deposit address?</h6>
                        <div className="toggle-content" style={{ display: `${isActive == 4 ? "block" : "none"}` }}>
                          <p>
                            To find your deposit address, go to the Deposit section, select the cryptocurrency you want to deposit, and the address will be displayed. Ensure you use the correct address for your deposit.
                          </p>
                        </div>
                      </div>
                      <div className={isActive == 5 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(5)}>
                        <h6 className="toggle-title fopsans fw600 black11">5. Are there any restrictions on depositing certain cryptocurrencies?</h6>
                        <div className="toggle-content" style={{ display: `${isActive == 5 ? "block" : "none"}` }}>
                          <p>
                            Some cryptocurrencies may have specific deposit restrictions or requirements. Check the Deposit section for any special instructions or limitations for the cryptocurrency you wish to deposit.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {flatTabs == 1 ?
                <div className="col-md-12 order-md-3 order-2 rsp-mpd5">
                  <div className="rew_tabsc">
                    <div className="block-text1">
                      <h5>Recent Deposit</h5>
                    </div>
                    <div className="table-responsive text-center cm_table1">
                      <DataTable
                        columns={columns}
                        data={Array.isArray(data) ? data.slice(0, 6) : []}
                        striped={true}
                        persistTableHead={true}
                        progressPending={isLoading}
                        wrap={true}
                        pagination={false}
                        paginationServer
                        responsive
                        highlightOnHover
                        // theme={isTheme === 'is_dark' ? "myDarkTheme" : ''}
                        noDataComponent={<div className='nodatarec'>No records found</div>}
                        customStyles={customStyles}
                      />
                    </div>
                    <div className="d-flex vw">
                      <span href="" className="fibmplex fw600" onClick={handleNavigate}>
                        View More
                        <img src="/assets/images/arrow-right.svg" />
                      </span>
                    </div>
                  </div>
                </div>
                :
                <FiatDepositRecentHistory submitStatus={submissionStatus} />
              }
            </div>
          </div>
        </DashboardLayout>
      }

      <ChatSupport />

    </>
  );
}

