import React from 'react';
import styled from 'styled-components';
import Topbar from '../Topbar';
import Sidebar from '../Sidebar';

const Wrapper = styled.div`
  min-height: 100vh;
  font-family: roboto;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  max-width: 945px;
  margin: auto;
  margin-top: 24px;
`;

const App = ({ children }) => {
  return (
    <Wrapper>
      <Topbar />
      <Content>
        {children}
        <Sidebar />
      </Content>
    </Wrapper>
  );
};

export default App;
