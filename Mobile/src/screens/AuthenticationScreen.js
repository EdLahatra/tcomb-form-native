import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

import SignupForm from '../components/SignupForm';

const Root = styled.View`
  flex: 1;
  position: relative;
`;

const ButtonSignupText = styled.Text`
  font-weight: bold;
  font-size: 20;
`;

const ButtonSignup = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  height: 75;
  width: 150;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 30%;
  right: 0;
  border-top-left-radius: 20;
  borderBottomLeftRadius: 20;
  shadowOpacity: 0.4;
  shadowRadius: 5;
  shadowOffset: 0px 4px;
  shadowColor: #000;
  elevation: 2;
`;

const BottomTextContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200;
  justify-content: center;
  align-items: center;
`;

const ButtonLogin = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
})`
  justify-content: center;
  align-items: center;
`;

const ButtonLoginText = styled.Text`
  font-weight: 400;
  font-size: 16;
`;

const initialState = {
  showSignup: false,
  showLogin: false,
};

class AuthenticationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onShowSignupPress = () => this.setState({ showSignup: true });

  onBackPress = () => this.setState({ ...initialState });

  render() {
    if (this.state.showSignup) {
      return (
        <Root>
          <SignupForm onBackPress={this.onBackPress} />
        </Root>
      );
    }
    return (
      <Root>
        <ButtonSignup onPress={this.onShowSignupPress}>
          <ButtonSignupText>Get Started</ButtonSignupText>
        </ButtonSignup>
        <BottomTextContainer>
          <ButtonLogin>
            <ButtonLoginText>
               Already have an account?
            </ButtonLoginText>
          </ButtonLogin>
        </BottomTextContainer>
      </Root>
    );
  }
}

export default AuthenticationScreen;
