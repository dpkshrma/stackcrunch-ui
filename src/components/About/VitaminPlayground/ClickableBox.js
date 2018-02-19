import React from 'react';
import styled from 'styled-components';
import { StaggeredMotion, spring, presets } from 'react-motion';

// const randFloat = (to, from = 1) => Math.random() * (to - from) + from;
// const getBounceAnimation = ({ maxBounce = 8 }) => keyframes`
//   0% { transform: translateY(-${maxBounce/2}px); }
//   100% { transform: translateY(${maxBounce/2}px);); }
// `;

const Box = styled.div`
  border-radius: 2px;
  width: ${({ size = 40 }) => `${size}px`};
  height: ${({ size = 40 }) => `${size}px`};
  background-color: #eee;
  ${'' /* animation: ${getBounceAnimation} ${() => randFloat(2.5, 1.5)}s infinite alternate; */};
`;
const Container = styled.div`
  ${'' /* positioning */} position: absolute;
  top: ${({ top = 0 }) => `${top}px`};
  left: ${({ left = 0 }) => `${left}px`};
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  ${'' /* visual */} border-radius: 50%;
  width: 80px;
  height: 80px;
  cursor: pointer;
  &:hover ${Box} {
    box-shadow: 0 0 8px 2px #ccc;
  }
`;
const FocusCircle = ({ children, radius = 20, percent }) => {
  const Figure = styled.figure`
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
  `;
  const Svg = styled.svg``;
  const circumference = Math.round(Math.PI * 2 * radius);
  const Circle = styled.circle`
    fill: transparent;
    stroke: #fff;
    stroke-width: 1;
    stroke-dasharray: ${circumference}px;
    stroke-dashoffset: ${(1 - percent) * circumference};
  `;
  const circleTransform = `rotate(-90, ${radius + 1}, ${radius + 1})`;
  return (
    <Figure>
      <Svg width={radius * 2 + 2} height={radius * 2 + 2}>
        <Circle
          className="outer"
          cx={radius + 1}
          cy={radius + 1}
          r={radius}
          transform={circleTransform}
        />
      </Svg>
      {children}
    </Figure>
  );
};

const ClickableBox = props => {
  const defaultStyles = [
    {
      opacity: 1,
      top: props.moveToBase ? props.top : 0,
      left: props.moveToBase ? props.left : 0
    },
    {
      focusCircle: 0
    },
    {
      focusLine: 0
    }
  ];
  const finalStyles = prevStyles => {
    const nearToBase = prevStyles[0].top / props.basePosition.top > 0.99;
    return [
      {
        opacity: spring(props.hide ? 0 : 1),
        top: spring(
          props.moveToBase ? props.basePosition.top : props.top,
          presets.gentle
        ),
        left: spring(
          props.moveToBase ? props.basePosition.left : props.left,
          presets.gentle
        )
      },
      {
        focusCircle: spring(nearToBase ? 1 : 0)
      },
      {
        focusLine: spring(nearToBase ? 1 : 0)
      }
    ];
  };
  return (
    <StaggeredMotion defaultStyles={defaultStyles} styles={finalStyles}>
      {([{ opacity, top, left }, { focusCircle }, { focusLine }]) => (
        <Container
          top={props.top}
          left={props.left}
          onClick={props.onClick}
          style={{ opacity, top, left }}
        >
          <Box maxBounce={props.maxBounce} />
          <FocusCircle
            show={props.moveToBase}
            radius={40}
            percent={focusCircle}
          />
        </Container>
      )}
    </StaggeredMotion>
  );
};

export default ClickableBox;
