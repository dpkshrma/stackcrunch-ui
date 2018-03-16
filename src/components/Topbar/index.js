import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import RedirectComponent from '../common/Redirect';
import logo from '../icons/logo.png';
import PenIcon from '../icons/Pen';
import BellIcon from '../icons/Bell';
import { GH_CONTRIBUTION_URL, STACKCRUNCH_TOKEN_ID } from '../../config';
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
  Tip
} from './styled';
import ProfilePopper from './ProfilePopper';

const EditorLinkIcon = styled(PenIcon)`
  margin-right: 20px;
  margin-top: 9px;
`;
const NotificationIcon = styled(BellIcon)`
  margin-right: 20px;
  margin-top: 9px;
`;

class Topbar extends RedirectComponent {
  render() {
    const token = localStorage.getItem(STACKCRUNCH_TOKEN_ID);
    return (
      <Wrapper>
        <Content>
          <Logo to="/posts">
            <Thumb src={logo} />
            <LogoText>
              <Text weight={300}>stack</Text>
              <Text weight={500}>crunch</Text>
            </LogoText>
          </Logo>
          <ContributeTip href={GH_CONTRIBUTION_URL} target="_blank">
            <Tip />
            Contributions Welcome!
          </ContributeTip>
          <RightNav>
            {token
              ? [
                  <NotificationIcon key="notification" className="icon" height={18} />,
                  <Link to="/write" key="write">
                    <EditorLinkIcon className="icon" height={18} />
                  </Link>,
                  <ProfilePopper key="profile" />
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

export default Topbar;
