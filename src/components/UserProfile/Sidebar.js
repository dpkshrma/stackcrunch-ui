import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { fetchProfile, uploadPhoto } from '../../actions/user';
import UserIcon from '../icons/User';

const PUBLIC_TABS = {
  publishedPosts: 'Published Posts',
  basicInfo: 'About Me'
};
const TABS = {
  publishedPosts: 'Published Posts',
  drafts: 'Saved Drafts',
  basicInfo: 'About Me',
  logout: 'Logout'
};

const UserImage = ({ avatar, uploading, onChange, ...restProps }) => {
  const ChangePhotoLabel = styled.div`
    align-self: center;
    position: absolute;
    width: 100%;
    height: 20px;
    background: rgba(0, 0, 0, 0.4);
    display: ${uploading ? 'block' : 'none'};
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    font-family: roboto;
    letter-spacing: 1px;
    text-align: center;
    vertical-align: middle;
  `;
  const Container = styled.div`
    position: relative;
    display: flex;
    cursor: pointer;
    &:hover ${ChangePhotoLabel} {
      display: block;
    }
  `;
  const imgCSS = css`
    border-radius: 50%;
    height: 160px;
    width: 160px;
  `;
  const Img = styled.img`
    ${imgCSS};
  `;
  const DefaultUserImage = styled(UserIcon)`
    ${imgCSS};
  `;
  const FileInput = styled.input`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    cursor: pointer;
    opacity: 0;
  `;
  return (
    <Container {...restProps}>
      {avatar ? <Img src={avatar} /> : <DefaultUserImage fill="#777" />}
      <ChangePhotoLabel>
        {uploading ? 'Uploading...' : 'CHANGE PHOTO'}
      </ChangePhotoLabel>
      <FileInput
        type="file"
        onChange={onChange}
        accept="image/*"
        disabled={uploading ? 'disabled' : false}
        title="Profile Photo"
      />
    </Container>
  );
};

const UserMeta = styled.div`
  padding: 24px;
  text-align: center;
  font-size: 16px;
  font-family: roboto;
  font-weight: 300;
  color: #666;
`;

const UserFullName = styled.div`
  font-size: 20px;
`;
const Username = styled.div`
  font-size: 14px;
  color: #f78d3d;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const getOptionSelectedStyles = ({ selected }) => {
  if (!selected) return '';
  return css`
    background: #f9f9f9;
    color: #111;
    border-left: 2px solid #f78d3d;
    padding-left: 12px;
  `;
};
const Option = styled.div`
  font-family: roboto;
  font-size: 20px;
  font-weight: 300;
  color: #444;
  padding: 12px;
  cursor: pointer;
  padding-left: 14px;
  &:hover {
    background: #f9f9f9;
    color: #111;
    padding-left: 12px;
    border-left: 2px solid #f78d3d;
  }
  ${getOptionSelectedStyles};
`;

class Sidebar extends React.Component {
  state = {
    avatarUploading: false,
    avatarURL: null
  };

  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.fetchProfile(username).then(() => {
      const { users } = this.props;
      const { avatarURL } = users[username];
      this.setState({ avatarURL });
    });
  }

  componentWillReceiveProps(nextProps) {
    // fetch profile on route change!!! :)
    const { username: currentUsername } = this.props.match.params;
    const { username: nextUsername } = nextProps.match.params;
    if (currentUsername !== nextUsername) {
      this.props.fetchProfile(nextUsername);
    }
  }

  onAvatarInputChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    this.setState({ avatarUploading: true }, () => {
      reader.onloadend = () => {
        this.setState({ file, avatarURL: reader.result });
      };
      reader.readAsDataURL(file);
      this.props.uploadPhoto(file).then(() => {
        this.setState({ avatarUploading: false });
      });
    });
  };

  render() {
    const { username } = this.props.match.params;
    const {
      users,
      loggedInUser,
      logout,
      onOptionClick,
      selectedTab
    } = this.props;
    const user = users[username] || {};
    const isLoggedInUser = user.username === loggedInUser.username;
    const tabs = isLoggedInUser ? TABS : PUBLIC_TABS;

    const Container = styled.div`
      flex: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
    `;

    return (
      <Container>
        <UserImage
          avatar={this.state.avatarURL}
          uploading={this.state.avatarUploading}
          onChange={this.onAvatarInputChange}
        />
        <UserMeta>
          <UserFullName>{user.name}</UserFullName>
          <Username>@{user.username}</Username>
        </UserMeta>
        <Options>
          {Object.entries(tabs).map(([tab, tabDisplay]) => {
            return (
              <Option
                key={tab}
                selected={selectedTab === tab}
                onClick={tab === 'logout' ? logout : onOptionClick(tab)}
              >
                {tabDisplay}
              </Option>
            );
          })}
        </Options>
      </Container>
    );
  }
}

const mapStateToProps = ({ user, users }) => ({ loggedInUser: user, users });
const mapDispatchToProps = { fetchProfile, uploadPhoto };
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
);
