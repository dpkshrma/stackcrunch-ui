import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { fetchProfile } from '../../actions/user';
import UserIcon from '../icons/User';

const PUBLIC_TABS = {
  publishedPosts: 'Published Posts',
  basicInfo: 'About Me'
};
const TABS = {
  publishedPosts: 'Published Posts',
  drafts: 'Saved Drafts',
  basicInfo: 'About Me',
  logout: 'Logout'
};

const UserImage = ({ avatar }) => {
  const Img = styled.img`
    border-radius: 50%;
    height: 160px;
    width: 160px;
  `;
  return <Img src={avatar} />;
};
const DefaultUserImage = styled(UserIcon)`
  border-radius: 50%;
  height: 160px;
  width: 160px;
`;

const UserMeta = styled.div`
  padding: 24px;
  text-align: center;
  font-size: 16px;
  font-family: roboto;
  font-weight: 300;
  color: #666;
`;

const UserFullName = styled.div`
  font-size: 20px;
`;
const Username = styled.div`
  font-size: 14px;
  color: #f78d3d;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const getOptionSelectedStyles = ({ selected }) => {
  if (!selected) return '';
  return css`
    background: #f9f9f9;
    color: #111;
    border-left: 2px solid #f78d3d;
    padding-left: 12px;
  `;
};
const Option = styled.div`
  font-family: roboto;
  font-size: 20px;
  font-weight: 300;
  color: #444;
  padding: 12px;
  cursor: pointer;
  padding-left: 14px;
  &:hover {
    background: #f9f9f9;
    color: #111;
    padding-left: 12px;
    border-left: 2px solid #f78d3d;
  }
  ${getOptionSelectedStyles};
`;

class Sidebar extends React.Component {
  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.fetchProfile(username);
  }

  componentWillReceiveProps(nextProps) {
    // fetch profile on route change!!! :)
    const { username: currentUsername } = this.props.match.params;
    const { username: nextUsername } = nextProps.match.params;
    if (currentUsername !== nextUsername) {
      this.props.fetchProfile(nextUsername);
    }
  }

  render() {
    const { username } = this.props.match.params;
    const {
      users,
      loggedInUser,
      logout,
      onOptionClick,
      selectedTab
    } = this.props;
    const user = users[username] || {};
    const isLoggedInUser = user.username === loggedInUser.username;
    const tabs = isLoggedInUser ? TABS : PUBLIC_TABS;
    const Container = styled.div`
      flex: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
    `;
    return (
      <Container>
        {user.avatarURL ? (
          <UserImage avatar={user.avatarURL} />
        ) : (
          <DefaultUserImage fill="#777" />
        )}
        <UserMeta>
          <UserFullName>{user.name}</UserFullName>
          <Username>@{user.username}</Username>
        </UserMeta>
        <Options>
          {Object.entries(tabs).map(([tab, tabDisplay]) => {
            return (
              <Option
                key={tab}
                selected={selectedTab === tab}
                onClick={tab === 'logout' ? logout : onOptionClick(tab)}
              >
                {tabDisplay}
              </Option>
            );
          })}
        </Options>
      </Container>
    );
  }
}

const mapStateToProps = ({ user, users }) => ({ loggedInUser: user, users });
const mapDispatchToProps = { fetchProfile };
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
);
