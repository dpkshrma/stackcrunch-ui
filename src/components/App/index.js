import React from 'react';
import styled from 'styled-components';
import Topbar from '../Topbar';

const Wrapper = styled.div`
  background: #fefefe;
  min-height: 100vh;
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
