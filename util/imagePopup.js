import React from 'react';
import { Modal } from 'react-bootstrap';

const ImagePopup = ({ show, handleClose, fullImageUrl }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        Profile Image
      </Modal.Header>
      <Modal.Body>
        <img src={fullImageUrl} alt="Popup" style={{ width: '100%', height: 'auto' }} />
      </Modal.Body>
    </Modal>
  );
};

export default ImagePopup;