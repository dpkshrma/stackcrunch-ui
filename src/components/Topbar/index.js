import React from 'react';
import logo from '../icons/logo.png';
import GithubIcon from '../icons/Github';
import { GH_CONTRIBUTION_URL } from '../../config';
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
  Bullet
} from './styled';

class Topbar extends React.Component {
  render() {
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
            <Bullet className="bullet" />
            Contribute on <GithubIcon className="icon" height={16} />
          </ContributeTip>
          <RightNav>
            <Button to={'/join?tab=signin'}>SignIn</Button>
            <Button to={'/join?tab=signup'} css={signUpCSS}>
              SignUp
            </Button>
          </RightNav>
        </Content>
      </Wrapper>
    );
  }
}

export default Topbar;
