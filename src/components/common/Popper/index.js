import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Menu as DefaultMenu, MenuItem, Tip } from './styled';

class Popper extends React.Component {
  componentDidMount() {
    document.addEventListener('click', e => {
      if (this.popper && !this.popper.contains(e.target)) {
        this.props.onClickOutside();
      }
    });
  }
  render() {
    const { isOpen, target, children, showTip, alignMenuRight } = this.props;
    return (
      <Wrapper
        innerRef={el => {
          this.popper = el;
        }}
      >
        {target}
        {showTip && isOpen && <Tip />}
        {isOpen && (
          <DefaultMenu
            onClick={this.props.onMenuClick}
            alignRight={alignMenuRight}
          >
            {children}
          </DefaultMenu>
        )}
      </Wrapper>
    );
  }
}

Popper.MenuItem = MenuItem;

Popper.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  target: PropTypes.node.isRequired,
  showTip: PropTypes.bool,
  onMenuClick: PropTypes.func
};
Popper.defaultProps = {
  showTip: false,
  onMenuClick: () => {}
};

export default Popper;
