import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { PostService } from '../../services';
import { getPrevNextPageIds } from '../../helpers';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 16px;
  justify-content: center;
`;
const linkCSS = css`
  padding: 6px 8px;
  font-size: 12px;
  border: 1px solid rgb(246, 155, 85);
  color: #222;
  text-decoration: none;
  margin-right: 8px;
`;
const PageLink = styled(Link)`
  ${linkCSS} background: ${({ active }) => active && 'rgba(246,155,85,1)'};
  color: ${({ active }) => active && '#fff'};
  &:hover {
    background: rgba(246, 155, 85, 1);
    color: #fff;
  }
`;
const DisabledLink = styled.span`
  ${linkCSS} color: #444;
  background: #fff;
  border-color: #999;
  cursor: default;
`;

const Pager = ({ currentPageId }) => {
  const pageIds = PostService.getPageIds();
  const { prevPageId, nextPageId } = getPrevNextPageIds(pageIds, currentPageId);

  return (
    <Wrapper>
      {prevPageId ? (
        <PageLink to={`/posts/${prevPageId}`}>Prev</PageLink>
      ) : (
        <DisabledLink>Prev</DisabledLink>
      )}
      {/* TODO: show page ids in batches */}
      {/* {
        pageIds.map(pageId => {
          let active = 0;
          if (currentPageId===pageId) {
            active = 1;
          }
          return (
            <PageLink key={pageId} active={active} to={`/posts/${pageId}`}>
              {pageId}
            </PageLink>
          );
        })
      } */}
      {nextPageId ? (
        <PageLink to={`/posts/${nextPageId}`}>Next</PageLink>
      ) : (
        <DisabledLink>Next</DisabledLink>
      )}
    </Wrapper>
  );
};

export default Pager;
