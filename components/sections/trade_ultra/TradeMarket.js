import React from 'react';
import Link from "next/link";
import { useEffect, useState } from 'react';

const TradeMarket = () => {

  const dangerLimit = 20; 
  const successLimit = 10;  

  //Tabs

  const [flatTabs, setFlatTabs] = useState(1)
  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }

  const [flatTabs1, setFlatTabs1] = useState(1)
  const handleFlatTabs1 = (index) => {
    setFlatTabs1(index)
  }

  //for animating danger rows bg

  const [rows, setRows] = useState([]);
  const [animateRows, setAnimateRows] = useState(false);

  useEffect(() => {

    const data = [
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
    ];
    setRows(data);

    setTimeout(() => setAnimateRows(true), 100);
  }, []);


  //for animating success rows bg

  const [rows1, setRows1] = useState([]);
  const [animateRows1, setAnimateRows1] = useState(false);

  useEffect(() => {

    const data1 = [
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' }, 
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },
      { price: 59867.0, amount: 0.230323, total: '13.78K' },      
    ];
    setRows1(data1);
    setTimeout(() => setAnimateRows1(true), 100);
  }, []);

  return (
    <>
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
                      Price(USDT)
                    </div>
                    <div className='vir_fd2'>
                      Amount(BTC)
                    </div>
                    <div className='vir_fd2'>
                      Total(USDT)
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
                          <p>{row.total}</p>
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
                      Price(USDT)
                    </div>
                    <div className='vir_fd2'>
                      Amount(BTC)
                    </div>
                    <div className='vir_fd2'>
                      Total(USDT)
                    </div>
                  </div>
                  <div className="virtual_tbody d-flex flex-column w-100">
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
                </div>
              </div>

              <div className="content-inner" style={{ display: `${flatTabs1 === 3 ? "block" : "none"}` }}>
                <div className='trd_table1'>
                  <div className='virtual_thead d-flex align-items-center w-100'>
                    <div className='vir_fd1'>
                      Price(USDT)
                    </div>
                    <div className='vir_fd2'>
                      Amount(BTC)
                    </div>
                    <div className='vir_fd2'>
                      Total(USDT)
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
                        <h4>59,480.93</h4>
                      </div>
                      <div className="vir_fd3">
                        <p>Mark:59,530.00</p>
                      </div>
                      <div className="vir_fd4">
                        <button type='button' className='mor_btn btn'>More</button>
                      </div>
                    </div>
                  </div>
                  <div className="virtual_tbody anim_scoll1 d-flex flex-column w-100">
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
                          <p>{row.total}</p>
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
                    Price(USDT)
                  </div>
                  <div className='vir_fd2'>
                    Amount(BTC)
                  </div>
                  <div className='vir_fd2'>
                    Total(USDT)
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
                        <p>{row.total}</p>
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
                        <p>{row.total}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TradeMarket;
