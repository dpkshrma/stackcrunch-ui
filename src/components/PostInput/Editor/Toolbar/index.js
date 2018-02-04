import React from 'react';
import styled from 'styled-components';
import Modal from '../../../Modal';
import LinkInputModal from './LinkInputModal';
import VideoInputModal from './VideoInputModal';
import ImageInputModal from './ImageInputModal';
import { ModalContainer } from './styled';
import {
  Bold,
  Italic,
  Underline,
  Link,
  Bullets,
  Numbering,
  Code,
  Blockquote,
  Image,
  Video
} from '../../../icons/editor';

const Container = styled.div`
  border: 1px solid #e0e0e0;
  margin-bottom: 24px;
  padding: 8px;
  display: flex;
  align-items: center;
  position: relative;
`;
const Separator = styled.div`
  border-right: 1px solid #e0e0e0;
  height: 24px;
  margin: 0 8px;
`;

const INLINE_CONTROLS = ['BOLD', 'ITALIC', 'UNDERLINE'];
const BLOCK_CONTROLS = [
  'blockquote',
  'unordered-list-item',
  'ordered-list-item',
  'code-block'
];
// Special Controls require an extra input step
const SPECIAL_CONTROLS = ['link', 'image', 'video'];

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeControls: {},
      isModalOpen: false,
      activeInputControl: null
    };
  }
  onClick = control => e => {
    const { activeControls } = this.state;

    SPECIAL_CONTROLS.indexOf(control) === -1 && // not a special control
    this.props.editorRef && // editor ref is defined only after it is focussed atleast once FIXME
      this.props.editorRef.focus();

    if (INLINE_CONTROLS.indexOf(control) !== -1) {
      this.setState(
        {
          activeControls: Object.assign({}, activeControls, {
            [control]: !activeControls[control]
          })
        },
        () => {
          this.props.toggleInlineStyle(control);
        }
      );
    } else if (BLOCK_CONTROLS.indexOf(control) !== -1) {
      // deactivate all other block controls
      const controlUpdates = BLOCK_CONTROLS.map(blockControl => ({
        [blockControl]: false
      }));
      this.setState(
        {
          activeControls: Object.assign({}, activeControls, ...controlUpdates, {
            [control]: !activeControls[control]
          })
        },
        () => {
          this.props.toggleBlockType(control);
        }
      );
    } else if (SPECIAL_CONTROLS.indexOf(control) !== -1) {
      this.setState({
        isModalOpen: true,
        activeInputControl: control
      });
    }
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
    const { activeControls, activeInputControl } = this.state;
    return (
      <Container>
        <Bold onClick={this.onClick('BOLD')} active={activeControls.BOLD} />
        <Italic
          onClick={this.onClick('ITALIC')}
          active={activeControls.ITALIC}
        />
        <Underline
          onClick={this.onClick('UNDERLINE')}
          active={activeControls.UNDERLINE}
        />
        <Separator />
        <Image onClick={this.onClick('image')} active={activeControls.image} />
        <Video onClick={this.onClick('video')} active={activeControls.video} />
        <Link onClick={this.onClick('link')} active={activeControls.link} />
        <Separator />
        <Numbering
          onClick={this.onClick('ordered-list-item')}
          active={activeControls['ordered-list-item']}
        />
        <Bullets
          onClick={this.onClick('unordered-list-item')}
          active={activeControls['unordered-list-item']}
        />
        <Separator />
        <Blockquote
          onClick={this.onClick('blockquote')}
          active={activeControls.blockquote}
        />
        <Code
          onClick={this.onClick('code-block')}
          active={activeControls['code-block']}
        />
        <Modal isOpen={this.state.isModalOpen}>
          <Modal.Backdrop onClick={this.closeModal} />
          <ModalContainer>
            {this.renderControlModal({
              editorState: this.props.editorState,
              updateEditorState: this.props.updateEditorState,
              control: activeInputControl,
              onSubmit: this.onSpecialInputSubmit
            })}
          </ModalContainer>
        </Modal>
      </Container>
    );
  }
}

export default Toolbar;
