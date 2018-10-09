import React from 'react'
import { Container, Header, Content, List, ListItem, Text, Left, Right } from 'native-base'
import { returnDuration } from '../utils/functions'

function calculateTotal(items) {
  let total = 0
  //for (let item of items) {
  //console.log(item)
  //}
  return '' + returnDuration(total)
}

export default class SessionsList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.renderText = this.renderText.bind(this)
  }

  renderText(item) {
    const start = item.start
    const stop = item.stop
    const duration = returnDuration(item.duration)
    return start + ' ' + stop + ' ' + duration
  }

  render() {
    return (
      <Container>
        <Header style={{ height: 20, backgroundColor: 'lightgrey' }}>
          <Left>
            <Text style={{ textAlign: 'left' }}>Sessions </Text>
          </Left>
          <Right>
            <Text style={{ textAlign: 'right' }}>Totale: {calculateTotal(this.props.items)}</Text>
          </Right>
        </Header>
        <Content>
          <List
            dataArray={this.props.items}
            renderRow={item => (
              <ListItem>
                <Text style={{ fontSize: 10 }}>{this.renderText(item)}</Text>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    )
  }
}
