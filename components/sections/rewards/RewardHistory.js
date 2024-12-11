"use client";
import React, { useState, useEffect, useMemo } from "react";
import { apiRequest } from '@/hooks/apiCall';
import DataTable, { createTheme } from 'react-data-table-component';
import { formatNumber, formatDate } from '@/util/common'
import { useSelector } from "react-redux";

const RewardHistory = () => {

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
      selector: (row, index) => ((currentPage - 1) * perPage) + index + 1,
      sortable: false,
      width: '100px',
    },
    {
      name: 'Dated On',
      selector: row => row.createdAt,
      cell: row => formatDate(row.createdAt, 'MMMM Do YYYY, h:mm a'),
      sortable: true,
      grow: 2,
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row => row.amount,
      cell: row => (
        <>
          <span> {formatNumber(row.amount, row.decimalPoint) || '0.00'} {row.currency} </span>
        </>
      ),
      sortable: true
    }
  ];

  const history = async (currentPage, perPage) => {
    try {
      setIsLoading(true)
      let response = await apiRequest('/account/rewardHistory', { 'currentPage': currentPage, 'perPage': perPage, filter: filter, 'walletType': 0 })
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


  let rewardsData = data || [];
  const shouldShowPagination = (rewardsData && rewardsData.length > perPage) ? true : false;

  return (
    <>
      <div className="block-text1">
        <h6 className="fw600 finter text-capitalize">Rewards History</h6>
      </div>

      <div className="rev_table1">
        <DataTable
          columns={columns}
          data={rewardsData}
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

    </>
  );
};

export default RewardHistory;
