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

// route components
const About = asyncLoad({
  loader: () => import(`./components/About`),
  loading: AboutLoading
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
      <Route exact path={uri('/')} component={About} />
      <App>
        <Switch>
          <Route exact component={PostList} path={uri('@:username')} />
          <Route exact component={PostList} path={uri('posts/')} />
          <Route exact component={Post} path={uri('post/:slug')} />
          <Route exact component={Profile} path={uri('profile')} />
          <Route exact component={Join} path={uri('join')} />
          <Route exact component={PostInput} path={uri('write/:slug?')} />
          <Route exact component={Contributions} path={uri('contributions')} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </Switch>
    {/* </AnimatedSwitch> */}
  </Provider>
);
