import React from 'react';
import { EditorState, EditorBlock } from 'draft-js';

const EMBED_INPUT_TYPE = 'embed-input';

const updateDataOfBlock = (editorState, block, newData) => {
  const contentState = editorState.getCurrentContent();
  const newBlock = block.merge({
    data: newData
  });
  const newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(block.getKey(), newBlock)
  });
  return EditorState.push(editorState, newContentState, 'change-block-type');
};

class EmbedInput extends React.Component {
  updateData = e => {
    e.preventDefault();

    const { block, blockProps } = this.props;

    // This is the reason we needed a higher-order function for blockRendererFn
    const { onChange, getEditorState } = blockProps;
    const data = block.getData();
    const newData = data.set('value', e.target.value);
    onChange(updateDataOfBlock(getEditorState(), block, newData));
  };

  render() {
    const data = this.props.block.getData();
    const value = data.get('value');
    return (
      <div>
        <input type="text" value={value} onChange={this.updateData} />
        {/* <EditorBlock {...this.props} /> */}
      </div>
    );
  }
}

export default EmbedInput;
