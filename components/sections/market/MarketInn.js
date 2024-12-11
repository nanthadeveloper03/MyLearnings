import React from 'react';
import Link from "next/link";
import { useState } from "react";
import IconStar from "@/components/elements/IconStar";
import ChatList from "@/components/sections/market/ChatList";
import DataTable from 'react-data-table-component';

const MarketInn = () => {

    const columns = [
        {
            name: '#',
            selector: row => row.star,
            sortable: true,
            cell: (row) => (
                <IconStar />
            ),
        },
        {
            name: 'Product',
            selector: row => row.product,
            sortable: true,
            cell: (row) => (
                <Link href="#">
                    <div className='ico_prod position-relative'>
                        <img src={row.imageSrc} className='img-fluid' alt={row.product} />
                        <span>{row.product}</span>
                        <span className="unit">{row.unit}</span>
                    </div>
                </Link>
            ),
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: '1h 4h 24h Change',
            selector: row => row.change,
            sortable: true,
            cell: (row) => {
                // Parse the change value from string to float
                const changeValue = parseFloat(row.change.replace('%', '')); // Remove '%' and convert to float
                const isPositive = changeValue >= 1.112323; // Comparison based on your condition

                return (
                    <span className={isPositive ? "text-success" : "text-danger"}>
                        {isPositive ? `+${changeValue.toFixed(6)}%` : `${changeValue.toFixed(6)}%`}
                        <span className='caret_mn'></span>
                    </span>
                );
            },
        },
        {
            name: 'Markets',
            selector: row => row.markets,
            sortable: true,
            cell: (row) => {
                // Parse the change value for the ChatList condition
                const changeValue = parseFloat(row.change.replace('%', ''));
                const isPositive = changeValue >= 1.112323;

                return (
                    <>
                        {isPositive ? <ChatList color={1} /> : <ChatList color={2} />}
                    </>
                );
            },
        },
        {
            name: 'Market Cap',
            selector: row => row.marketcap,
            sortable: true,
        },
        {
            name: '24h Volume',
            selector: row => row.volume,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => row.action,
            sortable: true,
            cell: (row) => (
                <ul className='d-flex flex-nowrap mk_lis2'>                    
                    <li>
                        <button type='button' className='btn btn_mbtn1'>Trade</button>
                    </li>
                </ul>
            ),
        },
    ];

    const data = [
        { star: 1, imageSrc: '/assets/images/market/ico1.png', product: 'Bitcoin', unit: 'BTC', price: '$57,552.51', marketcap: '$1.13T', volume: '$215.91M', change: '+1.12%' },
        { star: 2, imageSrc: '/assets/images/market/ico2.png', product: 'Ethereum', unit: 'ETH', price: '$2,459.38', marketcap: '$291.98B', volume: '$165.25M', change: '-0.72%' },
        { star: 3, imageSrc: '/assets/images/market/ico3.png', product: 'XRP', unit: 'XRP', price: '$0.61733344', marketcap: '$33.97B', volume: '$70.04M', change: '+19.92%' },
        { star: 4, imageSrc: '/assets/images/market/ico4.png', product: 'SOL', unit: 'Solana', price: '$154.97', marketcap: '$66.66B', volume: '$56.39M', change: '+2.38%' },
        { star: 5, imageSrc: '/assets/images/market/ico5.png', product: 'PEPE', unit: 'Pepe', price: '$0.0000078815', marketcap: '$3.28B', volume: '$14.63M', change: '-1.74%' },
        { star: 6, imageSrc: '/assets/images/market/ico6.png', product: 'TON', unit: 'Ton', price: '$6.19', marketcap: '$16B', volume: '$13.31M', change: '+8.77%' },
        { star: 7, imageSrc: '/assets/images/market/ico7.png', product: 'NOT', unit: 'Notcoin', price: '$0.01178075', marketcap: '$1.2B', volume: '$10.13M', change: '+1.85%' },
        { star: 8, imageSrc: '/assets/images/market/ico8.png', product: 'WIF', unit: 'dogwifhat', price: '$1.7', marketcap: '$1.69B', volume: '$9.66M', change: '-0.92%' },
        { star: 9, imageSrc: '/assets/images/market/ico9.png', product: 'KAS', unit: 'KASPA', price: '$0.16023204', marketcap: '$3.92B', volume: '$8.49M', change: '-1.08%' },
        { star: 10, imageSrc: '/assets/images/market/ico10.png', product: 'JASMY', unit: 'JasmyCoin', price: '$0.02135527', marketcap: '$990.41M', volume: '$6.23M', change: '-4.43%' },
    ];

    console.log('Number of data rows:', data.length);

    // Custom Pagination Component
    const CustomPagination = () => (
        <nav className="row cm_pag1">
            <ul className="pagination justify-content-end text-center mt-2 mb-2">
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&lt;</span>
                    </a>
                </li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">4</a></li>
                <li className="page-item"><a className="page-link" href="#">5</a></li>
                <li className="page-item"><a className="page-link" href="#">6</a></li>
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&gt;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );


    return (

        <>

            <section className='market_sc1'>

                <div className='container'>

                    <h3 className='mark_mnhd1 finter fw700'>
                        Markets Overview
                    </h3>

                    <div className='row rsp-mma5'>
                        <div className='col-md-4 rsp-mpd5'>
                            <div className='mk_bk1'>
                                <div className='mk_hdb1 d-flex align-items-center gap-2 w-100'>
                                    <img src='/assets/images/market/mhd1.png' className='img-fluid' />
                                    <span className='mkhdsub'>Trending</span>
                                    {/* <a href='#'>More <span className='arr'> &gt; </span> </a> */}
                                </div>
                                <div className='mk_bdy1 d-flex flex-column w-100'>
                                    <div className='mk_rw1 d-flex align-items-center w-100'>
                                        <div className='mk1'>
                                            <span className='text-muted'>1</span>
                                            <img src='/assets/images/market/ico1.png' className='img-fluid mx-2' />
                                            <span>BTC</span>
                                        </div>
                                        <div className='mk2 text-end'>
                                            <span> $57,552.51 </span>
                                        </div>
                                        <div className='mk3 text-end'>
                                            <span className='pri_color'>+1.12% <span className='caret_mnb'></span></span>
                                        </div>
                                    </div>

                                    <div className='mk_rw1 d-flex align-items-center w-100'>
                                        <div className='mk1'>
                                            <span className='text-muted'>2</span>
                                            <img src='/assets/images/market/moico1.png' className='img-fluid mx-2' />
                                            <span>LTC</span>
                                        </div>
                                        <div className='mk2 text-end'>
                                            <span> $58.14 </span>
                                        </div>
                                        <div className='mk3 text-end'>
                                            <span className='pri_color'>+0.37% <span className='caret_mnb'></span></span>
                                        </div>
                                    </div>

                                    <div className='mk_rw1 d-flex align-items-center w-100'>
                                        <div className='mk1'>
                                            <span className='text-muted'>3</span>
                                            <img src='/assets/images/market/moico2.png' className='img-fluid mx-2' />
                                            <span>KCS</span>
                                        </div>
                                        <div className='mk2 text-end'>
                                            <span>$7.56</span>
                                        </div>
                                        <div className='mk3 text-end'>
                                            <span className='text-danger'>-0.40% <span className='caret_mnb'></span></span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='col-md-4 rsp-mpd5'>
                            <div className='mk_bk1'>
                                <div className='mk_hdb1 d-flex align-items-center gap-2 w-100'>
                                    <img src='/assets/images/market/mhd2.png' className='img-fluid' />
                                    <span className='mkhdsub'>Top Gainers</span>
                                    {/* <a href='#'>More <span className='arr'> &gt; </span> </a> */}
                                </div>
                                <div className='mk_bdy1 d-flex flex-column w-100'>
                                    <div className='mk_rw1 d-flex align-items-center w-100'>
                                        <div className='mk1'>
                                            <span className='text-muted'>1</span>
                                            <img src='/assets/images/market/moico3.png' className='img-fluid mx-2' />
                                            <span>KLUB</span>
                                        </div>
                                        <div className='mk2 text-end'>
                                            <span> $0.00342068 </span>
                                        </div>
                                        <div className='mk3 text-end'>
                                            <span className='pri_color'>+94.31% <span className='caret_mnb'></span></span>
                                        </div>
                                    </div>

                                    <div className='mk_rw1 d-flex align-items-center w-100'>
                                        <div className='mk1'>
                                            <span className='text-muted'>2</span>
                                            <img src='/assets/images/market/moico4.png' className='img-fluid mx-2' />
                                            <span>GARI</span>
                                        </div>
                                        <div className='mk2 text-end'>
                                            <span> $0.01332266 </span>
                                        </div>
                                        <div className='mk3 text-end'>
                                            <span className='pri_color'> +34.54% <span className='caret_mnb'></span></span>
                                        </div>
                                    </div>

                                    <div className='mk_rw1 d-flex align-items-center w-100'>
                                        <div className='mk1'>
                                            <span className='text-muted'>3</span>
                                            <img src='/assets/images/market/moico5.png' className='img-fluid mx-2' />
                                            <span>KMNO</span>
                                        </div>
                                        <div className='mk2 text-end'>
                                            <span>$0.04150529</span>
                                        </div>
                                        <div className='mk3 text-end'>
                                            <span className='pri_color'>+27.47% <span className='caret_mnb'></span></span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='col-md-4 rsp-mpd5'>
                            <div className='mk_bk1'>
                                <div className='mk_hdb1 d-flex align-items-center gap-2 w-100'>
                                    <img src='/assets/images/market/mhd3.png' className='img-fluid' />
                                    <span className='mkhdsub'>Top Losers</span>
                                    {/* <a href='#'>More <span className='arr'> &gt; </span> </a> */}
                                </div>
                                <div className='mk_bdy1 d-flex flex-column w-100'>
                                    <div className='mk_rw1 d-flex align-items-center w-100'>
                                        <div className='mk1'>
                                            <span className='text-muted'>1</span>
                                            <img src='/assets/images/market/moico6.png' className='img-fluid mx-2' />
                                            <span>BEAT</span>
                                        </div>
                                        <div className='mk2 text-end'>
                                            <span> $0.00345069 </span>
                                        </div>
                                        <div className='mk3 text-end'>
                                            <span className='text-danger'>-25.32% <span className='caret_mnb'></span></span>
                                        </div>
                                    </div>

                                    <div className='mk_rw1 d-flex align-items-center w-100'>
                                        <div className='mk1'>
                                            <span className='text-muted'>2</span>
                                            <img src='/assets/images/market/moico7.png' className='img-fluid mx-2' />
                                            <span>WSDM</span>
                                        </div>
                                        <div className='mk2 text-end'>
                                            <span> $0.05042008 </span>
                                        </div>
                                        <div className='mk3 text-end'>
                                            <span className='text-danger'>-19.57% <span className='caret_mnb'></span></span>
                                        </div>
                                    </div>

                                    <div className='mk_rw1 d-flex align-items-center w-100'>
                                        <div className='mk1'>
                                            <span className='text-muted'>3</span>
                                            <img src='/assets/images/market/moico8.png' className='img-fluid mx-2' />
                                            <span>PRE</span>
                                        </div>
                                        <div className='mk2 text-end'>
                                            <span>$0.00733646</span>
                                        </div>
                                        <div className='mk3 text-end'>
                                            <span className='text-danger'>-19.23% <span className='caret_mnb'></span></span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className='mark_hd1 d-flex justify-content-between align-items-center'>
                        <div className='mk_lef1'>
                            <h4>Ultrapro Market Watch</h4>
                            <h6>Find promising coins and great opportunities!</h6>
                        </div>
                        <div className='mk_rig1'>
                            <div className='input-group cm_inpgrpm1 flex-nowrap'>
                                <span className='input-group-text'>
                                    <button type='button' className='btn'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                        </svg>
                                    </button>
                                </span>
                                <input type='text' className='form-control' placeholder='Search' />
                            </div>
                        </div>
                    </div>

                    <div className='mark_table1'>

                        <DataTable
                            columns={columns}
                            data={data}
                            pagination
                            keyField="id"
                            responsive
                            highlightOnHover
                            paginationPerPage={10}
                            paginationRowsPerPageOptions={[10, 20, 30]}
                            paginationComponent={CustomPagination} // Use custom pagination
                            className="custom-table"
                        />

                    </div>

                </div>
            </section>

        </>

    );
};

export default MarketInn;