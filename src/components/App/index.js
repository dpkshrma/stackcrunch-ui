import React from 'react';
import styled from 'styled-components';
import Topbar from '../Topbar';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import ErrorBoundary from './ErrorBoundary';

const Wrapper = styled.div`
  min-height: 100vh;
  font-family: roboto;
`;
const Content = styled.div`
  display: flex;
  max-width: 945px;
  margin: auto;
  margin-top: 24px;
  min-height: calc(100vh - 264px);
`;

const App = ({ children }) => {
  return (
    <Wrapper>
      <Topbar />
      <ErrorBoundary>
        <Content>
          {children}
          <Sidebar />
        </Content>
      </ErrorBoundary>
      <Footer />
    </Wrapper>
  );
};

export default App;
