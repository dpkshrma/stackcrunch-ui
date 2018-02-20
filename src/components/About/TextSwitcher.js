import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 16px;
`;
const Span = styled.div`
  color: #ddd;
  font-size: 48px;
  border-bottom: 3px solid #777777cc;
  width: fit-content;
`;

class TextSwitcher extends React.Component {
  state = {
    currentTextIndex: 0
  };
  componentDidMount() {
    this.changeText();
  }
  changeText = () => {
    const { currentTextIndex } = this.state;
    setTimeout(() => {
      this.setState({
        currentTextIndex: (currentTextIndex + 1) % this.props.data.length
      });
      this.changeText();
    }, 3000);
  };
  render() {
    return (
      <Container>
        <Span className="switcher">
          {this.props.data[this.state.currentTextIndex]}
        </Span>
      </Container>
    );
  }
}

export default TextSwitcher;
