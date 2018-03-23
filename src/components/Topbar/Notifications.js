import React from 'react';
import styled from 'styled-components';
import Popper from '../common/Popper';
import BellIcon from '../icons/Bell';

const NotificationIcon = styled(BellIcon)`
  margin-right: 20px;
  margin-top: 9px;
  cursor: pointer;
`;
const ContentWrapper = styled.div`
  position: absolute;
  top: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  left: -116px;
  color: #777;
`;
const Content = styled.div`
  display: flex;
  padding: 24px;
  justify-content: center;
  min-width: 196px;
  font-size: 14px;
`;

class Notifications extends React.Component {
  state = {
    isPopperOpen: false
  };
  onClickOutsidePopper = () => {
    this.setState({ isPopperOpen: false });
  };
  togglePopper = () => {
    this.setState({ isPopperOpen: !this.state.isPopperOpen });
  };
  render() {
    return (
      <Popper
        isOpen={this.state.isPopperOpen}
        onClickOutside={this.onClickOutsidePopper}
        target={<NotificationIcon height={18} onClick={this.togglePopper} />}
        showTip={true}
        Menu={ContentWrapper}
      >
        <Content>No unread Notifications!</Content>
      </Popper>
    );
  }
}

export default Notifications;
