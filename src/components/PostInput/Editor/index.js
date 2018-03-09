import React from 'react';
import { OrderedMap } from 'immutable';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  ContentBlock,
  EditorBlock,
  genKey
} from 'draft-js';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
import styled from 'styled-components';
import 'draft-js/dist/Draft.css';
import Toolbar from './Toolbar';
import blockRendererFn from './utils/blockRendererFn';
import {
  Block,
  Entity as E,
  HANDLED,
  NOT_HANDLED,
  KEY_COMMANDS
} from './constants';
import {
  getCurrentBlock,
  resetBlockWithType,
  addNewBlockAt,
  isCursorBetweenLink
} from './model';

const Container = styled.div``;

class PostEditor extends React.Component {
  getEditorState = () => this.props.editorState;

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.props.onChange(newState);
      return true;
    }
    return false;
  };

  onUpArrow = e => {
    const { editorState } = this.props;
    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const key = selection.getAnchorKey();
    const currentBlock = content.getBlockForKey(key);
    const firstBlock = content.getFirstBlock();
    if (firstBlock.getKey() === key) {
      const firstBlockTypes = firstBlock.getType();
      if (
        firstBlockTypes.indexOf('atomic') === 0 ||
        firstBlockTypes.indexOf('qna-block') === 0
      ) {
        e.preventDefault();
        const newBlock = new ContentBlock({
          type: 'unstyled',
          key: genKey()
        });
        const newBlockMap = OrderedMap([[newBlock.getKey(), newBlock]]).concat(
          content.getBlockMap()
        );
        const newContent = content.merge({
          blockMap: newBlockMap,
          selectionAfter: selection.merge({
            anchorKey: newBlock.getKey(),
            focusKey: newBlock.getKey(),
            anchorOffset: 0,
            focusOffset: 0,
            isBackward: false
          })
        });
        this.props.onChange(
          EditorState.push(editorState, newContent, 'insert-characters')
        );
      }
    } else if (currentBlock.getType().indexOf('atomic') === 0) {
      const blockBefore = content.getBlockBefore(key);
      if (!blockBefore) {
        return;
      }
      e.preventDefault();
      const newSelection = selection.merge({
        anchorKey: blockBefore.getKey(),
        focusKey: blockBefore.getKey(),
        anchorOffset: blockBefore.getLength(),
        focusOffset: blockBefore.getLength(),
        isBackward: false
      });
      this.props.onChange(
        EditorState.forceSelection(editorState, newSelection)
      );
    }
  };

  handleReturn = e => {
    if (this.props.handleReturn) {
      const behavior = this.props.handleReturn();
      if (behavior === HANDLED || behavior === true) {
        return HANDLED;
      }
    }
    const { editorState } = this.props;
    if (isSoftNewlineEvent(e)) {
      this.props.onChange(RichUtils.insertSoftNewline(editorState));
      return HANDLED;
    }
    if (!e.altKey && !e.metaKey && !e.ctrlKey) {
      const currentBlock = getCurrentBlock(editorState);
      const blockType = currentBlock.getType();

      if (
        blockType.indexOf(Block.ATOMIC) === 0 ||
        blockType.indexOf(Block.QNA) === 0
      ) {
        this.props.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
        return HANDLED;
      }

      if (currentBlock.getLength() === 0) {
        switch (blockType) {
          case Block.UL:
          case Block.OL:
          case Block.BLOCKQUOTE:
          case Block.BLOCKQUOTE_CAPTION:
          case Block.CAPTION:
          case Block.H2:
          case Block.H3:
          case Block.H1:
            this.props.onChange(
              resetBlockWithType(editorState, Block.UNSTYLED)
            );
            return HANDLED;
          default:
            return NOT_HANDLED;
        }
      }

      const selection = editorState.getSelection();

      if (
        selection.isCollapsed() &&
        currentBlock.getLength() === selection.getStartOffset()
      ) {
        if (this.props.continuousBlocks.indexOf(blockType) < 0) {
          this.props.onChange(
            addNewBlockAt(editorState, currentBlock.getKey())
          );
          return HANDLED;
        }
        return NOT_HANDLED;
      }
      return NOT_HANDLED;
    }
    return NOT_HANDLED;
  };

  logState = () => {
    const contentState = this.props.editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    console.log(JSON.stringify(rawContent, null, 2));
    const currentSelection = this.props.editorState.getSelection();
    console.log(JSON.stringify(currentSelection, null, 2));
  };

  render() {
    const { editorState, onChange } = this.props;
    return (
      <Container>
        <Toolbar
          getEditorState={this.getEditorState}
          updateEditorState={onChange}
          editorRef={this.editor}
        />
        <Editor
          ref={editor => {
            this.editor = editor;
          }}
          placeholder="Write your article here..."
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          onUpArrow={this.onUpArrow}
          onChange={onChange}
          handleReturn={this.handleReturn}
          blockRendererFn={blockRendererFn}
        />
        {/* <button onClick={this.logState}>Log State</button> */}
      </Container>
    );
  }
}

PostEditor.defaultProps = {
  continuousBlocks: [
    Block.UNSTYLED,
    Block.BLOCKQUOTE,
    Block.OL,
    Block.UL,
    Block.CODE,
    Block.TODO
  ]
};

export default PostEditor;
