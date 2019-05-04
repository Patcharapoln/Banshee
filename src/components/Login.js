import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
import { Button } from 'native-base'
import firebase from '../../config/config'
class Login extends React.Component {
  state = {
    email: '1',
    password: '1'
  }

  onLoginButtonPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.navigate('Main')
      })
      .catch(msgError => {
        alert(msgError.message)
      })
  }

  onSignUpPress = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.navigate('Main')
      })
      .catch(msgError => {
        alert(msgError.message)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('../../assets/pig.png')}
            />
            <Text style={styles.titleText}>Banshee</Text>
            <Text style={styles.quoteText}>
              SAVE MONEY AND MONEY WILL SAVE YOU.
            </Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={str => this.setState({ email: str })}
            />
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={str => this.setState({ password: str })}
            />
            <Button
              block
              success
              style={styles.button}
              onPress={this.onLoginButtonPress}
            >
              <Text style={styles.buttonText}> Login </Text>
            </Button>
            <Text style={styles.line}>──────── or ────────</Text>
            <Button block info onPress={this.onSignUpPress}>
              <Text style={styles.buttonText}> Register </Text>
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    justifyContent: 'center',
    width: 100,
    height: 100
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1D2951',
    marginTop: 20
  },
  quoteText: {
    fontStyle: 'italic',
    color: 'rgb(128,128,128)',
    marginBottom: 20
  },
  textInput: {
    borderBottomWidth: 0.25,
    borderColor: 'rgb(128,128,128)',
    fontSize: 18,
    marginBottom: 20,
    height: 35,
    width: 275
  },
  // button: {
  //   // height: 30,
  //   // width: '80%'
  // },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF'
  },
  line: {
    color: 'grey',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 15
  }
})

export default Login
