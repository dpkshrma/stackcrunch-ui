import React from 'react';
import styled from 'styled-components';

const Anchor = styled.a`
  position: relative;
  color: #07c;
  text-decoration: none;
  padding-bottom: 2px;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 119, 204, 0.3);
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }
  &:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`;

const linkStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
};

const Link = props => {
  const { contentState, entityKey } = props;
  const { href, title } = contentState.getEntity(entityKey).getData();
  return (
    <Anchor href={href} target="_blank">
      {title || href}
    </Anchor>
  );
};

export default {
  strategy: linkStrategy,
  component: Link
};
