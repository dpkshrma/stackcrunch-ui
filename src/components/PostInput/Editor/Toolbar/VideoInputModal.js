import React from 'react';
import { AtomicBlockUtils } from 'draft-js';
import { TextInput, Button } from './styled';

class VideoInputModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: ''
    };
  }
  componentDidMount() {
    this.input.focus();
  }
  onInputChange = e => {
    e.preventDefault();
    this.setState({ src: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { src } = this.state;
    const { editorState } = this.props;
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
    this.props.updateEditorState(newEditorState, this.props.onSubmit);
  };
  render() {
    return [
      <TextInput
        innerRef={input => {
          this.input = input;
        }}
        placeholder="Only Youtube/Vimeo video urls supported currently"
        key="text-input"
        value={this.state.src}
        onChange={this.onInputChange}
      />,
      <Button onClick={this.onSubmit} key="submit-button">
        Submit
      </Button>
    ];
  }
}

export default VideoInputModal;