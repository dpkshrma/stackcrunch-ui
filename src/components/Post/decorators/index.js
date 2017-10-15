import { CompositeDecorator } from 'draft-js';
import videoDecorator from './video';

const compositeDecorator = new CompositeDecorator([videoDecorator]);

export default compositeDecorator;
