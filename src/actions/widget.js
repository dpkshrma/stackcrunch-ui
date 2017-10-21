import types from './types';

const showTagInfoWidget = tagId => {
  return {
    type: types.SHOW_TAG_INFO_WIDGET,
    tagId
  };
};
const hideTagInfoWidget = () => {
  return {
    type: types.HIDE_TAG_INFO_WIDGET
  };
};
const showAuthorInfoWidget = authorId => {
  return {
    type: types.SHOW_AUTHOR_INFO_WIDGET,
    authorId
  };
};
const hideAuthorInfoWidget = () => {
  return {
    type: types.HIDE_AUTHOR_INFO_WIDGET
  };
};
const showRefWidget = refs => {
  return {
    type: types.SHOW_REF_WIDGET,
    refs
  };
};
const hideRefWidget = () => {
  return {
    type: types.HIDE_REF_WIDGET
  };
};

export default {
  showTagInfoWidget,
  hideTagInfoWidget,
  showAuthorInfoWidget,
  hideAuthorInfoWidget,
  showRefWidget,
  hideRefWidget
};
