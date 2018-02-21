import React from 'react';
import styled, { css } from 'styled-components';
import { StaggeredMotion, spring, presets } from 'react-motion';
import Cube from './Cube';

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
  box-shadow: 0 0 32px 0 #fff;
`;
const FocusCircle = ({ radius = 20, percent }) => {
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
    stroke-width: 2;
    stroke-dasharray: ${circumference}px;
    stroke-dashoffset: ${(1 - percent) * circumference};
  `;
  const circleTransform = `rotate(-90, ${radius + 1}, ${radius + 1})`;
  return (
    <Figure>
      <Svg width={radius * 2 + 2} height={radius * 2 + 2}>
        <Circle
          cx={radius + 1}
          cy={radius + 1}
          r={radius}
          transform={circleTransform}
        />
      </Svg>
    </Figure>
  );
};
const FocusLine = ({ percent, css = '', length = 200, reverse = false }) => {
  const Figure = styled.figure`
    position: absolute;
    top: 0;
    margin: 0;
    ${css};
  `;
  const Svg = styled.svg``;
  const dashOffset = (1 - percent) * length;
  const Line = styled.line`
    fill: transparent;
    stroke: #fff;
    stroke-width: 1;
    stroke-dasharray: ${length}px;
    stroke-dashoffset: ${reverse ? -1 * dashOffset : dashOffset};
  `;
  return (
    <Figure>
      <Svg width={length} height={41}>
        <Line x1={0} y1={40} x2={length} y2={40} />
      </Svg>
    </Figure>
  );
};

const Description = ({ percent }) => {
  const Container = styled.div`
    height: ${percent * 400}px;
    width: 480px;
    position: absolute;
    left: -199px;
    top: 41px;
    background: rgba(255, 255, 255, 0.05);
  `;
  return <Container />;
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
    },
    {
      description: 0
    }
  ];
  const finalStyles = prevStyles => {
    const nearToBase = prevStyles[0].top / props.basePosition.top > 0.99;
    const circleAlmostComplete = prevStyles[1].focusCircle > 0.99;
    const lineAlmostComplete = prevStyles[2].focusLine > 0.99;
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
        focusLine: spring(circleAlmostComplete ? 1 : 0)
      },
      {
        description: spring(lineAlmostComplete ? 1 : 0)
      }
    ];
  };
  return (
    <StaggeredMotion defaultStyles={defaultStyles} styles={finalStyles}>
      {(
        [
          { opacity, top, left },
          { focusCircle },
          { focusLine },
          { description }
        ]
      ) => (
        <Container
          top={props.top}
          left={props.left}
          style={{ opacity, top, left }}
        >
          <Cube
            id={props.id}
            onClick={props.onClick}
            color={props.icon.color}
          />
          {!props.moveToBase ? null : (
            <div>
              <FocusCircle
                show={props.moveToBase}
                radius={40}
                percent={focusCircle}
              />
              <FocusLine
                css={css`
                  left: -199px;
                `}
                percent={focusLine}
                reverse
              />
              <FocusLine
                css={css`
                  left: 81px;
                `}
                percent={focusLine}
              />
              <Description percent={description} />
            </div>
          )}
        </Container>
      )}
    </StaggeredMotion>
  );
};

export default ClickableBox;
