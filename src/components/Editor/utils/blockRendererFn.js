import {
  QnAEmbed,
  VideoEmbed,
  ImageEmbed,
  Blockquote
} from '../components/blocks';
import { Block } from '../constants';

const blockRendererFn = contentBlock => {
  const type = contentBlock.getType();
  if (type === Block.QNA) {
    return {
      component: QnAEmbed,
      editable: true,
      props: {}
    };
  } else if (type === Block.VIDEO) {
    return {
      component: VideoEmbed,
      editable: true,
      props: {}
    };
  } else if (type === Block.IMAGE) {
    return {
      component: ImageEmbed,
      editable: true,
      props: {}
    };
  } else if (type === Block.BLOCKQUOTE) {
    return {
      component: Blockquote,
      editable: true,
      props: {}
    };
  }
};

export default blockRendererFn;
