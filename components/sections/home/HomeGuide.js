"use client";
import { useState, useEffect, useRef } from "react";
import { Nav, Row, Col, Container } from "react-bootstrap";

function HomeGuide() {
  const [activeKey, setActiveKey] = useState("first");
  const [highlightTop, setHighlightTop] = useState(activeKey);
  const [fadeEffect, setFadeEffect] = useState(false);
  const tabRefs = useRef([]);
  const contentRef = useRef(null);
  const autoSlideInterval = useRef(null);

  const tabs = ["first", "second", "third"];

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeKey);
    if (tabRefs.current[activeIndex]) {
      setHighlightTop(tabRefs.current[activeIndex].offsetTop);
    }

    setFadeEffect(true);
    const fadeTimeout = setTimeout(() => setFadeEffect(false), 300); // 300ms fade effect duration

    return () => clearTimeout(fadeTimeout);
  }, [activeKey]);

  useEffect(() => {
    autoSlideInterval.current = setInterval(() => {
      setActiveKey((prevKey) => {
        const currentIndex = tabs.indexOf(prevKey);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 3000); // Auto-slide every 3 seconds

    return () => {
      clearInterval(autoSlideInterval.current);
    };
  }, []);

  return (
    <section className="guide_section">
      <Container>
        <div className="guide_title_section">
          <span>
            <img src="/assets/images/stars-icon.svg" alt="Stars Icon" /> Start
            Guide
          </span>
          <h2>Your Quick Start Guide</h2>
        </div>
        <Row className="align-items-stretch justify-content-between mt-5 d-flex g-5">
          <Col
            md={6}
            lg={6}
            className="tab_menus d-flex flex-column justify-content-start"
          >
            <div className="greybar"></div>
            <div
              className="highlightbar"
              style={{
                top: highlightTop,
                height: tabRefs.current[0]?.clientHeight || 0,
              }}
            ></div>
            <Nav
              variant="pills"
              className="flex-column"
              activeKey={activeKey}
              onSelect={(selectedKey) => setActiveKey(selectedKey)}
            >
              <Nav.Item ref={(el) => (tabRefs.current[0] = el)}>
                <Nav.Link eventKey="first">
                  <h3>Sign up on Ultrapro Exchange:</h3>
                  <p>
                    Kickstart your crypto journey with easy registration and
                    swift KYC verification.
                  </p>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item ref={(el) => (tabRefs.current[1] = el)}>
                <Nav.Link eventKey="second">
                  <h3>Fiat to Wallet:</h3>
                  <p>
                    Easily transfer your fiat money to your Ultrapro Exchange
                    wallet through our secure payment gateway.
                  </p>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item ref={(el) => (tabRefs.current[2] = el)}>
                <Nav.Link eventKey="third">
                  <h3>Trade Any Cryptocurrency:</h3>
                  <p>
                    Buy, sell, and trade any crypto while keeping detailed
                    records with Ultrapro Exchange’s advanced platform.
                  </p>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col
            md={6}
            lg={6}
            className="d-flex align-items-center justify-content-center xl_hid"
          >
            <div
              ref={contentRef}
              className={`guide_tab_content_container ${
                fadeEffect ? "fade" : ""
              }`}
              style={{
                position: "relative",
              }}
            >
              <div className="guide_tab_content" style={{ minWidth: "100%" }}>
                {activeKey === "first" && (
                  <div className="feature__image floating-content">
                    <img
                      src="/assets/images/nico/home-signup.gif"
                      alt="Feature image"
                      className="img-fluid"
                    />
                  </div>
                )}
              </div>
              <div className="guide_tab_content" style={{ minWidth: "100%" }}>
                {activeKey === "second" && (
                  <div className="feature__image floating-content">
                    <img
                      src="/assets/images/nico/home-trade.gif"
                      alt="Feature image"
                      className="img-fluid"
                    />
                  </div>
                )}
              </div>
              <div className="guide_tab_content" style={{ minWidth: "100%" }}>
                {activeKey === "third" && (
                  <div className="feature__image floating-content">
                    <img
                      src="/assets/images/nico/home-wallet.gif"
                      alt="Feature image"
                      className="img-fluid"
                    />
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HomeGuide;
