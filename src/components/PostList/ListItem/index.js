import React from 'react';
import { Chip } from '../../common';
import {
  Wrapper,
  Header,
  HeaderMetaText,
  Separator,
  Title,
  Abstract,
  Tags,
  Meta,
  MetaItem,
  MetaLabel,
  ShareLink,
  Footer,
  tagCSS,
  authorCSS
} from './styled';
import { TWITTER_SHARE_URL, STACKCRUNCH_POST_URL } from '../../../config';
import TwitterIcon from './icons/TwitterIcon';

const ListItem = ({ id, title, abstract, author, tags, postedOn, ttr }) => {
  const tagList = tags.map(tag => (
    <Chip key={tag.id} text={tag.text} to={tag.link} css={tagCSS} />
  ));

  // TODO: ellipsify shareText if char length overshot
  const shareText = `${title} by @${author.twitterHandle}`;
  const shareLink = `${TWITTER_SHARE_URL}?text=${shareText}&url=${STACKCRUNCH_POST_URL}/${id}`;

  // TODO: Number of views, shares in Meta
  // TODO: Change meta icons to line icons
  // TODO: on MetaItem hover: 1. Show tooltip 2. change icon fill

  return (
    <Wrapper>
      <Header>
        <Chip
          img={author.img}
          text={author.name}
          href={author.link}
          css={authorCSS}
        />
        <HeaderMetaText>
          {postedOn} <Separator space={8} delimiter="|" /> {ttr} read{' '}
        </HeaderMetaText>
      </Header>
      <Title to={`/post/${id}`}>{title}</Title>
      <Abstract>{abstract}</Abstract>
      <Footer>
        <Tags>{tagList}</Tags>
        <Meta>
          <MetaItem>
            <ShareLink href={shareLink} target="_blank">
              <TwitterIcon height={14} />
              <MetaLabel>Share</MetaLabel>
            </ShareLink>
          </MetaItem>
        </Meta>
      </Footer>
    </Wrapper>
  );
};

export default ListItem;
