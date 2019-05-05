import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  Text
} from 'react-native'

var width = Dimensions.get('window').width //full width
var height = Dimensions.get('window').height

class Ledger extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center'
        }}
      >
        <Image source={require('../../assets/money.jpg')} style={styles.logo} />
        <ScrollView style={{backgroundColor:'#1D2951',width:'100%'}}>
          <Text>sadsadasd</Text>
          <Text>sadsadasd</Text>
          <Text>sadsadasd</Text>
          <Text>sadsadasd</Text>
          <Text>sadsadasd</Text>
          <Text>sadsadasd</Text>
          <Text>sadsadasd</Text>
          <Text>sadsadasd</Text>
          <Text>sadsadasd</Text>
          <Text>sadsadasd</Text>
          <Text>sadsadasd</Text>
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
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
