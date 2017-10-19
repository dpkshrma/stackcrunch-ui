import Loadable from 'react-loadable';
import Loading from '../../components/Loading';

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
