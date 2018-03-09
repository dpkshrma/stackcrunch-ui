import React from 'react';
import { VideoIcon } from '../../../../icons/editor';
import { addNewBlock } from '../../model';
import { VIDEO_CTRL, Block } from '../../constants';
import Ctrl from './Ctrl';

class VideoCtrl extends React.Component {
  render() {
    const props = {
      Icon: VideoIcon,
      ctrlKey: VIDEO_CTRL,
      submitUrl: src => {
        const editorState = this.props.getEditorState();
        const newEditorState = addNewBlock(editorState, Block.VIDEO, { src });
        this.props.setEditorState(newEditorState, this.props.onSubmit);
      },
      onIconClick: this.props.toggleCtrl,
      activeCtrl: this.props.activeCtrl,
      inputPlaceholder: 'Paste a youtube/video link'
    };
    return <Ctrl {...props} />;
  }
}

export default VideoCtrl;
