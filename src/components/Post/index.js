import React from 'react';
import { Chip } from '../common';
import {
  Wrapper,
  Header,
  HeaderMeta,
  HeaderMetaText,
  Separator,
  Title,
  PostDate,
  authorCSS
} from './styled';
import postMeta from './data';

const Post = props => {
  const { author } = postMeta;
  return (
    <Wrapper>
      <Header>
        <HeaderMeta>
          <Chip
            img={author.img}
            text={author.name}
            href={author.link}
            css={authorCSS}
          />
          <HeaderMetaText>
            {postMeta.postedOn} <Separator space={8} delimiter="|" />{' '}
            {postMeta.ttr}
          </HeaderMetaText>
        </HeaderMeta>
        <Title>{postMeta.title}</Title>
      </Header>
    </Wrapper>
  );
};

export default Post;
