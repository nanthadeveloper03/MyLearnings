'use client'
import React from 'react';
import Link from "next/link";
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { apiRequest } from '@/hooks/tradeapiCall';
import { openOrders, refreshBalance } from '@/store/authSlice';
import { formatNumber, formatDate, showNotification, walletTypes } from "@/util/common";
import Swal from 'sweetalert2';

const TradeTab = ({ openOrderslist }) => {

  //Tabs
  const dispatch = useDispatch();

  const orders = useSelector((state) => state?.auth?.orders);


  const { isAuthenticated } = useSelector((state) => state.auth);
  const itemsPerPage = 10; // Adjust this value as needed
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPagecompleted, setcurrentPagecompleted] = useState(1);

  // const totalPages = Math.ceil((openOrderslists?.length || 0) / itemsPerPage);


  const [flatTabs, setFlatTabs] = useState(1)
  const [openOrderslists, setopenOrderslists] = useState(openOrderslist?.data);
  const [completedcorders, setcompletedcorders] = useState([]);
  const [totalPagesOrders, settotalPagesorders] = useState(0);
  const [totalPagesorderscompleted, settotalPagesorderscompleted] = useState(0);


  useEffect(() => {
    refreshorders();
  }, [currentPage])

  const [openOrderslistscount, setopenOrderslistscount] = useState(openOrderslist?.count)
  const handleFlatTabstrade = (index) => {
    setFlatTabs(index)
  }

  const [flatTabs1, setFlatTabs1] = useState(1)
  const handleFlatTabstrade1 = (index) => {
    setFlatTabs1(index)
  }

  let Cancleorder = async (orderId) => {
    const userConfirmed = confirm("Are you sure?");
    if (userConfirmed) {
      const cancelOrdar = await apiRequest('/trade/liqCancelOrder', { orderId: orderId });
      refreshorders();
      dispatch(refreshBalance({ orderId: orderId }));
    }
  }
  useEffect(() => {

    refreshorders();
    completedorders();

  }, [orders])

  let refreshorders = async () => {
    const openOrderslistKLO = await apiRequest('/trade/openOrders', { perPage: 10, currentPage: currentPage });
    // dispatch(openOrders(openOrderslistKLO.data));

    setopenOrderslists(openOrderslistKLO.data.data)
    setopenOrderslistscount(openOrderslistKLO.data.count)
    console.log("openOrderslistKLO.data.data.count", openOrderslistKLO.data.count);

    const totalPagesasdasd = Math.ceil((openOrderslistKLO.data.count || 0) / itemsPerPage);
    settotalPagesorders(totalPagesasdasd)
  }

  let completedorders = async () => {
    const completedorderslist = await apiRequest('/trade/completedOrders', { perPage: 10, currentPage: currentPagecompleted });
    setcompletedcorders(completedorderslist.data.data);
    const totalPagesasdasdsdf = Math.ceil((completedorderslist.data.count || 0) / itemsPerPage);
    settotalPagesorderscompleted(totalPagesasdasdsdf)

  }
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const handlePageClickcompleted = (page) => {
    setcurrentPagecompleted(page);
  };

  useEffect(() => {

    completedorders();

  }, [currentPagecompleted])





  function showWarningAlert(data) {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'CLOSE',
      customClass: {
        popup: '',
        confirmButton: 'btn-success',
        cancelButton: 'btn-danger'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Show loading spinner on confirm button
        // Swal.fire({
        //   title: "Processing...",
        //   text: "Please wait while we cancel your order.",
        //   allowOutsideClick: false,
        //   didOpen: () => {
        //     Swal.showLoading();  // Show the loading spinner
        //   }
        // });

        try {
          await CancleorderTable(data); // Awaiting the cancellation process
          // Show success message after response is received
      
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an issue cancelling your order. Please try again.',
          });
        }
      }
    });
  }

  let CancleorderTable = async (orderId) => {

    const cancelOrder = await apiRequest('/trade/liqCancelOrder', { orderId: orderId });
    if(cancelOrder.status) {
      Swal.fire({
        icon: 'success',
        title: 'Order Cancelled',
        text: 'Your order has been successfully cancelled.',
      });
    }
    refreshorders();
    dispatch(refreshBalance({ orderId: orderId }));

  }


  return (
    <>
      <div className='market_tsc2'>


        <div className='trade_tab'>
          <ul className="menu-tabtrd d-flex">
            <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabstrade(1)}><Link href="javascript:;">Open Orders</Link></li>
            {/*<li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabstrade(2)}><Link href="#">Order History</Link></li>*/}
            <li className={flatTabs === 3 ? "active" : ""} onClick={() => handleFlatTabstrade(3)}><Link href="javascript:;">Trade History</Link></li>
            {/*<li className={flatTabs === 4 ? "active" : ""} onClick={() => handleFlatTabstrade(4)}><Link href="#">Assets</Link></li>*/}
          </ul>
          <div className="content-tabrd">
            <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>

              <ul className='d-flex flex-wrap gap-3 ord_lis1 mt-3 mb-0'>
                {/*<li className={flatTabs1 === 1 ? "active" : ""} onClick={() => handleFlatTabstrade1(1)}>
                                  <button type='button' className='btn def_btn'>Limit ({openOrderslistscount}) | Market(0)</button>
                                </li>*/}
                {/*<li className={flatTabs1 === 2 ? "active" : ""} onClick={() => handleFlatTabstrade1(2)}>
                                  <button type='button' className='btn def_btn'>TP/SL(0)</button>
                                </li>
                                <li className={flatTabs1 === 3 ? "active" : ""} onClick={() => handleFlatTabstrade1(3)}>
                                  <button type='button' className='btn def_btn'>Trailing Stop(0)</button>
                                </li>*/}
              </ul>

              <div className="content-inner" style={{ display: `${flatTabs1 === 1 ? "block" : "none"}` }}>

                <div className='trade_table2 table-responsive'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Pair</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    {!isAuthenticated &&
                      <tr>
                        <td colSpan={10} align='center' className='beflogin'>
                          <h4 className='text-center'><Link href="#" className='pri_color'>Log In</Link> or <Link href="#" className='pri_color'>Sign Up</Link> Now to trade</h4>
                        </td>
                      </tr>
                    }

                    {isAuthenticated && (
                      <tbody>
                        {openOrderslists && openOrderslists.length > 0 ? (
                          openOrderslists.map((data, index) => (
                            <tr key={index} >
                              <td>{formatDate(data.createdAt, 'MMM Do YYYY, h:mm a')}</td>
                              <td>{data.pair.replace("_", "/")}</td>
                              <td style={{ color: data.type === 'buy' ? 'green' : data.type === 'sell' ? 'red' : 'black' }}>
                                {data.type.toUpperCase()}
                              </td>
                              <td>{(data.price).toFixed(data.priceDecimal)}</td>
                              <td>{(data.amount).toFixed(data.priceDecimal)}</td>
                              <td>{(data.total).toFixed(data.priceDecimal)}</td>
                              <td>
                                {/* <a onClick={() => Cancleorder(data.orderId)} href="javascript:;">
                                  Cancel
                                </a> */}
                                {/* <a onClick={() => showWarningAlert(data.orderId)} href="javascript:;">
                                  Cancel
                                </a> */}
                                <DeleteIcon className='text-danger' onClick={() => showWarningAlert(data.orderId)}/>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} style={{ textAlign: 'center' }} className='beflogin'>
                              <h4 className='text-center w-100'>No records found</h4>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    )}


                  </table>

                  {totalPagesOrders > 0 &&
                    <nav className="row cm_pag1">
                      <ul className="pagination justify-content-center text-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <a className="page-link" href="#" onClick={() => handlePageClick(currentPage - 1)} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                        {Array.from({ length: totalPagesOrders }, (_, index) => (
                          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <a className="page-link" href="javascript:;" onClick={() => handlePageClick(index + 1)}>
                              {index + 1}
                            </a>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPagesOrders ? 'disabled' : ''}`}>
                          <a className="page-link" href="javascript:;" onClick={() => handlePageClick(currentPage + 1)} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  }


                </div>

              </div>

              <div className="content-inner" style={{ display: `${flatTabs1 === 2 ? "block" : "none"}` }}>

                <div className='trade_table2 table-responsive'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Pair</th>
                        <th>Type</th>
                        <th>Side</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Total</th>
                        <th>Filled</th>
                        <th>Unfilled</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={10} align='center' className='beflogin'>
                          <h4><Link href="#" className='pri_color'>Log In</Link> or <Link href="#" className='pri_color'>Sign Up</Link> Now to trade</h4>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>

              </div>

              <div className="content-inner" style={{ display: `${flatTabs1 === 3 ? "block" : "none"}` }}>

                <div className='trade_table2 table-responsive'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Pair</th>
                        <th>Type</th>
                        <th>Side</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Total</th>
                        <th>Filled</th>
                        <th>Unfilled</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={10} align='center' className='beflogin'>
                          <h4><Link href="#" className='pri_color'>Log In</Link> or <Link href="#" className='pri_color'>Sign Up</Link> Now to trade</h4>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>

              </div>


            </div>
            <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>

              <div className='trade_table2 table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Pair</th>
                      <th>Type</th>
                      <th>Side</th>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>Total</th>
                      <th>Filled</th>
                      <th>Unfilled</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={10} align='center' className='beflogin'>
                        <h4><Link href="#" className='pri_color'>Log In</Link> or <Link href="#" className='pri_color'>Sign Up</Link> Now to trade</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>

              </div>

            </div>
            <div className="content-inner" style={{ display: `${flatTabs === 3 ? "block" : "none"}` }}>

              <div className='trade_table2 table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Pair</th>
                      <th>Type</th>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>Total</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  {isAuthenticated && (
                    <tbody>
                      {completedcorders && completedcorders.length > 0 ? (
                        completedcorders.map((data, index) => (
                          <tr key={index} >
                            <td>{formatDate(data.createdAt, 'MMM Do YYYY, h:mm a')}</td>
                            <td>{data.pair.replace("_", "/")}</td>
                            <td style={{ color: data.type === 'buy' ? 'green' : data.type === 'sell' ? 'red' : 'black' }}>
                              {data.type.toUpperCase()}
                            </td>
                            <td>{parseFloat(data.price).toFixed(data.priceDecimal)}</td>
                            <td>{parseFloat(data.amount).toFixed(data.amountDecimal)}</td>
                            <td>{parseFloat(data.total).toFixed(data.priceDecimal)}</td>
                            <td>{data.status}</td>

                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center' }} className='beflogin'>
                            <h4 className='text-center w-100'>No records found</h4>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  )}
                </table>
                {totalPagesorderscompleted > 0 &&
                  <nav className="row cm_pag1">
                    <ul className="pagination justify-content-center text-center">
                      <li className={`page-item ${currentPagecompleted === 1 ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" onClick={() => handlePageClickcompleted(currentPagecompleted - 1)} aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      {Array.from({ length: totalPagesorderscompleted }, (_, index) => (
                        <li key={index} className={`page-item ${currentPagecompleted === index + 1 ? 'active' : ''}`}>
                          <a className="page-link" href="javascript:;" onClick={() => handlePageClickcompleted(index + 1)}>
                            {index + 1}
                          </a>
                        </li>
                      ))}
                      <li className={`page-item ${currentPagecompleted === totalPagesorderscompleted ? 'disabled' : ''}`}>
                        <a className="page-link" href="javascript:;" onClick={() => handlePageClickcompleted(currentPagecompleted + 1)} aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                }

              </div>

            </div>
            <div className="content-inner" style={{ display: `${flatTabs === 4 ? "block" : "none"}` }}>

              <div className='trade_table2 table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Pair</th>
                      <th>Type</th>
                      <th>Side</th>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>Total</th>
                      <th>Filled</th>
                      <th>Unfilled</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={10} align='center' className='beflogin'>
                        <h4><Link href="#" className='pri_color'>Log In</Link> or <Link href="#" className='pri_color'>Sign Up</Link> Now to trade</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>

              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default TradeTab;
