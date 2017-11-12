import { widgetActions as wa } from '../constants';

const showTagInfoWidget = tagId => {
  return {
    type: wa.SHOW_TAG_INFO_WIDGET,
    tagId
  };
};
const hideTagInfoWidget = () => {
  return {
    type: wa.HIDE_TAG_INFO_WIDGET
  };
};
const showAuthorInfoWidget = authorId => {
  return {
    type: wa.SHOW_AUTHOR_INFO_WIDGET,
    authorId
  };
};
const hideAuthorInfoWidget = () => {
  return {
    type: wa.HIDE_AUTHOR_INFO_WIDGET
  };
};
const showRefWidget = refs => {
  return {
    type: wa.SHOW_REF_WIDGET,
    refs
  };
};
const hideRefWidget = () => {
  return {
    type: wa.HIDE_REF_WIDGET
  };
};
const showSubscribeWidget = () => {
  return {
    type: wa.SHOW_SUBSCRIBE_WIDGET
  };
};
const hideSubscribeWidget = () => {
  return {
    type: wa.HIDE_SUBSCRIBE_WIDGET
  };
};

export default {
  showTagInfoWidget,
  hideTagInfoWidget,
  showAuthorInfoWidget,
  hideAuthorInfoWidget,
  showRefWidget,
  hideRefWidget,
  showSubscribeWidget,
  hideSubscribeWidget
};
