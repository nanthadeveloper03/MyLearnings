import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/authSlice';
import { Modal, Button, Form } from 'react-bootstrap';
import { formatDate, showNotification } from '@/util/common'
import { apiRequest } from '@/hooks/apiCall';
import axios from "axios";
import { decryptText } from '@/util/conceal'
import ImagePopup from '@/util/imagePopup'

export default function profileCard({ profileData }) {

    const dispatch = useDispatch();
    const authSelector = useSelector((state) => state.auth);
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isUpload, setIsUpload] = useState(false);
    const [initProfImg, setInitProfImg] = useState(null);
    const [fullImageUrl, setFullImageUrl] = useState('');

    const [showImg, setShowImg] = useState(false);

    const handleClose = () => {
        setShow(false)
        setInitProfImg('')
        setSelectedImage('')
    };

    const handleShow = () => setShow(true);

    let kycStatus;

    if (profileData.kycStatus === 1) {
        kycStatus = 'Pending'
    } else if (profileData.kycStatus === 2) {
        kycStatus = 'Rejected'
    } else if (profileData.kycStatus === 3) {
        kycStatus = 'Verified'
    } else {
        kycStatus = 'Not yet started'
    }


    const handleImageChange = (event) => {

        const file = event.target.files[0];

        const maxFileSize = 1 * 1024 * 1024;
        const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

        if (!acceptedFileTypes.includes(file.type)) {
            showNotification(false, 'Invalid file type. Only JPEG, PNG, and GIF are allowed.')
            return;
        }

        if (file.size > maxFileSize) {
            showNotification(false, 'File size exceeds 2MB.')
            return;
        }

        setSelectedImage(file);
        setPreview(URL.createObjectURL(file));
    };


    const handleUpload = async () => {

        if (!selectedImage) {
            showNotification(false, 'Select a valid image.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('osType', 0);
        formData.append('wsToken', authSelector?.user?.wsToken);

        try {

            setIsUpload(true);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/account/imgupload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authSelector?.user?.accessToken}`,
                },
            });

            const decryptedData = decryptText(response.data.payload);
            const result = JSON.parse(decryptedData);
            const output = result.data;

            if (!result?.status) {

                throw new Error('Failed to upload file');

            } else {

                setInitProfImg(preview)

                const updatedAuth = {
                    ...authSelector.user,
                    ['profileImg']: output?.profileImg,
                };

                dispatch(loginSuccess(updatedAuth));

                showNotification(true, 'Profile picture has been updated successfully.');
                setSelectedImage('')
                handleClose()
            }

        } catch (error) {

            console.error('Error uploading file:', error);

        } finally {

            setIsUpload(false);
        }
    };

    const copyText = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification(true, 'Referral code is copied.');
        }).catch(err => { });
    };


    let profileImg;

    if (authSelector.user.profileImg) {
        profileImg = authSelector.user.profileImg
    } else if (profileData.profileImg) {
        profileImg = profileData.profileImg
    } else {
        profileImg = '/assets/images/avt/user.png'
    }

    const handleImgShow = () => {
        setShowImg(true);
    };

    const handleImgClose = () => {
        setShowImg(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered className="uplo_modas">
                <Modal.Header closeButton>
                    <Modal.Title className="fs-20">Upload Profile Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFile">
                            <Form.Label>Select an Image</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                        </Form.Group>
                    </Form>
                    {selectedImage && (
                        <div className="mt-3 justify-content-center uplo_dproim">
                            <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ width: '50%', height: 'auto' }} />
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {isUpload ?
                        <Button variant="primary" disabled className="text-white"> Uploading ... </Button> :
                        <Button variant="primary" onClick={handleUpload} className="text-white btn-action"> Upload </Button>
                    }

                </Modal.Footer>
            </Modal>

            <ImagePopup
                show={showImg}
                handleClose={handleImgClose}
                fullImageUrl={initProfImg || profileImg}
            />

            <div className="user_section_dashboard bg mb-4">
                <div className="row">
                    <div className="user-panel">

                        <div className="media me-2 cursor-pointer">
                            <img alt="image" width="40" height={"40"} src={initProfImg || profileImg} onClick={() => handleImgShow('https://via.placeholder.com/800x600')} />
                            <div className="edit"  onClick={handleShow}>
                                <img src="/assets/images/uploadIcon.png" />
                            </div>
                        </div>

                        <div className="userbody-col">
                            <h5 className="mb-1 text-capitalize">
                                {profileData.fullName || '----'}
                                {/* <span className="user_edit mx-2 cursor-pointer">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.981 1.47279C10.7952 1.28695 10.5746 1.13953 10.3319 1.03897C10.0891 0.938408 9.82889 0.886672 9.56612 0.886719C9.30334 0.886765 9.04316 0.938593 8.80042 1.03924C8.55769 1.13989 8.33717 1.28738 8.15147 1.47329L2.39097 7.24029C2.14134 7.49045 2.00109 7.82939 2.00097 8.18279V9.66679C2.00097 9.84191 2.03546 10.0153 2.10248 10.1771C2.16949 10.3389 2.26771 10.4859 2.39154 10.6097C2.51537 10.7335 2.66237 10.8318 2.82416 10.8988C2.98595 10.9658 3.15935 11.0003 3.33447 11.0003H4.83047C5.18414 11.0003 5.52332 10.8598 5.77347 10.6098L11.5305 4.85029C11.9053 4.47517 12.1158 3.96658 12.1158 3.43629C12.1158 2.906 11.9053 2.39741 11.5305 2.02229L10.981 1.47279ZM9.09447 2.41579C9.15637 2.35384 9.22987 2.30469 9.31077 2.27116C9.39167 2.23762 9.47839 2.22037 9.56597 2.22037C9.65355 2.22037 9.74026 2.23762 9.82117 2.27116C9.90207 2.30469 9.97557 2.35384 10.0375 2.41579L10.587 2.96529C10.847 3.22579 10.847 3.64779 10.587 3.90779L4.82997 9.66729H3.33397V8.18329L9.09447 2.41579ZM1.33447 12.3338C1.1577 12.3338 0.988175 12.404 0.863182 12.529C0.738189 12.654 0.667969 12.8235 0.667969 13.0003C0.667969 13.1771 0.738189 13.3466 0.863182 13.4716C0.988175 13.5966 1.1577 13.6668 1.33447 13.6668H13.3345C13.5112 13.6668 13.6808 13.5966 13.8058 13.4716C13.9307 13.3466 14.001 13.1771 14.001 13.0003C14.001 12.8235 13.9307 12.654 13.8058 12.529C13.6808 12.404 13.5112 12.3338 13.3345 12.3338H1.33447Z"
                                            fill="var(--text)"
                                        />
                                    </svg>
                                </span> */}
                            </h5>
                        </div>
                    </div>
                </div>

                <div className="user_account_details mt-3">
                    <div className="row">
                        <div className="detail_box">
                            <p> Email Address </p>
                            <h4> {profileData.email || '----'} </h4>
                        </div>
                        <div className="detail_box">
                            <p>
                                Identity Verification
                                <svg
                                    width="5"
                                    height="8"
                                    viewBox="0 0 5 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.482508 0.24618C0.528931 0.199714 0.584057 0.162853 0.644734 0.137704C0.705411 0.112554 0.77045 0.0996094 0.836133 0.0996094C0.901815 0.0996094 0.966854 0.112554 1.02753 0.137704C1.08821 0.162853 1.14333 0.199714 1.18976 0.24618L4.18976 3.24618C4.23622 3.2926 4.27308 3.34773 4.29823 3.40841C4.32338 3.46908 4.33633 3.53412 4.33633 3.5998C4.33633 3.66549 4.32338 3.73053 4.29823 3.7912C4.27308 3.85188 4.23622 3.90701 4.18976 3.95343L1.18976 6.95343C1.14332 6.99987 1.08819 7.0367 1.02751 7.06184C0.966838 7.08697 0.901807 7.09991 0.836133 7.09991C0.770458 7.09991 0.705427 7.08697 0.644752 7.06184C0.584077 7.0367 0.528946 6.99987 0.482508 6.95343C0.436069 6.90699 0.399232 6.85186 0.374099 6.79118C0.348967 6.73051 0.336032 6.66548 0.336032 6.5998C0.336032 6.53413 0.348967 6.4691 0.374099 6.40842C0.399232 6.34775 0.436069 6.29262 0.482508 6.24618L3.12888 3.5998L0.482508 0.953429C0.436042 0.907006 0.399181 0.85188 0.374032 0.791203C0.348882 0.730526 0.335938 0.665487 0.335938 0.599805C0.335938 0.534122 0.348882 0.469083 0.374032 0.408406C0.399181 0.347729 0.436042 0.292603 0.482508 0.24618Z"
                                        fill="#8C8C8C"
                                        fillOpacity="0.6"
                                    />
                                </svg>
                            </p>
                            <h4>
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.214844 7.7002C0.214844 9.55671 0.952342 11.3372 2.2651 12.6499C3.57785 13.9627 5.35833 14.7002 7.21484 14.7002C9.07136 14.7002 10.8518 13.9627 12.1646 12.6499C13.4773 11.3372 14.2148 9.55671 14.2148 7.7002C14.2148 5.84368 13.4773 4.0632 12.1646 2.75045C10.8518 1.43769 9.07136 0.700195 7.21484 0.700195C5.35833 0.700195 3.57785 1.43769 2.2651 2.75045C0.952342 4.0632 0.214844 5.84368 0.214844 7.7002ZM7.21484 3.9842C7.71084 3.9842 7.95884 4.2322 7.95884 4.7282V8.3152C7.95884 8.8112 7.71084 9.05919 7.21484 9.05919C6.71884 9.05919 6.47084 8.8112 6.47084 8.3152V4.7282C6.47084 4.2322 6.71884 3.9842 7.21484 3.9842ZM7.21484 9.5842C7.79818 9.5842 8.08984 9.87586 8.08984 10.4592C8.08984 11.0425 7.79818 11.3342 7.21484 11.3342C6.63151 11.3342 6.33984 11.0425 6.33984 10.4592C6.33984 9.87586 6.63151 9.5842 7.21484 9.5842Z"
                                        fill="#FF8300"
                                    />
                                </svg>
                                {kycStatus}
                            </h4>
                        </div>
                        <div className="detail_box">
                            <p>
                                Referral Id

                            </p>
                            <h4>
                                {profileData.referralId || '----'}
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="cursor-pointer"
                                    onClick={() => copyText(profileData.referralId)}
                                >
                                    <path
                                        d="M11.1836 1.47461C11.3383 1.47461 11.4866 1.53605 11.596 1.64542C11.7053 1.75479 11.7668 1.90313 11.7668 2.0578C11.7668 2.21247 11.7053 2.3608 11.596 2.47017C11.4866 2.57954 11.3383 2.64098 11.1836 2.64098H2.90741C2.84452 2.64098 2.7842 2.66597 2.73973 2.71044C2.69526 2.75491 2.67028 2.81522 2.67028 2.87811V11.1543C2.67028 11.309 2.60884 11.4573 2.49947 11.5667C2.3901 11.676 2.24176 11.7375 2.08709 11.7375C1.93242 11.7375 1.78409 11.676 1.67472 11.5667C1.56535 11.4573 1.50391 11.309 1.50391 11.1543V2.87811C1.50391 2.50588 1.65177 2.14889 1.91498 1.88568C2.17819 1.62248 2.53517 1.47461 2.90741 1.47461H11.1836Z"
                                        fill="#FF8300"
                                    />
                                    <path
                                        d="M5.23944 3.80762C4.86721 3.80762 4.51022 3.95549 4.24701 4.21869C3.98381 4.4819 3.83594 4.83889 3.83594 5.21112V12.3205C3.83594 12.6927 3.98381 13.0497 4.24701 13.3129C4.51022 13.5761 4.86721 13.724 5.23944 13.724H12.3488C12.721 13.724 13.078 13.5761 13.3412 13.3129C13.6044 13.0497 13.7523 12.6927 13.7523 12.3205V5.21112C13.7523 4.83889 13.6044 4.4819 13.3412 4.21869C13.078 3.95549 12.721 3.80762 12.3488 3.80762H5.23944ZM5.00231 5.21155C5.00231 5.08074 5.10819 4.97443 5.23944 4.97443H12.3488C12.4796 4.97443 12.5859 5.0803 12.5859 5.21155V12.3209C12.5859 12.3838 12.561 12.4441 12.5165 12.4886C12.472 12.5331 12.4117 12.5581 12.3488 12.5581H5.23944C5.2083 12.5581 5.17746 12.5519 5.14869 12.54C5.11992 12.5281 5.09378 12.5106 5.07176 12.4886C5.04975 12.4666 5.03228 12.4404 5.02036 12.4117C5.00845 12.3829 5.00231 12.3521 5.00231 12.3209V5.21155Z"
                                        fill="#FF8300"
                                    />
                                </svg>
                            </h4>
                        </div>
                        <div className="detail_box">
                            <p>
                                Country{" "}
                                {/* <svg
                                    width="5"
                                    height="8"
                                    viewBox="0 0 5 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.482508 0.24618C0.528931 0.199714 0.584057 0.162853 0.644734 0.137704C0.705411 0.112554 0.77045 0.0996094 0.836133 0.0996094C0.901815 0.0996094 0.966854 0.112554 1.02753 0.137704C1.08821 0.162853 1.14333 0.199714 1.18976 0.24618L4.18976 3.24618C4.23622 3.2926 4.27308 3.34773 4.29823 3.40841C4.32338 3.46908 4.33633 3.53412 4.33633 3.5998C4.33633 3.66549 4.32338 3.73053 4.29823 3.7912C4.27308 3.85188 4.23622 3.90701 4.18976 3.95343L1.18976 6.95343C1.14332 6.99987 1.08819 7.0367 1.02751 7.06184C0.966838 7.08697 0.901807 7.09991 0.836133 7.09991C0.770458 7.09991 0.705427 7.08697 0.644752 7.06184C0.584077 7.0367 0.528946 6.99987 0.482508 6.95343C0.436069 6.90699 0.399232 6.85186 0.374099 6.79118C0.348967 6.73051 0.336032 6.66548 0.336032 6.5998C0.336032 6.53413 0.348967 6.4691 0.374099 6.40842C0.399232 6.34775 0.436069 6.29262 0.482508 6.24618L3.12888 3.5998L0.482508 0.953429C0.436042 0.907006 0.399181 0.85188 0.374032 0.791203C0.348882 0.730526 0.335938 0.665487 0.335938 0.599805C0.335938 0.534122 0.348882 0.469083 0.374032 0.408406C0.399181 0.347729 0.436042 0.292603 0.482508 0.24618Z"
                                        fill="#8C8C8C"
                                        fillOpacity="0.6"
                                    />
                                </svg> */}
                            </p>
                            <h4>{profileData.country ? profileData.country : '---'}</h4>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
