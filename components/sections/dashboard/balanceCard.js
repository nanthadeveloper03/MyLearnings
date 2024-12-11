"use client";
import React, { useState, useEffect, useMemo } from "react";
import { apiRequest } from '@/hooks/apiCall';
import DataTable, { createTheme } from 'react-data-table-component';
import { TextField, InputAdornment, Switch } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { updateWalletType } from '@/store/commonSlice';
import Image from "next/image";
import { formatNumber } from '@/util/common'
import { useSelector } from "react-redux";
import TransactionsCard from './transactionsCard'
import Tooltip from '@mui/material/Tooltip';
import OutboxIcon from '@mui/icons-material/Outbox';

export default function balanceCard({onHit}) {

    const dispatch = useDispatch();
    const router = useRouter();
    const { isTheme } = useSelector((state) => state.auth);

    createTheme('myDarkTheme', {
        text: {
            primary: '#E4E6EB',
            secondary: '#FFFFFF',
        },
        background: {
            default: '#141416',
        },
        context: {
            background: '#CB4B16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#201e1e',
        },
        button: {
            default: '#0066CC',
            hover: 'rgba(0,0,0,.08)',
            focus: 'rgba(255,255,255,.12)',
            disabled: 'rgba(255, 255, 255, .34)',
        },
        sortFocus: {
            default: '#0077DD',
        },
        selected: {
            default: '#1F3B4D',
            text: '#FFFFFF',
        },
        highlightOnHover: {
            default: '#262626',
            text: '#FFFFFF',
        },
        striped: {
            default: '#171718',
            text: '#FFFFFF',
        },
    });

    const [isLoading, setIsLoading] = useState(false)
    const [balanceData, setBalanceData] = useState(false)
    const [filterText, setFilterText] = useState('');
    const [hideZeroBalance, setHideZeroBalance] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;
    const [currentRowsPerPage, setCurrentRowsPerPage] = useState(perPage);

    const redirectWithdraw = (type, currency) => {
        let obj = { 'assetId': type, 'assetCurrency': currency }
        dispatch(updateWalletType(obj));
        router.push('/withdraw/')
    }

    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1 + ((currentPage - 1) * currentRowsPerPage),
            sortable: false,
            width: '100px'
        },
        {
            name: 'Currency Name',
            selector: row => row.name,
            cell: row => (
                <>
                    <Image src={row.image || ''} height={30} width={30} className="mx-3" alt={row.symbol} />
                    {row.name}
                </>
            ),
            sortable: true,
        },
        {
            name: 'Currency Symbol',
            selector: row => row.symbol,
            sortable: true,
        },
        {
            name: 'Available Balance',
            selector: row => row.balance,
            cell: row => formatNumber(row.balance, row.decimalPoint),
            sortable: true
        }
    ];

    const filteredData = useMemo(() => {

        let data = balanceData || [];

        if (hideZeroBalance) {
            data = data.filter(item => item.balance > 0);
        }

        return data.filter(item =>
            item.name.toLowerCase().includes(filterText.toLowerCase()) ||
            item.symbol.toLowerCase().includes(filterText.toLowerCase())
        );

    }, [balanceData, filterText, hideZeroBalance]);


    useEffect(() => {
        if (onHit) {
            initLoad()
        }
    }, [onHit]);
    async function initLoad() {
        try {
            setIsLoading(true)
            const response = await apiRequest('/account/balance', {})
            if (response?.status) {
                let data = response?.data;
                setBalanceData(data)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        initLoad()
    }, [])

    const zeroBalance = () => {
        setHideZeroBalance(!hideZeroBalance)
    }

    const changePage = (page) => {
        setCurrentPage(page)
        const scrollPosition = document.body.scrollHeight * (10 / 100);
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setCurrentRowsPerPage(newRowsPerPage);
    };

    const shouldShowPagination = (balanceData && balanceData.length > perPage) ? true : false;

    return (

        <div className="user_wallet_table_dashboard mb-4">
            <div className="row">
                <div className="col-md-8">
                    <div className="wallet_listtable">
                        <div style={{ height: "100%", width: "100%" }}>
                            <div className="row wallet_table_head">
                                <h3>Spot Assets</h3>
                                <div className="input-group search-area">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Currency Name, Symbol"
                                        value={filterText} onChange={e => setFilterText(e.target.value)}
                                    />
                                    <span className="input-group-text">
                                        <svg
                                            width="18"
                                            height="19"
                                            viewBox="0 0 18 19"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M16.6 18.3994L10.3 12.0994C9.8 12.4994 9.225 12.8161 8.575 13.0494C7.925 13.2827 7.23333 13.3994 6.5 13.3994C4.68333 13.3994 3.14583 12.7702 1.8875 11.5119C0.629167 10.2536 0 8.71608 0 6.89941C0 5.08275 0.629167 3.54525 1.8875 2.28691C3.14583 1.02858 4.68333 0.399414 6.5 0.399414C8.31667 0.399414 9.85417 1.02858 11.1125 2.28691C12.3708 3.54525 13 5.08275 13 6.89941C13 7.63275 12.8833 8.32441 12.65 8.97441C12.4167 9.62441 12.1 10.1994 11.7 10.6994L18 16.9994L16.6 18.3994ZM6.5 11.3994C7.75 11.3994 8.8125 10.9619 9.6875 10.0869C10.5625 9.21191 11 8.14941 11 6.89941C11 5.64941 10.5625 4.58691 9.6875 3.71191C8.8125 2.83691 7.75 2.39941 6.5 2.39941C5.25 2.39941 4.1875 2.83691 3.3125 3.71191C2.4375 4.58691 2 5.64941 2 6.89941C2 8.14941 2.4375 9.21191 3.3125 10.0869C4.1875 10.9619 5.25 11.3994 6.5 11.3994Z"
                                                fill="var(--onsurface)"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className="switchfield" disabled={isLoading}>
                                <Switch onClick={zeroBalance} />
                                <span className="swtich_label">Hide Zero Balance</span>
                            </div>

                            <DataTable
                                columns={columns}
                                data={filteredData || []}
                                striped={false}
                                pagination={shouldShowPagination}
                                paginationPerPage={perPage}
                                paginationRowsPerPageOptions={[10, 20, 30]}
                                persistTableHead={true}
                                defaultSortField="balance"
                                defaultSortAsc={false}
                                progressPending={isLoading}
                                theme={(isTheme === 'is_dark') ? "myDarkTheme" : ''}
                                onChangePage={(page) => changePage(page)}
                                onChangeRowsPerPage={handleRowsPerPageChange}
                            />
                        </div>
                    </div>
                </div>

                <TransactionsCard />

            </div>
        </div>
    );
}
