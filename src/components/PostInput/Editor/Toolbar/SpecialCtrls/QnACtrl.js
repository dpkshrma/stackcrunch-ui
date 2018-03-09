import React from 'react';
import { QnALink as QnAIcon } from '../../../../icons/editor';
import { addNewBlock } from '../../model';
import { QNA_CTRL, Block } from '../../constants';
import Ctrl from './Ctrl';

class QnACtrl extends React.Component {
  render() {
    const props = {
      Icon: QnAIcon,
      ctrlKey: QNA_CTRL,
      submitUrl: url => {
        const { getEditorState, setEditorState } = this.props;
        const editorState = getEditorState();
        const newEditorState = addNewBlock(editorState, Block.QNA, { url });
        setEditorState(newEditorState, this.props.onSubmit);
      },
      onIconClick: this.props.toggleCtrl,
      activeCtrl: this.props.activeCtrl,
      inputPlaceholder: 'Paste a StackExchange community question link'
    };
    return <Ctrl {...props} />;
  }
}

export default QnACtrl;
