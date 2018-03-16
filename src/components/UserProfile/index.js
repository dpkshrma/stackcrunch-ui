import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { fetchProfile } from '../../actions/user';
import Contributions from '../Contributions';
import { STACKCRUNCH_TOKEN_ID } from '../../config';

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  max-width: 945px;
  min-height: 100vh;
  margin: 0 auto;
`;

const PUBLIC_TABS = {
  publishedPosts: 'Published Posts',
  basicInfo: 'Basic Info',
};
const TABS = {
  publishedPosts: 'Published Posts',
  drafts: 'Drafts',
  basicInfo: 'Basic Info',
  logout: 'Logout'
};

const Sidebar = ({ user, tabs, selectedTab, logout, onOptionClick }) => {
  const Container = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  `;
  return (
    <Container>
      <UserImage avatar={user.avatarURL} />
      <UserMeta>
        <UserFullName>{user.name}</UserFullName>
        <Username>@{user.username}</Username>
      </UserMeta>
      <Options>
        {
          Object.entries(tabs).map(([tab, tabDisplay]) => {
            return (
              <Option key={tab} selected={selectedTab===tab} onClick={tab==='logout' ? logout : onOptionClick(tab)}>
                {tabDisplay}
              </Option>
            );
          })
        }
      </Options>
    </Container>
  )
};

const UserImage = ({ avatar }) => {
  const Img = styled.img`
    border-radius: 50%;
    height: 160px;
    width: 160px;
  `;
  return (
    <Img src={avatar} />
  );
};

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
  ${getOptionSelectedStyles}
`;

const renderTab = ({ tab, username, isLoggedInUser }) => {
  switch (tab) {
    case 'drafts':
      return <Contributions drafts={true} opts={{ username }} editable={isLoggedInUser} />;
    case 'publishedPosts':
      return <Contributions drafts={false} opts={{ username }} editable={isLoggedInUser} />;
    case 'basicInfo':
    default:
      return null;
  }
};
const MainContent = props => {
  const Container = styled.div`
    flex: 5;
  `;
  return (
    <Container>
      {renderTab(props)}
    </Container>
  )
}

class UserProfile extends React.Component {
  state = {
    tab: 'publishedPosts',
  };
  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.fetchProfile(username);
  }
  componentWillReceiveProps(nextProps) {
    const { username: currentUsername } = this.props.match.params;
    const { username: nextUsername } = nextProps.match.params;
    if (currentUsername !== nextUsername) {
      this.props.fetchProfile(nextUsername);
    }
  }
  changeTab = tab => e => {
    e.preventDefault();
    this.setState({ tab });
  };
  logout = () => {
    // TODO: notify api about logout event
    localStorage.removeItem(STACKCRUNCH_TOKEN_ID);
    this.props.history.push('/');
  };
  render() {
    const { username } = this.props.match.params;
    const { users, loggedInUser } = this.props;
    const user = users[username] || {};
    const isLoggedInUser = (user.username === loggedInUser.username);
    const tabs = isLoggedInUser ? TABS : PUBLIC_TABS;
    return (
      <Container>
        <Wrapper>
          <MainContent
            tab={this.state.tab}
            username={username}
            isLoggedInUser={isLoggedInUser}
          />
          <Sidebar
            user={user}
            selectedTab={this.state.tab}
            onOptionClick={this.changeTab}
            logout={this.logout}
            tabs={tabs}
          />
        </Wrapper>
      </Container>
    );
  }
}

const mapStateToProps = ({ users={}, user }) => ({ users, loggedInUser: user });
const mapDispatchToProps = { fetchProfile };
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
