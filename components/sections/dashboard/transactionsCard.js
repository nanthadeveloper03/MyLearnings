"use client";
import React, { useState, useEffect, useMemo } from "react";
import { apiRequest } from '@/hooks/apiCall';
import Link from "next/link";
import Image from "next/image";
import { formatNumber, formatDate } from '@/util/common'

export default function TransactionCard() {

  //invite slider starts
  const slides = [
    {
      id: 1,
      image: '/assets/images/dash_ico/das_slid1.png',
      title: 'Invite Friends for Rewards',
      description: 'Invite friends and get 2 USDT commissions.',
      link: '/referral',
      linkText: 'Invite Friends',
    },
    {
      id: 2,
      image: '/assets/images/dash_ico/das_slid1.png',
      title: 'Social Media Bonanza',
      description: 'Follow our social media and claim 2 USDT.',
      link: '/socialbonanza',
      linkText: 'Follow Us',
    },
    // Add more slides as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [style, setStyle] = useState({ opacity: 1, transform: 'translateX(0)' });

  // Function to update the style for sliding and fading effect
  const startAnimation = (nextIndex) => {
    // Slide out the current slide (to the left)
    setStyle({ opacity: 0, transform: 'translateX(-100%)' });

    // Wait for the slide-out animation to finish, then switch the slide
    setTimeout(() => {
      setCurrentIndex(nextIndex); // Update the current index to the next slide

      // Immediately position the new slide off-screen (to the right)
      setStyle({ opacity: 0, transform: 'translateX(100%)' });

      // Slide in the new slide (with fade-in effect)
      setTimeout(() => {
        setStyle({ opacity: 1, transform: 'translateX(0)' });
      }, 50); // Slight delay for smoother transition
    }, 500); // Match this to the desired animation duration (500ms)
  };

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      startAnimation(nextIndex);
    }, 5000); // Change slide every 5000ms

    return () => clearInterval(interval);
  }, [currentIndex]);

  //invite slider ends


  const [isLoading, setIsLoading] = useState(false)
  const [transactionsData, setTransactionsData] = useState(false)

  async function initLoad() {
    try {
      setIsLoading(true)
      const response = await apiRequest('/account/transactions', {})
      if (response?.status) {
        let data = response?.data;
        setTransactionsData(data)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    initLoad()
  }, [])

  return (
    <div className="col-md-4">
      <div className="row">
        <div className="card-bx stacked invitecard">
          {/* <div className="card-info d-flex justify-content-between">
                <div>
                   <h5 className="mb-2">Invite Friends for Rewards</h5>
                      <div className="d-flex justify-content-between">
                        <p className="num-text mb-2">
                           Invite friends and get 2 USDT commissions.
                        </p>
                      </div>
                      <div className="d-flex bal_btn_section">
                        <div className="me-4 balance_btn btn2">
                          <Link href="/referral">
                            Invite Friends
                            <img src="/assets/images/arrow-right.svg" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  <div>
                 <img src="/assets/images/dash_ico/das_slid1.png" />
               </div>
          </div> */}

          <div className="bal_slider" style={{ overflow: 'hidden' }}>
            <div className="card-info">
              {slides
                .filter((_, index) => index === currentIndex) // Only render the active slide
                .map((slide) => (
                  <div
                    key={slide.id}
                    className="d-flex justify-content-between"
                    style={{
                      opacity: style.opacity,
                      transform: style.transform,
                      transition: 'all 0.5s ease-in-out' // Smooth transition for both opacity and position
                    }}
                  >
                    <>
                      {/* Slide Content */}
                      <div>
                        <h5 className="mb-2">{slide.title}</h5>
                        <div className="d-flex justify-content-between">
                          <p className="num-text mb-2">{slide.description}</p>
                        </div>
                        <div className="d-flex bal_btn_section">
                          <div className="me-4 balance_btn btn2">
                            <Link href={slide.link} className="invite-link">
                              {slide.linkText}
                              <img src="/assets/images/arrow-right.svg" alt="Arrow" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Slide Image */}
                      <div>
                        <img src={slide.image} alt={`Slide ${slide.id}`} />
                      </div>
                    </>
                  </div>
                ))}
            </div>
          </div>

        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="recent_transaction">
            <h3>Recent Transaction</h3>
            <ul>
              {transactionsData.length > 0 ?

                transactionsData.map(function (transaction, index) {

                  return (
                    <li key={index} >
                      <div className="coin_name">
                        <img src={transaction.coinImage} alt={transaction.currency} />
                        <div>
                          <h5>{transaction.description}</h5>
                          <p>{formatDate(transaction.createdAt, 'MMMM Do YYYY, h:mm a')}</p>
                        </div>
                      </div>
                      <div className="coin_value">
                        <span>{formatNumber(transaction.amount, transaction.decimalPoint)}</span>
                      </div>
                    </li>
                  )
                })

                :

                <li>
                  <div className="coin_name">
                    No record found.
                  </div>
                </li>
              }

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
