import React from 'react';
import styled from 'styled-components';

const size = 20;
const borderColor = '#eee';

const Container = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.1);
`;
const LeftCap = styled.div`
  border-left: 1px solid ${borderColor};
  border-top: 1px solid ${borderColor};
  border-bottom: 1px solid ${borderColor};
  height: ${size * 2}px;
  width: ${size}px;
  border-bottom-left-radius: ${size * 2}px;
  border-top-left-radius: ${size * 2}px;
`;
const RightCap = styled.div`
  border-right: 1px solid ${borderColor};
  border-top: 1px solid ${borderColor};
  border-bottom: 1px solid ${borderColor};
  height: ${size * 2}px;
  width: ${size}px;
  border-bottom-right-radius: ${size * 2}px;
  border-top-right-radius: ${size * 2}px;
`;
const MidSection = styled.div`
  width: ${size * 3}px;
  border-top: 1px solid ${borderColor};
  border-bottom: 1px solid ${borderColor};
`;

const Pill = () => {
  return (
    <Container>
      <LeftCap />
      <MidSection />
      <RightCap />
    </Container>
  );
};

export default Pill;
