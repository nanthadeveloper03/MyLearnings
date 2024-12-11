"use client";
import React, { useState, useEffect, useMemo } from "react";
import { apiRequest } from '@/hooks/apiCall';
import Link from "next/link";
import Image from "next/image";
import { formatNumber, formatDate } from '@/util/common'

export default function TransactionCard() {

    const [isLoading, setIsLoading] = useState(false)
    const [transactionsData, setTransactionsData] = useState(false)

    async function initLoad() {
        try {
            setIsLoading(true)
            const response = await apiRequest('/account/transactions', {})
            if (response?.status) {
                let data = response?.data;
                setTransactionsData(data)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        initLoad()
    }, [])

    return (
        <>

            <div className="row">
                <div className="col-md-12">
                    <div className="recent_transaction">
                        <div className="block-text1">
                            <h6 className="fw600 finter w-100 text-capitalize">Recent Transaction <button type="button" className="btn float-end mor_btn1">More</button></h6>
                        </div>
                        <ul>
                            {transactionsData.length > 0 ?

                                transactionsData.map(function (transaction, index) {

                                    return (
                                        <li key={index} >
                                            <div className="coin_name">
                                                <img src={transaction.coinImage} alt={transaction.currency} />
                                                <div>
                                                    <h5>{transaction.description}</h5>
                                                    <p>{formatDate(transaction.createdAt, 'MMMM Do YYYY, h:mm a')}</p>
                                                </div>
                                            </div>
                                            <div className="coin_value">
                                                <span>{formatNumber(transaction.amount, transaction.decimalPoint)}</span>
                                            </div>
                                        </li>
                                    )
                                })

                                :

                                <li>
                                    <div className="coin_name">
                                        No record found.
                                    </div>
                                </li>
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
