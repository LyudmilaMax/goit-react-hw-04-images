import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalContent, ModalOverlay } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const closeModalByEscape = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', closeModalByEscape);
    return () => {
      window.removeEventListener('keydown', closeModalByEscape);
    };
  }, [onClose]);

  const closeModalByBackdrop = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlay onClick={closeModalByBackdrop}>
      <ModalContent>{children}</ModalContent>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
