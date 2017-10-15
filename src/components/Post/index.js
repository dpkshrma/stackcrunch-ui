import React from 'react';
import { Chip } from '../common';
import {
  Wrapper,
  Header,
  HeaderMeta,
  HeaderMetaText,
  Separator,
  Post,
  Title,
  Content,
  authorCSS
} from './styled';
import { markdownToDraft } from 'markdown-draft-js';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { markdownToDraftOptions } from './helpers';
import postMeta from './data';
import post from './postData';

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    const contentState = markdownToDraft(post, markdownToDraftOptions);
    const editorState = EditorState.createWithContent(
      convertFromRaw(contentState)
    );
    this.state = { editorState };
  }
  onChange = editorState => {
    this.setState({ editorState });
  };
  render() {
    const { author } = postMeta;
    return (
      <Wrapper>
        <Post>
          <Header>
            <HeaderMeta>
              <Chip
                img={author.img}
                text={author.name}
                href={author.link}
                css={authorCSS}
              />
              <HeaderMetaText>
                {postMeta.postedOn} <Separator space={8} delimiter="|" />{' '}
                {postMeta.ttr}
              </HeaderMetaText>
            </HeaderMeta>
            <Title>{postMeta.title}</Title>
          </Header>
          <Content>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              readOnly={true}
            />
          </Content>
        </Post>
      </Wrapper>
    );
  }
}

export default PostPage;
