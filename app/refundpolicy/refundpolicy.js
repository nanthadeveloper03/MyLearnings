"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function RefundPolicy() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <section className="cm_cntp1 container">
            <h6>ULTRAPRO EXCHANGE</h6>
            <h3> Refund policy </h3>
            <p>            
            Under no circumstances does Ultrapro allow for the cancellation or reimbursement of an order once it has been completed. When a buyer order is fully or partially matched, the sum in INR is transferred to the seller(s), and these transactions are irreversible.
            </p>
            <p>
            Ultrapro reserves the right to retain or deduct the sum due from the user and transfer or refund the remaining balance in the user account unless prohibited by existing legislation. Refunds will be issued in INR, and transfers will be made to any other cryptocurrency wallet specified by the user.
            </p>
          </section>
        </div>
      </Layout>
    </>
  );
}
