import React from 'react';
import styled from 'styled-components';

const InputModal = ({ closeModal }) => {
  const Container = styled.div`
    background: #fff;
    height: 200px;
    width: 300px;
  `;
  return (
    <Container>
      <p>modal body</p>
      <button onClick={closeModal}>close modal</button>
    </Container>
  );
};

export default InputModal;
