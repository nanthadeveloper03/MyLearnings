import React, { useEffect } from 'react';
import Link from "next/link";
import { useState } from "react";

import DataTable from 'react-data-table-component';
import { apiRequest } from '@/hooks/apiCall';
import { useSelector } from 'react-redux';
import { formatDate, formatNumber, showNotification } from '@/util/common';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { ourCommitments } from '../staking/seperate/stakingCalc.helper';

const StakingTable = ({ history, commitHistory }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    const [selectedOption, setSelectedOption] = useState("");
    const [stakeHistory, setStakeHistory] = useState([])
    const [commitingHistory, setCommitingHistory] = useState({})

    const [loading, setLoading] = useState(true)
    console.log(stakeHistory, "stakeHistory");

    const [isLightTheme, setIsLightTheme] = useState(true);



    const copyText = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification(true, 'Address is copied.')
        }).catch(err => {
            //console.log('Failed to copy text: ', err);
        });
    };
    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    useEffect(() => {
        if (history) {
            setStakeHistory(history)
            setLoading(false)
        }
        if (commitHistory) {
            setCommitingHistory(commitHistory)
            setLoading(false)
        }


    }, [history || commitHistory])

    const calculateMonths = (startDateStr, endDateStr) => {
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
        months -= startDate.getMonth();
        months += endDate.getMonth();
        return months <= 0 ? 'Less than a month' : `${months} Month${months > 1 ? 's' : ''}`;
    };
    console.log(commitHistory, "commitHistory");

    const columns = [


        {
            name: 'Coin',
            selector: row => row.coin,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.stakedUPROAmount.toFixed(4),
            sortable: true,
            grow: 2,

        },
        {
            name: 'Duration',
            selector: row => calculateMonths(row.stakingStart, row.stakingEnd),
            sortable: true,
            grow: 2,

        },
        {
            name: 'Voucher',
            selector: row => row.usedCouponCode && row.stakeType !== 0 ? row.usedCouponCode : 'Free Stake',
            sortable: true,
            grow: 2,
        },
        {
            name: 'Transaction ID',
            selector: row => row.transId,
            cell: row => (<> <span className="mx-1">{row.transId && row.transId.substring(0, 12)} ...</span> <FileCopyIcon color='warning' className="cursor-pointer" onClick={() => copyText(row.transId, 0)} />  </>),
            sortable: true,
            wrap: true,
            grow: 2,
            style: { minWidth: '50px' },
        },
        {
            name: 'Start Date',
            selector: row => formatDate(row.stakingStart, 'MMM Do YYYY'),
            sortable: true,
            grow: 2,
        },
        {
            name: 'End Date',
            selector: row => formatDate(row.stakingEnd, 'MMM Do YYYY'),
            sortable: true,
            grow: 2,
        },
        {
            name: 'Redeem Amount (UPRO)',
            selector: row => row.status === 3 
                ? formatNumber(row.redeemUPROAmount,6) 
                : 0,
            sortable: true,
            grow: 3,

        },

        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,

            cell: (row) => {
                let statusText = '';
                let statusColor = '';

                if (row.status === 1) {
                    statusText = 'Active';
                    statusColor = '#FFA500';
                } else if (row.status === 2) {
                    statusText = 'Completed';
                    statusColor = '#5FB787';
                }
                else if (row.status === 3) {
                    statusText = 'Redeemed';
                    statusColor = '#5FB787';
                }
                else {
                    statusText = row.status;
                    statusColor = 'black';
                }

                return (
                    <span style={{ color: statusColor }}>
                        {statusText}
                    </span>
                );
            },
            grow:2
            
        }]

    // Detect theme on mount and when it changes
    useEffect(() => {
        const updateTheme = () => {
            const themeIsLight = document.body.classList.contains('is_light');
            setIsLightTheme(themeIsLight); // Update the theme state
        };

        // Run once on mount to set the initial theme
        updateTheme();

        // Observe changes to the body class attribute
        const observer = new MutationObserver(() => {
            updateTheme(); // Call updateTheme when the class attribute changes
        });

        // Observe body element for changes to the class attribute
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        // Cleanup observer on component unmount
        return () => {
            observer.disconnect();
        };
    }, []); // This will now track dynamic theme changes

    const customStyles = {
        noData: {
            style: {
                color: isLightTheme ? '#000' : '#fff', // Black for light theme, white for dark
                backgroundColor: isLightTheme ? '#f0f0f0' : '#222', // Light background for light theme, dark for dark theme
            },
        },
        progress: {
            style: {
                color: isLightTheme ? '#000' : '#fff', // Black text for light theme, white for dark theme
                backgroundColor: isLightTheme ? '#f0f0f0' : '#222', // Light background for light theme, dark for dark theme
            },
        },
    };





    return (

        <>

            <div className='rev_table1 ass_table1'>

                {/* <div className='select_datarw d-flex gap-2 flex-wrap justify-content-between'> */}
                {/* <span className='filt_hdstk1'>Stake Assets</span>    */}
                {/* <div className='selectd1'>
            <select value={selectedOption} onChange={handleChange}>
                <option value="" disabled hidden>Time past 180 days</option>
                <option value="all">All</option>
                <option value="1 month">1 month</option>
                <option value="2 month">2 month</option>                    
                <option value="3 month">3 month</option>
                <option value="4 month">4 month</option>
            </select>
             </div>               */}
                {/* </div> */}

                <DataTable
                    columns={columns}
                    data={stakeHistory}
                    pagination
                    keyField="id"
                    responsive
                    highlightOnHover
                    progressPending={loading}
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 20, 30]}
                    className="custom-table"
                    // theme={(isTheme === 'is_dark') ? "myDarkTheme" : ''}
                    noDataComponent={<div className='nodatarec'>No records found</div>} // Custom "No Data" component
                    customStyles={customStyles} // Apply custom styles
                />


            </div>

        </>

    );
};

export default StakingTable;