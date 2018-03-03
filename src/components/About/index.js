import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Info from './Info';

const Container = styled.div`
  background-color: #202126;
  font-family: roboto;
  display: flex;
  flex-direction: column;
  align-items: center;
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
