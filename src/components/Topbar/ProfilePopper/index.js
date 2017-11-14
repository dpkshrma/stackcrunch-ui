import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Wrapper,
  Target,
  Img,
  Menu,
  MenuItem,
  Tip,
  LogoutButton
} from './styled';
import { STACKCRUNCH_TOKEN_ID } from '../../../config';

class ProfilePopper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  componentDidMount() {
    document.addEventListener('click', e => {
      if (this.popper && !this.popper.contains(e.target)) {
        this.onClickOutside();
      }
    });
  }
  onClickOutside = () => {
    this.setState({ isOpen: false });
  };
  onMenuClick = () => {
    this.setState({ isOpen: false });
  };
  onTargetClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  onLogout = () => {
    // TODO: notify api about logout event
    localStorage.removeItem(STACKCRUNCH_TOKEN_ID);
    this.props.history.push('/');
  };
  render() {
    return (
      <Wrapper
        innerRef={el => {
          this.popper = el;
        }}
      >
        <Target onClick={this.onTargetClick}>
          <Img src={this.props.avatar} />
        </Target>
        {this.state.isOpen && [
          <Tip key="tip" />,
          <Menu key="menu" onClick={this.onMenuClick}>
            <MenuItem to="/profile">My Profile</MenuItem>
            <MenuItem to="/contribute">Contribute</MenuItem>
            <LogoutButton onClick={this.onLogout}>Logout</LogoutButton>
          </Menu>
        ]}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ user: { avatarURL } }) => {
  return { avatar: avatarURL };
};

export default withRouter(connect(mapStateToProps)(ProfilePopper));
