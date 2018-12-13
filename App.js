import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import Expo, { Notifications } from 'expo'

import registerForNotifications from './services/push_notifications';
import store from './store'
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

const MainNavigator = createBottomTabNavigator({
  welcome: { 
    screen: WelcomeScreen,
    navigationOptions: { tabBarVisible: false },
  }, 
  auth: { 
    screen: AuthScreen, 
    navigationOptions: { tabBarVisible: false },
  },
  main: {
    navigationOptions: { tabBarVisible: false },
    screen: createBottomTabNavigator({
      map: { screen: MapScreen },
      deck: { screen: DeckScreen },
      review: {
        screen: createStackNavigator({
          review: { screen: ReviewScreen },
          settings: { screen: SettingsScreen },
        }),
        navigationOptions: {
          title: 'Review',
          tabBarLabel: 'Review',
          tabBarIcon: ({ tintColor }) => (
            <Icon name="favorite" size={25} color={tintColor} />
          )
        }
      } 
    }, {
      tabBarPosition: 'bottom',
      tabBarOptions: {
        labelStyle: { fontSize: 12 }
      }
    })
  }
}, {
  lazy: true,
  navigationOptions: {
    tabBarVisible: { visible: false }
  }
}) 

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {

  componentDidMount() {
    registerForNotifications();
    Notifications.addListener(() => {

      const { data: {text}, origin } = notification

      if(origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'OK' }]
        )
      }
    })
  }

  render() {
    return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
    );
  }  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


