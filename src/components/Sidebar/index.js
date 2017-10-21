import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import widgetMap from './widgetMap';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 360px;
`;

class Sidebar extends React.Component {
  render() {
    const widgets = [];
    const { visible: visibleWidgets } = this.props.widgets;
    for (let widgetType in visibleWidgets) {
      const props = visibleWidgets[widgetType];
      const widget = widgetMap[widgetType]({
        key: widgetType,
        props
      });
      widgets.push(widget);
    }
    return <Wrapper>{widgets}</Wrapper>;
  }
}

const mapStateToProps = ({ widgets }) => {
  return {
    widgets
  };
};

export default connect(mapStateToProps)(Sidebar);
