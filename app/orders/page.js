'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import './orders.css'; 
import OrderTab from "@/components/sections/orders/OrderTab";

export default function Orders() {    

    return (

        <>
                <DashboardLayout>

                <div>

                    <OrderTab />  
                  
                </div>
            </DashboardLayout>
        </>

    )
}