import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '@react-native-community/checkbox';

import {showMyToast} from '../../functions/show-toast';
import {Formik} from 'formik';
import * as yup from 'yup';

import PrimaryText from '../../components/texts/primary-text';
import globalStyles from '../../assets/styles/global-styles';
import PrimaryInput from '../../components/inputs/primary-input';
import PrimaryButton from '../../components/buttons/primary-button';

import {TouchableOpacity} from 'react-native';
import {HStack} from 'native-base';
import colors from '../../assets/colors/colors';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Login({navigation}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  async function handleLogin(values, toggleCheckBox) {
    navigation.navigate('TabNav');
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      style={globalStyles.container}>
      <Image
        style={globalStyles.logoContainer}
        source={require('../../assets/images/dfLogo.png')}
      />

      <PrimaryText style={{fontSize: 20}}>Login to your account</PrimaryText>

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => handleLogin(values, toggleCheckBox)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
          isSubmitting,
        }) => (
          <View style={styles.formContainer}>
            <PrimaryText style={globalStyles.label}>Email</PrimaryText>
            <PrimaryInput
              name="email"
              placeholder="Type your email address here"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              style={styles.input}
            />

            {errors.email && touched.email && (
              <PrimaryText style={globalStyles.errorText}>
                {errors.email}
              </PrimaryText>
            )}

            <PrimaryText style={globalStyles.label}>Password</PrimaryText>

            <View>
              <PrimaryInput
                name="password"
                placeholder="********"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={!showPass}
                style={styles.input}
                InputRightElement={
                  <Pressable
                    style={globalStyles.iconRight}
                    onPress={() => setShowPass(!showPass)}>
                    <FontAwesome
                      name={showPass ? 'eye' : 'eye-slash'}
                      size={20}
                      color="black"
                    />
                  </Pressable>
                }
              />
            </View>

            {errors.password && touched.password && (
              <PrimaryText style={globalStyles.errorText}>
                {errors.password}
              </PrimaryText>
            )}

            <View style={globalStyles.spaceBetween}>
              <HStack alignItems="center">
                <CheckBox
                  tintColors={true ? 'red' : 'white'}
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />

                <PrimaryText style={globalStyles.label}>
                  Remember me
                </PrimaryText>
              </HStack>

              <TouchableOpacity
              // onPress={() => navigation.navigate('ResetPassword')}
              >
                <PrimaryText
                  style={[globalStyles.label, {color: colors.orange}]}>
                  Forgot password?
                </PrimaryText>
              </TouchableOpacity>
            </View>

            <PrimaryButton
              title="Login"
              onPress={handleSubmit}
              disabled={!isValid}
              style={{marginVertical: 20}}
            />

            <HStack alignItems="center" justifyContent="center">
              <PrimaryText>Don't have an account ? </PrimaryText>

              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <PrimaryText style={{color: colors.orange}}>
                  Signup here
                </PrimaryText>
              </TouchableOpacity>
            </HStack>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },

  formContainer: {
    padding: 40,
  },
  input: {
    marginVertical: 10,
  },
});
