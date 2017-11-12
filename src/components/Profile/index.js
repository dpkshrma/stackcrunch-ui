import React from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import queryString from 'query-string';
import { omit } from '../../utils/object';
import { getProfile, setProfile } from '../../actions/user';
import SC from '../common/SC';
import {
  Wrapper,
  Title,
  SectionTitle,
  ThumbWrapper,
  About,
  UsernameInputGroup,
  FormButton,
  ProfileImageContent,
  ProfileFormGroup,
  ProfileThumb,
  Links,
  LinkText,
  Text,
  LinkInputGroup,
  Form,
  FormInput,
  FileInput,
  FormTextArea,
  Connect,
  SubmitButton
} from './styled';
import UserIcon from '../icons/User';
import UserIcon2 from '../icons/User2';
import GithubIcon from '../icons/Github';
import TwitterIcon from '../icons/Twitter';
import MediumIcon from '../icons/Medium';
import GithubOctocatIcon from '../icons/GithubOctocat';
import StackExchangeIcon from '../icons/StackExchange';
import { STACKCRUNCH_API_URL, STACKCRUNCH_TOKEN_ID } from '../../config';

const links = [
  {
    id: 'github',
    text: 'https://github.com/',
    icon: GithubIcon,
    placeholder: 'Github handle'
  },
  {
    id: 'twitter',
    text: 'https://twitter.com/',
    icon: TwitterIcon,
    placeholder: 'Twitter handle'
  },
  {
    id: 'medium',
    text: 'https://medium.com/@',
    icon: MediumIcon,
    placeholder: 'Medium handle'
  }
];

const getLink = (provider, params) => {
  const queryParams = queryString.stringify({ ...params, proc: 'link' });
  return `${STACKCRUNCH_API_URL}/auth/${provider}/?${queryParams}`;
};

const connectCards = [
  {
    img: GithubOctocatIcon,
    link: params => getLink('github', params),
    provider: 'github',
    name: 'Github'
  },
  {
    img: StackExchangeIcon,
    link: params => getLink('stackexchange', params),
    provider: 'stackexchange',
    name: 'StackExchange'
  }
];

const ProfileImage = ({ src, onChange }) => {
  return (
    <ProfileImageContent>
      <ThumbWrapper>
        {src && src.length ? (
          <ProfileThumb src={src} />
        ) : (
          <UserIcon fill="#777" />
        )}
      </ThumbWrapper>
      <FileInput>
        <FormButton>Update</FormButton>
        <FormInput type="file" onChange={onChange} accept="image/*" />
      </FileInput>
    </ProfileImageContent>
  );
};

const ConnectCard = ({ name, Img, link, profile, onClick }) => {
  const { Card } = Connect;
  return (
    <Card href={link}>
      <Card.Thumb>
        {Img && <Img height={72} />}
        <Text>{name}</Text>
      </Card.Thumb>
      {profile &&
        profile.name && (
          <Card.Content>
            <Card.Name>{profile.name}</Card.Name>
            {profile.username && <Text>@{profile.username}</Text>}
            <Card.BragText>{profile.bragText}</Card.BragText>
          </Card.Content>
        )}
    </Card>
  );
};

class Profile extends SC {
  constructor(props) {
    super(props);
    // decode token, set username to state, else redirect to login screen
    const username = this.getUsername();
    this.state = {
      file: '',
      token: null,
      user: { username }
    };
  }

  componentDidMount() {
    if (!this.state.user.username) {
      this.props.history.push('/join');
      return;
    }
    this.props.getProfile().then(() => {
      const { user } = this.props;
      this.setState({ user });
    });
  }

  getUsername = () => {
    const token = localStorage.getItem(STACKCRUNCH_TOKEN_ID);
    let username = '';
    if (token) {
      username = jwtDecode(token).username;
    }
    return username;
  };

  onAvatarInputChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      const user = Object.assign({}, this.state.user, {
        avatarURL: reader.result
      });
      this.setState({ file, user });
    };
    reader.readAsDataURL(file);
  };

  onFormChange = e => {
    e.preventDefault();
    if (e.target.name) {
      // handle link inputs
      if (e.target.name.startsWith('handle.')) {
        const [, handle] = e.target.name.split('.');
        this.setState({
          user: Object.assign({}, this.state.user, {
            handles: Object.assign({}, this.state.user.handles, {
              [handle]: e.target.value
            })
          })
        });
      } else {
        // handle all other input cases
        this.setState({
          user: Object.assign({}, this.state.user, {
            [e.target.name]: e.target.value
          })
        });
      }
    }
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { user } = this.state;
    const profile = omit(user, 'stackexchange', 'github');
    this.props
      .setProfile(profile)
      .then(() => {
        // TODO: show a success snackbar
      })
      .catch(() => {
        // TODO: show a failure snackbar --or-- redirect to Error page?
      });
  };

  render() {
    const { user } = this.state;
    return (
      <Wrapper>
        <Form onChange={this.onFormChange} onSubmit={this.onFormSubmit}>
          <Title size={26}>Profile</Title>
          <SectionTitle size={18}>About</SectionTitle>
          <About>
            <ProfileImage
              onChange={this.onAvatarInputChange}
              src={user.avatarURL}
            />
            <ProfileFormGroup>
              <UsernameInputGroup>
                <UserIcon2 height={20} width={20} fill="#aaa" />
                <FormInput
                  placeholder="Username"
                  disabled="disabled"
                  value={user.username}
                />
              </UsernameInputGroup>
              <FormInput name="name" placeholder="Name" value={user.name} />
              <FormTextArea
                name="description"
                placeholder="Write something about yourself here..."
                rows={4}
                value={user.description}
              />
            </ProfileFormGroup>
          </About>
          <SectionTitle size={18}>Links</SectionTitle>
          <Links>
            {links.map((link, i) => {
              let handle = '';
              if (user.handles) {
                handle = user.handles[link.id];
              }
              return (
                <LinkInputGroup key={i}>
                  <link.icon width={40} height={40} />
                  <LinkText>{link.text}</LinkText>
                  <FormInput
                    name={`handle.${link.id}`}
                    placeholder={link.placeholder}
                    value={handle}
                  />
                </LinkInputGroup>
              );
            })}
          </Links>
          <SectionTitle size={18}>Connect</SectionTitle>
          <Connect>
            {connectCards.map((card, i) => {
              return (
                <ConnectCard
                  key={i}
                  Img={card.img}
                  link={card.link({
                    token: localStorage.getItem(STACKCRUNCH_TOKEN_ID),
                    newToken: true,
                    returnPath: '/profile'
                  })}
                  name={card.name}
                  profile={user[card.provider]}
                />
              );
            })}
          </Connect>
          <SubmitButton defaultValue="Save" type="submit" />
        </Form>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { getProfile, setProfile };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
