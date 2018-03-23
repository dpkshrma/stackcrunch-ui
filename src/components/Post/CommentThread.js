import React from 'react';
import styled from 'styled-components';

const Thread = styled.div`
  margin-top: 32px;
`;

const DISQUS_CONFIG = [
  'shortname',
  'identifier',
  'title',
  'url',
  'category_id',
  'onNewComment'
];

function copyProps(context, props, prefix = '') {
  Object.keys(props).forEach(prop => {
    context[prefix + prop] = props[prop];
  });

  if (typeof props.onNewComment === 'function') {
    context[prefix + 'config'] = function config() {
      this.callbacks.onNewComment = [
        function handleNewComment(comment) {
          props.onNewComment(comment);
        }
      ];
    };
  }
}

class CommentThread extends React.Component {
  __disqusAdded = false;
  componentDidMount() {
    this.loadDisqus();
  }
  componentDidUpdate() {
    this.loadDisqus();
  }
  addDisqusScript = () => {
    if (this.__disqusAdded) {
      return;
    }

    const child = (this.disqus = document.createElement('script'));
    const parent =
      document.getElementsByTagName('head')[0] ||
      document.getElementsByTagName('body')[0];

    child.async = true;
    child.type = 'text/javascript';
    child.src = '//' + this.props.shortname + '.disqus.com/embed.js';

    parent.appendChild(child);
    this.__disqusAdded = true;
  };
  loadDisqus = () => {
    const props = {};

    // Extract Disqus props that were supplied to this component
    DISQUS_CONFIG.forEach(prop => {
      if (!!this.props[prop]) {
        props[prop] = this.props[prop];
      }
    });

    // Always set URL
    if (!props.url || !props.url.length) {
      props.url = window.location.href;
    }

    window.disqus_config = () => {
      copyProps(this.page, props);

      // Disqus needs hashbang URL, see https://help.disqus.com/customer/portal/articles/472107
      this.page.url = this.page.url.replace(/#/, '') + '#!newthread';
      this.page.identifier = this.props.identifier;
    };
    this.addDisqusScript();
    // If Disqus has already been added, reset it
    // if (typeof DISQUS !== 'undefined') {
    //   DISQUS.reset({
    //     reload: true,
    //     config: function config() {
    //       copyProps(this.page, props);
    //
    //       // Disqus needs hashbang URL, see https://help.disqus.com/customer/portal/articles/472107
    //       this.page.url = this.page.url.replace(/#/, '') + '#!newthread';
    //     }
    //   });
    // } else { // Otherwise add Disqus to the page
    // }
  };
  render() {
    return (
      <div {...this.props}>
        <Thread id="disqus_thread" />
        <noscript>
          <span>
            Please enable JavaScript to view the
            <a href="http://disqus.com/?ref_noscript">comments.</a>
          </span>
        </noscript>
      </div>
    );
  }
}

export default CommentThread;
