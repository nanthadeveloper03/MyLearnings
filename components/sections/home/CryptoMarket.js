import Link from "next/link";

export default function CryptoMarket() {
  return (
    <section className="cryptomarket_section ">
      <div className="container">
        <div className="row">
          <div className="market_title">
            <h3>Crypto Market Today</h3>
            <Link href="">
              View all 700+ coins{" "}
              <img src="/assets/images/viewarrow-icon.svg" />
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-md-4 sm-4">
            <div className="market_column">
              <h4>Hot List</h4>

              <ul>
              <li>
                  <div className="coin_name">
                    <img src="/assets/images/icon/btc.png" />
                    <div>
                      {" "}
                      <h5>BTC</h5>
                      <p>Bitcoin</p>
                    </div>
                  </div>
                  <div className="coin_value">
                    <p>$56.62K</p>
                    <span>-4.23%</span>
                  </div>
                </li>
                <li>
                  <div className="coin_name">
                    <img src="/assets/images/icon/eth.png" />
                    <div>
                      {" "}
                      <h5>ETH</h5>
                      <p>Ethereum</p>
                    </div>
                  </div>
                  <div className="coin_value">
                    <p>$2,654.93</p>
                    <span className="text-success">+2.25%</span>
                  </div>
                </li>
              
                <li>
                  <div className="coin_name">
                    <img src="/assets/images/icon/bnb.png" />
                    <div>
                      {" "}
                      <h5>BNB</h5>
                      <p>BNB</p>
                    </div>
                  </div>
                  <div className="coin_value">
                    <p>$497.30</p>
                    <span>-7.36%</span>
                  </div>
                </li>
                <li>
                  <div className="coin_name">
                    <img src="/assets/images/icon/ton.png" />
                    <div>
                      {" "}
                      <h5>TON</h5>
                      <p>Ton</p>
                    </div>
                  </div>
                  <div className="coin_value">
                    <p>$4.48</p>
                    <span className="text-success">+2.16%</span>
                  </div>
                </li>
                <li>
                  <div className="coin_name">
                    <img src="/assets/images/icon/sol.png" />
                    <div>
                      {" "}
                      <h5>SOL</h5>
                      <p>Solana</p>
                    </div>
                  </div>
                  <div className="coin_value">
                    <p>$7.94</p>
                    <span className="text-success">+5.16%</span>
                  </div>
                </li>
        
              </ul>
            </div>
          </div>

          <div className="col-xl-4 col-md-4 sm-4">
            <div className="market_column">
              <h4>New Coins</h4>

              <ul>
                <li>
                  <div className="coin_name">
                    <img src="/assets/images/icon/max.png" />
                    <div>
                      {" "}
                      <h5>MAX</h5>
                      <p>Matrix</p>
                    </div>
                  </div>
                  <div className="coin_value">
                    <p>$0.33223964</p>
                    <span className="text-success">+13.63%</span>
                  </div>
                </li>
                <li>
                  <div className="coin_name">
                    <img src="/assets/images/icon/cxt.png" />
                    <div>
                      {" "}
                      <h5>CXT</h5>
                      <p>Covalent X Token</p>
                    </div>
                  </div>
                  <div className="coin_value">
                    <p>$0.08072421</p>
                    <span className="text-success">+36.2%</span>
                  </div>
                </li>
                <li>
                  <div className="coin_name">
                    <img src="/assets/images/icon/lsd.png" />
                    <div>
                      {" "}
                      <h5>LSD</h5>
                      <p>Liquidswap</p>
                    </div>
                  </div>
                  <div className="coin_value">
                    <p>$0.65659692</p>
                    <span className="text-success">+15.76%</span>
                  </div>
                </li>
                <li>
                  <div className="coin_name">
                    <img src="/assets/images/icon/l3.png" />
                    <div>
                      {" "}
                      <h5>L3</h5>
                      <p>Layer3</p>
                    </div>
                  </div>
                  <div className="coin_value">
                    <p>$0.04966489</p>
                    <span>-0.16%</span>
                  </div>
                </li>
                <li>
                  <div className="coin_name">
                    <img src="/assets/images/icon/moxie.png" />
                    <div>
                      {" "}
                      <h5>MOXIE</h5>
                      <p>Moxie</p>
                    </div>
                  </div>
                  <div className="coin_value">
                    <p>$0.00586775</p>
                    <span className="text-success">+5.94%</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-xl-4 col-md-4 sm-4">
            <div className="market_column">
              <h4>Top Gainers</h4>

              <ul>
                <li>
                  <div className="coin_name">
                    <img src="/assets/images/icon/qkc.png" />
                    <div>
                      {" "}
                      <h5>QKC</h5>
                      <p>Quark Chain</p>
                    </div>
                  </div>
                  <div className="coin_value">
                    <p>$0.01127338</p>
                    <span className="text-success">+69.72%</span>
                  </div>
                </li>
                <li>
                  <div className="coin_name">
                    <img src="/assets/images/icon/issp.png" />
                    <div>
                      {" "}
                      <h5>ISSP</h5>
                      <p>ISSP.io</p>
                    </div>
                  </div>
                  <div className="coin_value">
                    <p>$0.00010133</p>
                    <span className="text-success">+66.88%</span>
                  </div>
                </li>
                <li>
                  <div className="coin_name">
                    <img src="/assets/images/icon/rfd.png" />
                    <div>
                      {" "}
                      <h5>RFD</h5>
                      <p>RefundCoin</p>
                    </div>
                  </div>
                  <div className="coin_value">
                    <p>$0.00000653</p>
                    <span className="text-success">+58.22%</span>
                  </div>
                </li>
                <li>
                  <div className="coin_name">
                    <img src="/assets/images/icon/tokenfi.png" />
                    <div>
                      {" "}
                      <h5>TOKEN</h5>
                      <p>TokenFi</p>
                    </div>
                  </div>
                  <div className="coin_value">
                    <p>$0.07123136</p>
                    <span className="text-success">+48.78%</span>
                  </div>
                </li>
                <li>
                  <div className="coin_name">
                    <img src="/assets/images/icon/degen.png" />
                    <div>
                      {" "}
                      <h5>DEGEN</h5>
                      <p>Degen</p>
                    </div>
                  </div>
                  <div className="coin_value">
                    <p>$0.00466139</p>
                    <span className="text-success">+37.05%</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
