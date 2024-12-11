import React from 'react';
import Link from "next/link";

const TradeInfo = () => {
  return (
    <>
      <div className="trd_hdin mt-2 mb-2 px-2"><span className="p-1">Trading Data</span></div>
      
      <img src='/assets/images/trade/graphopt.png' className='img-fluid' />
      <img src='/assets/images/trade/graph1.png' className='img-fluid' />
      
      <div className='trade_tabled1 table-responsive'>
      <table className='table'>
        <thead>
          <tr>
            <th>Orders</th>
            <th>BUY (BTC)</th>
            <th>Sell (BTC)</th>
            <th>-92.9791</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Large</td>
            <td><span className='suc_bx'></span>38.06644</td>
            <td><span className='dang_bx'></span>38.06644</td>
            <td>-92.9791</td>
          </tr>
          <tr>
            <td>Large</td>
            <td><span className='suc_bx'></span>38.06644</td>
            <td><span className='dang_bx'></span>38.06644</td>
            <td>-92.9791</td>
          </tr>
          <tr>
            <td>Large</td>
            <td><span className='suc_bx'></span>38.06644</td>
            <td><span className='dang_bx'></span>38.06644</td>
            <td>-92.9791</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>66.4184</td>
            <td>194.2907</td>
            <td>-127.8754</td>
          </tr>
        </tbody>
      </table>
      </div>

    </>
  );
};

export default TradeInfo;
