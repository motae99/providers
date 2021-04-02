import React from 'react';
import {Button} from 'react-native-elements';

const FormButton = ({title, buttonType, buttonColor, ...rest}) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={{
      borderColor: buttonColor,
      backgroundColor: 'rgba(0, 0, 0, .1)',
      borderRadius: 5,
    }}
    titleStyle={{color: buttonColor}}
    containerStyle={{}}
  />
);

export default FormButton;
