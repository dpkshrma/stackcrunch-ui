import React from 'react';
import { AtomicBlockUtils } from 'draft-js';
import { Image as ImageIcon } from '../../../../icons/editor';
import { IMAGE_CTRL } from '../../../../../constants';
import Ctrl from './Ctrl';

class ImageCtrl extends React.Component {
  state = {
    src: ''
  };
  onChange = e => {
    e.preventDefault();
    this.setState({ src: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { src } = this.state;
    const { getEditorState } = this.props;
    const editorState = getEditorState();
    // create entity
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      { src }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    // insert entity
    let newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );
    this.props.setEditorState(newEditorState, this.props.onSubmit);
  };
  render() {
    const props = {
      Icon: ImageIcon,
      ctrlKey: IMAGE_CTRL,
      url: this.state.src,
      updateUrl: this.onChange,
      submitUrl: this.onSubmit,
      onIconClick: this.props.toggleCtrl,
      activeCtrl: this.props.activeCtrl,
      inputPlaceholder: 'Paste an image url (Imgur, Flickr, etc.)'
    };
    return <Ctrl {...props} />;
  }
}

export default ImageCtrl;
