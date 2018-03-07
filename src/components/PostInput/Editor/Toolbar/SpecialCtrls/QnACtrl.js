import React from 'react';
import { QnALink as QnAIcon } from '../../../../icons/editor';
import { createEntity, createContentBlock } from '../../../../../utils/editor';
import { QNA_CTRL } from '../../../../../constants';
import Ctrl from './Ctrl';

class QnACtrl extends React.Component {
  state = {
    url: ''
  };
  onChange = e => {
    e.preventDefault();
    this.setState({ url: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { url } = this.state;
    const { getEditorState, updateEditorState } = this.props;
    const editorState = getEditorState();
    // create an entity
    const entityConfig = {
      type: 'QNA',
      mutability: 'IMMUTABLE',
      data: { url }
    };
    const entityKey = createEntity({ editorState, config: entityConfig });
    // create new block
    const newEditorState = createContentBlock({ editorState, entityKey });
    updateEditorState(newEditorState, this.props.onSubmit);
  };
  render() {
    const data = {
      Icon: QnAIcon,
      ctrlKey: QNA_CTRL,
      url: this.state.url,
      updateUrl: this.onChange,
      submitUrl: this.onSubmit,
      onIconClick: this.props.toggleCtrl,
      activeCtrl: this.props.activeCtrl,
      inputPlaceholder: 'Paste a StackExchange community question link'
    };
    return <Ctrl data={data} />;
  }
}

export default QnACtrl;
