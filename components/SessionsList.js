import React from 'react'
import { Container, Header, Content, List, ListItem, Text, Left, Right, Button, Icon } from 'native-base'
import { returnDuration, formatDate, calculateTotal } from '../utils/functions'

export default class SessionsList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.renderText = this.renderText.bind(this)
  }

  renderText(item) {
    const start = item.start
    const stop = item.stop
    const duration = returnDuration(item.duration)
    return formatDate(start) + ' -- ' + formatDate(stop) + ' -- ' + duration
  }

  render() {
    const sessions = this.props.sessions.map(s => {
      return (
        <ListItem key={s.start}>
          <Left>
            <Text style={{ fontSize: 10 }}>{this.renderText(s)}</Text>
          </Left>
          <Right>
            <Button
              small
              iconLeft={0}
              iconRight={0}
              style={{ height: 10 }}
              transparent
              onPress={e => {
                this.props.onRemoveSession(s)
              }}>
              <Icon name={'close'} />
            </Button>
          </Right>
        </ListItem>
      )
    })
    return (
      <Container>
        <Header style={{ height: 20, backgroundColor: 'lightgrey' }}>
          <Left>
            <Text style={{ textAlign: 'left' }}>Sessions </Text>
          </Left>
          <Right>
            <Text style={{ textAlign: 'right' }}>Totale: {calculateTotal(this.props.sessions)}</Text>
          </Right>
        </Header>
        <Content>
          <List>{sessions}</List>
        </Content>
      </Container>
    )
  }
}
