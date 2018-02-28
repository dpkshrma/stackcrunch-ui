import React from 'react';
import ContainerDimensions from 'react-container-dimensions';
import styled from 'styled-components';
// import { Motion, spring } from 'react-motion';
import { clickables } from './config';
import ClickableBox from './ClickableBox';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: -48px;
`;

// const randFloat = (to, from = 1) => Math.random() * (to - from) + from;
// const randInt = (to, from = 1) => Math.round(randFloat(to, from));
// const generateRandomPoint = bounds => {
//   const [fromX, toX] = bounds.x;
//   const [fromY, toY] = bounds.y;
//   return {
//     x: randInt(toX, fromX),
//     y: randInt(toY, fromY)
//   };
// };

class Playground extends React.Component {
  state = {
    selectedCommunity: null
  };
  backBoxes = null;
  containerBounds = null;
  componentDidMount() {
    setTimeout(() => {
      this.setState({ selectedCommunity: 'stackoverflow' });
    }, 1000);
  }
  // renderBackBoxes = containerBounds => {
  //   const { width, height } = containerBounds;
  //   const maxBoxes = 70;
  //   const BackBox = Box.extend`
  //     opacity: 0.6;
  //     z-index: 90;
  //   `;
  //   const boxes = Array.from({ length: maxBoxes }, (v, i) => {
  //     const randomPoint = generateRandomPoint({
  //       x: [-1 * width / 2, width / 2],
  //       y: [-1 * height / 2, height / 2]
  //     });
  //     return (
  //       <BackBox
  //         key={i}
  //         className="box back"
  //         top={randomPoint.y}
  //         left={randomPoint.x}
  //         size={randInt(10, 4)}
  //       />
  //     );
  //   });
  //   return boxes;
  // };
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
        {bounds => {
          // if (!this.backBoxes) this.backBoxes = this.renderBackBoxes(bounds);
          if (!this.containerBounds) this.containerBounds = bounds;
          return (
            <Container
              ref={el => {
                this.container = el;
              }}
              id="play"
            >
              {/* <Motion
                defaultStyle={{ opacity: 1 }}
                style={{ opacity: spring(selectedCommunity ? 0 : 1) }}
              >
                {({ opacity }) => (
                  <div className="back-boxes" style={{ opacity }}>
                    {this.backBoxes}
                  </div>
                )}
              </Motion> */}
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
          );
        }}
      </ContainerDimensions>
    );
  }
}

export default Playground;
