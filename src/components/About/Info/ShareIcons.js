import React from 'react';
import styled from 'styled-components';
import facebookIcon from '../../icons/fb.png';
import linkedIcon from '../../icons/linkedin.png';
import twitterIcon from '../../icons/twitter.png';

const shareText =
  'Join stackcrunch today, a platform built to make it easy to learn & stay updated through huge knowledge-bases of open QnA communities';
const shareUrl = 'https://stackcrunch.io/';
const shareTweet =
  'Learn through huge knowledge-bases of open QnA communities on StackCrunch';

const icons = [
  {
    id: 'facebook',
    icon: facebookIcon,
    text: 'share',
    href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&t=${shareText}`
  },
  {
    id: 'twitter',
    icon: twitterIcon,
    text: 'tweet',
    href: `https://twitter.com/share?text=${shareTweet}&url=${shareUrl}`
  },
  {
    id: 'linkedIn',
    icon: linkedIcon,
    text: 'share',
    href: `http://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`
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

const ShareIcon = ({ icon, text, href }) => {
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
    <Container href={href} target="_blank">
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
