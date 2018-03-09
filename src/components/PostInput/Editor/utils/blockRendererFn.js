import QnA from '../components/qna';

const blockRendererFn = contentBlock => {
  const type = contentBlock.getType();
  if (type === 'qna-block') {
    return {
      component: QnA,
      editable: true,
      props: {}
    };
  }
};

export default blockRendererFn;
