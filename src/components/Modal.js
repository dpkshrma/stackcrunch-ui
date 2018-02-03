import React from 'react';
import Mortal from 'react-mortal';
import styled from 'styled-components';

const renderModal = ({ modalComponent }) => ({ opacity }) => {
  const ModalContainer = styled.div`
    top: 0;
    z-index: 100;
    position: absolute;
  `;
  return <ModalContainer style={{ opacity }}>{modalComponent}</ModalContainer>;
};

const Modal = ({ isOpen, children: modalComponent }) => {
  return (
    <Mortal
      isOpened={isOpen}
      onClose={() => {}}
      motionStyle={(spring, isVisible) => ({
        opacity: spring(isVisible ? 1 : 0)
      })}
    >
      {renderModal({ modalComponent })}
    </Mortal>
  );
};

Modal.Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Modal;
