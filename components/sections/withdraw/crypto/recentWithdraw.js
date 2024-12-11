import React from 'react';
import Link from "next/link";
import { useState, useEffect } from "react";
import DataTable, { createTheme } from 'react-data-table-component';
import { apiRequest } from '@/hooks/apiCall';
import { formatDate, formatNumber, showNotification, walletTypes } from '@/util/common';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import WithdrawDetails from './withdrawDetails'

const WithdrawTable = ({ randomValue }) => {

    const { isTheme } = useSelector((state) => state.auth);
    const walletName = walletTypes()

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
    const [perPage, setPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(true)
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({});

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
            selector: row => row.tds,
            cell: row => (<> <span>{row.currency}</span> </>),
            sortable: true,
            grow: 2,
        },
        {
            name: 'Asset Type',
            selector: row => row.tds,
            cell: row => (<> <span>{walletName[row.walletType]}</span> </>),
            sortable: true,
            grow: 2,
        },
        {
            name: 'Address',
            selector: row => row.withdrawAddress,
            cell: row => (<> <span className="mx-1">{row.withdrawAddress && row.withdrawAddress.substring(0, 12)} ...</span> <Tooltip title="Copy Withdraw Address"><FileCopyIcon color='warning' className="cursor-pointer" onClick={() => copyText(row.withdrawAddress, 0)} /></Tooltip>  </>),
            sortable: true,
            wrap: true,
            grow: 3,
            style: { minWidth: '50px' },
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            cell: row => (<> <span>{formatNumber(row.amount, row.decimalPoint)}</span> <span className="mx-1 small">{row.currency}</span> </>),
            sortable: true,
            wrap: true,
            grow: 3,
        },
        // {
        //     name: 'Fee',
        //     selector: row => row.feeAmount,
        //     cell: row => (<> <span>{formatNumber(row.feeAmount, row.decimalPoint) || '0.00'}</span> <span className="mx-1 small">{row.currency}</span> </>),
        //     sortable: true,
        //     wrap: true,
        //     grow: 2,
        // },

        // {
        //     name: 'Tds',
        //     selector: row => row.tds,
        //     cell: row => (<> <span>{formatNumber(row.tds, row.decimalPoint) || '0.00'}</span> <span className="mx-1 small">{row.currency}</span> </>),
        //     sortable: true,
        //     grow: 2,
        // },

        // {
        //     name: 'Received',
        //     selector: row => row.receiveAmount,
        //     cell: row => (<> <span>{formatNumber(row.receiveAmount, row.decimalPoint)}</span> <span className="mx-1 small">{row.currency}</span> </>),
        //     sortable: true,
        //     wrap: true,
        //     grow: 2,
        // },

        {
            name: 'Transaction Id',
            selector: row => row.transactionId,
            cell: row => (<> {(row?.txnExplorer) ? <Link href={row?.txnExplorer} className='text-decoration-underline' target='_blank'>{row?.transactionId?.substring(0, 8)}</Link> : row?.transactionId?.substring(0, 8)} ... <Tooltip title="Copy Transaction Id" className='mx-2'><FileCopyIcon color='warning' className="cursor-pointer" onClick={() => copyText(row.transactionId, 1)} /></Tooltip></>),
            sortable: true,
            wrap: true,
            grow: 2,
            style: { minWidth: '50px' },
        },
        {
            name: 'Status',
            selector: row => row.status,
            cell: row => (<> <span className={`mx-1 ${(row.status == 'Pending') ? 'text-warning' : (row.status == 'Rejected') ? 'text-danger' : (row.status == 'Cancelled') ? 'text-danger' : 'text-success'}`}>{(row.status == 'Completed') ? 'Approved' : row.status}</span> </>),
            sortable: true,
            wrap: true,
            grow: 2,
        },
        {
            name: 'Action',
            selector: row => row.status,
            cell: (row, index) => (<> <Tooltip title="View"><VisibilityIcon color="warning" onClick={() => viewDetails(index)} className='cursor-pointer' /></Tooltip></>),
            sortable: false,
            wrap: true,
            grow: 1,
        }
        // {
        //     name: 'Action',
        //     selector: row => row.status,
        //     cell: (row, index) => (<> <Tooltip title="View"><VisibilityIcon color="info" onClick={() => viewDetails(index)} className='cursor-pointer' /></Tooltip> {row.status == 'Pending' && <Tooltip title="Cancel"><DeleteIcon color="error" onClick={() => showAlert(row._id)} className='cursor-pointer' /></Tooltip>} </>),
        //     sortable: true,
        // }
    ];

    const history = async (currentPage, perPage) => {
        try {
            let response = await apiRequest('/withdraw/crypto/history', { 'currentPage': currentPage, 'perPage': perPage })
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
        history(1, perPage);
        setResetPaginationToggle(!resetPaginationToggle);
    }, [randomValue]);

    const handlePageChange = (page) => {
        setIsLoading(true)
        setCurrentPage(page);
    };

    const copyText = (textToCopy, type) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            let txt = 'Address is copied.'
            if(type) {
                txt = 'Transaction Id is copied.'
            }
            showNotification(true, txt)
        }).catch(err => {
            //console.log('Failed to copy text: ', err);
        });
    };

    const viewDetails = (index) => {
        setShowPopup(Math.random(10000000))
        setFormData(withdrawData?.[index])
    }

    const withdrawData = data || [];

    return (
        <div>
            { showPopup &&
                <WithdrawDetails showPopup={showPopup} formData={formData} />
            }
            <div className="rew_tabsc">
                <div className="block-text1">
                    <h5>Recent Withdrawal</h5>
                </div>
                <div className="table-responsive text-center cm_table1">
                    <DataTable
                        columns={columns}
                        data={withdrawData}
                        striped={true}
                        persistTableHead={true}
                        progressPending={isLoading}
                        wrap={true}
                        pagination={false}
                        paginationServer
                        paginationTotalRows={totalCount}
                        onChangePage={handlePageChange}
                        paginationPerPage={perPage}
                        paginationResetDefaultPage={resetPaginationToggle}
                        theme={(isTheme === 'is_dark') ? "myDarkTheme" : ''}
                        responsive
                        highlightOnHover
                    />
                </div>
                <div className="d-flex vw">
                    <Link href="/history" className="fibmplex fw600">
                        View More
                        <img src="/assets/images/arrow-right.svg" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WithdrawTable;