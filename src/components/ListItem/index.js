import React from 'react';
import { fromNow } from '../../utils/time';
import { Chip } from '../common';
import {
  Wrapper,
  Content,
  CoverImage,
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
import {
  TWITTER_SHARE_URL,
  STACKCRUNCH_POST_URL,
  URL_PREFIX
} from '../../config';
import TwitterIcon from './icons/TwitterIcon';
import ClockIcon from '../icons/Clock';

const Author = ({ profile: { avatarURL, name, username } }) => {
  const link = `${URL_PREFIX}/@${username}`;
  const text = name ? name : username;
  return (
    <Chip img={avatarURL} text={text} to={link} css={authorCSS} useDefaultImg />
  );
};
const CreatedOn = ({ timeStamp }) => {
  return <HeaderMetaText>{fromNow(timeStamp)}</HeaderMetaText>;
};
const TimeToRead = ({ ttr }) => {
  return <HeaderMetaText>{ttr} read </HeaderMetaText>;
};

const ListItem = ({
  id,
  coverImageUrl,
  title,
  slug,
  abstract,
  authors,
  tags,
  createdOn,
  ttr,
  headerComponent,
  showHeader = true,
  showShareLinks = true,
  showAuthorChip = true
}) => {
  const tagList =
    tags &&
    tags.map((tag, i) => (
      <Chip key={i} text={tag.name} href={tag.link} css={tagCSS} />
    ));

  const [author = {}] = authors;
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
    // FIXME: display owner instead of authors
    // currently assuming only one author(owner)
    const { text: ttrText } = ttr;
    header = (
      <Header>
        {showAuthorChip && <Author profile={author} />}
        <CreatedOn timeStamp={createdOn} />
        <Separator space={8} delimiter="|" />
        <ClockIcon height={12} /> &nbsp;
        <TimeToRead ttr={ttrText} />
      </Header>
    );
  }

  return (
    <Wrapper>
      {coverImageUrl && <CoverImage src={coverImageUrl} />}
      <Content>
        {showHeader && header}
        <Title to={`/post/${slug}`}>{title}</Title>
        <Abstract>{abstract}&hellip;</Abstract>
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
      </Content>
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
