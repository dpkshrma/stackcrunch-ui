import styled from 'styled-components';
import { Alert } from '../common';

export const Container = styled.div`
  width: 100%;
`;
export const TitleInput = styled.input`
  font-size: 40px;
  color: #555;
  margin-top: 20px;
  padding: 0;
  outline: none;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  font-family: roboto;
  font-weight: 300;
  &::placeholder {
    font-weight: 100;
    color: #777;
  }
  &:focus {
    border-bottom: 2px solid #ffa000;
  }
`;
export const DateString = styled.div`
  font-family: roboto;
  font-weight: 300;
  font-size: 12px;
  padding: 8px 0;
  letter-spacing: 2px;
`;
export const EditorContainer = styled.div`
  margin-top: 16px;
  font-family: roboto;
  min-height: 200px;
`;
export const Actions = styled.div`
  margin-top: 24px;
`;
export const DraftButton = styled.button`
  text-decoration: none;
  font-size: 14px;
  outline: none;
  background: #fff;
  border: 1px solid #0095ff;
  border-radius: 2px;
  padding: 8px 16px;
  color: #07c;
  cursor: pointer;
  margin-right: 16px;
  &:hover {
    background: #eaf5fd;
  }
`;
export const PublishButton = DraftButton.extend`
  background: #0095ff;
  color: #fff;
  &:hover {
    background: #0585e2;
  }
`;
export const PostSaveAlert = styled(Alert)`
  width: fit-content;
  background-color: rgba(246, 155, 85, 0.2);
  margin: 24px 0;
  &:hover {
    background-color: rgba(246, 155, 85, 0.3);
  }
`;
