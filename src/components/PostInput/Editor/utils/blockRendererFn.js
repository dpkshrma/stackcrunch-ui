import QnAEmbed from '../components/qna';
import VideoEmbed from '../components/video';
import ImageEmbed from '../components/image';
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
  }
};

export default blockRendererFn;
