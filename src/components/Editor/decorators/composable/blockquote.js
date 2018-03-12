import React from 'react';
import styled from 'styled-components';

const Quote = styled.div`
  margin: 0;
  padding: 16px 0 16px 32px;
  border-left: 3px solid rgb(246, 155, 85);
  background: #eee;
  font-style: italic;
  color: #555;
  width: 100%;
`;

const blockquoteStrategy = (contentBlock, callback, contentState) => {
  if (contentBlock.getType() === 'blockquote') {
    const text = contentBlock.getText();
    callback(0, text.length);
  }
};

const Blockquote = props => {
  return <Quote>{props.children}</Quote>;
};

export default {
  strategy: blockquoteStrategy,
  component: Blockquote
};
