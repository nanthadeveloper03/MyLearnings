import React, { useEffect } from 'react';
import Link from "next/link";
import { useState } from "react";
import DataTable from 'react-data-table-component';
import { apiRequest } from '@/hooks/apiCall';
import { formatDate } from '@/util/common';

const FlexibleHistory = ({ onHit,onReferralApi}) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [referralHistory, setReferralHistory] = useState([]);
    const [loading, setLoading] = useState(true)
console.log(referralHistory,'referralHistory');


    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const [claimedRows, setClaimedRows] = useState([]);

    const handleClaimClick = async (row) => {
        setLoading(true)
        try {
            const response = await apiRequest("/claimReferralReward", { stakeId: row._id });

            if (response?.status) {
                initalDocs()
                if (onReferralApi) {
                    onReferralApi(true)
                }

            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
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
            name: 'Rewards (USDT)',
            selector: row => row.amount.toFixed(4),
            sortable: true,
            grow:1.5
        },
        // {
        //     name: 'Claimed Rewards (USDT)',
        //     selector: row => row.beforeClaimedUproUsdtAmount.toFixed(4),
        //     sortable: true,
        //     grow:2
        // },
        {
            name: 'Action',
            selector: row => row.action,
            sortable: true,
            cell: (row) => (row.holdStatus === 0 ? (
                <>
                    { }
                    <button
                        className='btn btn-success text-white fw600 fopsans'
                        onClick={() => handleClaimClick(row)}
                    >
                        Claim!
                    </button>
                </>
            ) : (
                <button className='btn btn-dark text-white fw600 fopsans' disabled>
                    Claimed
                </button>
            )
            ),
        }]





    const initalDocs = async () => {

        try {
            const response = await apiRequest("/referralHistoryClaim");
console.log(response,'responseresponseresponse');

            if (response?.status) {
                const filterData = response.data?.users.filter((data) => data.isBlock === 1 && data.holdStatus === 0);
                setReferralHistory(filterData ?? []);
                if (onHit) {
                    onHit(response.data?.users.length)

                }

            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        initalDocs()
    }, [])


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
            {/* <div className='select_datarw block-text1 d-flex gap-2 flex-wrap justify-content-end'>              
                <div className='selectd1'>
                    <select value={selectedOption} onChange={handleChange}>
                        <option value="" disabled hidden>All</option>
                        <option value="all">All</option>
                        <option value="claim">Claim</option>
                        <option value="claimed">Claimed</option>
                    </select>
                </div>
            </div> */}

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

                />
            </div>
        </>
    );
};
export default FlexibleHistory;