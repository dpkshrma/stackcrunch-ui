import React from 'react';
import styled from 'styled-components';
import { EditorBlock } from 'draft-js';
import { connect } from 'react-redux';
import { fetchQuestion } from '../../../../actions/question';
import soIcon from '../../../icons/so-icon.svg';
import sfIcon from '../../../icons/sf-icon.svg';
import suIcon from '../../../icons/su-icon.png';
import secIcon from '../../../icons/sec-icon.png';
import seIcon from '../../../icons/se-icon.png';

const Wrapper = styled.a`
  background-color: #f7f7f7;
  border: 1px solid #eee;
  padding: 12px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
`;
const Title = styled.div`
  font-size: 24px;
  font-family: roboto;
  font-weight: 300;
  color: #333;
  margin-bottom: 4px;
`;
const Link = styled.div`
  position: relative;
  color: #07c;
  padding-bottom: 2px;
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 0.7px;
`;
const Tags = styled.div`
  display: flex;
  margin-top: 8px;
`;
const Tag = styled.div`
  padding: 4px 8px;
  font-size: 12px;
  background-color: #fff;
  border-radius: 40px;
  margin-right: 20px;
  color: #222;
  border: 1px solid rgba(246, 155, 85, 0.7);
`;
const FlexSection = props => {
  const getFlexDirection = ({ vertical, horizontal }) => {
    if (vertical) return 'column';
    return 'row';
  };
  const Component = styled.div`
    display: flex;
    flex-direction: ${getFlexDirection};
  `;
  return <Component {...props} />;
};

const CommunityLogo = ({ site }) => {
  const Component = styled.img`
    max-height: 48px;
    max-width: 48px;
    margin-right: 6px;
  `;
  const srcMap = {
    stackoverflow: soIcon,
    serverfault: sfIcon,
    superuser: suIcon,
    security: secIcon,
    softwareEngineering: seIcon
  };
  return <Component src={srcMap[site]} />;
};

const OriginalPoster = ({ user }) => {
  return <FlexSection />;
};

class QnA extends React.Component {
  state = {
    questionId: null
  };
  componentDidMount() {
    const urlString = this.props.block.get('data').get('url');
    this.props
      .fetchQuestion(urlString)
      .then(data => {
        const { value: { question } } = data || { value: {} };
        this.setState({ questionId: question.question_id });
      })
      .catch(console.error);
  }
  render() {
    const { title, tags, link, owner, site } =
      this.props.questions[this.state.questionId] || {};
    return (
      <div>
        <Wrapper
          href={link}
          target="_blank"
          rel="noopener noreferer"
          contentEditable="false"
          suppressContentEditableWarning
        >
          <FlexSection horizontal>
            <CommunityLogo site={site} />
            <FlexSection vertical>
              <Title>{title}</Title>
              <Link>{link}</Link>
              <Tags>{tags && tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</Tags>
            </FlexSection>
            <OriginalPoster user={owner} />
          </FlexSection>
        </Wrapper>
        <EditorBlock {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = ({ questions }) => ({ questions });
const mapDispatchToProps = { fetchQuestion };

export const QnAEmbed = connect(mapStateToProps, mapDispatchToProps)(QnA);
