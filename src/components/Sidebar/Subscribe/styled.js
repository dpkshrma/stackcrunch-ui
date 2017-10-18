import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid #bee7ff;
  background: #f0f8ff;
  color: #333;
  padding: 16px;
  padding-bottom: 24px;
  margin-top: 56px;
`;
export const HeaderImg = styled.img`
  margin-top: -64px;
`;
export const Title = styled.span`
  font-weight: 300;
  font-size: 24px;
  margin: 12px 0 16px;
  color: #07c;
  border-bottom: 1px solid #bee7ff;
`;
export const Text = styled.span`
  font-size: 14px;
`;
export const FormGroup = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export const Input = styled.input`
  padding: 16px;
  font-size: 14px;
  margin-top: 24px;
  outline: none;
  border: 1px solid #bee7ff;
  width: 100%;
  &:active,
  &:focus {
    border-color: #3af;
  }
`;
export const Button = styled.button`
  font-size: 24px;
  color: #fff;
  background: #3af;
  border: 1px solid #3af;
  border-left: none;
  cursor: pointer;
  outline: none;
  height: 51px;
  margin-top: 24px;
  padding: 0 12px;
`;
export const SuccessMsg = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 12px;
`;
export const EditEmail = styled.span`
  cursor: pointer;
  border-bottom: 1px dashed #3af;
  color: #07c;
  font-size: 12px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
