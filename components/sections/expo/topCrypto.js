  import { useEffect, useRef, useState } from 'react';

  export default function TopCrypto() {
    const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(null); 
  const intervalRef = useRef(null); 

  useEffect(() => {
    if (isHovered === null) { 
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % 3);
      }, 1500);
    }

    return () => clearInterval(intervalRef.current); 
  }, [isHovered]); 

  const handleMouseEnter = (index) => {
    setIsHovered(index); 
    setCurrentIndex(index);
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    setIsHovered(null); 
    setCurrentIndex(0);
    intervalRef.current = setInterval(() => { 
      setCurrentIndex(prevIndex => (prevIndex + 1) % 3);
    }, 200);
  };

    const divStyle = (index) => ({
      background: index === currentIndex ? 'linear-gradient(180deg, rgba(255,255,255,1) 30%, rgba(255,131,0,1) 100%)' : '',
      transition: "transform 0.3s ease-in-out, background 0.3s ease-in-out", 
    });

    const divHeader = (index) =>({
      top:  isHovered === index || index === currentIndex ?'auto': '',
      transform: isHovered === index || index === currentIndex ?'none': '',
    });
    const divBody = (index) =>({
      maxHeight:isHovered === index || currentIndex === index ? "1000px" : '',
      overflow: isHovered === index || currentIndex === index ? "hidden" : '',
      opacity: isHovered === index || currentIndex === index ? 1 : 0,
       transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out'
    });
    const getCardClass = (index) => {
      return `tie_bx1 ${isHovered === index || currentIndex === index ? 'isActive' : ''}`;
    };
    console.log(getCardClass,"getCardClass")

    return (
      <section className="scro_sc1">
        

          <section
            className='row justify-content-center align-items-center secro2'
            style={{ minWidth: '100%', height: '800px', backgroundColor: '#fff' }}
          >
            <div className="col-md-4">
              <div className={getCardClass(0)} style={divStyle(0)}  onMouseEnter={() => handleMouseEnter(0)} // Add hover event handlers
            onMouseLeave={handleMouseLeave}>

                <div className="tie_hov" style={divHeader(0)}>
                  <h6 className="pri_color finter fw400 text-center">Advanced Standards</h6>
                  <h4 className="text-uppercase finter fw600 text-center">Tier 1</h4>
                </div>

                <div className="tie_hid" style={divBody(0)}>
                  <ul className="tie_lis1">
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                      </svg>
                      KYC Compliance and Public Visibility: Exchange owners must complete KYC verification and be publicly visible to ensure the security of public funds.
                    </li>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                      </svg>
                      Ethical Coin Listing Practices: Exchanges must prioritize listing coins and tokens that meet basic criteria and benefit the user community, rather than those driven by financial gain.
                    </li>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                      </svg>
                      Local Office Establishment: Exchanges with a growing user base must open local offices in regions where their presence is increasing to provide better support.
                    </li>
                  </ul>
                  <p>Note: Trading Volume & User Base: Basic level trading volume and user base, suited for smaller exchanges or new market entrants.
                  </p>
                </div>

              </div>
            </div>
            <div className="col-md-4">
              <div className={getCardClass(1)} style={divStyle(1)}  onMouseEnter={() => handleMouseEnter(1)} // Add hover event handlers
            onMouseLeave={handleMouseLeave}>

                <div className="tie_hov" style={divHeader(1)}>
                  <h6 className="pri_color finter fw400 text-center">Intermediate Standards</h6>
                  <h4 className="text-uppercase finter fw600 text-center">Tier 2</h4>
                </div>

                <div className="tie_hid" style={divBody(1)}>
                  <ul className="tie_lis1">
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                      </svg>
                      KYC Compliance and Public Visibility: Exchange owners must complete KYC verification and be publicly visible to ensure the security of public funds.
                    </li>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                      </svg>
                      Ethical Coin Listing Practices: Exchanges must prioritize listing coins and tokens that meet basic criteria and benefit the user community, rather than those driven by financial gain.
                    </li>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                      </svg>
                      Local Office Establishment: Exchanges with a growing user base must open local offices in regions where their presence is increasing to provide better support.
                    </li>
                  </ul>
                  <p>Note: Tier 2 exchanges have significantly lower trading volume and user base than Tier 1, reflecting their dominant market position.
                  </p>
                </div>

              </div>
            </div>
            <div className="col-md-4">
              <div className={getCardClass(2)} style={divStyle(2)}  onMouseEnter={() => handleMouseEnter(2)} // Add hover event handlers
            onMouseLeave={handleMouseLeave}>

                <div className="tie_hov" style={divHeader(2)}>
                  <h6 className="pri_color finter fw400 text-center">Basic Standards</h6>
                  <h4 className="text-uppercase finter fw600 text-center">Tier 3</h4>
                </div>

                <div className="tie_hid" style={divBody(2)}>
                  <ul className="tie_lis1">
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                      </svg>
                      KYC Compliance and Public Visibility: Exchange owners must complete KYC verification and be publicly visible to ensure the security of public funds.
                    </li>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                      </svg>
                      Ethical Coin Listing Practices: Exchanges must prioritize listing coins and tokens that meet basic criteria and benefit the user community, rather than those driven by financial gain.
                    </li>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                      </svg>
                      Local Office Establishment: Exchanges with a growing user base must open local offices in regions where their presence is increasing to provide better support.
                    </li>
                  </ul>
                  <p>Note:Tier 3 exchanges have significantly lower trading volume and user base than Tier 2, reflecting their dominant market position.
                  </p>
                </div>

              </div>
            </div>
          </section>


      
      </section>
    );
  }
