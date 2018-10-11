import React from 'react'
import { BackHandler, DeviceEventEmitter, View } from 'react-native'
import { connect } from 'react-redux'

class GoBack extends React.Component {
  componentDidMount() {
    DeviceEventEmitter.removeAllListeners('hardwareBackPress')
    DeviceEventEmitter.addListener('hardwareBackPress', () => {
      if (this.props.nav.index === 0) BackHandler.exitApp()
      if (this.props.nav.index === 1) this.props.navigation.navigate('Home')
      if (this.props.nav.index === 2) this.props.navigation.navigate('Category')
    })
  }

  render() {
    return <View />
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(GoBack)
