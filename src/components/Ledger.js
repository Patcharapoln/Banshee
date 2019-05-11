import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native'
import firebase from '../../config/config'
import Transaction from './Transaction'
import ModalSelector from 'react-native-modal-selector'

var width = Dimensions.get('window').width //full width
var height = Dimensions.get('window').height

var sumIncome = 0
var sumExpense = 0
var balance = 0
var color = ''
let index = 1
const monthList = [
  { key: index++, label: 'January' },
  { key: index++, label: 'February' },
  { key: index++, label: 'March' },
  { key: index++, label: 'April' },
  { key: index++, label: 'May' },
  { key: index++, label: 'June' },
  { key: index++, label: 'July' },
  { key: index++, label: 'August' },
  { key: index++, label: 'September' },
  { key: index++, label: 'October' },
  { key: index++, label: 'November' },
  { key: index++, label: 'December' }
]
class Ledger extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Image
        style={{ width: 30, height: 30 }}
        source={require('../../assets/pig.png')}
      />
    ),
    headerRight: (
      <Button
        title="Add Event"
        onPress={() => navigation.navigate('AddEvent')}
      />
    )
  })
  state = {
    month: '',
    monthKey: '',
    sumIncome: 0,
    sumExpense: 0,
    incomeEvent: [],
    expenseEvent: [],
    user: firebase.database().ref(firebase.auth().currentUser.uid)
  }

  query() {
    //Query income
    firebase
      .database()
      .ref(firebase.auth().currentUser.uid)
      .orderByChild('month_type')
      .equalTo(this.state.monthKey + '_income')
      .on(
        'value',
        function(snapshot) {
          this.setState({ incomeEvent: snapshot.val() })
        }.bind(this)
      )
    //Query expense
    firebase
      .database()
      .ref(firebase.auth().currentUser.uid)
      .orderByChild('month_type')
      .equalTo(this.state.monthKey + '_expense')
      .on(
        'value',
        function(snapshot) {
          this.setState({ expenseEvent: snapshot.val() })
        }.bind(this)
      )
  }

  checkBalance(inc, ex) {
    if (inc - ex > 0) {
      console.log(color)
      color = 'rgb(128,221,172)'
    } else if (inc - ex < 0) {
      color = 'rgb(240,128,128)'
    } else {
      color = 'black'
    }
  }

  render() {
    sumIncome = 0
    sumExpense = 0
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/money.jpg')} style={styles.logo} />
        <ModalSelector
          style={{ width: '80%' }}
          data={monthList}
          initValue="Please select month"
          accessible={true}
          scrollViewAccessibilityLabel={'Scrollable options'}
          cancelButtonAccessibilityLabel={'Cancel Button'}
          onChange={option => {
            this.setState({ monthKey: option.key, month: option.label })
            this.query()
          }}
        >
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 10,
              height: 40,
              fontSize: 16
            }}
            editable={false}
            placeholder="Please select month"
            value={this.state.month + ''}
          />
        </ModalSelector>
        <ScrollView
          style={{
            width: '80%',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#ccc',
            padding: 10,
            marginTop: 10,
            marginBottom: 10
          }}
        >
          {Object.keys(this.state.incomeEvent).map((eventList, j) => {
            sumIncome += this.state.incomeEvent[eventList].value
            return (
              <View key={j} style={styles.transaction}>
                <Text style={{ fontSize: 16 }}>{eventList}</Text>
                <Text style={{ color: 'rgb(128,221,172)', fontSize: 16 }}>
                  {this.state.incomeEvent[eventList].value}
                </Text>
              </View>
            )
          })}
          <View style={styles.transaction}>
            <Text style={styles.header}>All Income</Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 5,
                color: 'rgb(128,221,172)'
              }}
            >
              {sumIncome}
            </Text>
          </View>
          <Text style={styles.line}>──────────────────</Text>

          {Object.keys(this.state.expenseEvent).map((eventList, j) => {
            sumExpense += this.state.expenseEvent[eventList].value
            return (
              <View key={j} style={styles.transaction}>
                <Text style={{ fontSize: 16 }}>{eventList}</Text>
                <Text style={{ color: 'rgb(240,128,128)', fontSize: 16 }}>
                  {this.state.expenseEvent[eventList].value}
                </Text>
              </View>
            )
          })}
          <View style={styles.transaction}>
            <Text style={styles.header}>All expense</Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 5,
                color: 'rgb(240,128,128)'
              }}
            >
              {sumExpense}
            </Text>
          </View>
          {this.checkBalance(sumIncome, sumExpense)}
          <Text style={styles.line}>──────────────────</Text>
          <View style={styles.transaction}>
            <Text style={styles.header}>Current Balance</Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 5,
                color: color
              }}
            >
              {sumIncome - sumExpense}
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  transaction: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5
  },
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
  },
  line: {
    color: 'grey',
    fontSize: 18,
    marginTop: 10
  }
})

export default Ledger
