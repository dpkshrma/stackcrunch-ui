import React from 'react';
import styled, { css } from 'styled-components';
import { TextInput, Button } from './styled';
import isUrl from 'is-url-superb';

const UrlInput = styled(TextInput)`
  ${({ valid }) =>
    !valid &&
    css`
      border-color: red;
    `};
`;

const addDefaultUrlProtocol = url => {
  if (
    !url.startsWith('http://') &&
    !url.startsWith('https://') &&
    !url.startsWith('//')
  ) {
    return `http://${url}`;
  }
  return url;
};

class LinkCtrl extends React.Component {
  // TODO: focus input on click
  // componentDidMount() {
  //   document.addEventListener('click', e => {
  //     if (this.container && !this.container.contains(e.target)) {
  //       this.setState({ clickedOutside: true });
  //     }
  //   });
  // }
  // shouldComponentUpdate(nextProps) {
  //   const { activeCtrl, ctrlKey } = this.props.data;
  //   const { activeCtrl: nextActiveCtrl, ctrlKey: nextCtrlKey } = nextProps.data;
  //   console.log('current: ', activeCtrl, ctrlKey);
  //   console.log('next: ', nextActiveCtrl, nextCtrlKey);
  //   return true;
  //   // if (activeCtrl===ctrlKey)
  // }
  // componentDidUpdate(prevProps) {
  // const { activeCtrl, ctrlKey } = this.props.data;
  // if (activeCtrl===ctrlKey) {
  //   this.input && this.input.focus();
  // }
  // }
  state = {
    url: '',
    urlIsValid: true
  };
  onChange = e => {
    e.preventDefault();
    this.setState({ url: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { url } = this.state;
    const webUrl = addDefaultUrlProtocol(url);
    if (!isUrl(webUrl)) {
      this.setState({ urlIsValid: false });
    } else {
      this.props.submitUrl(webUrl);
    }
  };

  renderUrlInput = placeholder => {
    const { url, urlIsValid } = this.state;
    return [
      <UrlInput
        innerRef={el => {
          this.input = el;
        }}
        placeholder={placeholder}
        key="text-input"
        value={url}
        onChange={this.onChange}
        required
        valid={urlIsValid}
      />,
      <Button onClick={this.onSubmit} key="submit-button">
        Submit
      </Button>
    ];
  };
  render() {
    const {
      Icon,
      ctrlKey,
      activeCtrl,
      submitUrl,
      onIconClick,
      inputPlaceholder
    } = this.props;

    const urlInput = this.renderUrlInput(inputPlaceholder);
    const icon = <Icon key={ctrlKey} onClick={onIconClick} />;

    let content;
    // link ctrl is active, display url input
    if (activeCtrl === ctrlKey) content = [icon, ...urlInput];
    else if (activeCtrl)
      // some other ctrl is active, hide link ctrl
      content = null;
    else
      // no ctrls active, just display the icon
      content = icon;

    return content;
  }
}

export default LinkCtrl;
