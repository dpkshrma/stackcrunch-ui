import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';
import { Alert, Button, StyledLink, MultiLineInput } from '../common';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const PostInputWrapper = styled.div`
  width: 100%;
  max-width: 740px;
`;
export const TitleInput = styled(ContentEditable)`
  font-size: 40px;
  color: #555;
  margin-top: 20px;
  padding: 0;
  cursor: text;
  outline: none;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  font-family: roboto;
  font-weight: 300;
  &:empty::before {
    content: attr(data-placeholder);
    font-weight: 100;
    color: #9197a3;
  }
  &:empty:focus::before {
    color: #bdc1c9;
  }
  &:focus {
    border-bottom: 2px solid #ffa000;
  }
`;
export const TitleInputPlaceholder = styled.div`
  color: #999;
`;
export const DateString = styled.div`
  font-family: roboto;
  font-weight: 300;
  font-size: 12px;
  padding: 8px 0;
  letter-spacing: 2px;
`;
export const AbstractBtn = styled.div`
  font-family: roboto;
  font-weight: 300;
  font-size: 12px;
  padding: 8px 0;
  letter-spacing: 2px;
  margin-left: auto;
  cursor: pointer;
  display: flex;
`;
export const AbstractInput = styled(MultiLineInput)`
  letter-spacing: 0.1em;
  line-height: 1.6;
`;
export const EditorContainer = styled.div`
  margin-top: 16px;
  font-family: roboto;
  min-height: 200px;
`;
export const Actions = styled.div`
  margin-top: 24px;
`;
export const DraftButton = Button.extend`
  &:disabled {
    filter: grayscale();
    cursor: wait;
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
export const PostLink = styled(StyledLink)`
  font-size: 12px;
  line-height: 18px;
`;
export const PostSaveInfo = styled(Alert)`
  width: fit-content;
  margin: 24px 0;
`;
