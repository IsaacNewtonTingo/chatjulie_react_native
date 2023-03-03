import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Discover from '../screens/dashboard/discover';
import QuickRequests from '../screens/dashboard/quick-requests';

const Stack = createNativeStackNavigator();

export default function DiscoverNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={Discover}
        name="Discover"
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={QuickRequests}
        name="QuickRequests"
      />
    </Stack.Navigator>
  );
}
