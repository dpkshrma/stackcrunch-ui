import React from 'react';
import styled from 'styled-components';
import octocat from './octocat.jpg';

const Img = styled.img`
  margin-top: 4px;
`;

const GithubIcon = props => {
  return <Img src={octocat} {...props} />;
};

export default GithubIcon;
