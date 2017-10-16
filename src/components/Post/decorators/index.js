import { CompositeDecorator } from 'draft-js';
import MultiDecorator from './MultiDecorator';
import composableDecorators from './composable';
import customDecorators from './custom';

const compositeDecorator = new CompositeDecorator([...composableDecorators]);

export default new MultiDecorator([compositeDecorator, ...customDecorators]);
