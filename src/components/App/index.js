import React from 'react';
import styled from 'styled-components';
import Topbar from '../Topbar';
import Footer from '../Footer';
import ErrorBoundary from './ErrorBoundary';

const Wrapper = styled.div`
  min-height: 100vh;
  font-family: roboto;
  background: #fff;
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  min-height: calc(100vh - 264px);
`;

const App = ({ children }) => {
  return (
    <Wrapper>
      <Topbar />
      <ErrorBoundary>{children}</ErrorBoundary>
      <Footer />
    </Wrapper>
  );
};

export default App;
