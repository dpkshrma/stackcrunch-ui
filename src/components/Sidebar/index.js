import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Subscribe from './Subscribe';
import References from './References';
import { WIDGET_TYPES } from '../../config';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const widgetMap = {
  [WIDGET_TYPES.tagInfo]: ({ props = {}, key }) => {},
  [WIDGET_TYPES.authorInfo]: ({ props = {}, key }) => {},
  [WIDGET_TYPES.ref]: ({ props = {}, key }) => (
    <References {...props} key={key} />
  )
};

class Sidebar extends React.Component {
  render() {
    const widgets = [];
    for (let widgetType in this.props.widgets.visible) {
      const widget = widgetMap[widgetType]({ key: widgetType });
      widgets.push(widget);
    }
    return (
      <Wrapper>
        <Subscribe />
        {widgets}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ widgets }) => {
  return {
    widgets
  };
};

export default connect(mapStateToProps)(Sidebar);
