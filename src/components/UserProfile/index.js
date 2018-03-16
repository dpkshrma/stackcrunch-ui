import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Contributions from '../Contributions';
import { STACKCRUNCH_TOKEN_ID } from '../../config';
import BasicInfo from './BasicInfo';
import Sidebar from './Sidebar';

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  max-width: 945px;
  min-height: 100vh;
  margin: 0 auto;
`;

const renderTab = ({ tab, isLoggedInUser, match }) => {
  const { username } = match.params;
  switch (tab) {
    case 'drafts':
      return <Contributions drafts={true} opts={{ username }} />;
    case 'publishedPosts':
      return <Contributions drafts={false} opts={{ username }} />;
    case 'basicInfo':
      return <BasicInfo match={match} />;
    default:
      return null;
  }
};
const MainContent = props => {
  const Container = styled.div`
    flex: 5;
  `;
  return <Container>{renderTab(props)}</Container>;
};

class UserProfile extends React.Component {
  state = {
    tab: 'publishedPosts'
  };
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
    return (
      <Container>
        <Wrapper>
          <MainContent tab={this.state.tab} match={this.props.match} />
          <Sidebar
            selectedTab={this.state.tab}
            onOptionClick={this.changeTab}
            logout={this.logout}
            match={this.props.match}
          />
        </Wrapper>
      </Container>
    );
  }
}

export default UserProfile;
