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

const INLINE_CONTROLS = ['BOLD', 'ITALIC', 'UNDERLINE'];
const BLOCK_CONTROLS = [
  'blockquote',
  'unordered-list-item',
  'ordered-list-item',
  'code-block'
];
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
    this.props.editorRef && this.props.editorRef.focus();

    if (INLINE_CONTROLS.indexOf(control) !== -1) {
      this.setState(
        {
          activeControls: Object.assign({}, activeControls, {
            [control]: !activeControls[control]
          })
        },
        () => {
          this.props.toggleInlineStyle(control);
        }
      );
    } else if (BLOCK_CONTROLS.indexOf(control) !== -1) {
      // deactivate all other block controls
      const controlUpdates = BLOCK_CONTROLS.map(blockControl => ({
        [blockControl]: false
      }));
      this.setState(
        {
          activeControls: Object.assign({}, activeControls, ...controlUpdates, {
            [control]: !activeControls[control]
          })
        },
        () => {
          this.props.toggleBlockType(control);
        }
      );
    }
  };
  render() {
    const { activeControls } = this.state;
    return (
      <Container>
        <Bold onClick={this.onClick('BOLD')} active={activeControls.BOLD} />
        <Italic
          onClick={this.onClick('ITALIC')}
          active={activeControls.ITALIC}
        />
        <Underline
          onClick={this.onClick('UNDERLINE')}
          active={activeControls.UNDERLINE}
        />
        <Separator />
        <Image onClick={this.onClick('image')} active={activeControls.image} />
        <Video onClick={this.onClick('video')} active={activeControls.video} />
        <Link onClick={this.onClick('link')} active={activeControls.link} />
        <Separator />
        <Numbering
          onClick={this.onClick('ordered-list-item')}
          active={activeControls['ordered-list-item']}
        />
        <Bullets
          onClick={this.onClick('unordered-list-item')}
          active={activeControls['unordered-list-item']}
        />
        <Separator />
        <Blockquote
          onClick={this.onClick('blockquote')}
          active={activeControls.blockquote}
        />
        <Code
          onClick={this.onClick('code-block')}
          active={activeControls['code-block']}
        />
      </Container>
    );
  }
}

export default Toolbar;
