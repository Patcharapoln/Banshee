import React from 'react'
import firebase from '../../config/config'
import { StyleSheet, Text, View } from 'react-native'

var sum = 0
class Transaction extends React.Component {
  calculate() {
    this.props.calculate(sum)
  }

  render() {
    sum = 0
    return Object.keys(this.props.event).map((eventList, j) => {
      sum += this.props.event[eventList].value
      this.calculate()
      return (
        <View key={j} style={styles.container}>
          <Text style={{ fontSize: 18 }}>{eventList}</Text>
          <Text style={{ color: this.props.color, fontSize: 18 }}>
            {this.props.event[eventList].value}
          </Text>
        </View>
      )
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10
  }
})

export default Transaction
