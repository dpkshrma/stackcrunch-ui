import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  stroke: #fff;
  fill: #ccc;
  &:hover {
    fill: rgba(0, 119, 204, 0.5);
  }
`;

const ClockIcon = ({ height }) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      stroke-width="20"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" stroke-width="0" />
      <polyline points="12 6 12 12 15 15" stroke-width="3" />
    </SVG>
  );
};

export default ClockIcon;
