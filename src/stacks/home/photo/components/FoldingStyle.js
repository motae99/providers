import { Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const perspective = 1000;
export const cardWidth = width - 20;
export const cardHeigh = cardWidth * 0.50;

export const fHeight = cardHeigh * 0.5;
export const fWidth = cardWidth;

export const sHeight = cardHeigh * 0.5;
export const sWidth = cardWidth;