import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width: 320px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 32px;
  max-height: 300px;
  margin-top: 24px;
`;
export const Title = styled.span`
  font-size: 20px;
  margin: 12px 0 28px;
  color: #666;
  letter-spacing: 2px;
  text-transform: uppercase;
`;
export const Input = styled(DebounceInput)`
  font-size: 14px;
  outline: none;
  border: 1px solid #ccc;
  padding: 16px;
  width: calc(100% - 32px);
  border-radius: 4px;
  margin-bottom: 4px;
  &:active,
  &:focus {
    border-color: #3af;
  }
  ${({ css }) => css};
`;
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 48px;
`;
export const Button = styled.button`
  font-size: 24px;
  color: #444;
  background: none;
  border: 1px solid #ccc;
  margin: 0 8px;
  cursor: pointer;
  outline: none;
  height: 51px;
  width: 100%;
  border-radius: 4px;
  &:hover {
    background: rgba(0, 0, 0, 0.01);
  }
  ${({ css }) => css};
`;
export const Text = styled.div`
  font-size: 12px;
  color: #999;
  min-height: 16px;
`;
export const JoinLink = styled(Link)`
  text-decoration: none;
  font-size: 14px;
  color: #07c;
`;
export const seCSS = css`
  margin-left: 0;
  margin-right: 4px;
`;
export const ghCSS = css`
  margin-left: 4px;
  margin-right: 0;
`;
export const twCSS = css`
  margin-right: 0;
  margin-left: 8px;
`;
export const unameExistsInputCSS = css`
  &,
  &:active,
  &:focus {
    border-color: #f44336;
  }
`;
export const unameAvailableInputCSS = css`
  &,
  &:active,
  &:focus {
    border-color: #50a024;
  }
`;
