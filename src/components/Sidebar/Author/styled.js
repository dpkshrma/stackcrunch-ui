import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid #c1e4ae;
  background: #e8fbde;
  color: #333;
  padding: 16px;
  padding-bottom: 24px;
  margin-top: 56px;
`;
export const HeaderImg = styled.img`
  margin-top: -64px;
  border-radius: 50%;
  height: 72px;
  padding: 8px;
  background: #fff;
  border-left: 1px solid #c1e4ae;
  border-right: 1px solid #c1e4ae;
`;
export const Title = styled.span`
  font-weight: 300;
  font-size: 24px;
  margin: 12px 0 8px;
  color: #50a024;
  border-bottom: 1px solid #c1e4ae;
`;
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
`;
export const SubTitle = styled.div`
  text-transform: uppercase;
  color: #777;
  padding: 8px 0;
  margin-bottom: 8px;
  border-bottom: 1px solid #c1e4ae;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.2em;
`;
export const Text = styled.span`
  font-size: 14px;
`;
export const SocialLinks = styled.div`
  display: flex;
`;
export const SocialLink = styled.a`
  max-height: 48px;
  margin-right: 8px;
  filter: grayscale(1);
  &:hover {
    filter: grayscale(0);
  }
`;
export const Tags = styled.div`
  display: flex;
  margin-top: 4px;
`;

export const tagCSS = {
  text: css`
    font-size: 12px;
  `,
  content: css`
    border-color: #c1e4ae;
    margin-right: 8px;
    height: 20px;
    &:hover {
      background: #c1e4ae;
      color: #444;
    }
  `
};
