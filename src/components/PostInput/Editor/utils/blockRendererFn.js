import React from 'react';
import styled from 'styled-components';
import { EditorBlock } from 'draft-js';
import QnAEmbed from '../components/qna';
import VideoEmbed from '../components/video';
import ImageEmbed from '../components/image';
import { Block } from '../constants';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
`;
const IFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const embedUrls = {
  codesandbox: id => `https://?codesandbox.io/embed/${id}`
};
const embedRegexes = {
  codesandbox: [/(?:https?:\/\/)?codesandbox\.io\/embed\/.*/]
  // jsfiddle: [/(:?https?:\/\/)?/]
};

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
  } else if (type === Block.UNSTYLED) {
    const blockText = contentBlock.getText();
    let match, matchFound;
    Object.entries(embedRegexes).forEach(([site, regexes]) => {
      matchFound = regexes.some(regex => {
        match = blockText.match(regex);
        return match !== null;
      });
    });
    if (matchFound)
      return {
        component: props => {
          const { src } = props.blockProps;
          return (
            <div>
              <Wrapper>
                <IFrame src={src} />
              </Wrapper>
              <EditorBlock {...props} />
            </div>
          );
        },
        editablte: false,
        props: {
          src: blockText
        }
      };
  }
};

export default blockRendererFn;
