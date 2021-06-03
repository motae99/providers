/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import BottomSheet from './bottomSheet';
// import BottomSheetBackdrop from 'components/customBackdrop';
import Booked from './booked';
import Confirmed from './confirmed';
import Canceled from './canceled';
const Item = ({item}) => {
  const bottomSheetModalRef = React.useRef(null);

  const confirmedSnapPoints = React.useMemo(() => [-1, '35%', '70%'], []);

  // callbacks
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  if (item.bookingStatus === 'booked') {
    return <Booked {...{item, handlePresentModalPress}} />;
  }
  if (item.bookingStatus === 'confirmed') {
    return (
      <>
        <Confirmed {...{item, handlePresentModalPress}} />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={confirmedSnapPoints}
          backdropComponent={BottomSheetBackdrop}>
          <BottomSheet {...{item}} />
        </BottomSheetModal>
      </>
    );
  }
  if (item.bookingStatus === 'canceled') {
    return <Canceled {...{item, handlePresentModalPress}} />;
  }
  return null;
};

export default Item;
