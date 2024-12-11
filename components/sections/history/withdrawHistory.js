import React from 'react';
import Link from "next/link";
import { useState, useEffect } from "react";
import DataTable, { createTheme } from 'react-data-table-component';
import { apiRequest } from '@/hooks/apiCall';
import { formatDate, formatNumber, showNotification, assetTypes, walletTypes } from '@/util/common';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import WithdrawDetails from '../withdraw/crypto/withdrawDetails'
import axiosInstance from '@/lib/axios';

const WithdrawTable = ({ randomValue }) => {

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
    const [downloadFilter, setDownloadFilter] = useState({ status: 'all' })

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({});

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

    const viewDetails = (index) => {
        setShowPopup(Math.random(10000000))
        setFormData(withdrawData?.[index])
    }


    const history = async (currentPage, perPage) => {
        try {
            setIsLoading(true)
            let response = await apiRequest('/withdraw/crypto/history', { 'currentPage': currentPage, 'perPage': perPage, filter: filter })
            console.log(response.data?.data, "REDDDDDD");

            if (response?.status) {
                setDownloadFilter(filter)
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

    useEffect(() => {
        history(1, perPage);
        setResetPaginationToggle(!resetPaginationToggle);
    }, [randomValue]);

    const handlePageChange = (page) => {
        setIsLoading(true)
        setCurrentPage(page);
    };

    const copyText = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification(true, 'Address is copied.')
        }).catch(err => {
            //console.log('Failed to copy text: ', err);
        });
    };

    const withdrawData = data || [];

    let statusArray = ['Pending', 'Completed', 'Rejected']

    const changeFilter = (e) => {
        setFilter(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const changeWalletFilter = (value) => {
        setFilter(prevState => ({
            ...prevState,
            'walletType': value,
        }));
    }

    const filterDoc = () => {
        history(1, perPage);
    }

    useEffect(() => {

        if (filter.status || isReset) {
            setIsReset(false)
            history(1, perPage);
        }

    }, [filter.status, filter.walletType, isReset]);

    const resetFilter = () => {
        setIsReset(true)
        setStartDate('')
        setEndDate('')
        setFilter({ name: '', startDate: '', endDate: '', status: 'all' })
        setDownloadFilter({ name: '', startDate: '', endDate: '', status: 'all' })
    }


    const downloadExcel = async () => {

        try {

            const formData = new FormData();
            formData.append('osType', 0);
            formData.append('wsToken', authSelector?.user?.wsToken);

            const response = await axiosInstance.post('/withdraw/crypto/downloadExcel', { filter: downloadFilter }, {
                responseType: 'blob'
            });


            if (response?.status == 200) {

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'withdraw_requests.xlsx');
                document.body.appendChild(link);
                link.click();

            } else {

                showNotification(false, 'No data found.')
            }

        } catch (error) {

            // console.error('Error downloading the Excel file:', error);

            showNotification(false, 'No data found.')
        }
    };


    return (
        <div>

            {showPopup &&
                <WithdrawDetails showPopup={showPopup} formData={formData} />
            }

            <div className="rew_tabsc mt-4">
                <div className='row mb-4'>
                    <div className={`d-flex bal_btn_section ${(isLoading) ? 'disabled-icon' : ''}`}>

                        {assetsList && assetsList.length > 0 && assetsList.map(function (item, index) {
                            return (
                                <div className={`me-2 text-white balance_btn ${(item.id == filter.walletType) ? 'btn1' : 'btn2'} `} onClick={() => changeWalletFilter(item.id)}>
                                    <button title="coming soon"> {item.name} </button>
                                </div>
                            )
                        })}

                    </div>
                </div>

                <div className="row filt_histrw1">

                    <div className="col-md-2 col-4 reduce-gap">
                        <label for="inputEmail4" className="form-label"> Status </label>
                        <select className='form-control form-select' onChange={changeFilter} name="status" value={filter.status}>
                            <option value={"all"}> All Status </option>
                            {statusArray.length > 0 && statusArray.map(function (item, index) {
                                return (<option value={item} key={index}> {(item == 'Completed') ? 'Approved' : item} </option>)
                            })}
                        </select>
                    </div>

                    <div className="col-md-2 col-8 reduce-gap">
                        <label for="inputEmail4" className="form-label"> Search</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder='Address, Currency, Transaction Id'
                            value={filter.name}
                            onChange={changeFilter}
                            title='Address, Currency, Transaction Id'
                            autoComplete='off'
                        />
                    </div>

                    <div className="col-md-2 col-6 reduce-gap">
                        <label for="inputEmail4" className="form-label"> Start Date </label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date)
                                const utcDate = new Date(Date.UTC(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate(),
                                    0, 0, 0
                                ));
                                const isoDate = utcDate.toISOString();
                                setFilter((prevFilter) => ({
                                    ...prevFilter,
                                    startDate: isoDate
                                }));
                            }}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            className="form-control dark-calendar"
                            placeholderText="Select From Date"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div className="col-md-2 col-6 reduce-gap">
                        <label for="inputEmail4" className="form-label"> End Date </label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => {

                                if (!date) {
                                    setEndDate('')
                                    return
                                }
                                setEndDate(date)
                                const utcDate = new Date(Date.UTC(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate(),
                                    23, 59, 59, 999
                                ));
                                const isoDate = utcDate.toISOString();
                                setFilter((prevFilter) => ({
                                    ...prevFilter,
                                    endDate: isoDate
                                }));
                            }}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate ? new Date(startDate.getTime() + 86400000) : null}
                            maxDate={new Date()}
                            className="form-control"
                            placeholderText="Select To Date"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div className="col-md-4 reduce-gap mt-4 p-1">
                        <button type="button" className="btn btn-action primaryClr text-white" onClick={filterDoc}> Search </button>
                        <button type="button" className="btn btn-danger text-white mx-2" onClick={resetFilter}> Reset </button>
                        <button className="btn btn-action    primaryClr text-white dbtn float-end mx-4" onClick={downloadExcel}>Download Excel</button>
                    </div>

                </div>

                <div className="table-responsive text-center cm_table1 hist_table mt-3">
                    <DataTable
                        columns={columns}
                        data={withdrawData}
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

export default WithdrawTable;