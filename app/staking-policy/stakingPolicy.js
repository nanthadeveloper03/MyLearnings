"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function StakingPolicy() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <section className="cm_cntp1 container">
            <h6>ULTRAPRO EXCHANGE</h6>
            <h3>UPRO Staking Agreement</h3>

            <h4>Welcome to Ultrapro Staking!</h4>
            <p>
              Thank you for choosing Ultrapro's staking services. By participating in our staking program, you agree to the terms and conditions outlined in this Staking Agreement (the “Agreement”). Please read them carefully as they govern your use of Ultrapro’s staking services. If any part of this Agreement is unacceptable to you, please refrain from using the service.
            </p>



            <h5>Terms of Service</h5>
            <p>
              {" "}
              By accessing or using Ultrapro’s staking services, you agree to be legally bound by this Agreement and all other applicable terms outlined in Ultrapro’s User Agreement. Ultrapro reserves the right to change any of these terms and conditions at any time, and your continued use of the staking service following such changes signifies your acceptance of the updated Agreement.
            </p>
            <h5> Ultrapro Staking Services</h5>
            {" "}
            <h5>Staking Plans:</h5>
            <p>
              {" "}
              Ultrapro offers multiple staking plans with guaranteed rewards. You can stake UPRO in different durations such as 1 month. Each plan offers unique benefits and guaranteed returns, as outlined below: </p>

                <ol>
                {" "}
      
                  <li><b>1 Month Plan:</b> Stake USDT 50 for one month to receive USDT 100, with a guaranteed 100% return.</li>
                  <li><b>3 Months Plan:</b> Stake USDT 50 each month for three months to receive a total of USDT 300, with protection against price drops.</li>
                  <li><b>6 Months Plan:</b> Stake USDT 50 monthly for six months, with a total guaranteed return of USDT 600.</li>
                  <li><b>12 Months Plan:</b> Stake USDT 50 per month for twelve months, accumulating USDT 1,200 in total rewards.</li>
                  <li><b>18 Months Plan:</b> Stake USDT 50 monthly for eighteen months to earn a guaranteed USDT 1,800 in rewards.</li>
                </ol>
              
              
                <h5><small>Guaranteed Rewards:</small></h5>
                <ol>
                  <li>Ultrapro guarantees fixed returns for each staking plan, regardless of market fluctuations. Your staked UPRO is safe from market volatility, and you will always receive the agreed-upon rewards.</li>
                  <li>In cases where the market value of UPRO increases, your reward may exceed the guaranteed amount, reflecting the higher value of UPRO at the time of payout.</li>

                </ol>
              
             
                <h5><small>Live Tracking:</small></h5>
                <ol>
                  <li>You will have access to real-time updates on your staked UPRO and rewards. Ultrapro provides easy-to-use tools for monitoring your staking progress and viewing your accumulated profits.</li>

                </ol>
             
                <h5><small>Referral Bonus:</small></h5>
                <ol>
                  <li>When your referred friend stakes USDT 50, you will unlock your reward after their staking is confirmed.</li>

                </ol>
            
         



            <h5>Risks and Limitations:</h5>
           
             
                <h5><small>Risk-Free Staking:</small></h5>
                <ol>
                  <li>Ultrapro offers <b> risk-free staking </b> with price protection. If the UPRO price decreases during your staking period, you are guaranteed to receive your initial investment or its equivalent value in UPRO. </li>
               
                </ol>
             
              
                <h5><small>Service Limitations:</small></h5>
                <ol>
                  <li>Ultrapro does not guarantee rewards beyond the amounts specified in your selected staking plan. All rewards are calculated based on the staked amount and plan duration.  </li>

                </ol>
              
          
            


            <h5>Indemnification</h5>
            <p>
              {" "}
              By using Ultrapro’s staking services, you agree to indemnify and hold Ultrapro harmless from any liabilities, losses, or damages that may arise from your use of the staking service, except where prohibited by law.  
            </p>

            <h5>Dispute Resolution</h5>
            <p>
              {" "}
              Any disputes arising from or related to this Agreement will be resolved through binding arbitration under the laws of India. 
            </p>

            <h5>Questions and Support</h5>
            <p>
              {" "}
              If you have any questions or need assistance with staking, please contact Ultrapro’s customer support team via mail info@ultraproex.com
            </p>

         
          </section>
        </div>
      </Layout>
    </>
  );
}
