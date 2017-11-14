import React from 'react';
import RedirectComponent from '../common/Redirect';
import logo from '../icons/logo.png';
import GithubIcon from '../icons/Github';
import { GH_CONTRIBUTION_URL, STACKCRUNCH_TOKEN_ID } from '../../config';
import {
  Wrapper,
  Content,
  Logo,
  LogoThumb,
  LogoText,
  Text,
  RightNav,
  Button,
  signUpCSS,
  ContributeTip,
  Tip
} from './styled';
import ProfilePopper from './ProfilePopper';

class Topbar extends RedirectComponent {
  render() {
    const token = localStorage.getItem(STACKCRUNCH_TOKEN_ID);
    return (
      <Wrapper>
        <Content>
          <Logo to="/">
            <LogoThumb src={logo} />
            <LogoText>
              <Text weight={300}>stack</Text>
              <Text weight={500}>crunch</Text>
            </LogoText>
          </Logo>
          <ContributeTip href={GH_CONTRIBUTION_URL} target="_blank">
            <Tip />
            Contribute on <GithubIcon className="icon" height={16} />
          </ContributeTip>
          <RightNav>
            {token ? (
              <ProfilePopper />
            ) : (
              [
                <Button to={'/join?tab=signin'} key="signin">
                  SignIn
                </Button>,
                <Button to={'/join?tab=signup'} css={signUpCSS} key="signup">
                  SignUp
                </Button>
              ]
            )}
          </RightNav>
        </Content>
      </Wrapper>
    );
  }
}

export default Topbar;
