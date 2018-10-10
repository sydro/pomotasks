import React from 'react'
import { Icon, CheckBox, ListItem, Text, Left, Right, Input, Button } from 'native-base'
import { calculateTotal } from '../utils/functions'

class ItemTask extends React.Component {
  render() {
    return (
      <ListItem>
        <Left>
          <Button
            transparent
            onPress={() => {
              this.props.onNavigate(this.props.task)
            }}>
            <Text>{this.props.task.name}</Text>
            <Text style={{ fontSize: 10 }} uppercase={false}>
              {calculateTotal(this.props.task.sessions || [])}{' '}
            </Text>
          </Button>
        </Left>
        <Right>
          <Button
            transparent
            onPress={e => {
              this.props.onRemoveTask(this.props.task.key)
            }}>
            <Icon name={'trash'} />
          </Button>
        </Right>
      </ListItem>
    )
  }
}

export default ItemTask
