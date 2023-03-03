import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../../assets/styles/global-styles';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import colors from '../../assets/colors/colors';
import PrimaryText from '../../components/texts/primary-text';

import DiscoverItem from '../../components/cards/discover-item';
import axios from 'axios';

export default function Discover({navigation}) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'Discover', title: 'Discover'},
    {key: 'History', title: 'History'},
  ]);

  const discoverItems = [
    {
      iconType: 'FontAwesome',
      iconName: 'edit',
      title: 'Text completion',
      description: 'Turn meeting notes into a summary',
    },
    {
      iconType: 'MaterialCommunityIcons',
      iconName: 'code-not-equal-variant',
      title: 'Developer category',
      description: 'Generate or manipulate code',
    },
    {
      iconType: 'Entypo',
      iconName: 'image',
      title: 'Image generation',
      description: 'Generate any image',
    },
    {
      iconType: 'MaterialCommunityIcons',
      iconName: 'code-not-equal-variant',
      title: 'Summarization',
      description: 'Turn meeting notes to summary',
    },
  ];

  const discoverTab = () => {
    return (
      <FlatList
        data={discoverItems}
        renderItem={({item}) => (
          <DiscoverItem
            onPress={() => handleActionPressed(item.title)}
            item={item}
          />
        )}
      />
    );
  };

  async function handleActionPressed(title) {
    navigation.navigate('DynamicConversation', {title});
  }

  const historyTab = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <PrimaryText>Your conversation history will appear here</PrimaryText>
      </View>
    );
  };

  const renderTabBar = props => (
    <TabBar
      bounces
      tabStyle={{borderBottomColor: colors.gray, borderBottomWidth: 0.5}}
      {...props}
      renderLabel={({route, focused, color}) => (
        <PrimaryText
          style={{
            color: focused ? colors.white : colors.gray,
            margin: 8,
          }}>
          {route.title}
        </PrimaryText>
      )}
      indicatorStyle={{backgroundColor: colors.orange}}
      style={{backgroundColor: colors.bar}}
    />
  );

  return (
    <View style={globalStyles.container}>
      <TabView
        renderTabBar={renderTabBar}
        style={globalStyles.container}
        navigationState={{index: index, routes: routes}}
        renderScene={SceneMap({
          Discover: discoverTab,
          History: historyTab,
        })}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
