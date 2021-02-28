import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

const _ = require('lodash');

class PTouchableOpacity extends React.PureComponent<TouchableOpacityProps> {
  render() {
    const props = this.props;
    const { children } = props;

    return (
      <TouchableOpacity
        activeOpacity={0.69}
        {...props}
        onPress={_.debounce(props.onPress ? props.onPress : () => {}, 200, {
          leading: true,
          trailing: false,
        })}
      >
        {children}
      </TouchableOpacity>
    );
  }
}
export default PTouchableOpacity;
