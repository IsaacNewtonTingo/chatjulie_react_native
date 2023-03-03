import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import globalStyles from '../../assets/styles/global-styles';
import PrimaryText from '../../components/texts/primary-text';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {HStack} from 'native-base';

import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../assets/colors/colors';
import SecondaryText from '../../components/texts/secondary-text';

export default function Settings() {
  return (
    <KeyboardAwareScrollView style={globalStyles.container}>
      {/* <PrimaryText style={{textAlign: 'left', marginVertical: 20}}>
        My profile
      </PrimaryText> */}

      {/* <TouchableOpacity style={styles.userDetailsContainer}>
        <HStack alignItems="center">
          <View style={styles.imageContainer}>
            <SecondaryText style={{fontSize: 20}}>J</SecondaryText>
          </View>

          <View style={styles.right}>
            <PrimaryText style={{textAlign: 'left'}}>
              James St. Patrick
            </PrimaryText>
            <PrimaryText style={{textAlign: 'left'}}>Designer</PrimaryText>
          </View>
        </HStack>

        <Entypo name="edit" color={colors.white} size={20} />
      </TouchableOpacity> */}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 65,
    height: 65,
    borderRadius: 40,
    backgroundColor: colors.lightBlue,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetailsContainer: {
    backgroundColor: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 14,
  },
  right: {
    marginLeft: 20,
  },
});
