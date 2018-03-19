import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import promisifySetState from 'promisify-setstate';
import postApi from '../../../api/post';
import MouseIcon from '../../icons/Mouse';
import DeleteIcon from '../../icons/Delete';

const CoverImageContainer = styled.div`
  width: 100%;
  position: relative;
`;

const FileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  cursor: pointer;
  opacity: 0;
  top: 0;
`;

const Img = styled.img`
  width: 100%;
`;

const Placeholder = () => {
  const Container = styled.div`
    color: #777;
    background-color: #f7f7f7;
    padding: 70px;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
  `;
  return (
    <Container>
      <MouseIcon height={20} />
      Click to upload a Cover Image
    </Container>
  );
};

const Options = ({ onDelete }) => {
  const DeleteFab = styled.div`
    height: 24px;
    width: 24px;
    cursor: pointer;
    padding: 12px;
    background-color: #fff;
    opacity: 0.8;
    color: #aaa;
    border-radius: 50%;
    &:hover {
      opacity: 0.9;
    }
  `;
  const Container = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: flex-end;
    width: calc(100% - 24px);
    padding: 12px;
  `;

  return (
    <Container>
      <DeleteFab onClick={onDelete}>
        <DeleteIcon height={24} />
      </DeleteFab>
    </Container>
  );
};

class CoverImage extends React.Component {
  state = {
    preview: null,
    uploading: false
  };

  componentWillReceiveProps(nextProps) {
    const { src: currentSrc } = this.props;
    const { src: nextSrc } = nextProps;
    if (currentSrc !== nextSrc) {
      this.setState({ preview: nextSrc });
    }
  }

  onChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    this.setState({ uploading: true }, () => {
      reader.onloadend = () => {
        this.setState({ file, preview: reader.result });
      };
      reader.readAsDataURL(file);
      // upload cover image
      postApi
        .uploadCoverImage(file)
        .then(data => {
          // check if upload is successful
          if (!data || !data.location) {
            console.error('Cover Upload Response: ', data);
            throw new Error('Error uploading cover image');
          }
          return data.location;
        })
        .then(this.props.setCoverImageUrl)
        .then(() => this.setState({ uploading: false }));
    });
  };

  onDelete = e => {
    e.preventDefault();
    this.setState({ preview: null }).then(() =>
      this.props.setCoverImageUrl(null)
    );
  };

  render() {
    const { preview, uploading } = this.state;
    return (
      <CoverImageContainer>
        {preview && (
          <div>
            <Img src={preview} />
            <Options onDelete={this.onDelete} />
          </div>
        )}
        {!preview && (
          <div>
            <Placeholder />
            <FileInput
              type="file"
              onChange={this.onChange}
              accept="image/*"
              disabled={uploading ? 'disabled' : false}
              title="Cover Image"
            />
          </div>
        )}
      </CoverImageContainer>
    );
  }
}

export default promisifySetState(CoverImage);
