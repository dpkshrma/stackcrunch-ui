import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Draggable from 'react-draggable';
import DeleteIcon from '../../icons/Delete';
import {
  CoverImageContainer,
  ImagePreviewContainer,
  ImagePreviewOverlay,
  DeleteFab,
  DNDPlaceHolder
} from './styled';

const MAX_COVER_HEIGHT = 400;
const initialState = {
  file: null,
  activeDrags: 0,
  imagePreviewHeight: 0,
  imagePreviewWidth: 0,
  imageBounds: {
    top: -100,
    bottom: 0
  },
  deltaPosition: {
    y: 0
  },
  outputImageDataURL: null,
  hideDropzone: false
};

class CoverImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  removeCoverImage = () => {
    this.setState(initialState);
  };

  onDrop = ([acceptedFile]) => {
    this.setState(
      {
        file: acceptedFile,
        hideDropzone: true
      },
      () => {
        // FIXME: w/o setTimeout, image height = 18px why?
        setTimeout(() => {
          this.setImagePreviewBounds();
          this.setCroppedImageDataURL();
        }, 200);
      }
    );
  };

  handleDND = ({ isDragActive, isDragReject }) => {
    // TODO: add dnd state change component
    if (isDragActive) {
    }
    if (isDragReject) {
    }
    return <DNDPlaceHolder />;
  };

  onDragStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  onDragStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags }, () => {
      this.setCroppedImageDataURL();
    });
  };

  onPreviewImageDrag = (e, ui) => {
    this.setState({
      deltaPosition: {
        y: this.state.deltaPosition.y + ui.deltaY
      }
    });
  };

  setImagePreviewBounds = () => {
    const { clientWidth, clientHeight } = this.refs.imagePreview;
    this.setState({
      imagePreviewHeight: clientHeight,
      imagePreviewWidth: clientWidth,
      imageBounds: {
        top: MAX_COVER_HEIGHT - clientHeight,
        bottom: 0
      }
    });
  };

  // TODO: move image cropping logic to separate pure function
  setCroppedImageDataURL = () => {
    const self = this;
    const reader = new FileReader();
    const imageObj = new Image();
    const canvas = document.createElement('canvas');
    let context = null;

    const { clientWidth } = this.refs.imagePreview;
    const max_width = clientWidth;
    const max_height = MAX_COVER_HEIGHT;
    //create a hidden canvas object we can use to create the new resized image data
    canvas.width = max_width;
    canvas.height = max_height;
    canvas.style.visibility = 'hidden';

    //get the context to use
    context = canvas.getContext('2d');

    const { file } = this.state;
    if (file.type.match('image.*')) {
      reader.readAsDataURL(file);
    } else {
      alert('File is not an image');
    }

    reader.onload = function(event) {
      imageObj.src = event.target.result;
    };

    // draws the new image then gets the blob data from it
    imageObj.onload = function() {
      // Check for empty images
      if (this.width === 0 || this.height === 0) {
        alert('Image is empty');
      } else {
        context.clearRect(0, 0, max_width, max_height);
        // const { width: imageNaturalWidth, height: imageNaturalHeight } = this;
        const { imagePreviewWidth, imagePreviewHeight } = self.state;
        context.drawImage(
          imageObj,
          0,
          self.state.deltaPosition.y,
          imagePreviewWidth,
          imagePreviewHeight
        );
        self.props.setDataUri(canvas.toDataURL('image/png'));
      }
    };
  };

  render() {
    // disabling default dropzone css (TODO: raise a PR to use an explicit prop)
    const { preview: imagePreviewBlob = null } = this.state.file || {};
    const dropzoneStyles = { display: 'block' };
    const imagePreviewStyles = { display: 'none' };

    if (this.state.hideDropzone) {
      dropzoneStyles.display = 'none';
      imagePreviewStyles.display = 'block';
    }

    return (
      <CoverImageContainer>
        <Dropzone
          ref="dropzone"
          onDrop={this.onDrop}
          multiple={false}
          accept="image/*"
          style={dropzoneStyles}
        >
          {this.handleDND}
        </Dropzone>
        <ImagePreviewContainer style={imagePreviewStyles}>
          <Draggable
            onDrag={this.onPreviewImageDrag}
            onStart={this.onDragStart}
            onStop={this.onDragStop}
            bounds={this.state.imageBounds}
            axis="y"
          >
            <div ref="imagePreview">
              <img
                alt="cover preview"
                src={imagePreviewBlob}
                style={{ width: '100%' }}
              />
              <ImagePreviewOverlay />
            </div>
          </Draggable>
        </ImagePreviewContainer>
        {this.state.file && (
          <DeleteFab onClick={this.removeCoverImage}>
            <DeleteIcon height={24} />
          </DeleteFab>
        )}
      </CoverImageContainer>
    );
  }
}

CoverImage.propTypes = {
  setDataUri: PropTypes.func.isRequired
};

export default CoverImage;
