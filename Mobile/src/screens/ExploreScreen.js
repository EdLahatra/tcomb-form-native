import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withApollo } from 'react-apollo';
import styled from 'styled-components/native';

import { login } from '../redux/actions/user';

const Root = styled.View``;

const T = styled.Text`
margin-top: 20px;
`;

class ExploreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterSearch: 'notApproved',
    };
  }

  login = () => this.props.login(this.props.isAuthenticated);

  render() {
    return (
      <Root>
        <T onPress={this.login}>Exploreddd</T>
      </Root>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  login: () => {
    dispatch(login());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen);
