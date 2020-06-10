import React, {Component} from 'react'
import {Text, View, ImageBackground, StyleSheet} from 'react-native'
import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'

export default class TaskList extends Component{
  render(){
  const hoje = moment().locale('pt-br').format('ddd, D[ de] MMM')
    return(
      <View style={styles.container}>
        <ImageBackground source={todayImage} style={styles.backgound}>
          <View style={styles.barradetitulos}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{hoje}</Text>

          </View>
        </ImageBackground>
          <View style={styles.Tasklist}>
              <Text>#tarefa1</Text>
              <Text>#tarefa2</Text>
              <Text>#tarefa3</Text>

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
  title:{
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 35,
    marginLeft:20,
    marginBottom:20,
  },
  subtitle:{
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft:20,
    marginBottom:20,
  },
})