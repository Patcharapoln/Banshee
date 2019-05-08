import React from 'react'
import firebase from './config/config'
import { StyleSheet, Text, View } from 'react-native'
import AppNavigator from './src/navigator/AppNavigator'
import Loading from './src/components/Loading';
export default class App extends React.Component {


  render() {
    
    return <AppNavigator />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
