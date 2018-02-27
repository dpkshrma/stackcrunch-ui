import React from 'react';
import styled from 'styled-components';

const FocusLine = ({ percent, css = '', length = 200, reverse = false }) => {
  const Figure = styled.figure`
    position: absolute;
    top: 0;
    margin: 0;
    z-index: 110;
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

export default FocusLine;
