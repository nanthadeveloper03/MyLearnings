import React, { useEffect } from 'react';
import Link from "next/link";
import { useState } from "react";


import DataTable from 'react-data-table-component';
import { apiRequest } from '@/hooks/apiCall';
import { useSelector } from 'react-redux';
import { formatDate, showNotification } from '@/util/common';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const ClaimedHistory = ({isTrue}) => {
    
console.log(isTrue,"isTrue");

    const [stakeHistory,setStakeHistory]=useState([])
    const [loading,setLoading]=useState(true)
    const [isLightTheme, setIsLightTheme] = useState(true);


 
    async function initLoad() {
        try {
          const response = await apiRequest('/claimedHistory');
    console.log(response?.data.users?.records,'responseresponse');
    
          if (response?.status) {
            setStakeHistory(response?.data.users?.records??[]);
            setLoading(false)
          }
        } catch (error) {
          console.error(error);
        }
        finally{
            setLoading(false)
        }
      }
      useEffect(() => {
        if(isTrue){
          initLoad()
        }
    
        
      }, [isTrue])

      const formatDuration = (days) => {
        if (days >= 365) {
          const years = days / 365;
          return `${years} Year${years > 1 ? 's' : ''}`;
        } else {
          const months = Math.round(days / 30);
          return `${months} Month${months > 1 ? 's' : ''}`;
        }
      };
  
      const columns = [

        {
            name: 'Date & Time',
            selector: row => formatDate(row.createdAt, 'MMM Do YYYY, h:mm a'),
            sortable: true,
            grow:2
        },
        {
            name: 'Name',
            selector: row => row?.fullName,
            sortable: true,
        },
        {
            name: 'Initial Amount (USDT)',
            selector: row => row.initialUSDTAmount.toFixed(4),
            sortable: true,
            grow:2
        },
        {
            name: 'Claimed Rewards (USDT)',
            selector: row => row.totalUproUsdtAmount.toFixed(4),
            sortable: true,
            grow:1.5
        },
    ]

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

export default ClaimedHistory;