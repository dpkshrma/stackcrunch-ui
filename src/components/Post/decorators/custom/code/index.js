import React from 'react';
import PrismDecorator from 'draft-js-prism';
import Prism from 'prismjs';

const codeDecorator = new PrismDecorator({
  prism: Prism,
  render: props => {
    const className = `prism-token token ${props.type}`;
    return <span className={className}>{props.children}</span>;
  }
});

export default codeDecorator;
