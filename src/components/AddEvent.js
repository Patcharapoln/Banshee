import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import firebase from '../../config/config'

class AddEvent extends React.Component {
  state = {
    date: '',
    event: '',
    value: '',
    user: firebase.database().ref(firebase.auth().currentUser.uid)
  }

  onAddIncomePress = () => {
    this.state.user.child('Income').update({
      [this.state.date]: {
        [this.state.event]: this.state.value
      }
    })
  }

  onExpensePress = () => {
    this.state.user.child('Expense').update({
      [this.state.date]: {
        [this.state.event]: this.state.value
      }
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Calendar
            onDayPress={day => {
              this.setState({ date: day.dateString })
              console.log(this.state.date)
            }}
            markedDates={{
              [this.state.date]: {
                selected: true,
                selectedColor: 'rgb(81,181,249)'
              }
            }}
          />
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Event"
            onChangeText={str => this.setState({ event: str })}
          />
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Value"
            onChangeText={str => this.setState({ value: str })}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.IncomeButton}
              onPress={this.onAddIncomePress}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>Add Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ExpenseButton}
              onPress={this.onExpensePress}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>Add Expense</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  IncomeButton: {
    width: '30%',
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
    backgroundColor: 'rgb(128,221,172)'
  },

  ExpenseButton: {
    width: '30%',
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
    padding: 10,
    backgroundColor: 'rgb(240,128,128)'
  },
  textInput: {
    borderBottomWidth: 0.25,
    borderColor: 'rgb(128,128,128)',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
    height: 35,
    width: 275
  }
})

export default AddEvent
