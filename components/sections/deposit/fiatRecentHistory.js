'use client'
import { formatDate, formatNumber, handleCopy } from "@/util/common";
import Link from "next/link";
import React, { useEffect, useState } from "react"
import { apiRequest } from "@/hooks/apiCall";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import Tooltip from '@mui/material/Tooltip';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import Loading from "@/app/loading";

export default function FiatDepositRecentHistory({submitStatus}) {
  const router = useRouter();
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (submitStatus) {
        history()
    }
  }, [submitStatus]);

  const columns = [
    {
        name: 'S.No',
        selector: row =>row.serialNumber,
        sortable: true,
        wrap: true,
        grow: 0.2,
    },
    {
        name: 'Date & Time',
        selector: row => formatDate(row.createdAt, 'MMM Do YYYY, h:mm a'),
        sortable: true,
        wrap: true,
        grow: 3,
    },
    {
      name: 'Bank',
      selector: row => row.userBank?.bankName,
      sortable: true,
      grow: 3,
  },
    {
        name: 'Account No',
        selector: row => row.userBank?.accountNumber,
        sortable: true,
        grow: 2,
    },
    {
        name: 'Currency',
        selector: row => row.tds,
        cell: row => (<> <span>{row.currency}</span> </>),
        sortable: true,
        grow: 1,
    },
    {
        name: 'Amount',
        selector: row => row.amount,
        cell: row => (<> <span>{formatNumber(row.amount)}</span> <span className="mx-1 small">{row.currency}</span> </>),
        sortable: true,
        wrap: true,
        grow: 1,
    },
   

    {
        name: 'Transaction Id',
        selector: row => row.transactionId,
        cell: row => (<>
 
                <span className="mx-1">{row.transactionId ? row?.transactionId?.substring(0, 12) + '...' : row.transactionId}</span>
            <Tooltip title="Copy Transaction Id"><FileCopyIcon color='warning' className="cursor-pointer" onClick={() => handleCopy(row.transactionId)} /></Tooltip>
        </>),
        sortable: true,
        wrap: true,
        grow: 2,
        style: { minWidth: '50px' },
    },
    {
        name: 'Status',
        selector: row => row.status,
        cell: row => (<> <span className={`mx-1 ${(row.status ==0) ? 'text-warning' : (row.status ==2) ? 'text-danger' : (row.status ==1) ? 'text-success' : 'text-danger'}`}>{(row.status ==1) ? 'Approved' : (row.status===0) ?"Pending":(row.status)==2?"rejected":''}</span> </>),
        sortable: true,
        wrap: true,
        grow: 2,
    },

  ];
  const history = async () => {
    try {
      let response = await apiRequest('/fiatDepositHistory')

      
      if (response?.status) {
        setData(response.data?.txList ?? [])

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching data:', error);
    }
  };



  useEffect(() => {
    history()
  }, []);







  const handleNavigate = () => {
    router.push('/history?fiattab=true');
  }

   // Detect theme on mount and when it changes
   useEffect(() => {
    const updateTheme = () => {
        const themeIsLight = document.body.classList.contains('is_light');
        setIsLightTheme(themeIsLight);
    };
    updateTheme();
    const observer = new MutationObserver(() => {
        updateTheme(); 
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => {
        observer.disconnect();
    };
    }, []); 





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
 
          

          
              <div className="col-md-12 order-md-3 order-2 rsp-mpd5">
                <div className="rew_tabsc">
                  <div className="block-text1">
                    <h5>Recent Deposit</h5>
                  </div>
                  <div className="table-responsive text-center cm_table1">
                    <DataTable
                      columns={columns}
                      data={Array.isArray(data) ? data.slice(0, 6) : []}
                      striped={true}
                      persistTableHead={true}
                      progressPending={isLoading}
                      wrap={true}
                      pagination={false}
                      paginationServer
                      responsive
                      highlightOnHover
                      // theme={isTheme === 'is_dark' ? "myDarkTheme" : ''}
                      noDataComponent={<div className='nodatarec'>No records found</div>}
                      customStyles={customStyles}
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

       
   


    </>
  );
}

