import React from 'react'
import { Body, Icon, CheckBox, ListItem } from 'native-base'
import { Input, Button } from 'native-base'

export default class AddCategory extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
    }
  }

  render() {
    return (
      <ListItem>
        <Body>
          <Input
            placeholder=""
            value={this.state.value}
            autoFocus={true}
            onChangeText={value => {
              this.setState({ value })
            }}
            onSubmitEditing={this.props.onSave}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            ref={input => {
              this.TextInput = input
            }}
          />
        </Body>
        <Button transparent onPress={this.props.onReturnBack}>
          <Icon name={'arrow-back'} />
        </Button>
      </ListItem>
    )
  }
}
