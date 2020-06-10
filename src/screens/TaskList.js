import React, {Component} from 'react'
import {Text, View, ImageBackground, StyleSheet} from 'react-native'
import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment'
import 'moment/locale/pt-br'

export default class TaskList extends Component{
  render(){
  const hoje = moment().locale('pt-br').format('ddd, D[de] MMM')
    return(
      <View style={styles.container}>
        <ImageBackground source={todayImage} style={styles.backgound}>
          <View style={styles.barradetitulos}>
            <Text>Hoje</Text>
            <Text>{hoje}</Text>

          </View>
        </ImageBackground>
          <View style={styles.Tasklist}>
              <Text>
               TaskList
              </Text>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgound: {
    flex: 3,
  },
  Tasklist:{
    flex: 7,
  },
  barradetitulos:{
    flex: 1,
    justifyContent: 'flex-end',
  },
})