import React from 'react';
import { fromNow } from '../../utils/time';
import { Chip } from '../common';
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
import { TWITTER_SHARE_URL, STACKCRUNCH_POST_URL } from '../../config';
import TwitterIcon from './icons/TwitterIcon';

const Author = ({ profile: { img, name, link } }) => {
  return <Chip img={img} text={name} to={link} css={authorCSS} />;
};
const CreatedOn = ({ timeStamp }) => {
  return <HeaderMetaText>{fromNow(timeStamp)}</HeaderMetaText>;
};
const TimeToRead = ({ ttr }) => {
  return <HeaderMetaText>{ttr} read </HeaderMetaText>;
};

const ListItem = ({
  id,
  title,
  slug,
  abstract,
  author = {},
  tags,
  createdOn,
  ttr,
  headerComponent,
  showHeader = true,
  showShareLinks = true
}) => {
  const tagList =
    tags &&
    tags.map((tag, i) => (
      <Chip key={i} text={tag.text} to={tag.link} css={tagCSS} />
    ));

  // TODO: ellipsify shareText if char length overshot
  const shareText = `${title} by @${author.twitterHandle}`;
  const shareLink = `${TWITTER_SHARE_URL}?text=${shareText}&url=${STACKCRUNCH_POST_URL}/${id}`;

  // TODO: Number of views, shares in Meta
  // TODO: Change meta icons to line icons
  // TODO: on MetaItem hover: 1. Show tooltip 2. change icon fill

  let header;
  if (headerComponent) {
    header = headerComponent;
  } else {
    header = (
      <Header>
        <Author profile={author} />
        <CreatedOn timeStamp={createdOn} />
        <Separator space={8} delimiter="|" />
        <TimeToRead ttr={ttr} />
      </Header>
    );
  }

  return (
    <Wrapper>
      {showHeader && header}
      <Title to={`/post/${slug}`}>{title}</Title>
      <Abstract>{abstract}</Abstract>
      <Footer>
        <Tags>{tagList}</Tags>
        <Meta>
          {showShareLinks && (
            <MetaItem>
              <ShareLink href={shareLink} target="_blank">
                <TwitterIcon height={14} />
                <MetaLabel>Share</MetaLabel>
              </ShareLink>
            </MetaItem>
          )}
        </Meta>
      </Footer>
    </Wrapper>
  );
};

ListItem.Separator = Separator;
ListItem.Header = {
  Container: Header,
  CreatedOn,
  TimeToRead,
  Author
};

export default ListItem;
