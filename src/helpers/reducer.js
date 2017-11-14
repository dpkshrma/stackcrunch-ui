import {
  ACTION_PENDING_SUFFIX,
  ACTION_SUCCESS_SUFFIX,
  ACTION_FAILURE_SUFFIX
} from '../config';

export const pending = action => `${action}_${ACTION_PENDING_SUFFIX}`;
export const success = action => `${action}_${ACTION_SUCCESS_SUFFIX}`;
export const failure = action => `${action}_${ACTION_FAILURE_SUFFIX}`;
