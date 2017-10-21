import React from 'react';
import styled from 'styled-components';

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
const Bullet = styled.div`
  height: 8px;
  width: 8px;
  border: 1px solid #e0dcbf;
  transform: rotate(135deg);
  position: absolute;
  margin-left: -26px;
  margin-top: 6px;
  background: #fff;
`;

class References extends React.Component {
  render() {
    return (
      <Wrapper>
        <Title>References</Title>
        {this.props.refs.map((ref, i) => {
          return (
            <Ref key={i}>
              <Bullet />
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
