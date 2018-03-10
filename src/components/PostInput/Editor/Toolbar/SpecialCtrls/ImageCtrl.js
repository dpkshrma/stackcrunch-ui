import React from 'react';
import { ImageIcon } from '../../../../icons/editor';
import { addNewBlock } from '../../model';
import { IMAGE_CTRL, Block } from '../../constants';
import Ctrl from './Ctrl';

class ImageCtrl extends React.Component {
  render() {
    const props = {
      Icon: ImageIcon,
      ctrlKey: IMAGE_CTRL,
      submitUrl: src => {
        const editorState = this.props.getEditorState();
        const newEditorState = addNewBlock(editorState, Block.IMAGE, { src });
        this.props.setEditorState(newEditorState, this.props.onSubmit);
      },
      onIconClick: this.props.toggleCtrl,
      activeCtrl: this.props.activeCtrl,
      inputPlaceholder: 'Paste an image url (Imgur, Flickr, etc.)'
    };
    return <Ctrl {...props} />;
  }
}

export default ImageCtrl;
