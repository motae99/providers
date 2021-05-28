/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Booked from './booked';
import Confirmed from './confirmed';
import Canceled from './canceled';
const Item = ({item}) => {
  const services = item.additionalServices.length;
  if (item.bookingStatus === 'booked') {
    return <Booked {...{item}} />;
  }
  if (item.bookingStatus === 'confirmed') {
    return <Confirmed {...{item}} />;
  }
  if (item.bookingStatus === 'canceled') {
    return <Canceled {...{item}} />;
  }
  return null;
};

export default Item;
