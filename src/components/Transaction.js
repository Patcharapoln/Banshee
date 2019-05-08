import React from 'react'
import firebase from '../../config/config'
import { StyleSheet, Text, View } from 'react-native'

class Transaction extends React.Component {

  render() {
    return this.props.date.map((eventDay, i) => {
      var event = []
      event = this.props.event[eventDay]
      return (
        <View style={{flex: 1, backgroundColor:'white', alignItems:'center'}} key={i}>
          <Text style={{fontWeight:'bold'}}>{eventDay}</Text>
          {Object.keys(event).map((eventList, j) => {
            console.log(eventList)
            return (
              <View key={j} style={styles.container}>
                <Text>{eventList}</Text>
                <Text>{event[eventList]}</Text>
              </View>
            )
          })}
        </View>
      )
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'80%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default Transaction
