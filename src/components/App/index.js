import React from 'react';
import styled from 'styled-components';
import Topbar from '../Topbar';

const Wrapper = styled.div`
  min-height: 100vh;
  font-family: roboto;
`;

const App = ({ children }) => {
  return (
    <Wrapper>
      <Topbar />
      {children}
    </Wrapper>
  );
};

export default App;
