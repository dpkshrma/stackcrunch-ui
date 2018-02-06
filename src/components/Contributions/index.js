import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchDrafts, fetchUserPublishedPosts } from '../../actions/post';
import ListItem from '../ListItem';
import PenIcon from '../icons/Pen';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`;
const Heading = styled.h2`
  font-size: 24px;
  font-family: roboto;
  font-weight: 300;
  color: #f78d3d;
  padding-bottom: 12px;
  border-bottom: 1px solid #efefef;
`;
const EditButton = ({ onClick, to }) => {
  const Container = styled(Link)`
    cursor: pointer;
    display: flex;
    font-size: 16px;
    color: #999;
    margin-left: auto;
    text-decoration: none;
    &:hover {
      ${EditIcon} svg {
        fill: #777;
      }
      ${Text} {
        color: #777;
      }
    }
  `;
  const Text = styled.span`
    margin-left: 4px;
  `;
  const EditIcon = styled(PenIcon)`
    fill: #999;
  `;
  return (
    <Container onClick={onClick} to={to}>
      <EditIcon height={16} />
      <Text>Edit</Text>
    </Container>
  );
};

class Contributions extends React.Component {
  componentWillMount() {
    this.props.fetchDrafts();
    this.props.fetchUserPublishedPosts();
  }
  renderPost = post => (
    <ListItem
      {...post}
      headerComponent={
        <ListItem.Header.Container>
          <ListItem.Header.CreatedOn timeStamp={post.createdOn} />
          <ListItem.Separator delimiter="|" space={8} />
          <ListItem.Header.TimeToRead ttr={post.ttr} />
          <EditButton to={`write/${post.slug}`} />
        </ListItem.Header.Container>
      }
      key={post.slug}
      showShareLinks={false}
    />
  );
  renderPublishedPosts = () => {
    const { published = [] } = this.props.contributions || {};
    return published.map(this.renderPost);
  };
  renderDrafts = () => {
    const { drafts = [] } = this.props.contributions || {};
    return drafts.map(this.renderPost);
  };
  render() {
    return (
      <Container>
        <List>
          <Heading>Drafts</Heading>
          {this.renderDrafts()}
          <Heading>Published Posts</Heading>
          {this.renderPublishedPosts()}
        </List>
      </Container>
    );
  }
}

const mapStateToProps = ({ user, contributions }) => ({ user, contributions });
const mapDispatchToProps = { fetchDrafts, fetchUserPublishedPosts };

export default connect(mapStateToProps, mapDispatchToProps)(Contributions);
