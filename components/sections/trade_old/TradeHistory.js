'use client'
import React from 'react';
import Link from "next/link";
import { useState,useEffect } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { apiRequest } from '@/hooks/tradeapiCall';
import { openOrders,refreshBalance } from '@/store/authSlice';

const TradeTab = ({openOrderslist}) => {

  //Tabs
    const dispatch = useDispatch();

  const orders = useSelector((state) => state?.auth?.orders);
  

  const { isAuthenticated } = useSelector((state) => state.auth);


  const [flatTabs, setFlatTabs] = useState(1)
  const [openOrderslists, setopenOrderslists] = useState(openOrderslist?.data);
  const [completedcorders, setcompletedcorders] = useState([]);

  function formatDate(isoDateString){
    const date = new Date(isoDateString);

    const day = String(date.getUTCDate()).padStart(2, '0'); // Day
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month (0-indexed)
    const year = date.getUTCFullYear(); // Year
    const hours = String(date.getUTCHours()).padStart(2, '0'); // Hours
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Minutes

    const customFormattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
    return customFormattedDate;
  }
  const [openOrderslistscount, setopenOrderslistscount] = useState(openOrderslist?.count)
  const handleFlatTabstrade = (index) => {
    setFlatTabs(index)
  }

  const [flatTabs1, setFlatTabs1] = useState(1)
  const handleFlatTabstrade1 = (index) => {
    setFlatTabs1(index)
  }

  let Cancleorder = async (orderId)=>{
    const userConfirmed = confirm("Are you sure?");
    if(userConfirmed) {
    const cancelOrdar = await apiRequest('/trade/liqCancelOrder', {orderId:orderId});
    refreshorders();
    dispatch(refreshBalance({orderId:orderId}));
    }
  }
  useEffect(()=>{

    refreshorders();
    completedorders();
    
  },[orders])

  let refreshorders = async ()=>{
     const openOrderslistKLO = await apiRequest('/trade/openOrders', {perPage:10, currentPage:1}); 
     // dispatch(openOrders(openOrderslistKLO.data));
     
    setopenOrderslists(openOrderslistKLO.data.data)
    setopenOrderslistscount(openOrderslistKLO.data.data.length)
  }

  let completedorders = async ()=>{
     const completedorderslist = await apiRequest('/trade/completedOrders', {perPage:10, currentPage:1}); 
     
    setcompletedcorders(completedorderslist.data.data);
  }


  return (
    <>
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
                {/*<li className={flatTabs1 === 1 ? "active" : ""} onClick={() => handleFlatTabstrade1(1)}>
                                  <button type='button' className='btn def_btn'>Limit ({openOrderslistscount}) | Market(0)</button>
                                </li>*/}
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
        {openOrderslists && openOrderslists.length > 0 ? (
            openOrderslists.map((data, index) => (
                <tr key={index} >
                    <td>{formatDate(data.createdAt)}</td>
                    <td>{data.pair.replace("_", "/")}</td>
                    <td>{data.type}</td>                
                    <td>{data.price}</td>
                    <td>{data.amount}</td>
                    <td>{data.total}</td>
                    <td>
                        <a onClick={() => Cancleorder(data.orderId)} href="javascript:;">
                            Cancel
                        </a>
                    </td>
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
                      <th>Price</th>
                      <th>Amount</th> 
                      <th>Total</th>                                            
                      <th>status</th>
                    </tr>
                  </thead>
                  {isAuthenticated && (
    <tbody>
        {completedcorders && completedcorders.length > 0 ? (
            completedcorders.map((data, index) => (
                <tr key={index} >
                    <td>{formatDate(data.createdAt)}</td>
                    <td>{data.pair.replace("_", "/")}</td>
                    <td>{data.type}</td>                
                    <td>{parseFloat(data.price).toFixed(data.priceDecimal)}</td>
                    <td>{parseFloat(data.amount).toFixed(data.amountDecimal)}</td>
                    <td>{parseFloat(data.total).toFixed(data.priceDecimal)}</td>
                    <td>{data.status}</td>
                    
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
    </>
  );
};

export default TradeTab;
