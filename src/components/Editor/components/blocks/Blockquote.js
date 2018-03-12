import React from 'react';
import styled from 'styled-components';
import { EditorBlock } from 'draft-js';

const Quote = styled.div`
  margin: 0;
  padding: 16px 0 16px 32px;
  border-left: 3px solid rgb(246, 155, 85);
  background: #f7f7f7;
  font-style: italic;
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 1px;
  color: #555;
`;

export const Blockquote = props => {
  return (
    <Quote>
      <EditorBlock {...props} />
    </Quote>
  );
};
