import React from 'react'
import { Icon, CheckBox, ListItem, Text, Left, Right, Input, Button } from 'native-base'
import { calculateTotal } from '../utils/functions'

class ItemTask extends React.Component {
  render() {
    const colorBg = this.props.task.complete ? '#ccffcc' : 'white'
    return (
      <ListItem style={{ backgroundColor: colorBg }}>
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
        <Right style={{ flexDirection: 'row' }}>
          <Button
            transparent
            onPress={e => {
              this.props.onCompleteTask(this.props.task.key)
            }}>
            <Icon name={this.props.task.complete ? 'checkmark-circle' : 'checkmark'} />
          </Button>
          <Button
            style={{ right: 10 }}
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
