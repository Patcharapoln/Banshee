import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'
import Login from '../components/Login'
import Ledger from '../components/Ledger'
import AddEvent from '../components/AddEvent'
import Summary from '../components/Summary'

export default createStackNavigator(
  {
    Login: Login,
  },
    {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    },
  }
)
