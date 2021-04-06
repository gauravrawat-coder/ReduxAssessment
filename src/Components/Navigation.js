import * as React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import Home from './Screens/Home';

function Other() {
  return (
    <View style={style.notDone}>
      <Text>Yet to build!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'search1';
            } else if (route.name === 'More') {
              iconName = 'bars';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#934949',
          inactiveTintColor: '#687078',
          style: style.tabStyle,
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Other} />
        <Tab.Screen name="More" component={Other} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  tabStyle: {
    backgroundColor: '#191919',
    height: Platform.OS === 'ios' ? 100 : 50,
  },
  notDone: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
