import React from 'react'
import {
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  Image,
  Keyboard,
  View
} from 'react-native'
import { Button } from 'native-base'
import Loading from '../components/Loading'
import firebase from '../../config/config'
class Login extends React.Component {
  state = {
    email: '1',
    password: '1',
    user: null,
    loading: true
  }

  componentDidMount() {    
    firebase.auth().onAuthStateChanged(user => {      
      if (user) {        
        this.setState({ user })
        this.setState({ loading: false })
        this.props.navigation.navigate('Main')
      }
    })
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
      <>
        {true ? (
          <Loading />
        ) : (
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
              {/* <View style={styles.container}> */}
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
              {/* </View> */}
            </ScrollView>
          </View>
        )}
      </>
    )
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    alignItems: 'center',
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
