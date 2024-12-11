import React from 'react';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { apiRequest } from '@/hooks/tradeapiCall';

const TradingPair = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [pairlist, setPairlist] = useState(1)
  const [coins1, setCoins1] = useState({})
  const [filteredCoins, setfilteredCoins] = useState({})
  const [selectedCoinType, setSelectedCoinType] = useState('USDT');
  const [isListVisible, setIsListVisible] = useState(true);
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
  };
  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearchClicked(false);
  };
  const handleSearchClick = () => {
    setIsSearchClicked(true);
  };

  let setShowCoinPairs = () => {

  }

  useEffect(() => {
    initData();
  }, [])

  let initData = async () => {
    const response = await apiRequest('/trade/allPairs', {});
    setPairlist(response.data)
    console.log(response.data, "RESPONSE");

    const coins1get = await Object.values(response.data).flatMap(currency => currency.data);
    let receivecoins = coins1get.map(coinl => {
      return { pair: coinl.pair.replace("_", "-"), name1: coinl.pair.replace("_", "/"), price: coinl.lastPrice, change: coinl.changePercentage }
    })
    setCoins1(receivecoins);
  }

  useEffect(() => {
    if (coins1.length > 0) {
      let filtered = coins1?.filter(coin =>
        coin.name1.toLowerCase().includes("/" + searchQuery) && coin.name1.includes("/" + selectedCoinType)
      );
      setfilteredCoins(filtered)
    }
  }, [coins1, selectedCoinType])
  // search history list deleting
  const handleDelete = () => {
    setIsListVisible(false);
  };

  const coins = [
    { id: 1, name: 'USDT' },
    { id: 2, name: 'FDUSD12' },
    { id: 3, name: 'USDC' },
    { id: 4, name: 'TUSD' },
    { id: 5, name: 'BNB' },
    { id: 6, name: 'USDC' },
    { id: 7, name: 'TUSD' },
    { id: 8, name: 'BNB' },
  ];

  const [visibleStart, setVisibleStart] = useState(0);
  const visibleCount = 5;

  const handleNext = () => {
    if (visibleStart + visibleCount < coins.length) {
      setVisibleStart(visibleStart + visibleCount);
    }
  };

  const handlePrev = () => {
    if (visibleStart > 0) {
      setVisibleStart(visibleStart - visibleCount);
    }
  };

  const handleCoinTypeClick = (coinType) => {
    setSelectedCoinType(coinType);
    setVisibleStart(0);
  };

  return (
    <>
      <div className='market_tsc4'>

        <div className='search_area1'>
          <div className='input-group cm_tinpgrp2'>
            <span className='input-group-text'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </span>
            <input type='text' className='form-control' placeholder='Search' value={searchQuery} onChange={handleSearchChange} onClick={handleSearchClick} onBlur={() => {
              if (searchQuery.length === 0) {
                setIsSearchClicked(false);
              }
            }} />
            {(searchQuery || isSearchClicked) && (
              <span className='input-group-text clear-btn' onClick={handleClearSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </span>
            )}
          </div>
        </div>

        {isSearchClicked && !searchQuery && (
          <div className='search_enter'>
            <div className='sort_body d-flex flex-column w-100'>

              {isListVisible && (
                <div>
                  <h4 className='seh_tx1 d-flex justify-content-between w-100 align-items-center'>
                    Search History
                    <button type='button' className='btn del_btn1' onClick={handleDelete}>
                      <img src='/assets/images/trade/delete.png' className='img-fluid' />
                    </button>
                  </h4>
                  <ul className='d-flex align-items-center gap-2 coin_hlis1 w-100'>
                    <li>
                      <div className='sfdh1 d-flex align-items-center'>
                        <span className='trd_ptx1'>AAVE/USDT</span>
                        <div className="trad_tim d-inline-flex align-items-center justify-content-center">5x</div>
                      </div>
                    </li>
                    <li>
                      <div className='sfdh1 d-flex align-items-center'>
                        <span className='trd_ptx1'>AAVE/USDT</span>
                        <div className="trad_tim d-inline-flex align-items-center justify-content-center">5x</div>
                      </div>
                    </li>
                    <li>
                      <div className='sfdh1 d-flex align-items-center'>
                        <span className='trd_ptx1'>AAVE/USDT</span>
                        <div className="trad_tim d-inline-flex align-items-center justify-content-center">5x</div>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              <h4>Top Search</h4>

              {filteredCoins.map((coin, index) => (
                <div key={index} className='sort_rw d-flex align-items-center w-100'>
                  <div className='sfd1 symbol-pair'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                    <span className='trd_ptx1'>{coin.name1}</span>
                    <div className="trad_tim d-inline-flex align-items-center justify-content-center">5x</div>
                  </div>
                  <div className='sfd2 market-price'>
                    <span className='trd_ptx1'>{coin.price}</span>
                  </div>
                  <div className='sfd2 market-change'>
                    <span className={`trd_ptx1 ${+coin.change >= 0 ? 'text-success' : 'text-danger'}`}>
                      {coin.change} %
                    </span>
                  </div>
                </div>
              ))}

            </div>
          </div>

        )}

        {(!isSearchClicked || searchQuery !== '') && (

          <div className='search_leave'>

            <div className="coin-list-container">
              <ul className="d-flex flex-wrap gap-3 scoin_lis1">
                {visibleStart === 0 && (
                  <li key="star-icon" className='star_cico' onClick={() => setShowCoinPairs(prev => !prev)}>
                    <Link href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    </Link>
                  </li>
                )}

                {Object.keys(pairlist).map((coin) => (
                  <li key={coin} onClick={() => handleCoinTypeClick(coin)} className={coin === selectedCoinType ? 'active' : ''}>
                    <Link href="#">{coin}</Link>
                  </li>
                ))}
              </ul>

              {visibleStart > 0 && (
                <button className="btn prevbtn" onClick={handlePrev}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                  </svg>
                </button>
              )}

              <button className="btn nexbtn" onClick={handleNext} disabled={visibleStart + visibleCount >= coins.length}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5 12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
              </button>
            </div>



            <div className='coinpairsc'>
              <div className='sort_hd d-flex align-items-center w-100'>
                <div className='sfd1'>
                  <span className='trd_ptx1 d-flex'>Pair
                    <span className='sort_ico d-flex justify-content-between flex-column'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </span>

                  </span>
                </div>
                <div className='sfd2 d-inline-flex align-items-center'>
                  <span className='trd_ptx1 d-flex'>Last Price
                    <span className='sort_ico d-flex justify-content-between flex-column'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </span>
                  </span>
                  <span className='sep_lin'>/</span>
                  <span className='trd_ptx1 d-flex'>24h Change
                    <span className='sort_ico d-flex justify-content-between flex-column'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                      </svg>
                    </span>
                  </span>
                  <span className='trd_exc'>
                    <img src='/assets/images/trade/exchange.png' className='img-fluid' />
                  </span>
                </div>
              </div>

              <div className='sort_body d-flex flex-column w-100'>
                {filteredCoins.length > 0 ? (
                  filteredCoins.map((coin, index) => (
                    <a href={`/trade/?pair=${coin.pair}`}>
                      <div key={index} className='sort_rw d-flex align-items-center w-100'>
                        <div className='sfd1 symbol-pair'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                          </svg>
                          <span className='trd_ptx1'>{coin.name1}</span>
                          <div className="trad_tim d-inline-flex align-items-center justify-content-center">5x</div>
                        </div>
                        <div className='sfd2 market-price'>
                          <span className='trd_ptx1'>{coin.price}</span>
                        </div>
                        <div className='sfd2 market-change'>
                          <span className={`trd_ptx1 ${+coin.change >= 0 ? 'text-success' : 'text-danger'}`}>
                            {coin.change} %
                          </span>
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className='no-results'>Loading...</div>
                )}
              </div>

            </div>

          </div>

        )}

      </div>
    </>
  );
};

export default TradingPair;
