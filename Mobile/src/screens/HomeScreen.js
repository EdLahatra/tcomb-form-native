import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackHandler, ActivityIndicator, FlatList } from 'react-native';

import { getUserInfo } from '../redux/actions/user';


import styled from '../utils/styled';

const Root = styled.View`
  flex: 1;
  padding-top: 10;
  justify-content: center;
`;

const ScrollView = styled.ScrollView`

`;

// const T = styled.Text``;

class HomeScreen extends Component {

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareButtonPress');
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareButtonPress', () => this.backButtonPress());
  }

  componentDidMount() {
    this.getUserInfo();
  }

  backButtonPress() {
    // const { dispatch, navigation, nav, user } = this.props;
    if (2 < 1) {
      return false;
    }
    this.props.navigation.goBack(null);
    return true;
  }

  async getUserInfo() {
    this.props.getUserInfo({ info: { user: {name: "pascal" }, token: "token" }});
  }

  renderItem = ({ item }) => <FeedCard {...item} />;

  // eslint-disable-next-line
  onFavoritePress = () => console.log(this.state);

  render() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <Root>
          <ActivityIndicator size="large" />
        </Root>
      );
    }

    return (
      <Root>
        <ScrollView>
          <FlatList
            contentContainerStyle={{ alignSelf: 'stretch' }}
            data={data.getTweets}
            // eslint-disable-next-line
            keyExtractor={item => item._id}
            renderItem={this.renderItem}
          />
        </ScrollView>
      </Root>
    );
  }
}

export default connect(state => ({
  data: state.user.data,
  nav: state.nav,
  user: state.user,
}), { getUserInfo })(HomeScreen);
