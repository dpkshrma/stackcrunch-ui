import React from 'react';
import { OrderedMap } from 'immutable';
import {
  Editor,
  EditorState,
  RichUtils,
  ContentBlock,
  Modifier,
  genKey
} from 'draft-js';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
import styled from 'styled-components';
import 'draft-js/dist/Draft.css';
import './components/blocks/image.css';
import Toolbar from './Toolbar';
import blockRendererFn from './utils/blockRendererFn';
import blockStyleFn from './utils/blockStyleFn';
import checkEmbeds from './utils/checkEmbeds';
import { Block, HANDLED, NOT_HANDLED } from './constants';
import { getCurrentBlock, resetBlockWithType, addNewBlockAt } from './model';

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
      if (firstBlockTypes.indexOf(Block.ATOMIC) === 0) {
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
    } else if (currentBlock.getType().indexOf(Block.ATOMIC) === 0) {
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

  handlePastedText = (text, html, es) => {
    const { editorState } = this.props;
    const currentBlock = getCurrentBlock(editorState);
    const blockType = currentBlock.getType();
    if (blockType === Block.IMAGE) {
      const content = editorState.getCurrentContent();
      this.props.onChange(
        EditorState.push(
          editorState,
          Modifier.insertText(content, editorState.getSelection(), text)
        )
      );
      return HANDLED;
    } else if (blockType === Block.UNSTYLED) {
      const { matched, blockType: newBlockType, data } = checkEmbeds(text);
      if (matched) {
        const newEditorState = resetBlockWithType(editorState, newBlockType, {
          data
        });
        this.props.onChange(newEditorState);
        return HANDLED;
      }
    }
    if (
      this.props.handlePastedText &&
      this.props.handlePastedText(text, html, es) === HANDLED
    ) {
      return HANDLED;
    }
    return NOT_HANDLED;
  };

  render() {
    const { editorState, onChange, readOnly } = this.props;
    return (
      <Container>
        <Toolbar
          getEditorState={this.getEditorState}
          setEditorState={onChange}
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
          handlePastedText={this.handlePastedText}
          blockRendererFn={blockRendererFn}
          blockStyleFn={blockStyleFn}
          readOnly={readOnly}
        />
      </Container>
    );
  }
}

PostEditor.defaultProps = {
  editorState: EditorState.createEmpty(),
  readOnly: false,
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
