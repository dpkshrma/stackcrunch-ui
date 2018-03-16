import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import Contributions from '../Contributions';
import { STACKCRUNCH_TOKEN_ID } from '../../config';

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  max-width: 945px;
  min-height: 100vh;
  margin: 0 auto;
`;

const TABS = {
  drafts: 'Drafts',
  publishedPosts: 'Published Posts',
  basicInfo: 'Basic Info',
  logout: 'Logout'
};

const Sidebar = ({ user, selectedTab, logout, onOptionClick }) => {
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
          Object.entries(TABS).map(([tab, tabDisplay]) => {
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

const renderTab = tab => {
  switch (tab) {
    case 'drafts':
      return <Contributions drafts={true} />;
    case 'publishedPosts':
      return <Contributions drafts={false} />;
    case 'basicInfo':
    default:
      return null;
  }
};
const MainContent = ({ tab }) => {
  const Container = styled.div`
    flex: 5;
  `;
  return (
    <Container>
      {renderTab(tab)}
    </Container>
  )
}

class UserProfile extends React.Component {
  state = {
    tab: 'drafts',
  };
  changeTab = tab => e => {
    e.preventDefault();
    this.setState({ tab });
  };
  logout = () => {
    // TODO: notify api about logout event
    localStorage.removeItem(STACKCRUNCH_TOKEN_ID);
    this.props.history.push('/');
  }
  render() {
    const { user } = this.props;
    return (
      <Container>
        <Wrapper>
          <MainContent tab={this.state.tab} />
          <Sidebar user={user} selectedTab={this.state.tab} onOptionClick={this.changeTab} logout={this.logout} />
        </Wrapper>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(UserProfile);
