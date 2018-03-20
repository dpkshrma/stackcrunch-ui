import React from 'react';
import styled, { css } from 'styled-components';
import promisifySetState from 'promisify-setstate';
import postApi from '../../../api/post';
import MouseIcon from '../../icons/Mouse';
import DeleteIcon from '../../icons/Delete';
import ImageInsetIcon from '../../icons/editor/ImageInset';
import ImageOutsetIcon from '../../icons/editor/ImageOutset';
import ImageFillWidthIcon from '../../icons/editor/ImageFillWidth';

const CoverImageContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
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

const CoverImg = props => {
  const { alignment, children, ...restProps } = props;
  let imgWidth;
  if (alignment === 'inset') imgWidth = '740px';
  else if (alignment === 'outset') imgWidth = '945px';
  else imgWidth = '100vw';

  const Img = styled.img`
    width: ${imgWidth};
  `;
  const Container = styled.div`
    position: relative;
    &:hover ${Img} {
      border: 2px solid coral;
    }
  `;
  return (
    <Container>
      <Img {...restProps} />
      {children}
    </Container>
  );
};

const Placeholder = () => {
  const Container = styled.div`
    color: #777;
    background-color: #f7f7f7;
    padding: 70px;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    width: 100%;
  `;
  return (
    <Container>
      <MouseIcon height={20} />
      Click to upload a Cover Image
    </Container>
  );
};

const Options = ({ onDelete, onOptionClick, selectedOption }) => {
  const Container = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    width: calc(100% - 24px);
  `;

  const Toolbar = styled.div`
    display: flex;
    background-color: #fffb;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    &:hover {
      background-color: #fffc;
    }
  `;

  const btnCSS = css`
    cursor: pointer;
    padding: 12px;
    margin: 0;
    fill: #666;
    &:hover {
      fill: #555;
      background: #fff;
    }
    ${({ selected }) =>
      selected &&
      css`
        background: #fff;
      `};
  `;
  const DeleteBtn = styled(DeleteIcon)`
    ${btnCSS};
  `;
  const InsetBtn = styled(ImageInsetIcon)`
    ${btnCSS};
  `;
  const OutsetBtn = styled(ImageOutsetIcon)`
    ${btnCSS};
  `;
  const FillWidthBtn = styled(ImageFillWidthIcon)`
    ${btnCSS};
  `;

  return (
    <Container>
      <Toolbar>
        <InsetBtn
          height={24}
          onClick={onOptionClick('inset')}
          selected={selectedOption === 'inset'}
        />
        <OutsetBtn
          height={24}
          onClick={onOptionClick('outset')}
          selected={selectedOption === 'outset'}
        />
        <FillWidthBtn
          height={24}
          onClick={onOptionClick('fillWidth')}
          selected={selectedOption === 'fillWidth'}
        />
        <DeleteBtn height={23} onClick={onDelete} title="Remove Image" />
      </Toolbar>
    </Container>
  );
};

class CoverImage extends React.Component {
  state = {
    preview: null
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
    this.props.setUploadingCover(true).then(() => {
      reader.onloadend = () => {
        this.setState({ preview: reader.result });
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
        .then(() => this.props.setUploadingCover(false));
    });
  };

  onDelete = e => {
    e.preventDefault();
    this.setState({ preview: null }).then(() =>
      this.props.setCoverImageUrl(null)
    );
  };

  onOptionClick = coverAlignment => e => {
    e.preventDefault();
    this.props.setCoverAlignment(coverAlignment);
  };

  render() {
    const { uploadingCover, coverAlignment = 'inset' } = this.props;
    const { preview } = this.state;
    return (
      <CoverImageContainer>
        {preview && (
          <CoverImg src={preview} alignment={coverAlignment}>
            <Options
              onDelete={this.onDelete}
              onOptionClick={this.onOptionClick}
              selectedOption={coverAlignment}
            />
          </CoverImg>
        )}
        {!preview && [
          <Placeholder key="placeholder" />,
          <FileInput
            type="file"
            onChange={this.onChange}
            accept="image/*"
            disabled={uploadingCover ? 'disabled' : false}
            title="Cover Image"
            key="fileInput"
          />
        ]}
      </CoverImageContainer>
    );
  }
}

export default promisifySetState(CoverImage);
