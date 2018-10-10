import React from 'react'
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base'
import { Linking } from 'react-native'

export default class About extends React.PureComponent {
  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>PomoTasks</Text>
            </CardItem>
            <CardItem bordered>
              <Text>
                Task management with pomodoro feature in React Native. This app was created by create-react-native-app
              </Text>
            </CardItem>
            <CardItem>
              <Text>More info:</Text>
            </CardItem>
            <CardItem>
              <Text
                style={{ fontWeight: 'bold' }}
                onPress={() => {
                  Linking.openURL('https://github.com/sydro/pomotasks')
                }}>
                https://github.com/sydro/pomotasks
              </Text>
            </CardItem>
            <CardItem footer bordered>
              <Text>@sydro</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
