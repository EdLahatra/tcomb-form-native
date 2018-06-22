import React, { Component } from 'react';
import styled from 'styled-components/native';
import { /* Platform, */ Keyboard } from 'react-native';
import Touchable from '@appandflow/touchable';

import { connect } from 'react-redux';

// import { colors } from '../utils/constants';

const Root = styled.View`
  flex: 1;
  align-items: center;
`;

const Wrapper = styled.View`
  height: 80%;
  width: 90%;
  padding-top: 5;
  position: relative;
`;

const Input = styled.TextInput.attrs({
  multiline: true,
  placeholder: "What's happening?",
  maxLength: 140,
  // selectionColor: Platform.OS === 'ios' && colors.PRIMARY,
  autoFocus: true,
})`
  height: 40%;
  width: 100%;
  fontSize: 18;
`;

const TweetButton = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, left: 20, right: 20, bottom: 20 },
})`
  justify-content: center;
  align-items: center;
  width: 80;
  height: 40;
  border-radius: 20;
  position: absolute;
  top: 60%;
  right: 0;
`;

const TweetButtonText = styled.Text`
  font-size: 16;
`;

const TextLength = styled.Text`
  font-size: 18;
  position: absolute;
  top: 45%;
  right: 5%;
`;

class NewTweetScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  onChangeText = text => this.setState({ text });

  onCreateTweetPress = async () => {
    const { user } = this.props;
    Keyboard.dismiss();
    this.props.navigation.goBack(null);
  }

  get textLength() {
    return 140 - this.state.text.length;
  }

  get buttonDisabled() {
    return this.state.text.length < 5;
  }

  render() {
    return (
      <Root>
        <Wrapper>
          <Input value={this.state.text} onChangeText={this.onChangeText} />
          <TextLength>
            {this.textLength}
          </TextLength>
          <TweetButton onPress={this.onCreateTweetPress} disabled={this.buttonDisabled}>
            <TweetButtonText>Tweet</TweetButtonText>
          </TweetButton>
        </Wrapper>
      </Root>
    );
  }
}

export default connect(state => ({ user: state.user.info }))(NewTweetScreen);
