'use client'
import { useEffect, useState } from 'react';

import Link from "next/link";

const ExpoTestimonial = () => {

    const testimonials = [
        { id: 1, text: "“An incredible experience! The Online Crypto Expo brought together top minds in the industry. I learned so much and made valuable connections!”", 
            author: "John D", authsub: "Crypto Enthusiast", teimg: "../assets/images/nico/letter_j.png" },
        { id: 2, text: "“A truly global event! The expo allowed me to network with crypto experts from all over the world, all from the comfort of my home.”",
             author: "Sweetlyn M", authsub: "Blockchain Developer", teimg: "../assets/images/nico/letter_s.png" },
        { id: 3, text: "“Attending the Online Crypto Expo was the best decision I've made this year. The sessions were informative, and the networking opportunities were endless.”", 
            author: "Thanishta K", authsub: " Fintech Entrepreneur", teimg: "../assets/images/nico/letter_t.png" },
        { id: 4, text: "“The insights shared at the expo were invaluable. I feel more confident about my investments and strategies going forward.”",
             author: " Joel W", authsub: "Investor", teimg: "../assets/images/nico/letter_j.png" },
        { id: 5, text: "“The Online Crypto Expo exceeded my expectations. I came away with new knowledge and connections that will help my business grow.”", 
            author: "Carlos H", authsub: "Crypto Project Manager", teimg: "../assets/images/nico/letter_c.png" },
        { id: 6, text: "“A fantastic experience! The expo was well-organized, and the speakers were top-notch. I can't wait for the next one.”", 
                author: "Christella S", authsub: "Blockchain Consultant", teimg: "../assets/images/nico/letter_c.png" },
        { id: 7, text: "“The expo was a great opportunity to learn about the latest trends and developments in the crypto world. Highly recommended!”", 
                author: "Stephen", authsub: "Cryptocurrency Investor", teimg: "../assets/images/nico/letter_s.png" },
        { id: 8, text: "“Great event! The variety of speakers and topics made it easy to find sessions that matched my interests.”", 
                author: "Grace F", authsub: "Crypto Journalist", teimg: "../assets/images/nico/letter_g.png" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(3); // Default to 3 items

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) {
                setVisibleItems(1); // Mobile view
            } else if (window.innerWidth <= 768) {
                setVisibleItems(2); // Tablet view
            } else {
                setVisibleItems(3); // Desktop view
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check on mount

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= testimonials.length - visibleItems ? 0 : prevIndex + 1
        );
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - visibleItems : prevIndex - 1
        );
    };

    // Autoplay functionality
    useEffect(() => {
        const interval = setInterval(goToNext, 3000);
        return () => clearInterval(interval);
    }, [currentIndex, visibleItems]); // Re-run the interval when currentIndex or visibleItems changes  


    return (

        <section className="testi_sc1">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-11">
                        <div className="testimonial-slider">
                            <h5 className="text-capitalize finter fw600">testimonials</h5>
                            <button onClick={goToPrevious} className="slider-button left">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                                </svg>
                            </button>
                            <div
                                className="testimonial-slider-inner"
                                style={{
                                    transform: `translateX(-${(currentIndex * 100) / testimonials.length}%)`,
                                    width: `${(100 * testimonials.length) / visibleItems}%`,
                                }}
                            >
                                {testimonials.map((testimonial) => (
                                    <div
                                        className="testimonial"
                                        key={testimonial.id}
                                        style={{ width: `${100 / visibleItems}%` }}
                                    >
                                        <div className="tescn">
                                            <p>{testimonial.text}</p>
                                        </div>
                                        <h4>
                                            <span className="tesim"><img src={testimonial.teimg} className="img-fluid" /></span>
                                            <span className="auth1">{testimonial.author}</span>
                                            <span className="authsub1">{testimonial.authsub}</span>
                                        </h4>
                                    </div>
                                ))}
                            </div>
                            <button onClick={goToNext} className="slider-button right">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                </svg>
                            </button>

                            <div className="dots">
                                {Array.from({ length: Math.ceil(testimonials.length / visibleItems) }).map((_, index) => (
                                    <span
                                        key={index}
                                        className={`dot ${Math.floor(currentIndex / visibleItems) === index ? 'active' : ''}`}
                                        onClick={() => setCurrentIndex(index * visibleItems)}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ExpoTestimonial;