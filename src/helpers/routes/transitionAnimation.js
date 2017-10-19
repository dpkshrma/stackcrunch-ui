import { spring } from 'react-router-transition';

// wrap the `spring` helper to use a bouncy config
const bounce = val => {
  return spring(val, {
    stiffness: 330,
    damping: 22
  });
};
export default {
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
