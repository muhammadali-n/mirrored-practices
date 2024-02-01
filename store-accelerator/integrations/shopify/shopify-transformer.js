import { performTransformation } from '../common-transformation';
import transformerConfig from './shopify-transform-config.json';


const transformation = (data) => {
  return performTransformation(data, transformerConfig);
};

export { transformation };

