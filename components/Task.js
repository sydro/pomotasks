import React from 'react'
import { View, Text, Container, Button } from 'native-base'
import { StyleSheet } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { uuid, returnDuration } from '../utils/functions'
import Sessions from './SessionsList'

const styles = StyleSheet.create({
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 100,
  },
})

class Task extends React.Component {
  constructor() {
    super()
    this.interval = null
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.state = {
      fill: 0,
      running: false,
      seconds: 0,
      runningSession: 0,
      sessions: [],
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('task').name,
      headerStyle: {
        backgroundColor: '#00A786',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }

  startTimer() {
    const new_key = uuid
    const new_session = { key: new_key, start: Date.now() }
    const sessions = this.state.sessions
    sessions.unshift(new_session)
    this.setState({ running: true, sessions, runningSession: new_key })
    this.interval = setInterval(() => {
      if (this.state.fill >= 100) {
        fill = 0
      } else {
        fill = this.state.fill
      }
      this.setState({ fill: fill + 1.67, seconds: this.state.seconds + 1 })
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.interval)
    // Inserire salvataggio della sessione
    const sessions = this.state.sessions.map(el => {
      if (el.key === this.state.runningSession) {
        el.stop = Date.now()
        el.duration = this.state.seconds
        console.log(el, this.state.runningSession)
      }
      return el
    })

    this.setState({ fill: 0, running: false, seconds: 0, runningSession: 0, sessions })
  }

  componentDidMount() {}

  componentWillUnmount() {
    if (this.interval !== null) this.stopTimer()
  }

  render() {
    return (
      <Container>
        <Grid>
          <Row size={50}>
            <Col size={15} />
            <Col size={70}>
              <AnimatedCircularProgress
                style={{ alignSelf: 'center', marginTop: 20 }}
                size={200}
                width={15}
                fill={this.state.fill}
                rotation={0}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
                ref={ref => (this.circularProgress = ref)}>
                {fill => <Text>{returnDuration(this.state.seconds)}</Text>}
              </AnimatedCircularProgress>
            </Col>
            <Col size={15} />
          </Row>
          <Row size={15}>
            <Col>
              <Button
                rounded
                success={!this.state.running}
                disabled={this.state.running}
                style={styles.actionButton}
                onPress={this.startTimer}>
                <Text> Start </Text>
              </Button>
            </Col>
            <Col>
              <Button
                rounded
                danger={this.state.running}
                disabled={!this.state.running}
                style={styles.actionButton}
                onPress={this.stopTimer}>
                <Text> Stop </Text>
              </Button>
            </Col>
          </Row>
          <Row size={35}>
            <Sessions items={this.state.sessions} />
          </Row>
        </Grid>
      </Container>
    )
  }
}

export default Task
