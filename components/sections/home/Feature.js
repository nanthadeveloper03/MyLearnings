import { Container, Row, Col } from "react-bootstrap";

export default function FeaturesSection() {
  return (
    <section className="section features-section overflow-hidden ptb_100">
      <Container>
        <Row className="justify-content-center feature_title_section">
          <Col xs={12} md={10} lg={8}>
            <span>
              <img src="/assets/images/stars-icon.svg" alt="Stars Icon" />
              Features
            </span>
            <div className="section-heading text-center">
              <h2>Amazing Features of Ultrapro Exchange</h2>
            </div>
          </Col>
        </Row>

        <Row className="align-items-center">
          <Col xs={12} md={6} lg={4} sm={6}>
            {/* Features Item */}
            <ul className="features-item">
              <li>
                {/* Image Box */}
                <div
                  className="image-box media"
                  data-aos-duration="2s"
                  data-wow-delay="0.3s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.3s",
                    animationName: "fadeInLeft",
                  }}
                >
                  {/* Featured Image */}
                  <div className="featured-img mr-3">
                    <img
                      className="avatar-sm"
                      src="/assets/images/sections/home/dashboard.png"
                      alt=""
                    />
                  </div>
                  <div className="media-body align-self-center align-self-md-start">
                    <h3 className="mb-2">Impressive Dashboard</h3>
                    <p>
                      Stay on top of your game with our comprehensive dashboard,
                      designed to keep you proactive and informed.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div
                  className="image-box media"
                  data-aos-duration="2s"
                  data-wow-delay="0.6s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.6s",
                    animationName: "fadeInLeft",
                  }}
                >
                  <div className="featured-img mr-3">
                    <img
                      className="avatar-sm"
                      src="/assets/images/tracking.svg"
                      alt=""
                    />
                  </div>
                  <div className="media-body align-self-center align-self-md-start">
                    <h3 className="mb-2">Live Tracking</h3>
                    <p>
                      Update your records and manage withdrawals effortlessly
                      with up-to-date tracking for all your transactions.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </Col>
          <Col xs={12} lg={4} className="d-none d-lg-block">
            <div className="features-thumb text-center">
              <div className="app-text">
                <h6>iOS & Android App</h6>
                <p>Available Now</p>
              </div>

              <img src="/assets/images/app-img.png" alt="" />
            </div>
          </Col>
          <Col xs={12} md={6} lg={4} sm={6}>
            {/* Features Item */}
            <ul className="features-item">
              <li>
                <div
                  className="image-box media "
                  data-aos-duration="2s"
                  data-wow-delay="0.3s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.3s",
                    animationName: "fadeInRight",
                  }}
                >
                  <div className="featured-img mr-3">
                    <img
                      className="avatar-sm"
                      src="/assets/images/sections/home/enhance.png"
                      alt=""
                    />
                  </div>

                  <div className="media-body align-self-center align-self-md-start">
                    <h3 className="mb-2">Enhanced Updates</h3>
                    <p>
                      Gain insights with advanced profit & loss tracking to make
                      well-informed trading decisions.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div
                  className="image-box media"
                  data-aos-duration="2s"
                  data-wow-delay="0.6s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.6s",
                    animationName: "fadeInRight",
                  }}
                >
                  <div className="featured-img mr-3">
                    <img
                      className="avatar-sm"
                      src="/assets/images/sections/home/referral.png"
                      alt=""
                    />
                  </div>
                  {/* Icon Text */}
                  <div className="media-body align-self-center align-self-md-start">
                    <h3 className="mb-2">Referral Program</h3>
                    <p>
                      Boost your earnings by referring others. Use your referral
                      link to earn rewards and maximize profits through trading.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
