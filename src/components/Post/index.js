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
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { markdownToDraftOptions, blockRenderMap } from './helpers';
import markdownToDraft from './helpers/markdownToDraft';
import comboDecorator from './decorators';
import postMeta from './data';
import post from './postData';

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    const contentState = markdownToDraft(post, markdownToDraftOptions);
    const editorState = EditorState.createWithContent(
      convertFromRaw(contentState),
      comboDecorator
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
              blockRenderMap={blockRenderMap}
            />
          </Content>
        </Post>
      </Wrapper>
    );
  }
}

export default PostPage;
