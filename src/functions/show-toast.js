import React from 'react';
import {Toast} from 'native-base';
import MyToast from '../components/toasts/my-toast';

export function showMyToast({status, title, description}) {
  Toast.show({
    placement: 'top',
    render: ({}) => {
      return (
        <MyToast
          status={status}
          title={title}
          description={description}
          onPress={() => Toast.close()}
        />
      );
    },
  });
}
