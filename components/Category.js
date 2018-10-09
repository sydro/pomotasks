import React from 'react'
import { Container, Fab, Icon } from 'native-base'
import { connect } from 'react-redux'
import { addTask, delTask, setActiveTask } from '../actions'
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
    this.state = {
      new_task: false,
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

  handleNewTask() {
    const new_task = !this.state.new_task
    this.setState({ new_task })
  }

  handleSaveTask(event) {
    this.handleNewTask()
    this.props.addTask(this.props.category, { name: event.nativeEvent.text, key: uuid() })
  }

  handleRemoveTask(value) {
    this.props.delTask(this.props.category, value)
  }

  handleNavigateTask(task) {
    const { navigate } = this.props.navigation
    this.props.setActiveTask(task)
    navigate('Task', { task })
  }

  render() {
    const itemsTask = this.props.category.tasks.map(t => {
      return <ItemTask key={t.key} task={t} onRemoveTask={this.handleRemoveTask} onNavigate={this.handleNavigateTask} />
    })
    return (
      <Container>
        {itemsTask}
        <Fab style={{ backgroundColor: '#5067FF' }} position="bottomRight" onPress={this.handleNewTask}>
          <Icon name="add" />
        </Fab>
        {this.state.new_task && <AddTask onSave={this.handleSaveTask} onReturnBack={this.handleNewTask} />}
      </Container>
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
  { addTask, delTask, setActiveTask }
)(Category)
