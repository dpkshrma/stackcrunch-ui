import React from 'react';
import styled from 'styled-components';
import Subscribe from './Subscribe';
import References from './References';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Sidebar = props => {
  return (
    <Wrapper>
      {/* <References /> */}
      <Subscribe />
    </Wrapper>
  );
};

export default Sidebar;
