"use client"
import React from 'react';
import { useEffect, useState } from 'react';

export default function RecentTrade() {

    const dangerLimit = 20; 
    const successLimit = 10;  
  
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
    </>
);
}