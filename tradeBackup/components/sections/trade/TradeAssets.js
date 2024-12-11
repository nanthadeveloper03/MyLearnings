import Link from "next/link";
import { apiRequestTrade } from '@/hooks/tradeapiCall';
import { apiRequest } from '@/hooks/apiCall';
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';

const TradeAssets = ({pairInfo}) => {

  const [balanceData, setBalanceData] = useState([])
  const [myTradeslist, setmyTradeslist] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(()=>{
    initialData()
  },[])
  let initialData = async ()=>{

    const response = await apiRequest('/account/balance', {});    
    if (response?.status) {
    let data = response?.data;
                setBalanceData(data)
    }
  }

  const items = [
    { currency: 'BTC', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'BTC', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'BTC', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'BTC', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'BTC', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
    { currency: 'USDT', balance: '15.00' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < items.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  useEffect(()=>{

    tradeHistory();
  },[])
  let tradeHistory = async ()=>{    
   const myTrades = await apiRequestTrade('/trade/myTrades', {pair:pairInfo.pair,perPage:10, currentPage:1});    
   setmyTradeslist(myTrades.data);
  }

  const displayedItems = items.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <>
      <div className='market_tsc2'>
        <div className='trd_bk1'>
          <h4>Assets

          {/*<ul className='d-flex flex-wrap float-end'>
                    <button className="btn def_btn1" onClick={handlePrevious} disabled={currentIndex === 0}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                          </svg>
                    </button>
                    <button className="btn def_btn1" onClick={handleNext} disabled={currentIndex + itemsPerPage >= items.length}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                          <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5 12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                        </svg>
                    </button>
                   </ul>*/}

          </h4>
         
           <ul className='list-unstyled ass_lis1'>
        {balanceData.slice(0,6)?.map((item, index) => (
          <li key={index} className='d-flex justify-content-between w-100'>
            <span className='bal_asslef'>
              <b>{item.symbol}</b> <span className='text-muted'>Balance</span>
            </span>
            <span className='bal_assrig'>{parseFloat(item.balance).toFixed(item.decimalPoint)}</span>
          </li>
        ))}
      </ul>
      
          <ul className="ass_lis2 d-flex justify-content-evenly gap-2">
            <li>
              <Link href="/deposit">Deposit</Link>
            </li>
            <li>
              <Link href="/withdraw">Withdraw</Link>
            </li>
          </ul>
         {/* <h4>Recent Trade</h4>
          <div className=''>
                      <table className='table'>
                        
                          {isAuthenticated && (
              <tbody>
                  {myTradeslist && myTradeslist.length > 0 ? (
                      myTradeslist.slice(0,7).map((data, index) => (
                          <tr key={index} >
                              <td className={ data.side == "buy" ?  "text-success" : "text-danger"}>{parseFloat(data.price).toFixed(6)}</td>
                              <td className={ data.side == "buy" ?  "text-success" : "text-danger"}>{parseFloat(data.amount).toFixed(6)} </td>
                              <td className={ data.side == "buy" ?  "text-success" : "text-danger"}>{parseFloat(data.amount * data.price).toFixed(6)}</td>                    
                          </tr>
                      ))
                  ) : (
                      <tr>
                          <td colSpan={7} style={{ textAlign: 'center' }}>
                              No records found
                          </td>
                      </tr>
                  )}
              </tbody>
          )}
                        
                      </table>
                    </div>
                    */}
        </div>
      </div>
    </>
  );
};

export default TradeAssets;
