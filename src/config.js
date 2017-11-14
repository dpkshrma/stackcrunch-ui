// TODO: move to constants file
export const TWITTER_SHARE_URL = 'https://twitter.com/share';
export const STACKCRUNCH_POST_URL = 'https://stackcrunch.io/post';
export const STACKCRUNCH_API_URL = 'http://localhost:3030';
export const URL_PREFIX = process.env.PUBLIC_URL || '';
export const SUBSCRIPTION_URL =
  'https://script.google.com/macros/s/AKfycbyIrAiwJq0GRlxgB_qd4fZbIS3N8Zxbjsm9xJDE8qxosmlywe28/exec';
export const GH_CONTRIBUTION_URL =
  'https://github.com/stackcrunch/stackcrunch/CONTRIBUTION.md';
export const PAGE_TYPES = {
  SPECIAL: {
    tags: 'tags',
    authors: 'authors'
  },
  MAIN: 'main'
};
export const REMARKABLE_OPTIONS = {
  html: true,
  linkify: true
};
// sidebar widget types
export const WIDGET_TYPES = {
  tagInfo: 'tagInfo',
  authorInfo: 'authorInfo',
  ref: 'ref',
  subscribe: 'subscribe'
};
export const STACKCRUNCH_TOKEN_ID = 'stackcrunchToken';
export const STORE_STATE_ID = 'state';
export const ACTION_PENDING_SUFFIX = 'PENDING';
export const ACTION_SUCCESS_SUFFIX = 'SUCCESS';
export const ACTION_FAILURE_SUFFIX = 'FAILURE';
export const PROMISE_TYPE_SUFFIXES = [
  ACTION_PENDING_SUFFIX,
  ACTION_SUCCESS_SUFFIX,
  ACTION_FAILURE_SUFFIX
];
