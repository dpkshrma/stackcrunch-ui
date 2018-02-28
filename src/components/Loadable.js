import React from 'react';
import { TransitionMotion, spring } from 'react-motion';
import styled from 'styled-components';

/**
 * Usage:
 * -----
 * <Loadable
 *   loader={Loader}
 *   component={import('/path/to/component')}
 *   {...componentProps}
 * />
 */
class Loadable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'loader',
      component: props.loader || null
    };
  }
  componentDidMount() {
    const { component: componentPromise } = this.props;
    componentPromise
      .then(data => {
        const { default: component = null } = data || {};
        this.setState({ key: 'component', component });
      })
      .catch(err => {
        throw err;
      });
  }
  render() {
    const Container = styled.div`
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
    `;
    const { key, component } = this.state;
    return (
      <TransitionMotion
        styles={[
          {
            key,
            data: { component },
            style: {
              opacity: spring(1),
              scale: spring(1)
            }
          }
        ]}
        willLeave={() => ({
          opacity: spring(0),
          scale: spring(0.9)
        })}
        willEnter={() => ({
          opacity: 0,
          scale: 0.9
        })}
      >
        {interpolatedStyles => {
          return (
            <div>
              {interpolatedStyles.map((config, i) => {
                const { component: Component } = config.data;
                const { opacity, scale } = config.style;
                return (
                  <Container
                    key={config.key}
                    style={{ opacity, transform: `scale(${scale})` }}
                  >
                    <Component {...this.props} />
                  </Container>
                );
              })}
            </div>
          );
        }}
      </TransitionMotion>
    );
  }
}

export default Loadable;
