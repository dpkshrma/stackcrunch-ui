import Immutable from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';
import getRMEmbedPlugin from '../rmPlugins/embed';
import { REMARKABLE_OPTIONS } from '../../../config';

export const markdownToDraftOptions = {
  remarkableOptions: REMARKABLE_OPTIONS,
  remarkablePlugins: [getRMEmbedPlugin()],
  blockEntities: {
    video: ({ data }) => {
      const blockEntity = {
        type: 'video',
        mutability: 'IMMUTABLE',
        data
      };
      return blockEntity;
    }
  }
};

export const blockRenderMap = DefaultDraftBlockRenderMap.merge(
  Immutable.Map({
    blockquote: {
      element: 'div'
    },
    atomic: {
      element: 'div'
    }
  })
);
