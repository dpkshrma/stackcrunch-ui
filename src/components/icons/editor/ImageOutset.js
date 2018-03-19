import React from 'react';
import styled from 'styled-components';
import highlighted from './highlighted';

const SVG = styled.svg`
  margin: 0 4px;
  cursor: pointer;
  fill: #777;
`;

const ImageOutsetIcon = props => {
  return (
    <SVG
      height={24}
      {...props}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 25 25"
    >
      <path
        d="M3 17.004V9.01a.4.4 0 0 1 .145-.31.476.476 0 0 1 .328-.13h17.74c.12 0 .23.043.327.13a.4.4 0 0 1 .145.31v7.994a.404.404 0 0 1-.145.313.48.48 0 0 1-.328.13H3.472a.483.483 0 0 1-.327-.13.402.402 0 0 1-.145-.313zm2.212 3.554v-.87c0-.13.05-.243.145-.334a.472.472 0 0 1 .328-.137H19c.124 0 .23.045.322.137a.457.457 0 0 1 .138.335v.86c0 .12-.046.22-.138.31a.478.478 0 0 1-.32.13H5.684a.514.514 0 0 1-.328-.13.415.415 0 0 1-.145-.32zm0-14.246v-.84c0-.132.05-.243.145-.334A.477.477 0 0 1 5.685 5H19a.44.44 0 0 1 .322.138.455.455 0 0 1 .138.335v.84a.451.451 0 0 1-.138.334.446.446 0 0 1-.32.138H5.684a.466.466 0 0 1-.328-.138.447.447 0 0 1-.145-.335z"
        fill-rule="evenodd"
      />
    </SVG>
  );
};

export default highlighted(ImageOutsetIcon);
