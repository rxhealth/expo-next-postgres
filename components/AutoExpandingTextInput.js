import React from 'react';
import { TextInput } from 'react-native';

export default class AutoExpandingTextInput extends React.Component {
  state = {
    height: 0,
  };

  _handleContentSizeChange = event => {
    this.setState({ height: event.nativeEvent.contentSize.height });
  };

  blur = () => {
    this.refs.content.blur();
  };

  render() {
    return (
      <TextInput
        {...this.props}
        ref="content"
        multiline
        onContentSizeChange={this._handleContentSizeChange}
        style={[this.props.style, { height: Math.max(35, this.state.height) }]}
        value={this.props.value}
      />
    );
  }
}
