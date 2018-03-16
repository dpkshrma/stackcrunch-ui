import styled from 'styled-components';
import { Button } from '../common';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 32px;
  height: auto;
  width: 70%;
`;
export const Title = styled.span`
  font-size: ${({ size }) => size || 20}px;
  margin: 16px 0;
  color: #666;
  letter-spacing: 2px;
  text-transform: uppercase;
`;
export const Input = styled.input`
  font-size: 14px;
  outline: none;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 4px;
  &:active,
  &:focus {
    border-color: #3af;
  }
  ${({ css }) => css};
`;
export const TextArea = styled.textarea`
  font-size: 14px;
  outline: none;
  border: 1px solid #ccc;
  padding: 16px;
  ${'' /* width: 100%; */} border-radius: 4px;
  margin-bottom: 4px;
  &:active,
  &:focus {
    border-color: #3af;
  }
  ${({ css }) => css};
`;
export const Text = styled.div`
  font-size: 12px;
  color: #999;
  min-height: 16px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const FormGroup = styled.div`
  display: flex;
  margin: 24px 0;
  width: 100%;
`;
export const FormInput = Input.extend`
  height: 10px;
  margin-bottom: 16px;
  &::placeholder {
    color: #999;
  }
  &:disabled {
    background: #f4f4f4;
  }
`;
export const FormTextArea = TextArea.extend`
  margin-bottom: 16px;
  &::placeholder {
    color: #999;
  }
`;
export const Section = styled.div`
  display: flex;
  width: 100%;
`;
export const SectionTitle = Title.extend`
  color: #999;
`;
export const About = Section.extend`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
export const ThumbWrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 12px;
`;
export const ProfileImageContent = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ProfileThumb = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 100%;
`;
export const FileInput = styled.div`
  position: relative;
  overflow: hidden;
  > ${FormInput}[type=file] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
    &:disabled {
      cursor: wait;
    }
  }
  &:hover {
    background: rgba(0, 0, 0, 0.01);
  }
`;
export const ProfileFormGroup = FormGroup.extend`
  padding-left: 20px;
  width: 100%;
`;
export const UsernameInputGroup = FormGroup.extend`
  position: relative;
  > svg {
    position: absolute;
    top: 12px;
    left: 12px;
  }
  > ${FormInput} {
    padding-left: 36px;
  }
`;

export const Links = Section.extend`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const LinkInputGroup = FormGroup.extend`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  > ${FormInput} {
    margin-bottom: 0;
    width: 100%;
    min-width: auto;
    color: #0064ab;
  }
`;
export const LinkText = Text.extend`
  font-size: 16px;
  margin-right: 4px;
  margin-left: 8px;
`;
export const Connect = Section.extend``;
const ConnectCard = styled.a`
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  &:hover {
    background: rgba(0, 0, 0, 0.01);
  }
`;
ConnectCard.Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 12px;
`;
ConnectCard.Thumb = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
ConnectCard.Name = Text.extend`
  font-size: 16px;
  color: #666;
`;
ConnectCard.BragText = Text.extend`
  margin-top: 8px;
`;
Connect.Card = ConnectCard;

export const SubmitButton = Button.extend`
  min-width: 160px;
  margin-left: auto;
`;
