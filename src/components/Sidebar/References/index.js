import React from 'react';
import styled from 'styled-components';
import refs from './data';

const Wrapper = styled.div`
  border: 1px solid #e0dcbf;
  background: #fff8dc;
  padding: 12px;
  margin-top: 24px;
  position: sticky;
  top: 24px;
`;
const Title = styled.div`
  text-transform: uppercase;
  color: #777;
  padding: 16px 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid #e0dcbf;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.2em;
`;
const Ref = styled.div`
  position: relative;
  padding: 8px;
  & > a {
    text-decoration: none;
    font-size: 14px;
    color: #07c;
  }
`;

class References extends React.Component {
  render() {
    return (
      <Wrapper>
        <Title>References</Title>
        {refs.map((ref, i) => {
          return (
            <Ref key={i}>
              <a href={ref.href} target="_blank">
                {ref.title}
              </a>
            </Ref>
          );
        })}
      </Wrapper>
    );
  }
}

export default References;
