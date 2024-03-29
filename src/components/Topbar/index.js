import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import RedirectComponent from '../common/Redirect';
import logo from '../icons/logo.png';
import PenIcon from '../icons/Pen';
import UserIcon from '../icons/User';
import { STACKCRUNCH_TOKEN_ID } from '../../config';
import {
  Wrapper,
  Content,
  Logo,
  Thumb,
  LogoText,
  Text,
  RightNav,
  Button,
  signUpCSS,
  ContributeTip,
  Tip,
  ProfileIconWrapper,
  ProfileIconImg
} from './styled';
import Notifications from './Notifications';
import { DefaultTooltip } from '../common';

/** SnackBar Notifications
<- wrapper ->
transform: rotateX(90deg);
transform-style: preserve-3d;
transform-origin: top;

<- before ->
content: '';
background-color: coral;
height: 60px;
width: 100%;
position: absolute;
bottom: -31px;
transform: rotateX(90deg) translateY(-30px);
*/

const CONTRIBUTION_POST_LINK =
  '/post/How-to-share-your-awesome-development-stories-r1lZ_1hJcz';

const EditorLinkIcon = styled(PenIcon)`
  margin-right: 20px;
  margin-top: 9px;
`;

class Topbar extends RedirectComponent {
  render() {
    const token = localStorage.getItem(STACKCRUNCH_TOKEN_ID);
    return (
      <Wrapper>
        <DefaultTooltip />
        <Content>
          <Logo to="/posts">
            <Thumb src={logo} />
            <LogoText>
              <Text weight={300}>stack</Text>
              <Text weight={500}>crunch</Text>
            </LogoText>
          </Logo>
          <ContributeTip to={CONTRIBUTION_POST_LINK}>
            <Tip />
            Contributions Welcome!
          </ContributeTip>
          <RightNav>
            {token
              ? [
                  <Notifications key="notification" />,
                  <Link to="/write" key="write" data-tip="Write a Story">
                    <EditorLinkIcon className="icon" height={18} />
                  </Link>,
                  <ProfileIconWrapper
                    key="profile"
                    to={`/@${this.props.username}`}
                    data-tip="Your Profile"
                  >
                    {this.props.avatar ? (
                      <ProfileIconImg src={this.props.avatar} />
                    ) : (
                      <UserIcon height="34" fill="#777" />
                    )}
                  </ProfileIconWrapper>
                ]
              : [
                  <Button to={'/join?tab=signin'} key="signin">
                    SignIn
                  </Button>,
                  <Button to={'/join?tab=signup'} css={signUpCSS} key="signup">
                    SignUp
                  </Button>
                ]}
          </RightNav>
        </Content>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ user: { avatarURL, username } }) => {
  return { avatar: avatarURL, username };
};
export default connect(mapStateToProps)(Topbar);
