"use client";
import React, { useState, useEffect, useMemo } from "react";
import { apiRequest } from '@/hooks/apiCall';
import DataTable, { createTheme } from 'react-data-table-component';
import { formatNumber, formatDate } from '@/util/common'
import { useSelector } from "react-redux";

export default function ReferedUsersCard({ refData, decimalPoint }) {

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

    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [filter, setFilter] = useState({ name: '' })
    const [totalCount, setTotalCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isReset, setIsReset] = useState(false)

    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: false,
            width: '100px'
        },
        {
            name: 'Registered at',
            selector: row => row.createdAt,
            cell: row => formatDate(row.createdAt, 'MMMM Do YYYY, h:mm a'),
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.fullName,
            sortable: true,
        },
        {
            name: 'Email Address',
            selector: row => row.email,
            sortable: true,
            grow: 2
        },
        {
            name: 'KYC Status',
            selector: row => row.kycStatus,
            cell: row => (
                <>
                    {(row.kycStatus == 3) ? <span className="text-success"> Completed </span> : (row.kycStatus == 2) ? <span className="text-danger"> Rejected </span> : (row.kycStatus == 1) ? <span className="text-warning"> Pending </span> : <span className="text-primary"> Not yet upload </span>}
                </>
            ),
            sortable: true
        },
        {
            name: 'Referral Amount',
            selector: row => row.mobileNo,
            cell: row => (
                <>
                    <span> {row.transactions && formatNumber(row.transactions.amount, decimalPoint) || '0.00'} {row.transactions && row.transactions.currency} </span>
                </>
            ),
            sortable: true
        }
    ];


    const history = async (currentPage, perPage) => {
        try {
            setIsLoading(true)
            let response = await apiRequest('/account/referralHistory', { 'currentPage': currentPage, 'perPage': perPage, filter: filter })
            if (response?.status) {
                setData(response.data.data)
                setTotalCount(response.data.count)
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        history(currentPage, perPage);
    }, [currentPage, perPage]);

    useEffect(() => {
        if (isReset) {
            setIsReset(false)
            history(1, perPage);
        }
    }, [isReset]);

    const handlePageChange = (page) => {
        setIsLoading(true)
        setCurrentPage(page);
    };

    const changeFilter = (e) => {
        setFilter(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const filterDoc = () => {
        history(1, perPage);
    }

    const resetFilter = () => {
        setIsReset(true)
        setFilter({ name: '' })
    }

    let referralData = data || [];
    const shouldShowPagination = (referralData && referralData.length > perPage) ? true : false;

    return (

        // <div className="user_wallet_table_dashboard mb-4">
        //     <div className="row order-md-3 order-2">
        //         <div className="col-md-12">
                    <div className="wallet_listtable">
                        <div style={{ height: "100%", width: "100%" }}>
                            <div className="row wallet_table_head mb-3">
                                <h3 className="d-flex flex-wrap justify-content-between align-items-center w-100">
                                Referral Details
                                <div className="rig_wallet d-flex flex-nowrap gap-2">
                                <div className="input-group search-area">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name, Email Address"
                                        name="name"
                                        value={filter.name} onChange={changeFilter}
                                        autoComplete="off"
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
                                <button type="button" className="btn btn-action text-white" onClick={filterDoc}> Search </button>
                                <button type="button" className="btn btn-danger text-white mx-2" disabled={isReset} onClick={resetFilter}> Reset </button>
                                </div>
                                </h3>

                            </div>

                            <DataTable
                                columns={columns}
                                data={referralData}
                                striped={true}
                                persistTableHead={true}
                                progressPending={isLoading}
                                wrap={true}
                                pagination={true}
                                paginationServer
                                paginationTotalRows={totalCount}
                                onChangePage={handlePageChange}
                                paginationPerPage={perPage}
                                paginationResetDefaultPage={resetPaginationToggle}
                                theme={(isTheme === 'is_dark') ? "myDarkTheme" : ''}
                            />

                        </div>
                    </div>
        //         </div>
        //     </div>
        // </div>


    );
}
