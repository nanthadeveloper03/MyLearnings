import React from 'react';
import Link from "next/link";
import { useState } from "react";


const WithdrawTable = () => {

  return (
    <div>
      <div className="rew_tabsc">
        <div className="block-text1">
          <h3>Recent Withdrawal</h3>
        </div>
        <div className="table-responsive text-center cm_table1">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Time</th>
                <th>Address</th>
                <th>TxID</th>
                <th>Coin</th>
                <th>Amount</th>
                <th>Network</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>14:25 PM</td>
                <td>5635863563</td>
                <td>5635863563</td>
                <td><img src="/assets/images/icon/wico.png" className="img-fluid wico" /> Ultrapro</td>
                <td>35.15</td>
                <td>BNB</td>
                <td><span className="pri_color">Verified!</span></td>
              </tr>
              <tr>
                <td>14:25 PM</td>
                <td>5635863563</td>
                <td>5635863563</td>
                <td><img src="/assets/images/icon/wico.png" className="img-fluid wico" /> Ultrapro</td>
                <td>35.15</td>
                <td>BNB</td>
                <td><span className="pri_color">Verified!</span></td>
              </tr>
              <tr>
                <td>14:25 PM</td>
                <td>5635863563</td>
                <td>5635863563</td>
                <td><img src="/assets/images/icon/wico.png" className="img-fluid wico" /> Ultrapro</td>
                <td>35.15</td>
                <td>BNB</td>
                <td><span className="pri_color">Verified!</span></td>
              </tr>
              <tr>
                <td>14:25 PM</td>
                <td>5635863563</td>
                <td>5635863563</td>
                <td><img src="/assets/images/icon/wico.png" className="img-fluid wico" /> Ultrapro</td>
                <td>35.15</td>
                <td>BNB</td>
                <td><span className="pri_color">Verified!</span></td>
              </tr>
              <tr>
                <td>14:25 PM</td>
                <td>5635863563</td>
                <td>5635863563</td>
                <td><img src="/assets/images/icon/wico.png" className="img-fluid wico" /> Ultrapro</td>
                <td>35.15</td>
                <td>BNB</td>
                <td><span className="pri_color">Verified!</span></td>
              </tr>
              <tr>
                <td>14:25 PM</td>
                <td>5635863563</td>
                <td>5635863563</td>
                <td><img src="/assets/images/icon/wico.png" className="img-fluid wico" /> Ultrapro</td>
                <td>35.15</td>
                <td>BNB</td>
                <td><span className="pri_color">Verified!</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex vw">
          <Link href="" className="fibmplex fw600">
            View More
            <img src="/assets/images/arrow-right.svg" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WithdrawTable;
