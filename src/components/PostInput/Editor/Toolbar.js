import React from 'react';
import styled from 'styled-components';
import {
  Bold,
  Italic,
  Underline,
  Link,
  Bullets,
  Numbering,
  Code,
  Blockquote,
  Image,
  Video
} from '../../icons/editor';

const Container = styled.div`
  border: 1px solid #e0e0e0;
  margin-bottom: 24px;
  padding: 8px;
  display: flex;
  align-items: center;
`;

const Separator = styled.div`
  border-right: 1px solid #e0e0e0;
  height: 24px;
  margin: 0 8px;
`;

const INLINE_CONTROLS = ['bold', 'italic', 'underline'];
const BLOCK_CONTROLS = ['numbering', 'bullets', 'blockquote', 'code'];
const SPECIAL_CONTROLS = ['link', 'image', 'video'];

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeControls: {}
    };
  }
  onClick = control => e => {
    const { activeControls } = this.state;

    if (INLINE_CONTROLS.indexOf(control) !== -1) {
      this.setState({
        activeControls: Object.assign({}, activeControls, {
          [control]: !activeControls[control]
        })
      });
    } else if (BLOCK_CONTROLS.indexOf(control) !== -1) {
      // deactivate all other block controls
      const controlUpdates = BLOCK_CONTROLS.map(blockControl => ({
        [blockControl]: false
      }));
      this.setState({
        activeControls: Object.assign({}, activeControls, ...controlUpdates, {
          [control]: !activeControls[control]
        })
      });
    }
  };
  render() {
    const { activeControls } = this.state;
    return (
      <Container>
        <Bold onClick={this.onClick('bold')} active={activeControls.bold} />
        <Italic
          onClick={this.onClick('italic')}
          active={activeControls.italic}
        />
        <Underline
          onClick={this.onClick('underline')}
          active={activeControls.underline}
        />
        <Separator />
        <Image onClick={this.onClick('image')} active={activeControls.image} />
        <Video onClick={this.onClick('video')} active={activeControls.video} />
        <Link onClick={this.onClick('link')} active={activeControls.link} />
        <Separator />
        <Numbering
          onClick={this.onClick('numbering')}
          active={activeControls.numbering}
        />
        <Bullets
          onClick={this.onClick('bullets')}
          active={activeControls.bullets}
        />
        <Separator />
        <Blockquote
          onClick={this.onClick('blockquote')}
          active={activeControls.blockquote}
        />
        <Code onClick={this.onClick('code')} active={activeControls.code} />
      </Container>
    );
  }
}

export default Toolbar;
