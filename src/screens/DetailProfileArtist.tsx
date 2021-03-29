import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

export interface DetailProfileArtistProps {
}

class DetailProfileArtist extends React.Component<DetailProfileArtistProps, any> {
  render() {
    return (
      <View>
         <Text>DetailProfileArtist</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
}

const mapDispatchToProps = dispatch => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProfileArtist);
