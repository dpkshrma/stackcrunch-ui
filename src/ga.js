import React from 'react';
import GoogleAnalytics from 'react-ga';
import { GOOGLE_ANALYTICS_KEY } from './config';

GoogleAnalytics.initialize(GOOGLE_ANALYTICS_KEY /*, {debug : true}*/);

const GoogleAnalyticsTracking = WrappedComponent => {
  const trackPage = page => {
    GoogleAnalytics.set({ page });
    GoogleAnalytics.pageview(page);
  };

  const HOC = props => {
    const page = props.location.pathname;
    // Enable only in production
    if (process.env.NODE_ENV.toLowerCase() === 'production') {
      trackPage(page);
    }

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default GoogleAnalyticsTracking;
