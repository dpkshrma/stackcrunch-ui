import React from 'react';
import styled from 'styled-components';
import Subscribe from './Subscribe';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Sidebar = props => {
  return (
    <Wrapper>
      <Subscribe />
    </Wrapper>
  );
};

export default Sidebar;
