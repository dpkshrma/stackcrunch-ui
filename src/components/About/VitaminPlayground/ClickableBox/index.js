import React from 'react';
import styled, { css } from 'styled-components';
import { StaggeredMotion, spring, presets } from 'react-motion';
import Cube from './Cube';
import FocusLine from './FocusLine';
import FocusCircle from './FocusCircle';
import Description from './Description';

const Container = styled.div`
  ${'' /* positioning */} position: absolute;
  top: ${({ top = 0 }) => `${top}px`};
  left: ${({ left = 0 }) => `${left}px`};
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  ${'' /* visual */} border-radius: 50%;
  width: 80px;
  height: 80px;
  box-shadow: 0 0 32px 0 #fff;
`;

const ClickableBox = props => {
  const defaultStyles = [
    {
      opacity: 1,
      top: props.moveToBase ? props.top : 0,
      left: props.moveToBase ? props.left : 0
    },
    {
      focusCircle: 0
    },
    {
      focusLine: 0
    },
    {
      description: 0
    }
  ];
  const finalStyles = prevStyles => {
    const nearToBase = prevStyles[0].top / props.basePosition.top > 0.99;
    const circleAlmostComplete = prevStyles[1].focusCircle > 0.99;
    const lineAlmostComplete = prevStyles[2].focusLine > 0.99;
    return [
      {
        opacity: spring(props.hide ? 0 : 1),
        top: spring(
          props.moveToBase ? props.basePosition.top : props.top,
          presets.gentle
        ),
        left: spring(
          props.moveToBase ? props.basePosition.left : props.left,
          presets.gentle
        )
      },
      {
        focusCircle: spring(nearToBase ? 1 : 0)
      },
      {
        focusLine: spring(circleAlmostComplete ? 1 : 0)
      },
      {
        description: spring(lineAlmostComplete ? 1 : 0)
      }
    ];
  };
  return (
    <StaggeredMotion defaultStyles={defaultStyles} styles={finalStyles}>
      {(
        [
          { opacity, top, left },
          { focusCircle },
          { focusLine },
          { description }
        ]
      ) => (
        <Container
          top={props.top}
          left={props.left}
          style={{ opacity, top, left }}
        >
          <Cube
            id={props.id}
            onClick={props.onClick}
            color={props.icon.color}
          />
          {!props.moveToBase ? null : (
            <div>
              <FocusCircle
                show={props.moveToBase}
                radius={40}
                percent={focusCircle}
              />
              <FocusLine
                css={css`
                  left: -199px;
                `}
                percent={focusLine}
                reverse
              />
              <FocusLine
                css={css`
                  left: 81px;
                `}
                percent={focusLine}
              />
              <Description percent={description} />
            </div>
          )}
        </Container>
      )}
    </StaggeredMotion>
  );
};

export default ClickableBox;
