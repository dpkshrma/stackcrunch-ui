import {
  EditorState,
  ContentState,
  ContentBlock,
  CharacterMetadata,
  genKey
} from 'draft-js';
import { List, Repeat } from 'immutable';

/**
 * Creates a draftjs editor entity
 * @param  {Object} editorState DraftJS editorState
 * @param  {Object} [config={}] Entity config (contains type, mutability & data)
 * @return {Number}             Entity Map Key
 */
export const createEntity = ({ editorState, config = {} }) => {
  const { type, mutability, data } = Object.assign(
    {},
    {
      type: 'ENTITY_TYPE',
      mutability: 'IMMUTABLE',
      data: {}
    },
    config
  );
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    type,
    mutability,
    data
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  return entityKey;
};

/**
 * Creates a new block with optional entity attached
 * @param  {Object} editorState DraftJS editorState
 * @param  {Number} entityKey   Optional Entity Key
 * @param  {Object} [config={}] Optional ContentBlock Config (contains block key, type, text & characterList)
 * @return {Object}             new DraftJS editorState
 */
export const createContentBlock = ({ editorState, entityKey, config = {} }) => {
  let characterList = List();
  if (entityKey) {
    characterList = List(
      Repeat(CharacterMetadata.create({ entity: entityKey }), 1)
    ); // ref draft-js AtomBlockUtils source
  }
  const newBlock = new ContentBlock(
    Object.assign(
      {},
      {
        key: genKey(),
        type: 'unstyled',
        text: ' ',
        characterList
      },
      config
    )
  );
  // insert block & create new contentState
  const contentState = editorState.getCurrentContent();
  const newBlockMap = contentState.getBlockMap().set(newBlock.key, newBlock);
  const newContentState = ContentState.createFromBlockArray(
    newBlockMap.toArray()
  )
    .set('selectionBefore', contentState.getSelectionBefore())
    .set('selectionAfter', contentState.getSelectionAfter());

  const newEditorState = EditorState.push(editorState, newContentState);
  return newEditorState;
};
