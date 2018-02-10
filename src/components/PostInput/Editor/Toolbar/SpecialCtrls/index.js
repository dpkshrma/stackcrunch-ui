import React from 'react';
import styled from 'styled-components';
import { Link, Image, Video } from '../../../../icons/editor';
import Modal from '../../../../Modal';
import LinkInputModal from './LinkInputModal';
import VideoInputModal from './VideoInputModal';
import ImageInputModal from './ImageInputModal';

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

class SpecialControls extends React.Component {
  state = {
    isModalOpen: false,
    activeInputControl: null
  };
  onCtrlClick = control => e => {
    this.setState({
      isModalOpen: true,
      activeInputControl: control
    });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  onSpecialInputSubmit = () => {
    // FIXME focussing editor does not work, (** works when not closing modal **)
    this.props.editorRef && this.props.editorRef.focus();
    this.closeModal();
  };
  renderControlModal = ({ control, ...props }) => {
    switch (control) {
      case 'image':
        return <ImageInputModal {...props} />;
      case 'video':
        return <VideoInputModal {...props} />;
      case 'link':
        return <LinkInputModal {...props} />;
      default:
        return null;
    }
  };
  render() {
    const { activeInputControl } = this.state;
    const { editorState, updateEditorState } = this.props;

    return [
      <Image key="image" onClick={this.onCtrlClick('image')} />,
      <Video key="video" onClick={this.onCtrlClick('video')} />,
      <Link key="link" onClick={this.onCtrlClick('link')} />,
      <Modal key="modal" isOpen={this.state.isModalOpen}>
        <Modal.Backdrop onClick={this.closeModal} />
        <ModalContainer>
          {this.renderControlModal({
            control: activeInputControl,
            editorState: editorState,
            updateEditorState: updateEditorState,
            onSubmit: this.onSpecialInputSubmit
          })}
        </ModalContainer>
      </Modal>
    ];
  }
}

export default SpecialControls;
