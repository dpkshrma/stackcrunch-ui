import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  ${({ css }) => css};
`;

export const Thumb = styled.img`
  border-radius: 50%;
  height: 24px;
  ${({ css }) => css};
`;

export const Text = styled.span`
  padding: 0 8px;
  font-size: 14px;
  ${({ css }) => css};
`;

export const contentCSS = css`
  display: flex;
  align-items: center;
  color: #222;
  height: 24px;
  border-radius: 12px;
  border: 1px solid #777;
`;

export const OutLink = styled.a`
  ${contentCSS} text-decoration: none;
  ${({ css }) => css};
`;

export const InLink = styled(Link)`
  ${contentCSS} text-decoration: none;
  ${({ css }) => css};
`;
