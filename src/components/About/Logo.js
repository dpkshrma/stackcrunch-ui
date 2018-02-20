import React from 'react';
import styled from 'styled-components';
import LogoImage from '../icons/logo.png';

const Text = () => {
  const LogoSpan = styled.span`
    color: #fff;
    font-size: 26px;
    font-family: roboto;
    letter-spacing: 1px;
  `;
  const Stack = () => {
    const Span = LogoSpan.extend`
      font-weight: 300;
    `;
    return <Span>stack</Span>;
  };
  const Crunch = () => {
    const Span = LogoSpan.extend`
      font-weight: 500;
    `;
    return <Span>crunch</Span>;
  };
  return (
    <div>
      <Stack />
      <Crunch />
    </div>
  );
};

const Icon = () => {
  const Img = styled.img`
    height: 42px;
    margin-right: 12px;
  `;

  return <Img src={LogoImage} />;
};

export default { Text, Icon };
