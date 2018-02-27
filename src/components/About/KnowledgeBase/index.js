import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #202126;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  padding: 48px;
  color: #fff;
  font-family: roboto;
  font-size: 32px;
  font-weight: 200;
  text-align: center;
  line-height: 1.4;
`;
const Sections = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Section = styled.div`
  flex-grow: 1;
  min-width: 25%;
`;
const BrowserContainer = styled.div`
  height: 200px;
  width: calc(100% - 160px);
  margin: auto;
  background-color: #fff;
  border-radius: 4px;
`;

class KnowledgeBase extends React.Component {
  render() {
    return (
      <Container>
        <Title>
          Built to make it easy to learn & stay updated through huge
          knowledge-bases of open QnA communities
        </Title>
        <Sections />
      </Container>
    );
  }
}

export default KnowledgeBase;
