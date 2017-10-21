import React from 'react';
import {
  Wrapper,
  HeaderImg,
  Title,
  Section,
  SubTitle,
  Text,
  SocialLinks,
  SocialLink,
  Tags,
  tagCSS
} from './styled';
import { Chip } from '../../common';
import author from './data';
import TwitterIcon from './icons/TwitterIcon';
import GithubIcon from './icons/GithubIcon';
import MediumIcon from './icons/MediumIcon';

const socialIconsMap = {
  github: props => <GithubIcon {...props} />,
  twitter: props => <TwitterIcon {...props} />,
  medium: props => <MediumIcon {...props} />
};

class Author extends React.Component {
  render() {
    return (
      <Wrapper>
        <HeaderImg src={author.profileURL} alt={author.name} />
        <Title>{author.name}</Title>
        <SocialLinks>
          {author.socialLinks.map(({ type, url }) => {
            if (!socialIconsMap[type]) {
              return null;
            }
            return (
              <SocialLink key={type} href={url} target="_blank">
                {socialIconsMap[type]({
                  height: 24,
                  width: 24
                })}
              </SocialLink>
            );
          })}
        </SocialLinks>
        <Section>
          <SubTitle>About</SubTitle>
          <Text>{author.about}</Text>
        </Section>
        <Section>
          <SubTitle>Interests</SubTitle>
          <Tags>
            {author.tags.map(tag => (
              <Chip key={tag.id} text={tag.name} to={tag.link} css={tagCSS} />
            ))}
          </Tags>
        </Section>
      </Wrapper>
    );
  }
}

export default Author;
