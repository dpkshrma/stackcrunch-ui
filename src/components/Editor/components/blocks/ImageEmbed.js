import React from 'react';
import styled from 'styled-components';
import { EditorBlock } from 'draft-js';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Img = styled.img`
  max-width: 100%;
  align-self: center;
`;
const Caption = styled.figcaption`
  background-color: #0001;
  padding: 8px;
  font-size: 14px;
  font-family: roboto;
  font-weight: 400;
  color: #444;
  position: relative;
`;
const CaptionPlaceholder = styled.div`
  position: absolute;
  bottom: 8px;
  text-align: center;
  width: 100%;
  color: #aaa;
  font-weight: 300;
  font-family: roboto;
  z-index: 99;
`;

// TODO: Add loader
export class ImageEmbed extends React.Component {
  state = {
    captionWidth: 0
  };
  componentDidMount() {
    this.setCaptionWidth();
  }
  setCaptionWidth = () => {
    if (this.img.complete) {
      const { width: imageWidth } = this.img.getBoundingClientRect();
      this.setState({ captionWidth: imageWidth });
    } else {
      setTimeout(this.setCaptionWidth, 100);
    }
  };
  render() {
    const data = this.props.block.get('data');
    const blockText = this.props.block.getText();
    const src = data.get('src');
    const alt = data.get('alt');
    const title = data.get('title') || alt;

    return (
      <Wrapper>
        <Img
          innerRef={el => {
            this.img = el;
          }}
          src={src}
          alt={alt}
          title={title}
        />
        <Caption style={{ width: `calc(${this.state.captionWidth}px - 16px)` }}>
          {blockText.length === 0 && (
            <CaptionPlaceholder contentEditable="false">
              Add a Caption...
            </CaptionPlaceholder>
          )}
          <EditorBlock {...this.props} />
        </Caption>
      </Wrapper>
    );
  }
}
