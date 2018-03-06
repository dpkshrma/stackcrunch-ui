import React from 'react';
import { TextInput, Button } from './styled';

class Ctrl extends React.Component {
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
  renderUrlInput = (url, placeholder, update, submit) => {
    return [
      <TextInput
        innerRef={el => {
          this.input = el;
        }}
        placeholder={placeholder}
        key="text-input"
        value={url}
        onChange={update}
      />,
      <Button onClick={submit} key="submit-button">
        Submit
      </Button>
    ];
  };
  render() {
    const {
      Icon,
      ctrlKey,
      url,
      updateUrl,
      submitUrl,
      onIconClick,
      activeCtrl,
      inputPlaceholder
    } = this.props.data;

    const urlInput = this.renderUrlInput(
      url,
      inputPlaceholder,
      updateUrl,
      submitUrl
    );
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

export default Ctrl;
