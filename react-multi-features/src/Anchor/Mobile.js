import * as React from "react"
import {Text, Linking} from "react-native"

class Anchor extends React.Component {
  handleClick = () => {
    Linking.openURL(this.props.to)
  }

  render() {
    const {label} = this.props
    return (
      <Text title={label} onPress={this.handleClick}>
        Hi
      </Text>
    )
  }
}

export default Anchor
