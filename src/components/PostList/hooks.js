import { getURLSegments } from '../../helpers/routes';
import { PAGE_TYPES } from '../../config';
import actions from '../../actions';

const getPageType = urlPath => {
  const [firstPart, secondPart] = getURLSegments(urlPath);
  if (PAGE_TYPES.SPECIAL[firstPart]) {
    return { id: secondPart, type: PAGE_TYPES.SPECIAL[firstPart] };
  } else if (firstPart.startsWith('@')) {
    const [, pageTypeId] = firstPart.split('@');
    return { id: pageTypeId, type: PAGE_TYPES.SPECIAL.authors };
  }
  return { type: PAGE_TYPES.MAIN };
};

const hooks = {
  onEnter: ({ match: { path }, dispatch }) => {
    const { type, id } = getPageType(path);
    dispatch(actions.showSubscribeWidget());
    if (type === [PAGE_TYPES.SPECIAL.authors]) {
      dispatch(actions.showAuthorInfoWidget(id));
    }
  },
  onLeave: ({ match: { path }, dispatch }) => {
    const { type, id } = getPageType(path);
    dispatch(actions.hideSubscribeWidget());
    if (type === [PAGE_TYPES.SPECIAL.authors]) {
      dispatch(actions.hideAuthorInfoWidget(id));
    }
  }
};

export default hooks;
