import Link from "next/link"
import { useSelector } from "react-redux";
import ApkDownload from "@/components/sections/home/ApkDownload";

export default function Footer1() {

  const { isTheme } = useSelector((state) => state.auth);
  const { siteSocialLinks } = useSelector((state) => state.block);

  const openPdf = () => {
    const pdfUrl = 'https://whitepapper.s3.amazonaws.com/whitepaper.pdf';
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };
  const handleProbin = (e) => {
    e.preventDefault();
    window.open('https://www.probinar.in/', '_blank', 'noopener noreferrer');
};
const handleCom = (e) => {
  e.preventDefault();
  window.open('https://linktr.ee/Ultrapro_Exchange/', '_blank', 'noopener noreferrer');
};
  return (
    <>

      <footer className="footer">
        <div className="container">
          <div className="footer__main custom__footer">
            <div className="row">
              <div className="col-xl-3 col-md-3">
                <div className="info">
                  <Link href="/" className="logo">
                    <img src={`/assets/images/logo/${(isTheme == 'is_dark') ? 'logo-dark' : 'logo'}.png`} alt="" className="img-fluid" />
                  </Link>
                  <div className="qr1 text-center">
                    <h6>Scan for App</h6>
                    <ApkDownload />
                  </div>

                  <h6 className="title">Community</h6>

                  <ul className="d-flex flex-wrap ftms">
                    <li>
                      <Link href={siteSocialLinks && siteSocialLinks.mediumLink || '#'} target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill={`${(isTheme == 'is_dark') ? '#ccc' : '#707A8A'}`}>
                          <path d="M180.5 74.3C80.8 74.3 0 155.6 0 256S80.8 437.7 180.5 437.7 361 356.4 361 256 280.2 74.3 180.5 74.3zm288.3 10.6c-49.8 0-90.2 76.6-90.2 171.1s40.4 171.1 90.3 171.1 90.3-76.6 90.3-171.1H559C559 161.5 518.6 84.9 468.8 84.9zm139.5 17.8c-17.5 0-31.7 68.6-31.7 153.3s14.2 153.3 31.7 153.3S640 340.6 640 256C640 171.4 625.8 102.7 608.3 102.7z" />
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link href={siteSocialLinks && siteSocialLinks.linkedLink || '#'} target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill={`${(isTheme == 'is_dark') ? '#ccc' : '#707A8A'}`}><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>
                      </Link>
                    </li>
                    <li>
                      <Link href={siteSocialLinks && siteSocialLinks.telegramLink || '#'} target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" fill={`${(isTheme == 'is_dark') ? '#ccc' : '#707A8A'}`}>
                          <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link href={siteSocialLinks && siteSocialLinks.fbLink || '#'} target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill={`${(isTheme == 'is_dark') ? '#ccc' : '#707A8A'}`}>
                          <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                        </svg>
                      </Link>
                    </li>

                    <li>
                      <Link href={siteSocialLinks && siteSocialLinks.instaLink || '#'} target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill={`${(isTheme == 'is_dark') ? '#ccc' : '#707A8A'}`}>
                          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link href={siteSocialLinks && siteSocialLinks.youtubeLink || '#'} target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill={`${(isTheme == 'is_dark') ? '#ccc' : '#707A8A'}`}>
                          <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link href={siteSocialLinks && siteSocialLinks.twitLink || '#'} target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill={`${(isTheme == 'is_dark') ? '#ccc' : '#707A8A'}`}><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" /></svg>
                      </Link>
                    </li>
                  </ul>
                  <ul className="ftm">
                    <li>
                      <a href="mailto:info@ultraproex.com">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill={`${(isTheme == 'is_dark') ? '#ccc' : ''}`}>
                          <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                        </svg>

                        <span>info@ultraproex.com</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-9 col-md-9">

                <div className="row">

                  <div className="col-xl-3 col-md-6 col-sm-6 col-6">
                    <div className="widget-link s1">
                      <h6 className="title">Company</h6>
                      <ul>
                        <li><Link href="#" onClick={openPdf}>White paper</Link></li>
                        <li><Link href="/about-us">About Us</Link></li>
                        <li><Link href="#">Blog</Link></li>
                        <li><Link href="/referral-program">Referral Program</Link></li>
                        <li><Link href="/crypto-expo">Online Expo</Link></li>
                        <li><Link href="/our-team">Our Team</Link></li>
                        <li  onClick={handleProbin} ><Link href="#">Probinar Academy</Link></li>
                        <li><Link href="/compare-other-exchanges">Compare Other Exchanges</Link></li>
                        <li><Link href="/best-trusted-crypto-exchanges">Right Exchange Identification</Link></li>
                        <li><Link href="/claim-25-usdt">How to Claim USDT</Link></li>
                        <li><Link href="/global-community">Community</Link></li>
                        <li><Link href="/vote-upro-coin"> Voting </Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 col-sm-6 col-6">
                    <div className="widget-link s2">
                      <h6 className="title">Trade</h6>
                      <ul>
                        <li><Link href="#">Spot Trading</Link></li>
                        <li><Link href="#">Margin Trading</Link></li>
                        <li><Link href="#">Convert</Link></li>
                        <li><Link href="#">Swap</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 col-sm-6 col-6">
                    <div className="widget-link s3">
                      <h6 className="title">Features</h6>
                      <ul>
                        <li><Link href="#">Trade Loan</Link></li>
                        <li><Link href="#">Copy Trading</Link></li>
                        <li><Link href="#">Staking</Link></li>
                        <li><Link href="#">Lending</Link></li>
                        <li><Link href="#">USDT Bonanza</Link></li>
                        <li><Link href="#">Arbitrage Signal</Link></li>
                        <li><Link href="#">Cross Coin Withdraw</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 col-sm-6 col-6">
                    <div className="widget-link s4">
                      <h6 className="title">Support</h6>
                      <ul>
                        <li><Link href="#">Support Center</Link></li>
                        <li><Link href="#">FAQ</Link></li>
                        <li><Link href="#">How its works</Link></li>
                        <li><Link href="/contactus">Contact Us</Link></li>
                      </ul>
                    </div>
                  </div>

                </div>

                <div className="row">

                  <div className="col-xl-3 col-md-6 col-sm-6 col-6">
                    <div className="widget-link s1">
                      <h6 className="title">Products</h6>
                      <ul>
                        <li><Link href="https://ultrapro.info/" target="_blank">Blockchain </Link></li>
                        <li><Link href="https://upronft.com/" target="_blank">NFT </Link></li>
                        <li><Link href="https://eenaswap.finance/" target="_blank">Defi</Link></li>
                        <li><Link href="https://ultraproscan.io/" target="_blank">Explore</Link></li>
                        <li><Link href="https://www.amazon.com/dp/B0CLKVQX1Q" target="_blank">Wallet</Link></li>
                        <li><Link href="https://upropayments.com/" target="_blank"> Payments </Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 col-sm-6 col-6">
                    <div className="widget-link s2">
                      <h6 className="title">Legal</h6>
                      <ul>
                        <li><Link href="/terms-of-use" target="_blank">Terms of use</Link></li>
                        <li><Link href="/privacy-policy" target="_blank">Privacy Policy</Link></li>
                        <li><Link href="#">Risk Disclosures</Link></li>
                        <li><Link href="#">Refund policy</Link></li>
                        <li><Link href="#">AML policy</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 col-sm-6 col-6">
                    <div className="widget-link s3">
                      <h6 className="title">Download</h6>
                      <ul>
                        <li><Link href={process.env.NEXT_PUBLIC_APK_URL}>Download for Andriod</Link></li>
                        <li><Link href='#' title="coming soon">Download for IOS</Link></li>
                        <li><Link href='#' title="coming soon">Download for Windows</Link></li>
                      </ul>
                    </div>
                  </div>


                </div>


              </div>


            </div>
          </div>
        </div>
        <div className="container-fluid copyright">
          <div className="footer__bottom text-center justify-content-center">
            <p>
              Copyright © {new Date().getFullYear()} ultrapro.com. All Rights Reserved.
            </p>

            <div className="company_details">
              <p>
                Legal name: ULTRAPRO BLOCKCHAIN TECH PRIVATE LIMITED | Reg
                Number: U85499TN2024PTC167179
              </p>
              <p>
                Registration Address: ULTRAPRO BLOCKCHAIN TECH PRIVATE LIMITED
              </p>
              <p>
                No.38/1, Bharathidasan Salai, TB Road, Arasaradi,Madurai,Tamilnadu,India. Pincode:625016.
              </p>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}