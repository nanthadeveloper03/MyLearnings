"use client";
import Link from "next/link";
import Modal from '@/components/modal/Modal';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ApkDownload from "@/components/sections/home/ApkDownload";
import { useSelector } from "react-redux";
export default function QrCodePopup({ showPopup }) {
    const { isAuthenticated } = useSelector((state) => state.auth);

    const router = useRouter()
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleRedirect = () => {
        router.push('/register/')
        // const apkUrl = process.env.NEXT_PUBLIC_APK_URL;
        // if (apkUrl) {
        //     window.open(apkUrl, '_blank');
        // }
    };

    useEffect(() => {
        if (showPopup) {
            openModal()
        }
    }, [showPopup])

    return (
        <>
            <div className="cm_mod1 qrCode">
                <Modal show={showModal} onClose={closeModal}>
                    <div className="model-head hom_tit justify-content-center d-flex">
                        <div className="text-end closebtn cursor-pointer" onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#FF8300" width={30}>
                                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                            </svg>
                        </div>

                        <div className="mt-4">
                            <ApkDownload />
                        </div>
                    </div>
                      {!isAuthenticated ?
                    <form className="mod_frm1">
                        <h4 className="text-center finter fw700">Join <span className="pri_color">10 Million+</span> users now !</h4>
                        <h6 className="text-center fopsans fw400 ">Sign Up and Claim <span className="pri_color fw500">25 USDT</span> for
                            <span className="pri_color fw500">10 Million</span> people upto <span className="pri_color fw500">250 Million</span> USDT’s</h6>
                      <div className="text-center w-100" onClick={handleRedirect}>
                      <button type="button" className="btn btn-action w-100 text-white"> Sign Up and Claim 25 USDT </button>
                  </div>
                    </form> :
                       <form className="mod_frm1">
                       <h4 className="text-center finter fw700">Join <span className="pri_color">10 Million+</span> users now !</h4>
                       <h6 className="text-center fopsans fw400 ">Scan and <span className="pri_color fw500">Download</span> App</h6>
                  
                   </form> 
                      }  
                </Modal>
            </div>
        </>
    );
}
