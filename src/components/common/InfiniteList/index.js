import React from 'react';
import promisifySetState from 'promisify-setstate';

class InfiniteList extends React.Component {
  state = {
    isLoading: false,
    endOfList: false,
    nextPage: null
  };
  componentDidMount() {
    this.loadNewItems();
  }
  loadNewItems = () => {
    const { loadMore, onLoadFailure } = this.props;
    const { nextPage } = this.state;
    this.setState({ isLoading: true })
      .then(() => loadMore(nextPage))
      .then(({ value: { nextPage, remaining } }) => {
        return this.setState({
          isLoading: false,
          endOfList: remaining <= 0,
          nextPage
        });
      })
      .catch(onLoadFailure || console.error);
  };
  render() {
    const { isLoading, endOfList } = this.state;
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        isLoading,
        endOfList,
        loadNewItems: this.loadNewItems
      });
    });
    return <div>{children}</div>;
  }
}
InfiniteList.Loader = ({ children, isLoading }) => {
  return <div>{isLoading ? children : null}</div>;
};
InfiniteList.EndOfList = ({ children, endOfList }) => {
  return <div>{endOfList ? children : null}</div>;
};
InfiniteList.LoadMore = ({ children, isLoading, endOfList, loadNewItems }) => {
  return (
    <div onClick={loadNewItems}>
      {!isLoading && !endOfList ? children : null}
    </div>
  );
};

export default promisifySetState(InfiniteList);
