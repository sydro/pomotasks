import React from 'react'
import { Icon, ListItem, Text, Left, Right, Button, Badge } from 'native-base'

export default class Category extends React.Component {
  renderBadge() {
    const numTasks = this.props.cat.tasks.length
    if (numTasks !== 0) {
      return (
        <Badge success style={{ height: 24, top: 5 }}>
          <Text>{numTasks}</Text>
        </Badge>
      )
    } else return null
  }
  render() {
    const badge = this.renderBadge()
    return (
      <ListItem>
        <Left>
          <Button
            transparent
            onPress={() => {
              this.props.onNavigate(this.props.cat)
            }}>
            <Text>{this.props.cat.name}</Text>
            {badge}
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
