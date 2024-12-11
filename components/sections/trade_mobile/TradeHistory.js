import React from 'react';
import Link from "next/link";
import { useState } from 'react';


const TradeTab = () => {

  //Tabs

  const [flatTabs, setFlatTabs] = useState(1)
  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }

  const [flatTabs1, setFlatTabs1] = useState(1)
  const handleFlatTabs1 = (index) => {
    setFlatTabs1(index)
  }

  return (
    <>
      <div className='market_tsc2'>


        <div className='trade_tab'>
          <ul className="menu-tabtrd d-flex">
            <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><Link href="#">Open Orders</Link></li>
            <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><Link href="#">Order History</Link></li>
            <li className={flatTabs === 3 ? "active" : ""} onClick={() => handleFlatTabs(3)}><Link href="#">Trade History</Link></li>
            <li className={flatTabs === 4 ? "active" : ""} onClick={() => handleFlatTabs(4)}><Link href="#">Assets</Link></li>
          </ul>
          <div className="content-tabrd">
            <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>

              <ul className='d-flex flex-wrap gap-2 ord_lis1 mt-3 mb-0'>
                <li className={flatTabs1 === 1 ? "active" : ""} onClick={() => handleFlatTabs1(1)}>
                  <button type='button' className='btn def_btn'>Limit | Market(0)</button>
                </li>
                <li className={flatTabs1 === 2 ? "active" : ""} onClick={() => handleFlatTabs1(2)}>
                  <button type='button' className='btn def_btn'>TP/SL(0)</button>
                </li>
                <li className={flatTabs1 === 3 ? "active" : ""} onClick={() => handleFlatTabs1(3)}>
                  <button type='button' className='btn def_btn'>Trailing Stop(0)</button>
                </li>
              </ul>

              <div className="content-inner" style={{ display: `${flatTabs1 === 1 ? "block" : "none"}` }}>

                <div className='trade_table4 table-responsive'>
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
                        <td>14:25 PM</td>
                        <td>UPRO</td>
                        <td>Buy</td>
                        <td>NA</td>
                        <td>10 BTC</td>
                        <td>10 BTC</td>
                        <td>10 BTC</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                      </tr>
                      <tr>
                        <td>14:25 PM</td>
                        <td>UPRO</td>
                        <td>Buy</td>
                        <td>NA</td>
                        <td>10 BTC</td>
                        <td>10 BTC</td>
                        <td>10 BTC</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                      </tr>
                      <tr>
                        <td>14:25 PM</td>
                        <td>UPRO</td>
                        <td>Buy</td>
                        <td>NA</td>
                        <td>10 BTC</td>
                        <td>10 BTC</td>
                        <td>10 BTC</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                      </tr>
                      <tr>
                        <td>14:25 PM</td>
                        <td>UPRO</td>
                        <td>Buy</td>
                        <td>NA</td>
                        <td>10 BTC</td>
                        <td>10 BTC</td>
                        <td>10 BTC</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                      </tr>
                      {/* <tr>
                      <td colSpan={10} align='center' className='beflogin'>
                        <h4><Link href="#" className='pri_color'>Log In</Link> or <Link href="#" className='pri_color'>Sign Up</Link> Now to trade</h4>
                      </td>
                    </tr> */}
                    </tbody>
                  </table>

                </div>

              </div>

              <div className="content-inner" style={{ display: `${flatTabs1 === 2 ? "block" : "none"}` }}>

                <div className='trade_table4 table-responsive'>
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

                <div className='trade_table4 table-responsive'>
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

              <div className='trade_table4 table-responsive'>
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

              <div className='trade_table4 table-responsive'>
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
            <div className="content-inner" style={{ display: `${flatTabs === 4 ? "block" : "none"}` }}>

              <div className='trade_table4 table-responsive'>
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
