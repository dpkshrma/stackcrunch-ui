import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  display: flex;
  justify-content: center;
  background: #fff;
`;
export const Content = styled.div`
  height: 32px;
  width: 100%;
  max-width: 945px;
  display: flex;
  align-items: center;
`;
export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;
export const Thumb = styled.img`
  height: 28px;
`;
export const LogoText = styled.div`
  margin-left: 8px;
  color: #333;
`;
export const Text = styled.span`
  font-family: roboto;
  font-size: ${({ size }) => `${size || 20}px`};
  font-weight: ${({ weight }) => weight};
`;
export const RightNav = styled.div`
  margin-left: auto;
  display: flex;
`;
export const Button = styled(Link)`
  text-decoration: none;
  font-size: 14px;
  outline: none;
  background: #fff;
  border: 1px solid #0095ff;
  border-radius: 2px;
  padding: 8px 16px;
  color: #07c;
  cursor: pointer;
  margin-left: 8px;
  &:hover {
    background: #eaf5fd;
  }
  ${({ css }) => css};
`;
export const signUpCSS = css`
  background: #0095ff;
  color: #fff;
  &:hover {
    background: #0585e2;
  }
`;
export const Tip = styled.div`
  height: 8px;
  width: 8px;
  transform: rotate(135deg);
  position: absolute;
  margin-left: -11px;
  margin-top: 3px;
  background: #fff;
  border-right: 1px solid;
  border-bottom: 1px solid;
  border-color: #555;
`;
export const ContributeTip = styled.a`
  background: #fff;
  color: #555;
  border-radius: 2px;
  font-size: 12px;
  padding: 6px;
  text-decoration: none;
  display: flex;
  margin-left: 16px;
  border: 1px solid #555;
  & svg {
    margin-top: -2px;
    margin-left: 4px;
  }
  &:hover,
  &:hover ${Tip} {
    background: #555;
    color: #fff;
    .icon {
      fill: #fff;
    }
  }
`;
export const ProfileIconWrapper = styled(Link)`
  cursor: pointer;
  display: flex;
`;
export const ProfileIconImg = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 100%;
  border: 1px solid #ccc;
`;
