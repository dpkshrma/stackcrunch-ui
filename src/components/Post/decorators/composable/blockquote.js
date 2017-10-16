import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;
const Quote = styled.blockquote`
  margin: 0;
  margin: 8px 0;
  padding: 16px 0 16px 32px;
  border-left: 3px solid rgb(246, 155, 85);
  background: #eee;
  font-style: italic;
  color: #555;
`;

const blockquoteStrategy = (contentBlock, callback, contentState) => {
  if (contentBlock.getType() === 'blockquote') {
    const text = contentBlock.getText();
    callback(0, text.length);
  }
};

const Blockquote = props => {
  return (
    <Wrapper>
      <Quote>{props.children}</Quote>
    </Wrapper>
  );
};

export default {
  strategy: blockquoteStrategy,
  component: Blockquote
};
