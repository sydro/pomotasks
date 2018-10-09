import React from 'react'
import { Icon, CheckBox, ListItem, Text, Left, Right, Input, Button } from 'native-base'

export default class Category extends React.Component {
  render() {
    return (
      <ListItem>
        <Left>
          <Button
            transparent
            onPress={() => {
              this.props.onNavigate(this.props.cat)
            }}>
            <Text>{this.props.cat.name}</Text>
          </Button>
        </Left>
        <Right>
          <Button
            transparent
            onPress={e => {
              this.props.onRemoveCat(this.props.cat.key)
            }}>
            <Icon name={'trash'} />
          </Button>
        </Right>
      </ListItem>
    )
  }
}
