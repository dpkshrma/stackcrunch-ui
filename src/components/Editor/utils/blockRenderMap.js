import { DefaultDraftBlockRenderMap } from 'draft-js';
import { Map as ImmutableMap } from 'immutable';

const blockRenderMap = DefaultDraftBlockRenderMap.merge(
  ImmutableMap({
    blockquote: {
      element: 'div'
    },
    atomic: {
      element: 'div'
    }
  })
);

export default blockRenderMap;
