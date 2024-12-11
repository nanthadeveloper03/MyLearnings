import React from 'react';
import Link from "next/link";
import { useState } from "react";

import DataTable from 'react-data-table-component';

const OpenOrders = () => {

    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const [selectedOption1, setSelectedOption1] = useState("");

    const handleChange1 = (e) => {
        setSelectedOption1(e.target.value);
    };

    const [selectedOption2, setSelectedOption2] = useState("");

    const handleChange2 = (e) => {
        setSelectedOption2(e.target.value);
    };

    const columns = [
        {
            name: 'Time',
            selector: row => row.time,
            sortable: true,
        },
        {
            name: 'Pair',
            selector: row => row.pair,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'Side',
            selector: row => row.side,
            sortable: true,
            cell: (row) => (
                <span style={{ color: row.side === 'BUY' ? '#5FB787' : row.side === 'SELL' ? '#E94458' : 'black' }}>
                    {row.side}
                </span>
            ),
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            sortable: true,
        },
        {
            name: 'Filled',
            selector: row => row.filled,
            sortable: true,
        },
        {
            name: 'Total',
            selector: row => row.total,
            sortable: true,
        },
        {
            name: 'Trigger Conditions',
            selector: row => row.triggerconditions,
            sortable: true,
        },
        {
            name: <span className='pri_color'>Cancel All</span>,
            selector: row => row.cancelall,
            sortable: true,
            cell: (row) => (
                <button className='btn delete_btn'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                </button>
            ),
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                justifyContent: 'center',
                textAlign: 'center',
            },
        },
        cells: {
            style: {
                justifyContent: 'center',
                textAlign: 'center',
            },
        },
    };

    const data = [
        { id: '1', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'BUY', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '2', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'SELL', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '3', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'BUY', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '4', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'BUY', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '5', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'SELL', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '6', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'BUY', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '7', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'BUY', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '8', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'BUY', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '9', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'BUY', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '10', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Market', side: 'SELL', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '11', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'BUY', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '12', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'SELL', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '13', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'BUY', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '14', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'BUY', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '15', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'SELL', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '16', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'BUY', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '17', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'BUY', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '18', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'BUY', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '19', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Limit', side: 'BUY', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
        { id: '20', time: '2022/07/01 08:33:45', pair: 'BNB/USDT', type: 'Market', side: 'SELL', price: '25.000', amount: '24000', filled: '0.00%', total: '25000', triggerconditions: '25000' },
    ];

    console.log('Number of data rows:', data.length);


    return (

        <>

            <div className='select_datarw d-flex gap-2 flex-wrap'>
            <div className='selectd1'>
            <select value={selectedOption} onChange={handleChange}>
                <option value="" disabled hidden>Select an order type</option>
                <option value="all">All</option>
                <option value="limit">Limit Order</option>
                <option value="market">Market Order</option>                    
                <option value="stop-limit">Stop-Limit Order</option>
                <option value="stop-market">Stop-Market Order</option>
            </select>
            </div>

                <div className='selectd1'>
                    <select value={selectedOption1} onChange={handleChange1}>
                        <option value="" disabled hidden>Select Coin Pair</option>
                        <option value="All">All</option>
                        <option value="BTC/USDT">BTC/USDT</option>
                        <option value="BTC/USDT">BTC/USDT</option>
                    </select>
                </div>
                <div className='selectd1'>
                    <select value={selectedOption2} onChange={handleChange2}>
                        <option value="" disabled hidden>Side</option>
                        <option value="All">All</option>
                        <option value="Buy">Buy</option>
                        <option value="Sell">Sell</option>
                    </select>
                </div>
            </div>

            <div className='rev_table1'>

                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    keyField="id"
                    responsive
                    highlightOnHover
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 20, 30]}
                    className="custom-table"
                    customStyles={customStyles}
                />


            </div>

        </>

    );
};

export default OpenOrders;