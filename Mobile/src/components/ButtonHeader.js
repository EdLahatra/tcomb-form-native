import React from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

const Button = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
})`
  justify-content: center;
  align-items: center;
`;

export default function ButtonHeader({ side, children, onPress, disabled }) {
  return (
    <Button onPress={onPress} disabled={disabled} side={side}>
      {children}
    </Button>
  );
}
