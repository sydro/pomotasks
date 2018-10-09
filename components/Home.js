import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Container, Fab, Icon } from 'native-base'
import { ActivityIndicator, View, StyleSheet, AsyncStorage } from 'react-native'
import Expo from 'expo'
import ItemCategory from './ItemCategory'
import AddCategory from './AddItem'
import { uuid } from '../utils/functions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.renderCategories = this.renderCategories.bind(this)
    this.handlePressNewCat = this.handlePressNewCat.bind(this)
    this.handleSaveCat = this.handleSaveCat.bind(this)
    this.handleRemoveCat = this.handleRemoveCat.bind(this)
    this.handleNavigateCat = this.handleNavigateCat.bind(this)
    this.navigate = props.navigation.navigate
    this.state = {}
  }

  componentDidMount() {
    this.props.getData() //call our action
  }

  static navigationOptions = {
    title: 'PomoTasks',
    headerStyle: {
      backgroundColor: '#6b52ae',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  handlePressNewCat() {
    const new_cat = !this.state.new_cat
    this.setState({ new_cat })
  }

  handleSaveCat(event) {
    this.handlePressNewCat()
    this.props.addCategory(this.props.data, { name: event.nativeEvent.text, key: uuid, tasks: [] })
  }

  handleRemoveCat(value) {
    this.props.delCategory(this.props.data, value)
  }

  handleNavigateCat(cat) {
    const { navigate } = this.props.navigation
    this.props.setActiveDirectory(cat)
    navigate('Category', { cat })
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ isReady: true })
  }

  renderCategories() {
    return this.props.data.categories.map(cat => {
      return (
        <ItemCategory key={cat.name} cat={cat} onRemoveCat={this.handleRemoveCat} onNavigate={this.handleNavigateCat} />
      )
    })
  }

  render() {
    if (this.props.loading) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator animating={true} />
        </View>
      )
    } else {
      if (this.state.isReady) {
        const categories = this.renderCategories()
        return (
          <Container>
            {this.state.new_cat && <AddCategory onSave={this.handleSaveCat} onReturnBack={this.handlePressNewCat} />}
            {categories}
            <Fab style={{ backgroundColor: '#5067FF' }} position="bottomRight" onPress={this.handlePressNewCat}>
              <Icon name="add" />
            </Fab>
          </Container>
        )
      } else {
        return null
      }
    }
  }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
    loading: state.dataReducer.loading,
    data: state.dataReducer.data,
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

//Connect everything
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})
