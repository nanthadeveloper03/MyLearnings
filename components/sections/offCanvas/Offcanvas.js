// components/Offcanvas.js
import { useEffect } from 'react';

const Offcanvas = ({ isOpen, onClose, children, placement = 'left' }) => {
  // Close Offcanvas on ESC key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent scrolling when Offcanvas is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`offcanvas-backdrop ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      ></div>

      {/* Offcanvas Panel */}
      <div
        className={`offcanvas-panel ${placement} ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
      >
        <button className="offcanvas-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="offcanvas-content">{children}</div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .offcanvas-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease;
          z-index: 999;
        }
        .offcanvas-backdrop.visible {
          opacity: 1;
          visibility: visible;
        }
        .offcanvas-panel {
          position: fixed;
          top: 0;
          ${placement}: 0;
          width: 480px;
          max-width: 80%;
          height: 100%;
          background: #fff;
          transform: translateX(
            ${placement === 'left' ? '-100%' : '100%'}
          );
          transition: transform 0.3s ease;
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }
        .offcanvas-panel.open {
          transform: translateX(0);
        }
        .offcanvas-close {
          background: none;
          border: none;
          font-size: 2rem;
          align-self: flex-end;
          margin: 1rem;
          cursor: pointer;
        }
        .offcanvas-content {
          padding: 0;
          overflow-y: auto;
          flex: 1;
        }

        /* Responsive adjustments */
        @media (max-width: 600px) {
          .offcanvas-panel {
            width: 100%;
            max-width:100%;
          }
        }
      `}</style>
    </>
  );
};

export default Offcanvas;
