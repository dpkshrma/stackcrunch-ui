import React from 'react';
import styled from 'styled-components';
import CoverImage from './CoverImage';

const Container = styled.div`
  width: 100%;
`;
const TitleInput = styled.input`
  font-size: 40px;
  color: #555;
  margin-top: 20px;
  padding: 0;
  outline: none;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  font-family: roboto;
  font-weight: 300;
  &::placeholder {
    font-weight: 100;
    color: #777;
  }
  &:focus {
    border-bottom: 2px solid #ffa000;
  }
`;
const DateString = styled.div`
  font-family: roboto;
  font-weight: 300;
  font-size: 12px;
  padding: 8px 0;
  letter-spacing: 2px;
`;

const Meta = () => <DateString>{new Date().toDateString()}</DateString>;

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <CoverImage />
        <TitleInput placeholder="Descriptive Title" />
        <Meta />
      </Container>
    );
  }
}

export default Editor;
