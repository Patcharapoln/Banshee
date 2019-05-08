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
import Loading from '../components/Loading';

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
