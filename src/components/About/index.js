import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import bg from './sc_bg.svg';
import Info from './Info';

const Container = styled.div`
  background: #202126 url(${bg}) no-repeat;
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
