import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Info from './Info';

const Container = styled.div`
  background: #202126;
  background-size: cover;
  height: 100vh;
  font-family: roboto;
`;

class About extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        <Info />
      </Container>
    );
  }
}

export default About;
