import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  Text
} from 'react-native'
import firebase from '../../config/config'
import Transaction from './Transaction'

var width = Dimensions.get('window').width //full width
var height = Dimensions.get('window').height

class Ledger extends React.Component {
  state = {
    user: firebase.database().ref(firebase.auth().currentUser.uid),
    incomeEvent: [],
    incomeDate: [],
    expenseEvent: [],
    expenseDate: []
  }

  componentDidMount() {
    this.state.user.on(
      'value',
      function(snapshot) {
        var event = snapshot.val()
        var incomeDate = []
        var expenseDate = []
        this.setState({ incomeEvent: event.Income })
        Object.keys(event.Income).map(income => {
          incomeDate.push(income)
        })
        this.setState({ incomeDate: incomeDate })

        this.setState({ expenseEvent: event.Expense })
        Object.keys(event.Expense).map(expense => {
          expenseDate.push(expense)
        })
        this.setState({expenseDate: expenseDate})
      }.bind(this)
    )
  }

  render() {
    return (
      // <Transaction/>
      <View style={styles.container}>
        <Image source={require('../../assets/money.jpg')} style={styles.logo} />
        <ScrollView style={{ backgroundColor: '#1D2951', width: '80%' }}>
          <Transaction event={this.state.incomeEvent} date={this.state.incomeDate} />
          <Transaction event={this.state.expenseEvent} date={this.state.expenseDate} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: width,
    height: width * 0.33911,
    resizeMode: 'contain',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1D2951',
    marginTop: 20
  }
})

export default Ledger
