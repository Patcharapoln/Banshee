import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import firebase from '../../config/config'
import { Button } from 'native-base'

var index = 1
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
var e = []
class EditEvent extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Image
        style={{ width: 30, height: 30 }}
        source={require('../../assets/pig.png')}
      />
    )
  })
  state = {
    eventList: [],
    eventSelector: [],
    monthKey: '',
    month: '',
    selectedEvent: '',
    selectedEventValue: '',
    user: firebase.database().ref(firebase.auth().currentUser.uid)
  }
  getEventList() {
    //Query event in selected month
    firebase
      .database()
      .ref(firebase.auth().currentUser.uid)
      .orderByChild('month')
      .equalTo(this.state.monthKey)
      .on(
        'value',
        function(snapshot) {
          var eventList = snapshot.val()
          Object.keys(eventList).map((event, j) => {
            e.push({ key: eventList[event].value, label: event })
          })
          console.log(eventList)
          this.setState({ eventSelector: e, eventList: eventList })
        }.bind(this)
      )
  }

  onEditEventPress = () => {
    this.state.user.child(this.state.selectedEvent).update({
      value: parseInt(this.state.selectedEventValue)
    })
  }

  onRemoveEventPress = () => {
    this.state.user.child(this.state.selectedEvent).remove()
    this.setState({ selectedEvent: '', selectedEventValue: '' })
  }

  render() {
    e = []
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flex: 1, width: '80%' }}>
          <ModalSelector
            style={{ width: '100%', marginTop: 20 }}
            data={monthList}
            initValue="Please select month"
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={option => {
              this.setState({ monthKey: option.key, month: option.label })
              this.getEventList()
            }}
          >
            <TextInput
              style={styles.selector}
              editable={false}
              placeholder="Please select month"
              value={this.state.month + ''}
            />
          </ModalSelector>

          <ModalSelector
            style={{ width: '100%', marginTop: 10 }}
            data={this.state.eventSelector}
            initValue="Please select month"
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={option => {
              this.setState({
                selectedEvent: option.label,
                selectedEventValue: option.key
              })
            }}
          >
            <TextInput
              style={styles.selector}
              editable={false}
              placeholder="Please select event"
              value={this.state.selectedEvent + ''}
            />
          </ModalSelector>
          <View style={styles.editContainer}>
            <Text style={styles.header}>Event :</Text>
            <Text style={{ fontSize: 16 }}>{this.state.selectedEvent}</Text>
          </View>
          <View style={styles.editContainer}>
            <Text style={styles.header}>Value :</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              value={this.state.selectedEventValue + ''}
              onChangeText={str => this.setState({ selectedEventValue: str })}
            />
          </View>
          <TouchableOpacity
            style={styles.EditButton}
            onPress={this.onEditEventPress}
          >
            <Text style={styles.text}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.DeleteButton}
            onPress={this.onRemoveEventPress}
          >
            <Text style={styles.text}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  selector: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    height: 40,
    fontSize: 16
  },
  editContainer: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row'
  },
  textInput: {
    borderBottomWidth: 0.25,
    borderColor: 'rgb(128,128,128)',
    fontSize: 16,
    marginBottom: 20,
    height: 20,
    width: '80%'
  },
  EditButton: {
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgb(81,181,249)'
  },
  DeleteButton: {
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgb(191,71,68)'
  },
  text: {
    color: 'white',
    fontSize: 16
  },
  header: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default EditEvent
