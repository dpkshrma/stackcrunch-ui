import React from 'react';
import styled from 'styled-components';
import HandIcon from '../../icons/Hand';
import MouseIcon from '../../icons/Mouse';

export const CoverImageContainer = styled.div`
  width: 100%;
  position: relative;
`;
export const ImagePreviewContainer = styled.div`
  position: relative;
  max-height: 400px;
  overflow: hidden;
  border-radius: 2px;
`;
export const ImagePreviewOverlay = styled.div`
  background-color: transparent;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
`;
export const DeleteFab = styled.div`
  position: absolute;
  right: 20px;
  top: 16px;
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

const DNDContainer = styled.div`
  color: #777;
  background-color: #eee;
  padding: 70px;
  border-radius: 2px;
  text-align: center;
  cursor: pointer;
`;
export const DNDPlaceHolder = () => (
  <DNDContainer>
    <HandIcon height={18} />
    Drag & Drop or
    <MouseIcon height={20} />
    Click to upload a Cover Image
  </DNDContainer>
);
