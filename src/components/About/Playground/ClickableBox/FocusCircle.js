import React from 'react';
import styled from 'styled-components';

const FocusCircle = ({ radius = 20, percent }) => {
  const Figure = styled.figure`
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    z-index: 110;
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

export default FocusCircle;
