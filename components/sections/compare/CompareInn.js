import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { apiRequest } from "@/hooks/apiCall";
import Image from "next/image";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const CompareInn = () => {
  const router = useRouter()
  const { isAuthenticated } = useSelector((state) => state.auth);
  const compTradRef = useRef(null);
  const [compareList, setCompareList] = useState([]);
  const [getSymbol, setSymbol] = useState("");
  const [siteDetails, setSiteDetails] = useState("");
  const [activeSymbol, setActiveSymbol] = useState(null);

  async function initLoad() {
    try {
      const response = await apiRequest("/coins/list", {});
      if (response?.status) {
        let result = response?.data?.list;
        setCompareList(result);
        if (result.length > 0) {
          const firstSymbol = result[0].symbol;
          if(isAuthenticated){
            handleClick(firstSymbol);
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false)
    }
  }

  useEffect(() => {
    initLoad();
  }, []);
  const handleClick = async (symbol) => {
    try {
      if (!isAuthenticated) {
        router.push('/login')
    }
      const response = await apiRequest("/compareExchanges/list", {});
      if (response?.status) {
        if (compTradRef.current) {
          compTradRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        // scrollToCompTradSection();
        let result = response?.data?.list;
        setSiteDetails(result);
        setSymbol(symbol);
        setActiveSymbol(symbol);
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false)
    }
  };
  // const scrollToCompTradSection = () => {
  //   if (compTradRef.current) {
  //     compTradRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  return (
    <div>
      <section className="cbanner">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center" data-aos="zoom-out">
              <div className="cban_hd text-uppercase fw600">Top 10 Exchanges & Top 12 Crypto Coins</div>
              <h1 className="finter fw600 text-capitalize">Compare Crypto Prices on Top Exchanges</h1>
              <p className="fpoppins fw400">Instantly compare prices of leading cryptocurrencies across the Top 10 Exchanges. Track the Top 12 Crypto Coins in real time and spot opportunities to buy low and sell high.</p>
              <div className="d-flex gap-4">
                <Link href="#" className="" title="coming soon">
                  <img src="/assets/images/comp/app1.png" alt="app 1" className="img-fluid" />
                </Link>
                <Link href={process.env.NEXT_PUBLIC_APK_URL} target="_blank" className="">
                  <img src="/assets/images/comp/app2.png" alt="app 2" className="img-fluid" />
                </Link>
              </div>
            </div>
            <div className="col-lg-7 order-1 order-lg-2 cbanim" data-aos="zoom-out" data-aos-delay="200">
              <img src="/assets/images/comp/hero-img.png" className="img-fluid animated" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="crypt_serv">
        <div className="container">
          <div className="text-center section-title" data-aos="fade-up">
            <h2 className="finter fw600">Our Listed Top Crypto Coins</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              {compareList.length > 0 ? (
                <div className="row">
                  {compareList.map((item, index) => (
                    <div
                      key={index}
                      // className="col-xl-3 col-md-6 cursor-pointer"
                      className={`col-xl-3 col-md-6 col-sm-6 col-6 cursor-pointer ${activeSymbol === item.symbol ? 'active-coin' : ''}`}
                      data-aos="fade-up"
                      data-aos-delay="100"
                      onClick={() => handleClick(item.symbol)}
                      // data-aos-delay={100 + index * 100}
                    >
                      <div className="service-item position-relative">
                        <div className="cicon d-flex justify-content-center align-items-center">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <h4 className="fpoppins fw600">
                          {item.name}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={activeSymbol === item.symbol ? "svg-active" : ""}>
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p>No Coins Found !</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="comp_trad" ref={compTradRef}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="text-center section-title" data-aos="fade-up">
                <h2 className="finter fw600">Compare Trading Prices for Top Crypto Exchanges</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="cm_ctable1 table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Pairs</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                  {isAuthenticated ? 
               <>
                    {siteDetails.length > 0 ? (
                      siteDetails.map((detail, index) => (
                        <tr key={index}>
                          <td>
                            <Image height={30} width={30} src={detail.siteImage} className="img-fluid coinim" alt={detail.siteName} /> {detail.siteName}
                          </td>
                          <td>{`${getSymbol}/USDT`}</td>
                          <td>
                            <span className="pri_color">{detail.price || "Update Soon!"}</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" align="center">
                          No Data Found !
                        </td>
                      </tr>
                    )} 
                  </>
                  :    

                  <td colSpan="3" align="center">
                  No Data Found !
                </td> }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompareInn;
