"use client";
import Link from "next/link";
import Modal from '@/components/modal/Modal';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, showPopup } from "@/store/authSlice";
import { apiRequest } from "@/hooks/apiCall";
export default function WelcomPopup({onHit}) {
    const router = useRouter()

    const dispatch = useDispatch();
    const freePopup = useSelector((state) => state?.auth?.user);

    // const [showModal, setShowModal] = useState(false);
    // const openModal = () => setShowModal(true);
    // const closeModal = () => setShowModal(false);
    // const [isModalOpen, setIsModalOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false)

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        localStorage.setItem('popup', 'true');
        setShowModal(false);
    }



    useEffect(() => {
        const timer = setTimeout(() => {
            openModal();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

 
    async function handleSubmit() {
        router.push('/staking')
                 if (onHit) {
                    onHit();
                }
    }



    return (
        <>
          
                <div className="cm_mod1">
                    <Modal show={showModal} onClose={closeModal}>
                        <div className="model-head hom_tit justify-content-center d-flex">
                            <div className="text-end closebtn cursor-pointer" onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#FF8300" width={30}>
                                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                            </svg>
                        </div>
                            <img src="../assets/images/nico/mod1.png" className="hom_titim" />
                        </div>
                        <form className="mod_frm1">
                            <h4 className="text-center finter fw700">Plan Changed!</h4>
                               
                            <h6 className="text-center fopsans fw600 ">Minimal staking now starts from</h6>

                            <div style={{textAlign: "center",padding:'12px'}}>
                              
                                <label
                                className="usdtLabel"
                                
                                    style={{borderRadius:'6px',border:'1px dashed #818181',padding:'15px 25px',color:'#FF8300',fontWeight:'600',fontSize:'20px',fontFamily:'PT sans,Arial,sans-serif'}}>
                                 3 USDT
                                </label>
                            </div>

                            {isLoading ?
                                <div className="text-center w-100">
                                    <button type="button" disabled className="btn btn-action w-100 text-white">  Loading...</button>
                                </div>
                                :
                                <div className="text-center w-100" onClick={handleSubmit}>
                                    <button type="button" className="btn btn-action w-100 text-white"> <b> CLICK HERE </b></button>
                                </div>
                            }
                        </form>
                    </Modal>
                </div>
          
            {/* {!popup &&
            <div className="cm_mod2">
            <Modal show={showModal1} onClose={closeModal1}>
                <div className="model-head">
                    <div className="text-end closebtn cursor-pointer" onClick={closeModal1}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#FF8300" width={30}>
                            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                        </svg>
                    </div>
                    <img src="./assets/images/welcome/popup.jpg" className="img-fluid" />
                </div>
            </Modal>
            </div>
            } */}
        </>
    );
}
