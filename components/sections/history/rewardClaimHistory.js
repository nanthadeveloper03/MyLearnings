import React from 'react';
import { useState, useEffect } from "react";
import DataTable, { createTheme } from 'react-data-table-component';
import { apiRequest } from '@/hooks/apiCall';
import { formatDate, formatNumber, showNotification, assetTypes, walletTypes } from '@/util/common';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from "react-redux";
import 'react-datepicker/dist/react-datepicker.css';


const RewardClaimHistory = ({ randomValue }) => {

    const assetsList = assetTypes()
    const walletName = walletTypes()
    const { isTheme, authSelector } = useSelector((state) => state.auth);

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
    const [data, setData] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState({ status: 'all' })

    const [isReset, setIsReset] = useState(false)

    const columns = [
        {
            name: 'Date & Time',
            selector: row => formatDate(row.createdAt, 'MMM Do YYYY, h:mm a'),
            sortable: true,
            wrap: true,
            grow: 3,
        },
        {
            name: 'Currency',
            selector: row => row.amount,
            cell: row => (<> <span>{row.currency}</span> </>),
            sortable: true,
            grow: 2,
        },
        {
            name: 'Staked Amount',
            selector: row => row.stakedAmount,
            cell: row => (<> <span>{row?.stakedAmount || '0.00'}</span> </>),
            sortable: true,
            grow: 2,
        },
        {
            name: 'Monthly Percentage',
            selector: row => row.stakePercentage,
            cell: row => (<> <span>{formatNumber(row?.stakePercentage, 2) || '0.00'} %</span> </>),
            sortable: true,
            grow: 2,
        },
        {
            name: 'Reward Amount',
            selector: row => row.amount,
            cell: row => (<> <span>{formatNumber(row.amount, row.decimalPoint)}</span> <span className="mx-1 small">{row.currency}</span> </>),
            sortable: true,
            wrap: true,
            grow: 2,
        },
        {
            name: 'Action',
            selector: row => row.status,
            cell: (row, index) => (<>
                <span className={`${(row.holdStatus == 1) ? 'pri_color' : 'text-info'}`}>{(row.holdStatus == 1) ? 'Claimed' : ' Not yet claim'}</span>
            </>),
            sortable: false,
            wrap: true,
            grow: 2,
        }
    ];

    const history = async (currentPage, perPage) => {
        try {
            setIsLoading(true)
            let response = await apiRequest('/rewardClaimHistory', { 'currentPage': currentPage, 'perPage': perPage, filter: filter })
            if (response?.status) {
                setData(response.data?.data ?? [])
                setTotalCount(response.data?.count)
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        history(currentPage, perPage);
    }, [currentPage, perPage]);


    const handlePageChange = (page) => {
        setIsLoading(true)
        setCurrentPage(page);
    };

    const claimAmount = async (rewardId) => {
        try {
            setIsLoading(true)
            let response = await apiRequest('/claimAmount', { 'rewardId': rewardId })
            if (response?.status) {
                history(1, perPage);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const claimData = data || [];

    return (
        <div>
            <div className="rew_tabsc mt-4">
                <div className="table-responsive text-center cm_table1 hist_table mt-3">
                    <DataTable
                        columns={columns}
                        data={claimData}
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
        </div>
    );
};

export default RewardClaimHistory;