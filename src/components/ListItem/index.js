import React from 'react';
import ReactTooltip from 'react-tooltip';
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
  LikeMetaItem,
  MetaLabel,
  ShareLink,
  Footer,
  tagCSS,
  authorCSS
} from './styled';
import { DefaultTooltip } from '../common';
import {
  TWITTER_SHARE_URL,
  STACKCRUNCH_POST_URL,
  URL_PREFIX
} from '../../config';
import TwitterIcon from './icons/TwitterIcon';
import ClockIcon from '../icons/Clock';
import CalendarIcon from '../icons/Calendar';
import EyeIcon from '../icons/Eye';
import HeartIcon from '../icons/Heart';

const Author = ({ profile: { avatarURL, name, username } }) => {
  const link = `${URL_PREFIX}/@${username}`;
  const text = name ? name : username;
  return (
    <Chip img={avatarURL} text={text} to={link} css={authorCSS} useDefaultImg />
  );
};
const CreatedOn = ({ timeStamp }) => {
  return (
    <HeaderMetaText>
      <CalendarIcon height={12} />
      &nbsp;
      {fromNow(timeStamp)}
    </HeaderMetaText>
  );
};
const TimeToRead = ({ ttr }) => {
  return (
    <div style={{ marginBottom: '-1px' }}>
      <HeaderMetaText>
        <ClockIcon height={12} /> &nbsp;
        {ttr} read
      </HeaderMetaText>
    </div>
  );
};

const ListItem = ({
  coverImageUrl,
  title,
  slug,
  abstract,
  authors,
  tags,
  createdOn,
  ttr,
  views = {},
  likes = 0,
  headerComponent,
  showHeader = true,
  showShareLinks = true,
  showAuthorChip = true,
  likePost,
  liked = true
}) => {
  const tagList =
    tags &&
    tags.map((tag, i) => (
      <Chip key={i} text={tag.name} href={tag.link} css={tagCSS} />
    ));

  const [author = {}] = authors;
  // TODO: ellipsify shareText if char length overshot
  let shareText = `${title}`;
  if (author.twitterHandle) {
    shareText += ` by @${author.twitterHandle}`;
  }
  const shareLink = `${TWITTER_SHARE_URL}?text=${shareText}&url=${STACKCRUNCH_POST_URL}/${slug}`;

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
        <TimeToRead ttr={ttrText} />
      </Header>
    );
  }

  return (
    <Wrapper>
      <DefaultTooltip />
      {coverImageUrl && <CoverImage src={coverImageUrl} />}
      <Content>
        {showHeader && header}
        <Title to={`/post/${slug}`}>{title}</Title>
        <Abstract>{abstract}&hellip;</Abstract>
        <Footer>
          <Tags>{tagList}</Tags>
          <Meta>
            {views.total && (
              <MetaItem data-tip="Views">
                <EyeIcon className="icon views" height={20} />
                <MetaLabel>{views.total}</MetaLabel>
              </MetaItem>
            )}
            <LikeMetaItem
              className="meta-item--like"
              data-tip="Like"
              onClick={likePost}
              liked={liked}
            >
              <HeartIcon className="icon" height={16} />
              {likes > 0 && <MetaLabel>{likes}</MetaLabel>}
            </LikeMetaItem>
            {showShareLinks && (
              <MetaItem>
                <ShareLink href={shareLink} target="_blank" data-tip="Tweet">
                  <TwitterIcon className="icon twitter" height={14} />
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
