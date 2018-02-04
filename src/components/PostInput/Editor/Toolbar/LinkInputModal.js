import React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import { TextInput, Button } from './styled';

// TODO: when selection is collapsed use the link url as value for the anchor entity
class LinkInputModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlValue: ''
    };
  }
  componentWillMount() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().href;
      }
      this.setState({ urlValue: url });
    }
  }
  componentDidMount() {
    this.input.focus();
  }
  onInputChange = e => {
    e.preventDefault();
    this.setState({ urlValue: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { urlValue } = this.state;
    const { editorState } = this.props;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'SEGMENTED',
      { href: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    this.props.updateEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      this.props.onSubmit
    );
  };
  render() {
    return [
      <TextInput
        innerRef={input => {
          this.input = input;
        }}
        placeholder="Paste link url here"
        key="text-input"
        value={this.state.urlValue}
        onChange={this.onInputChange}
      />,
      <Button onClick={this.onSubmit} key="submit-button">
        Submit
      </Button>
    ];
  }
}

export default LinkInputModal;
