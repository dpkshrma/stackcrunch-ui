import Loadable from 'react-loadable';
import Loading from '../../components/About/Loading';

export default opts => {
  return Loadable(
    Object.assign(
      {},
      {
        loading: Loading
      },
      opts
    )
  );
};
