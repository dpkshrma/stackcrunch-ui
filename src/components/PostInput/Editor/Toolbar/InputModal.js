import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  background: #fff;
  padding: 32px;
  max-height: 104px;
  max-width: calc(945px - 64px);
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
const TextInput = styled.input`
  font-size: 20px;
  color: #555;
  margin-top: 20px;
  margin-bottom: 20px;
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
export const Button = styled.button`
  text-decoration: none;
  font-size: 14px;
  outline: none;
  background: #fff;
  border: 1px solid #0095ff;
  border-radius: 2px;
  padding: 8px 16px;
  color: #07c;
  cursor: pointer;
  &:hover {
    background: #eaf5fd;
  }
`;

const ImageInputModal = () => (
  <TextInput id="image-url-input" placeholder="Paste image URL here" />
);

const VideoInputModal = () => (
  <TextInput
    id="video-url-input"
    placeholder="Only Youtube/Vimeo video urls supported currently"
  />
);

const LinkInputModal = () => (
  <TextInput id="link-url-input" placeholder="Paste link url here" />
);

const renderControlModal = control => {
  switch (control) {
    case 'image':
      return <ImageInputModal />;
    case 'video':
      return <VideoInputModal />;
    case 'link':
      return <LinkInputModal />;
    default:
      return null;
  }
};

class InputModal extends React.Component {
  componentDidMount() {
    const selector = `#${this.props.control}-url-input`;
    const modalInputElement = document.querySelector(selector);
    modalInputElement.focus();
  }
  render() {
    const { control, onSubmit } = this.props;
    return (
      <ModalContainer>
        {renderControlModal(control)}
        <Button onClick={onSubmit}>Submit</Button>
      </ModalContainer>
    );
  }
}

export default InputModal;
