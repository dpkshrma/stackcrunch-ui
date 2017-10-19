import types from './types';

const showTagWidget = tagId => {
  return {
    type: types.SHOW_TAG_INFO_WIDGET,
    tagId
  };
};

export default {
  showTagWidget
};
