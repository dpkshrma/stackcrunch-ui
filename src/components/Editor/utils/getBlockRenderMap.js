import React from 'react';
import { DefaultDraftBlockRenderMap } from 'draft-js';
import { Map as ImmutableMap } from 'immutable';
import { Block } from '../constants';
import { CodeBlockWrapper } from '../components/blocks';

const getBlockRenderMap = (getEditorState, setEditorState) =>
  DefaultDraftBlockRenderMap.merge(
    ImmutableMap({
      [Block.BLOCKQUOTE]: {
        element: 'div'
      },
      [Block.ATOMIC]: {
        element: 'div'
      },
      [Block.CODE]: {
        element: 'pre',
        wrapper: (
          <CodeBlockWrapper
            getEditorState={getEditorState}
            setEditorState={setEditorState}
          />
        )
      }
    })
  );

export default getBlockRenderMap;
