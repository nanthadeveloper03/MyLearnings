// components/Modal.js
import React from 'react';

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div style={styles.overlay} className='innpop'>
      <div style={styles.modal} className='modal-cont'>
        <button onClick={onClose} style={styles.closeButton}>
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    background: 'transparent',
    fontSize: '1.5rem',
    cursor: 'pointer',
    display: 'none'
  },
};

export default Modal;
