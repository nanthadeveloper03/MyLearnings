import React from 'react';
import Link from "next/link";

const TradeInfo = () => {
  return (
    <>
      <div className="trd_hdin mt-2 mb-2 px-2"><span className="p-1">Info</span></div>
      <div className='trd_coinhd1 p-2 fw700 finter'><img src='/assets/images/trade/coin2.png' className='img-fluid' /> Bitcoin</div>
      <div className='d-flex flex-column w-100 px-2'>
        <div className='d-flex justify-content-between col-12 px-1'>
          <span className='infolef'>
          Ranking
          </span>
          <span className='inforig'>
            No.1
          </span>
        </div>
        <div className='d-flex justify-content-between col-12 px-1'>
          <span className='infolef'>
          Market Capitalization
          </span>
          <span className='inforig'>
          1,197,974,29M BTC
          </span>
        </div>
        <div className='d-flex justify-content-between col-12 px-1'>
          <span className='infolef'>
          Market Dominance Index
          </span>
          <span className='inforig'>
          57.32%
          </span>
        </div>
        <div className='d-flex justify-content-between col-12 px-1'>
          <span className='infolef'>
          Circulating supply
          </span>
          <span className='inforig'>
          19,7551568 BTC
          </span>
        </div>
        <div className='d-flex justify-content-between col-12 px-1'>
          <span className='infolef'>
          Maximum supply
          </span>
          <span className='inforig'>
          21,000,000 BTC
          </span>
        </div>
        <div className='d-flex justify-content-between col-12 px-1'>
          <span className='infolef'>
          Total
          </span>
          <span className='inforig'>
          19,755,568
          </span>
        </div>       
        <div className='d-flex justify-content-between col-12 px-1'>
          <span className='infolef'>
          Issue Date
          </span>
          <span className='inforig'>
          2008-11-01
          </span>
        </div>        
      </div>
    </>
  );
};

export default TradeInfo;
