import React, { useEffect } from 'react';
import Link from "next/link";
import { useState } from "react";
import DataTable from 'react-data-table-component';
import { apiRequest } from '@/hooks/apiCall';
import { formatDate } from '@/util/common';

const MinimalEarnHistory = (isTheme) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [referralHistory, setReferralHistory] = useState([]);
    const [loading,setIsLoading]=useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState({ status: 'all' })
    const [perPage, setPerPage] = useState(10);

    
    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };


    useEffect(() => {
        initalDocs(currentPage, perPage);
    }, [currentPage, perPage]);



    const columns = [

        {
            name: 'Date & Time',
            selector: row => formatDate(row.createdAt, 'MMM Do YYYY, h:mm a'),
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.fullName,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.uproUsdtAmount,
            sortable: true,
        },
        {
            name: 'Rewards',
            selector: row => row.rewardAmount,
            sortable: true,
        },
        {
            name: 'Claimed Rewards',
            selector: row => row.claimedUproUsdtAmount,
            sortable: true,
        },
   ]

        



    const initalDocs = async (currentPage, perPage) => {

        try {
          const response = await apiRequest("/mainRewardClaimHistory",{ 'currentPage': currentPage, 'perPage': perPage, filter: filter });
    
          if (response?.status) {
            // const filteredData = response?.data.filter(row => row.stakePlanType === 2);
            setReferralHistory(response?.data.data ?? []);
       
          }
        } catch (error) {
          console.error(error);
        }finally{
            setIsLoading(false)
        }
      };
    
useEffect(()=>{
    initalDocs(currentPage, perPage)
},[])

const handlePageChange = (page) => {
    setIsLoading(true)
    setCurrentPage(page);
};


    // Apply filtering based on selectedOption and claimedRows
    // const filteredData = data.filter((row) => {
    //     if (selectedOption === "all" || selectedOption === "") return true;
    //     if (selectedOption === "claim") return !claimedRows.includes(row.id);
    //     if (selectedOption === "claimed") return claimedRows.includes(row.id);
    //     return true;
    // });

    const [isLightTheme, setIsLightTheme] = useState(true); // State to track theme

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
                color: isLightTheme ? '#000' : '#fff',
                backgroundColor: isLightTheme ? '#f0f0f0' : '#222',
            },
        },
        progress: {
            style: {
                color: isLightTheme ? '#000' : '#fff',
                backgroundColor: isLightTheme ? '#f0f0f0' : '#222',
            },
        },
    };

    return (
        <>


            <div className='rev_table1 ass_table1'>
                <DataTable
                    columns={columns}
                    data={referralHistory}
                    pagination
                    keyField="id"
                    responsive
                    highlightOnHover
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 20, 30]}
                    className="custom-table"
                    noDataComponent={<div className='nodatarec'>No records found</div>}
                    customStyles={customStyles}
                    progressPending={loading}
                    // paginationTotalRows={totalCount}
                    onChangePage={handlePageChange}
                    // paginationPerPage={perPage}

                />
            </div>
        </>
    );
};
export default MinimalEarnHistory;