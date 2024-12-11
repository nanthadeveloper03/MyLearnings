import { useEffect, useRef, useState } from 'react';

export default function TopCrypto() {
  const containerRef = useRef(null);
  const sections = useRef([]);
  const [isManualScroll, setIsManualScroll] = useState(false);
  const [autoScrollTimeout, setAutoScrollTimeout] = useState(null);
  const [hasScrolledPastFirstSection, setHasScrolledPastFirstSection] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let interval;

    const scrollToNextSection = () => {
      if (!isManualScroll) {
        currentIndex = (currentIndex + 1) % sections.current.length;
        const nextSection = sections.current[currentIndex];

        containerRef.current.scrollTo({
          left: nextSection.offsetLeft,
          behavior: 'smooth',
        });
      }
    };

    interval = setInterval(scrollToNextSection, 3000); // Adjusted interval time to 3000ms

    return () => {
      clearInterval(interval);
    };
  }, [isManualScroll]);

  useEffect(() => {
    const handleScroll = (event) => {
      const container = containerRef.current;

      // Check if user has scrolled past the first section
      const firstSection = sections.current[0];
      const hasScrolledPast = container.scrollLeft >= firstSection.offsetWidth;

      if (hasScrolledPast && !hasScrolledPastFirstSection) {
        setHasScrolledPastFirstSection(true);
        // Scroll to Tier 1 section (index 1)
        const tierOneSection = sections.current[1];
        container.scrollTo({
          left: tierOneSection.offsetLeft,
          behavior: 'smooth',
        });
      } else if (!hasScrolledPast && hasScrolledPastFirstSection) {
        setHasScrolledPastFirstSection(false);
      }

      if (event.deltaY !== 0) {
        setIsManualScroll(true);
        event.preventDefault();
        container.scrollLeft += event.deltaY;

        // Clear previous timeout if any
        if (autoScrollTimeout) {
          clearTimeout(autoScrollTimeout);
        }

        // Set a new timeout to resume auto-scroll after 5 seconds
        setAutoScrollTimeout(setTimeout(() => {
          setIsManualScroll(false); // Resetting to false to allow auto-scroll again
        }, 5000)); // Adjusted this delay to 5000ms
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleScroll);

    return () => {
      container.removeEventListener('wheel', handleScroll);
      if (autoScrollTimeout) {
        clearTimeout(autoScrollTimeout);
      }
    };
  }, [autoScrollTimeout, hasScrolledPastFirstSection]);

  return (
    <section className="scro_sc1">
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollBehavior: 'smooth',
          height: '800px',
          width: '100%',
        }}
      >

        <section
          className='secro1 row justify-content-center align-items-center'
          ref={(el) => (sections.current[0] = el)}
          style={{ minWidth: '100%', height: '800px', backgroundColor: '#fff' }} scrollTo={(el) => (sections.current[1] = el)}
        >
          <div className="col-md-6">
            <div className="wave-wrapper">
              <div className="wavecnt">
                <div className="cwave cwave1"></div>
                <div className="cwave cwave2"></div>
                <div className="cwave cwave3"></div>
                <div className="cwave cwave4"></div>
                <div className="cwave cwave5"></div>
                <div className="cwave cwave6"></div>
                <div className="cwave cwave7"></div>
                <div className="cwave cwave8"></div>
                <div className="cwave cwave9"></div>
                <div className="cwave cwave10"></div>
                <div className="cwave cwave11"></div>
                <div className="cwave cwave12"></div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="wcnt1">
              {/* <h4 className="finter fw600">Top 25 <span className="pri_color">Crypto Exchange</span> Partnerships</h4> */}
              <h4 className="finter fw600">Exchange Tier Standards Overview Exchange standards are categorized into three tiers, each with specific requirements.
                {/* <span className="pri_color"></span> */}
                </h4>
              <p>
              Tier 1 focuses on advanced standards including stringent KYC compliance, ethical coin listing, and local office establishment based on trading volume and user base. Tier 2 mirrors these standards but with lower trading volumes and user bases compared to Tier 1. Tier 3 maintains the same core requirements but applies to exchanges with even smaller trading volumes and user bases.
              </p>
            </div>
          </div>
        </section>

        <section
          className='row justify-content-center align-items-center secro2'
          ref={(el) => (sections.current[1] = el)}
          style={{ minWidth: '100%', height: '800px', backgroundColor: '#fff' }}
        >
          <div className="col-md-4">
            <div className="tie_bx1">

              <div className="tie_hov">
                <h6 className="pri_color finter fw400 text-center">Advanced Standards</h6>
                <h4 className="text-uppercase finter fw600 text-center">Tier 1</h4>
              </div>

              <div className="tie_hid">
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
            <div className="tie_bx1">

              <div className="tie_hov">
                <h6 className="pri_color finter fw400 text-center">Intermediate Standards</h6>
                <h4 className="text-uppercase finter fw600 text-center">Tier 2</h4>
              </div>

              <div className="tie_hid">
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
            <div className="tie_bx1">

              <div className="tie_hov">
                <h6 className="pri_color finter fw400 text-center">Basic Standards</h6>
                <h4 className="text-uppercase finter fw600 text-center">Tier 3</h4>
              </div>

              <div className="tie_hid">
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


        {/* Add more sections as needed */}
      </div>
    </section>
  );
}
