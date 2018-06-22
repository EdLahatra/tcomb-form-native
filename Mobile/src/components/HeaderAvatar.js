import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

// import { connectActionSheet } from '@expo/react-native-action-sheet';

import { logout } from '../redux/actions/user';

import Loading from './Loading';
import ButtonHeader from './ButtonHeader';

const AVATAR_SIZE = 30;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  borderRadius: ${AVATAR_RADIUS};
`;

class HeaderAvatar extends Component {
  onOpenActionSheet() {
    const options = ['Logout', 'Cancel'];
    const destructiveButtonIndex = 0;
    this.props.showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // this.props.client.resetStore();
          this.props.logout();
        }
      },
    );
  }

  render() {
    if (!this.props.info) {
      return (
        <ButtonHeader side="left" onPress={() => { /* this.props.client.resetStore(); */ this.props.logout(); }}>
          <Loading size="small" />
        </ButtonHeader>
      );
    }
    return (
      <ButtonHeader side="left" onPress={() => this.onOpenActionSheet()}>
        <Avatar source={{ uri: this.props.info.avatar }} />
      </ButtonHeader>
    );
  }
}

export default connect(state => ({ info: state.user.info }), { logout })(HeaderAvatar);
