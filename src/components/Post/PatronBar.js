import React from 'react';
import styled from 'styled-components';

class PatronBar extends React.Component {
  render() {
    const Container = styled.div`
      position: sticky;
      top: 0;
      background: #07c;
      width: 100%;
      height: 30px;
      z-index: 1000;
      display: flex;
      justify-content: center;
    `;
    const Wrapper = styled.div`
      max-width: 740px;
      color: #fff;
      font-family: roboto;
      font-weight: 300;
      letter-spacing: 0.09em;
      display: flex;
      align-items: center;
      & a {
        text-decoration: none;
        color: #fff;
      }
    `;
    return (
      <Container>
        <Wrapper>
          If you like what you see, now you can support me on Partreon&nbsp;
          <span role="img" aria-label="pointing right">
            👉
          </span>
          <a href="https://www.patreon.com/bePatron?u=4956651" target="_blank">
            Become a Patron!
          </a>
        </Wrapper>
      </Container>
    );
  }
}

export default PatronBar;
