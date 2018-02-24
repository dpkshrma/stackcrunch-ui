import React from 'react';
import styled from 'styled-components';
import facebookIcon from '../../icons/fb.png';
import linkedIcon from '../../icons/linkedin.png';
import twitterIcon from '../../icons/twitter.png';

const icons = [
  {
    id: 'facebook',
    icon: facebookIcon,
    text: 'share'
  },
  {
    id: 'twitter',
    icon: twitterIcon,
    text: 'tweet'
  },
  {
    id: 'linkedIn',
    icon: linkedIcon,
    text: 'share'
  }
];

const Image = ({ src }) => {
  const Img = styled.img`
    height: 20px;
    width: 20px;
    margin-right: 4px;
  `;
  return <Img src={src} />;
};

const ShareIcon = ({ icon, text }) => {
  const Container = styled.a`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-family: roboto;
    font-weight: 300;
    color: #ccc;
    letter-spacing: 1px;
    text-decoration: none;
    margin-right: 16px;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.05);
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `;
  return (
    <Container>
      <Image src={icon} /> {text}
    </Container>
  );
};

const ShareIcons = () => {
  const Container = styled.div`
    display: flex;
    margin-top: 32px;
  `;
  return (
    <Container>
      {icons.map(icon => <ShareIcon key={icon.id} {...icon} />)}
    </Container>
  );
};

export default ShareIcons;
