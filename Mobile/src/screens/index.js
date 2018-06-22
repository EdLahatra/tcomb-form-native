import React, { Component } from 'react';
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import { BackHandler, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import styled from 'styled-components/native';

import HomeScreen from './HomeScreen';

import ExploreScreen from './ExploreScreen';
import NotificationsScreen from './NotificationsScreen';
import ProfileScreen from './ProfileScreen';
import AuthenticationScreen from './AuthenticationScreen';
import NewTweetScreen from './NewTweetScreen';

import HeaderAvatar from '../components/HeaderAvatar';
import ButtonHeader from '../components/ButtonHeader';

import { colors } from '../utils/constants';

const T = styled.Text``;

const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerTitle: 'Home',
        tabBarIcon: () => <T>Home</T>,
      }),
    },
    Explore: {
      screen: ExploreScreen,
      navigationOptions: () => ({
        headerTitle: 'Explore',
        tabBarIcon: () => <T>Explore</T>,
      }),
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        headerTitle: 'Profile',
        tabBarIcon: () => <T>Profile</T>,
      }),
    },
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.PRIMARY,
      inactiveTintColor: colors.LIGHT_GRAY,
      style: {
        backgroundColor: colors.WHITE,
        height: 50,
        paddingVertical: 5,
      },
    },
  },
);

const NewTweetModal = StackNavigator(
  {
    NewTweet: {
      screen: NewTweetScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <ButtonHeader
            side="right"
            onPress={() => {
              Keyboard.dismiss();
              navigation.goBack(null);
            }}
          >
            <T>logo 1</T>
          </ButtonHeader>
        ),
      }),
    },
  },
  {
    headerMode: 'none',
  },
);

const AppMainNav = StackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <ButtonHeader
            side="right"
            onPress={() => navigation.navigate('NewTweet')}
          >
            <T>Logo</T>
          </ButtonHeader>
        ),
      }),
    },
    NewTweet: {
      screen: NewTweetModal,
    },
  },
  {
    cardStyle: {
      backgroundColor: '#F1F6FA',
    },
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.SECONDARY,
      },
    }),
  },
);

class AppNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterSearch: 'notApproved',
    };

    this.onBackPress = this.onBackPress.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.onBackPress());
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.onBackPress());
  }
  onBackPress() {
    // eslint-disable-next-line
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    // dispatch(NavigationActions.back());
    return true;
  }

  render() {
    // eslint-disable-next-line
    const { dispatch, nav, user } = this.props;
    const navig = addNavigationHelpers({
      dispatch,
      state: nav,
    });
    if (!user.isAuthenticated) {
      return <AuthenticationScreen />;
    }
    return <AppMainNav navigation={navig} />;
  }
}

export default connect(state => ({
  nav: state.nav,
  user: state.user,
}))(AppNavigator);

export const router = AppMainNav.router;
