import React from 'react';
// import { AnimatedSwitch } from 'react-router-transition';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { asyncLoad } from './helpers/routes';
import store from './store';
// import { routeAnimation } from './helpers/routes';

// route components
const Post = asyncLoad({ loader: () => import(`./components/Post`) });
const PostList = asyncLoad({ loader: () => import(`./components/PostList`) });
const NotFound = asyncLoad({ loader: () => import(`./components/NotFound`) });
const Join = asyncLoad({ loader: () => import(`./components/Join`) });
const Profile = asyncLoad({ loader: () => import(`./components/Profile`) });
const PostInput = asyncLoad({ loader: () => import(`./components/PostInput`) });
const Contributions = asyncLoad({
  loader: () => import(`./components/Contributions`)
});

// route animation helper
// const { bounceTransition, mapStyles } = routeAnimation;

export default (
  <Provider store={store}>
    <App>
      {/* <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
      > */}
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/posts" />} />
        <Route exact path="/@:username" component={PostList} />
        <Route exact component={PostList} path="/posts/" />
        <Route exact component={Post} path="/post/:slug" />
        <Route exact component={Profile} path="/profile" />
        <Route exact component={Join} path="/join" />
        <Route exact component={PostInput} path="/write/:slug?" />
        <Route exact component={Contributions} path="/contributions" />
        <Route component={NotFound} />
      </Switch>
      {/* </AnimatedSwitch> */}
    </App>
  </Provider>
);
