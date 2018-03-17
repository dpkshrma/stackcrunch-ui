import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ContentEditable from 'react-contenteditable';
import { fetchProfile, updateRemoteProfile } from '../../actions/user';
import { Connect, Text, Form, FormGroup, SubmitButton } from './styled';
import { STACKCRUNCH_TOKEN_ID, STACKCRUNCH_API_URL } from '../../config';
import GithubOctocatIcon from '../icons/GithubOctocat';
import StackExchangeIcon from '../icons/StackExchange';

const getLink = (provider, params) => {
  const queryParams = queryString.stringify({ ...params, proc: 'link' });
  return `${STACKCRUNCH_API_URL}/auth/${provider}/?${queryParams}`;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px;
`;
const Input = styled(ContentEditable)`
  font-size: 24px;
  line-height: 1.6;
  color: #555;
  padding: 0;
  cursor: text;
  outline: none;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  font-family: roboto;
  font-weight: 300;
  &:empty::before {
    content: attr(data-placeholder);
    font-weight: 100;
    color: #9197a3;
  }
  &:empty:focus::before {
    color: #bdc1c9;
  }
  &:focus {
    border-bottom: 2px solid #ffa000;
  }
`;

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

const ConnectCard = ({ name, Img, link, profile, onClick }) => {
  const { Card } = Connect;
  let connectLink = link;
  if (profile && profile.link) connectLink = profile.link;

  return (
    <Card href={connectLink} target="_blank">
      <Card.Thumb>
        {Img && <Img height={72} />}
        <Text>{name}</Text>
      </Card.Thumb>
      {profile && profile.name ? (
        <Card.Content>
          <Card.Name>{profile.name}</Card.Name>
          {profile.username && <Text>@{profile.username}</Text>}
          <Card.BragText>{profile.bragText}</Card.BragText>
        </Card.Content>
      ) : (
        <Card.Content>
          <Card.Name>Click to Connect</Card.Name>
        </Card.Content>
      )}
    </Card>
  );
};

class BasicInfo extends React.Component {
  state = {
    user: {
      name: '',
      description: ''
    },
    editable: false
  };
  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.fetchProfile(username).then(() => {
      const { users, loggedInUser } = this.props;
      const user = users[username] || {};

      let editable = false;
      if (username === loggedInUser.username) {
        editable = true;
      }

      this.setState({ user, editable });
    });
  }
  updateName = e => {
    e.preventDefault();
    this.setState({
      user: Object.assign({}, this.state.user, {
        name: e.target.value
      })
    });
  };
  updateDescription = e => {
    e.preventDefault();
    this.setState({
      user: Object.assign({}, this.state.user, {
        description: e.target.value
      })
    });
  };
  save = e => {
    e.preventDefault();
    // excluding rest of the user info (like github, stackexchange info, etc.)
    const { name, description } = this.state.user;
    this.props.updateRemoteProfile({ name, description });
  };
  render() {
    const { user = {}, editable } = this.state;
    const { name = '', description = '' } = user;
    const descriptionPlaceholder = editable
      ? 'Tell something about yourself'
      : 'mode === incognito';
    return (
      <Container>
        <Form onSubmit={this.save}>
          <FormGroup>
            <Input
              innerRef={el => {
                this.name = el;
              }}
              html={name}
              onChange={this.updateName}
              data-placeholder="Your Name"
              disabled={!editable}
            />
          </FormGroup>
          <FormGroup>
            <Input
              innerRef={el => {
                this.description = el;
              }}
              html={description}
              onChange={this.updateDescription}
              data-placeholder={descriptionPlaceholder}
              disabled={!editable}
            />
          </FormGroup>
          {editable && (
            <FormGroup>
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
            </FormGroup>
          )}
          {editable && (
            <FormGroup>
              <SubmitButton onClick={this.save}>Save</SubmitButton>
            </FormGroup>
          )}
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = ({ users, user }) => ({ users, loggedInUser: user });
const mapDispatchToProps = { updateRemoteProfile, fetchProfile };

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(BasicInfo)
);
