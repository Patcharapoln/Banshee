import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import Ledger from '../components/Ledger'
import AddEvent from '../components/AddEvent'
import EditEvent from '../components/EditEvent'
import Summary from '../components/Summary'
import Icon from 'react-native-vector-icons/FontAwesome'

const options = {}

const LedgerStackTab = createStackNavigator(
  {
    Ledger: Ledger,
    AddEvent: AddEvent
  },
)

LedgerStackTab.navigationOptions = {
  tabBarLabel: 'Ledger',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="money" size={25} color={tintColor} />
  )
}

const EditEventStackTab = createStackNavigator(
  { EditEvent: EditEvent },
)

EditEventStackTab.navigationOptions = {
  tabBarLabel: 'Edit event',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="pencil" size={25} color={tintColor} />
  )
}

const SummaryStackTab = createStackNavigator({
  Summary: Summary
})

SummaryStackTab.navigationOptions = {
  tabBarLabel: 'Summary',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="pie-chart" size={25} color={tintColor} />
  )
}

export default createAppContainer(
  createBottomTabNavigator(
    {
      LedgerStackTab,
      EditEventStackTab,
      SummaryStackTab
    },
    {
      tabBarOptions: {
        style: {
          height: 50,
          backgroundColor: '#1D2951'
        },
        activeTintColor: 'white',
        inactiveTintColor: '#586589',
        labelStyle: {
          fontSize: 12,
          margin: 0,
          padding: 0,
          fontWeight: 'bold'
        }
      }
    }
  )
)
