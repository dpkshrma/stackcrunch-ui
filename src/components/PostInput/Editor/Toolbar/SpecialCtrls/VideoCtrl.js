import React from 'react';
import { AtomicBlockUtils } from 'draft-js';
import { Video as VideoIcon } from '../../../../icons/editor';
import { VIDEO_CTRL } from '../../../../../constants';
import Ctrl from './Ctrl';

class VideoCtrl extends React.Component {
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
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    // create entity
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'video',
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
    setEditorState(newEditorState, this.props.onSubmit);
  };
  render() {
    const data = {
      Icon: VideoIcon,
      ctrlKey: VIDEO_CTRL,
      url: this.state.src,
      updateUrl: this.onChange,
      submitUrl: this.onSubmit,
      onIconClick: this.props.toggleCtrl,
      activeCtrl: this.props.activeCtrl,
      inputPlaceholder: 'Paste youtube/vimeo url'
    };
    return <Ctrl {...data} />;
  }
}

export default VideoCtrl;
