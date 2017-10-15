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
