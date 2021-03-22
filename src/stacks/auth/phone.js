import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from 'context/authContext';
import PhoneInput from 'auth/components/phoneInput';
import CodeInput from 'auth/components/codeInput';
import I18n from 'utils/i18n';

const App = ({navigation}) => {
  const {confirm, setConfirm, phoneNo} = React.useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>

        <View style={styles.wrapper}>
          {confirm ? (
            <>
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{I18n.t('VerifyScreenTitle')}</Text>
                <Text style={styles.subtitle}>
                  {I18n.t('VerifyScreenSubTitle')}
                </Text>
                <TouchableOpacity onPress={() => setConfirm(null)}>
                  <Text style={{color: '#219CAB'}}>{phoneNo}</Text>
                </TouchableOpacity>
              </View>
              <CodeInput />
            </>
          ) : (
            <>
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{I18n.t('PhoneScreenTitle')}</Text>
                <Text style={styles.subtitle}>
                  {I18n.t('PhoneScreenSubTitle')}
                </Text>
              </View>
              <PhoneInput />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  wrapper: {
    flex: 1,
    marginHorizontal: 28,
    marginTop: 140,
  },
  backButton: {
    position: 'absolute',
    top: 59,
    left: 20,
    backgroundColor: '#fff',
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  infoContainer: {
    width: 230,
  },
  title: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    color: '#3B3C53',
  },
  subtitle: {
    marginVertical: 10,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'normal',
    fontFamily: 'Montserrat',
    color: '#3B3C53',
  },
});

export default App;

// import React, {useState} from 'react';
// import {Button, TextInput, View} from 'react-native';
// import auth from '@react-native-firebase/auth';

// export default function PhoneSignIn() {
//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);

//   const [code, setCode] = useState('');

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   if (!confirm) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Button
//           title="Phone Number Sign In"
//           onPress={() => signInWithPhoneNumber('+249999099148')}
//         />
//       </View>
//     );
//   }

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <TextInput
//         value={code}
//         style={{height: 100, width: 100, borderWidth: 1}}
//         onChangeText={(text) => setCode(text)}
//       />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </View>
//   );
// }
