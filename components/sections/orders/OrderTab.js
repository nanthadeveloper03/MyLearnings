"use client";
import React, { useState } from "react";
import Link from "next/link";
import OpenOrders from "@/components/sections/orders/OpenOrders";
import CompletedOrders from "@/components/sections/orders/CompletedOrders";


export default function EarningsCard({ referralInfo }) {

    const [flatTabs, setFlatTabs] = useState(1)
    const handleFlatTabs = (index) => {
        setFlatTabs(index)
    }

    return (
        <>
            <ul className="menu-tab2 d-flex">
                <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><Link href="#">Open Orders</Link></li>
                <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><Link href="#">Completed Orders</Link></li>
            </ul>
            <div className="flat-tabs">

                <div className="content-tabo">
                    <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>
                        <OpenOrders />                      
                    </div>
                    <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
                        <CompletedOrders />
                    </div>
                </div>

            </div>
        </>
    );
}
