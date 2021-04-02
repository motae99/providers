import React from 'react';
import {Modal} from 'react-native';
import AddressMap from 'components/adress';
import {ProviderContext} from 'context/providerContext';

const AddressModal = () => {
  const {modals, setModal, handleAddress} = React.useContext(ProviderContext);
  return (
    <Modal
      animationType={'slide'}
      transparent={false}
      visible={modals}
      onRequestClose={() => setModal(false)}>
      <AddressMap
        closeModal={() => setModal(false)}
        notifyChange={address => {
          handleAddress(address);
        }}
      />
    </Modal>
  );
};

export default AddressModal;
