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
import { useRouter } from 'next/navigation';

const WithdrawTable = ({ randomValue }) => {
    const router = useRouter();

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
            name: 'Bank',
            selector: row => row.userBank,
            cell: row => (<> <span>{row.userBank[0]?.bankName}</span> </>),
            sortable: true,
            grow: 2,
        },
        {
            name: 'Account No',
            selector: row => row.userBank[0]?.accountNumber,
            sortable: true,
            grow: 2,
        },
        {
            name: 'Currency',
            selector: row => row.tds,
            cell: row => (<> <span>{row.currency}</span> </>),
            sortable: true,
            grow: 2,
        },

        {
            name: 'Amount',
            selector: row => row.amount,
            cell: row => (<> <span>{formatNumber(row.amount, row.decimalPoint)}</span> <span className="mx-1 small">{row.currency}</span> </>),
            sortable: true,
            wrap: true,
            grow: 2,
        },
        {
            name: 'Transaction Id',
            selector: row => row.transactionId,
            cell: row => (<>
     
                    <span className="mx-1">{row.transactionId ? row?.transactionId?.substring(0, 12) + '...' : row.transactionId}</span>
                <Tooltip title="Copy Transaction Id"><FileCopyIcon color='warning' className="cursor-pointer" onClick={() => copyText(row.transactionId)} /></Tooltip>
            </>),
            sortable: true,
            wrap: true,
            grow: 2,
            style: { minWidth: '50px' },
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
            name: 'Status',
            selector: row => row.status,
            cell: row => (<> <span className={`mx-1 ${(row.status ==0) ? 'text-warning' : (row.status ==2) ? 'text-danger' : (row.status ==1) ? 'text-success' : 'text-danger'}`}>{(row.status ==1) ? 'Approved' : (row.status===0) ?"Pending":(row.status)==2?"rejected":''}</span> </>),
            sortable: true,
            wrap: true,
            grow: 2,
        },
        // {
        //     name: 'Action',
        //     selector: row => row.status,
        //     cell: (row, index) => (<> <Tooltip title="View"><VisibilityIcon color="info" onClick={() => viewDetails(index)} className='cursor-pointer' /></Tooltip> {row.status == 'Pending' && <Tooltip title="Cancel"><DeleteIcon color="error" onClick={() => showAlert(row._id)} className='cursor-pointer' /></Tooltip>} </>),
        //     sortable: true,
        // }
    ];

    const history = async (currentPage, perPage) => {
        try {
            let response = await apiRequest('/fiatWithdrawHistory', { 'currentPage': currentPage, 'perPage': perPage })
            console.log(response.data,"response.dataresponse.data");
            
            if (response?.status) {
                setData(response.data?.historyDetails)
                setTotalCount(response.data.totalCount)
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
    const handleNavigate = () => {
        router.push('/history?fiatwithdraw=true');
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
                    <span href="" className="fibmplex fw600" onClick={handleNavigate}>
                      View More
                      <img src="/assets/images/arrow-right.svg" />
                    </span>
                  </div>
            </div>
        </div>
    );
};

export default WithdrawTable;