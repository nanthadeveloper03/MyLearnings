"use client";
import React from "react";
import { Accordion, Container, Row, Col } from "react-bootstrap";

export default function Faq() {
  return (
    <>
      <section className="ultrafaq_section">
        <Container className="my-5">
          <Row>
            <Col xl={12} md={12}>
              <div className="section-heading text-center">
                <span>Question & Answer</span>
                <h2>Frequently Asked Questions (FAQ)</h2>
                <p>Quick Answers to Your Most Common Questions.</p>
              </div>
            </Col>
          </Row>
          <Row className="faq_qa_section">
            <Col>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    What is Ultrapro Exchange?
                  </Accordion.Header>
                  <Accordion.Body>
                  Ultrapro Exchange is a global cryptocurrency platform that enables users to trade Bitcoin, Ethereum, BNB, UPRO, and over 150 other cryptocurrencies with security and efficiency.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                  Who is the Founder of Ultrapro Exchange?
                  </Accordion.Header>
                  <Accordion.Body>
                  The founder of Ultrapro Exchange is Mr.Nagarajan Narayanasamy. He has played a key role in developing and leading the Ultrapro Exchange Blockchain platform, focusing on secure, scalable, and efficient digital transaction solutions.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                  How Do I Participate in the 25 USDT Bonanza?
                  </Accordion.Header>
                  <Accordion.Body>
                  To celebrate the launch of Ultrapro, we're offering 25 USDT to each new user. Simply sign up on Ultrapro Exchange, and 25 USDT will be credited to your account.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    Can I Create Multiple Accounts to Receive More USDT?
                  </Accordion.Header>
                  <Accordion.Body>
                  No, creating multiple accounts with different emails is against our policy. Each user is allowed only one account, and KYC must be completed with accurate details to ensure the legitimacy of the USDT Bonanza and rewards.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                  Can I Earn Additional USDT through Referrals?  
                  </Accordion.Header>
                  <Accordion.Body>
                  Yes! You can earn an extra 2 USDT for each friend you refer to Ultrapro Exchange. To receive the referral reward, your referred friend must complete the KYC process.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                  What is the Ultrapro Exchange USDT Bonanza?
                  </Accordion.Header>
                  <Accordion.Body>
                  The Ultrapro Exchange USDT Bonanza is a promotional event where Ultrapro Exchange provides USDT to all new registrants. This initiative aims to encourage new users to explore the platform and participate in trading activities.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                  <Accordion.Header>
                  What Kind of Customer Support does Ultrapro Exchange Offer? 
                  </Accordion.Header>
                  <Accordion.Body>
                  Our customer support team is available 24/7 to assist with any issues or questions you may have. We provide support for the verification process and any other concerns to ensure a smooth and easy experience.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7">
                  <Accordion.Header>
                  What Cryptocurrencies Can I Trade on Ultrapro Exchange?
                  </Accordion.Header>
                  <Accordion.Body>
                  Ultrapro Exchange supports trading for over 150 cryptocurrencies, including Bitcoin, Ethereum, BNB, UPRO, and many more.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="8">
                  <Accordion.Header>
                  What is UPRO and When Can I Trade it on Ultrapro Exchange? 
                  </Accordion.Header>
                  <Accordion.Body>
                  UPRO is the native cryptocurrency of Ultrapro Blockchain, launched at 10 cents in 2023. After distributing 20 million UPRO through an airdrop, it will be available for trading on Ultrapro Exchange starting. 
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
