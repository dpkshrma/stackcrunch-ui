import React from 'react';
// import { AnimatedSwitch } from 'react-router-transition';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { asyncLoad } from './helpers/routes';
import store from './store';
import { URL_PREFIX } from './config';
// import { routeAnimation } from './helpers/routes';
import AboutLoading from './components/About/Loading';
import Loadable from './components/Loadable';
import ga from './ga';

// route components
const rc = ({ component, loader }) => props => (
  <Loadable loader={loader} component={component} {...props} />
);

const About = rc({
  component: import(`./components/About`),
  loader: AboutLoading
});
const Post = asyncLoad({ loader: () => import(`./components/Post`) });
const PostList = asyncLoad({ loader: () => import(`./components/PostList`) });
const NotFound = asyncLoad({ loader: () => import(`./components/NotFound`) });
const Join = asyncLoad({ loader: () => import(`./components/Join`) });
const Profile = asyncLoad({ loader: () => import(`./components/Profile`) });
const PostInput = asyncLoad({ loader: () => import(`./components/PostInput`) });
const Contributions = asyncLoad({
  loader: () => import(`./components/Contributions`)
});
const UserProfile = asyncLoad({
  loader: () => import(`./components/UserProfile`)
});

const uri = path => `${URL_PREFIX}/${path}`;

// route animation helper
// const { bounceTransition, mapStyles } = routeAnimation;

export default (
  <Provider store={store}>
    {/* <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
      > */}
    <Switch>
      <Route exact path={uri('/')} render={About} />
      <App>
        <Switch>
          <Route exact component={ga(UserProfile)} path={uri('@:username')} />
          <Route exact component={ga(PostList)} path={uri('posts/')} />
          <Route exact component={ga(Post)} path={uri('post/:slug')} />
          <Route exact component={ga(Profile)} path={uri('profile')} />
          <Route exact component={ga(Join)} path={uri('join')} />
          <Route exact component={ga(PostInput)} path={uri('write/:slug?')} />
          <Route
            exact
            component={ga(Contributions)}
            path={uri('contributions')}
          />
          <Route component={ga(NotFound)} />
        </Switch>
      </App>
    </Switch>
    {/* </AnimatedSwitch> */}
  </Provider>
);
