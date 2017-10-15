import getRMEmbedPlugin, { embedId } from './rmPlugins/embed';
import { REMARKABLE_OPTIONS } from '../../config';

export const markdownToDraftOptions = {
  remarkableOptions: REMARKABLE_OPTIONS,
  remarkablePlugins: [getRMEmbedPlugin()],
  blockEntities: {
    [embedId]: ({ data }) => {
      return {
        type: 'EMBED',
        mutability: 'IMMUTABLE',
        data
      };
    }
  }
};
