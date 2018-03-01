import React from 'react';
import ContainerDimensions from 'react-container-dimensions';
import styled from 'styled-components';
import { clickables } from './config';
import ClickableBox from './ClickableBox';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: -48px;
`;

class Playground extends React.Component {
  state = {
    selectedCommunity: null
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ selectedCommunity: 'stackoverflow' });
    }, 1000);
  }
  toggleCommunityFocus = selectedCommunity => e => {
    e.preventDefault();
    if (this.state.selectedCommunity !== selectedCommunity) {
      this.setState({ selectedCommunity });
    } else {
      this.setState({ selectedCommunity: null });
    }
  };
  render() {
    const { selectedCommunity } = this.state;
    return (
      <ContainerDimensions>
        {bounds => (
          <Container
            ref={el => {
              this.container = el;
            }}
          >
            {clickables.map(data => (
              <ClickableBox
                {...data}
                key={data.id}
                onClick={this.toggleCommunityFocus(data.id)}
                hide={selectedCommunity && data.id !== selectedCommunity}
                moveToBase={data.id === selectedCommunity}
                basePosition={{ top: -1 * bounds.height / 2, left: 0 }}
              />
            ))}
          </Container>
        )}
      </ContainerDimensions>
    );
  }
}

export default Playground;
