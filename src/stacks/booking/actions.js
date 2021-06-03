import firestore from '@react-native-firebase/firestore';

export const done = async item => {
  const id = item.key;
  const cashPaid = item.totalCost - item.paidAmount;
  try {
    await firestore()
      .doc(`bookings/${id}`)
      .update({status: 'done', cashPaid: cashPaid});
    return console.log('finished Done');
  } catch (error) {
    return console.log(error);
  }
};

export const clientNoShow = async item => {
  console.log('no Show', item);
};

export const requestRate = async item => {
  console.log('no Show', item);
};
