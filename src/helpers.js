import { spring } from 'react-router-transition';
import Loadable from 'react-loadable';
import Loading from './components/Loading';

export const asyncLoad = opts => {
  return Loadable(
    Object.assign(
      {},
      {
        loading: Loading
      },
      opts
    )
  );
};

// wrap the `spring` helper to use a bouncy config
const bounce = val => {
  return spring(val, {
    stiffness: 330,
    damping: 22
  });
};
export const routeAnimation = {
  // we need to map the `scale` prop we define below
  // to the transform style property
  mapStyles: styles => {
    return {
      opacity: styles.opacity,
      transform: `scale(${styles.scale})`
    };
  },
  // child matches will...
  bounceTransition: {
    // start in a transparent, upscaled state
    atEnter: {
      opacity: 0,
      scale: 1.2
    },
    // leave in a transparent, downscaled state
    atLeave: {
      opacity: bounce(0),
      scale: bounce(0.8)
    },
    // and rest at an opaque, normally-scaled state
    atActive: {
      opacity: bounce(1),
      scale: bounce(1)
    }
  }
};

export const getPrevNextPageIds = (pageIds, currentPageId) => {
  const currentPageIdIndex = pageIds.indexOf(currentPageId);
  let prevPageId, nextPageId;
  if (currentPageIdIndex !== -1) {
    if (currentPageIdIndex !== 0) {
      prevPageId = pageIds[currentPageIdIndex - 1];
    }
    if (currentPageIdIndex !== pageIds.length - 1) {
      nextPageId = pageIds[currentPageIdIndex + 1];
    }
  }
  return { prevPageId, nextPageId };
};
