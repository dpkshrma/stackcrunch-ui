import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

class InfiniteSwitcher extends React.Component {
  constructor(props) {
    super(props);
    const items =
      React.Children.map(this.props.children, (element, key) => ({
        element,
        key: `${key}`
      })) || [];
    this.state = {
      items: [],
      allItems: items
    };
  }
  componentDidMount() {
    this.setItems();
  }
  componentWillUnmount() {
    window.clearTimeout(this.timerId);
  }
  setItems = () => {
    this.setNextItem();
    const { timeout = 5000 } = this.props;
    this.timerId = setTimeout(this.setItems, timeout);
  };
  setNextItem = () => {
    const { allItems } = this.state;
    if (allItems.length > 0) {
      const [firstItem, ...restItems] = allItems;
      this.setState({
        items: [firstItem],
        allItems: [...restItems, firstItem]
      });
    } else {
      window.clearTimeout(this.timerId);
    }
  };
  getElement = key => {
    const item = this.state.allItems.find(item => item.key === key);
    return item ? item.element : null;
  };
  render() {
    const { top = 120, delta = 40 } = this.props;
    return (
      <TransitionMotion
        styles={this.state.items.map(item => ({
          key: item.key,
          style: {
            opacity: spring(1, { stiffness: 110, damping: 40 }),
            top: spring(top, { stiffness: 110, damping: 40 })
          }
        }))}
        willLeave={() => ({
          opacity: spring(0, { stiffness: 110, damping: 40 }),
          top: spring(top - delta, { stiffness: 110, damping: 40 })
        })}
        willEnter={() => ({
          opacity: 0,
          top: top + delta
        })}
      >
        {interpolatedStyles => {
          return (
            <div>
              {interpolatedStyles.map(config => (
                <div
                  key={config.key}
                  style={{
                    opacity: config.style.opacity,
                    position: 'absolute',
                    top: `${config.style.top}px`
                  }}
                  {...this.props}
                >
                  {this.getElement(config.key)}
                </div>
              ))}
            </div>
          );
        }}
      </TransitionMotion>
    );
  }
}

export default InfiniteSwitcher;
