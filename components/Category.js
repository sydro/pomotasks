import React from 'react'
import { Container, Content, Fab, Icon, Footer, FooterTab, Text, Button } from 'native-base'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { addTask, delTask, setActiveTask, completeTask } from '../actions'
import ItemTask from './ItemTask'
import AddTask from './AddItem'
import { uuid } from '../utils/functions'

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.handleNewTask = this.handleNewTask.bind(this)
    this.handleSaveTask = this.handleSaveTask.bind(this)
    this.handleRemoveTask = this.handleRemoveTask.bind(this)
    this.handleNavigateTask = this.handleNavigateTask.bind(this)
    this.handleCompleteTask = this.handleCompleteTask.bind(this)
    this.renderItems = this.renderItems.bind(this)
    this.state = {
      new_task: false,
      taskItems: null,
      tab: false,
      taskItems: [],
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('cat').name + ' - Tasks',
      headerStyle: {
        backgroundColor: '#00A786',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }

  async handleNewTask() {
    const new_task = !this.state.new_task
    await this.setState({ new_task, tab: false })
    this.renderItems(this.state.tab)
  }

  async handleSaveTask(event) {
    this.handleNewTask()
    await this.props.addTask(this.props.category, { name: event.nativeEvent.text, key: uuid() })
    this.renderItems(this.state.tab)
  }

  async handleRemoveTask(value) {
    await this.props.delTask(this.props.category, value)
    this.renderItems(this.state.tab)
  }

  async handleCompleteTask(value) {
    await this.props.completeTask(this.props.category, value)
    this.renderItems(this.state.tab)
  }

  handleNavigateTask(task) {
    const { navigate } = this.props.navigation
    this.props.setActiveTask(task)
    const refreshFn = this.renderItems
    navigate('Task', { task, refreshFn })
  }

  componentDidMount() {
    this.renderItems(this.state.tab)
  }

  renderItems(check = this.state.tab) {
    const tasks = this.props.category.tasks.filter(t => {
      if (check === 'All') {
        return t
      } else {
        if (t.complete === undefined && check === false) return t
        if (t.complete === check) return t
      }
    })
    this.setState({ tab: check, taskItems: tasks })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 0.93, backgroundColor: 'white' }}>
          {this.state.new_task && <AddTask onSave={this.handleSaveTask} onReturnBack={this.handleNewTask} />}
          {this.state.taskItems.map(t => {
            return (
              <ItemTask
                key={t.key}
                task={t}
                onRemoveTask={this.handleRemoveTask}
                onCompleteTask={this.handleCompleteTask}
                onNavigate={this.handleNavigateTask}
              />
            )
          })}
        </ScrollView>
        <Footer style={{ flex: 0.07 }}>
          <FooterTab>
            <Button
              active={this.state.tab === false}
              warning={this.state.tab === false}
              onPress={() => {
                this.renderItems(false)
              }}>
              <Text>Open</Text>
            </Button>
            <Button
              active={this.state.tab === true}
              warning={this.state.tab === true}
              onPress={() => {
                this.renderItems(true)
              }}>
              <Text>Completed</Text>
            </Button>
            <Button
              active={this.state.tab === 'All'}
              warning={this.state.tab === 'All'}
              onPress={() => {
                this.renderItems('All')
              }}>
              <Text>All</Text>
            </Button>
          </FooterTab>
        </Footer>
        <Fab style={{ backgroundColor: '#5067FF', bottom: 20 }} position="bottomRight" onPress={this.handleNewTask}>
          <Icon name="add" />
        </Fab>
      </View>
    )
  }
}

// consoleLog = state => {
//   console.log(state)
//   return {}
// }
//
// const mapStateToProps = state => consoleLog

const mapStateToProps = state => ({
  category: state.dataReducer.active_category.category,
})

export default connect(
  mapStateToProps,
  { addTask, delTask, setActiveTask, completeTask }
)(Category)
