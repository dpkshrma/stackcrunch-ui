import React from 'react';
import styled from 'styled-components';
import Popper from '../common/Popper';
import Chip from '../common/Chip';
import tagsAPI from '../../api/tag';

const Container = styled.div``;
const TextInput = styled.input`
  color: #555;
  padding: 0;
  outline: none;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  font-family: roboto;
  font-size: 18px;
  font-weight: normal;
  margin-top: 20px;
  &::placeholder {
    font-weight: 300;
    color: #999;
  }
  &:focus {
    border-bottom: 2px solid #ffa000;
  }
`;
const { MenuItem } = Popper;
const Suggestion = MenuItem.withComponent('div');
const Tags = styled.div`
  display: flex;
`;

class TagInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopperOpen: false,
      suggestions: [],
      tagInput: ''
    };
  }
  onInputChange = e => {
    const { value: tagInput } = e.target;
    this.setState({ tagInput }, () => {
      if (tagInput.length < 3) return this.setState({ isPopperOpen: false });
      tagsAPI
        .fetchAll(tagInput)
        .then(suggestions => {
          this.setState({ isPopperOpen: true, suggestions });
        })
        .catch(err => {
          console.error(err);
        });
    });
  };
  onSuggestionClick = tag => e => {
    e.preventDefault();
    if (!this.props.selectedTags.find(t => t.name === tag.name)) {
      this.setState(
        {
          isPopperOpen: false
        },
        () => this.props.addTag(tag)
      );
    } else {
      this.setState({
        isPopperOpen: false
      });
    }
  };
  onClickOutsidePopper = () => {
    this.setState({ isPopperOpen: false });
  };
  render() {
    return (
      <Container>
        <Tags>
          {this.props.selectedTags.map(tag => (
            <Chip
              text={tag.name}
              // TODO: add tag links
              to={'/'}
              key={tag.name}
              onCloseClick={e => {
                e.preventDefault();
                this.props.removeTag(tag.name);
              }}
              css={{
                wrapper: {
                  marginRight: '8px'
                }
              }}
            />
          ))}
        </Tags>
        <Popper
          isOpen={this.state.isPopperOpen}
          onClickOutside={this.onClickOutsidePopper}
          target={
            <TextInput
              onChange={this.onInputChange}
              value={this.state.tagInput}
              placeholder="Search and Select a tag ..."
            />
          }
        >
          {this.state.suggestions.map(tag => (
            <Suggestion
              key={tag.name}
              title={tag.description}
              onClick={this.onSuggestionClick(tag)}
            >
              {tag.name}
            </Suggestion>
          ))}
        </Popper>
      </Container>
    );
  }
}

export default TagInput;
